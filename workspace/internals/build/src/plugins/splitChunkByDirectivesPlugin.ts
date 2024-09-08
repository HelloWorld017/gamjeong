import { createHash } from 'node:crypto';
import type { Plugin } from 'rollup';

const getDirectiveSignature = (directives: string[]) => {
  const signature = Array
    .from(new Set(directives))
    .sort()
    .map(directive => directive.replace(/^use /i, ''))
    .join('/');

  return signature;
};

type ModuleMeta = {
  preserveDirectives?: { directives: string[] };
};

const splitChunkByDirectives = (): Plugin => {
  let hasSeenPreserveDirectivesMeta = false;
  const directivesBoundary = new Set<string>();

  return {
    name: 'splitChunkByDirectives',
    buildEnd() {
      const moduleIds = this.getModuleIds();
      for (const id of moduleIds) {
        const info = this.getModuleInfo(id);
        if (!info) {
          return;
        }

        const moduleMeta = info.meta as ModuleMeta;
        if (moduleMeta.preserveDirectives) {
          hasSeenPreserveDirectivesMeta = true;
        }

        const moduleImporters = info.importers;
        const signature = getDirectiveSignature(moduleMeta.preserveDirectives?.directives ?? []);
        const parentSignatures = moduleImporters.reduce((signatures, importer) => {
          const parentInfo = this.getModuleInfo(importer);
          const parentMeta = parentInfo?.meta as ModuleMeta;
          if (!parentMeta || !parentMeta.preserveDirectives) {
            signatures.add('');
            return signatures;
          }

          signatures.add(getDirectiveSignature(parentMeta.preserveDirectives.directives));
          return signatures;
        }, new Set<string>());

        const isBoundary = Array
          .from(parentSignatures)
          .some(parentSignature => parentSignature !== signature);

        if (isBoundary) {
          directivesBoundary.add(info.id);
        }
      }
    },
    outputOptions(output) {
      if (output.hoistTransitiveImports !== false) {
        console.warn(
          '(!) you might need `hoistTransitiveImports` to be false to prevent unexpected import hoistings, ' +
          'which can cause incorrectly preserved directives.'
        );

        if (output.hoistTransitiveImports !== true) {
          console.warn(
            '(!) the `hoistTransitiveImports` option is set to false, ' +
            'use explicit "true" to prevent this behavior.'
          );

          output.hoistTransitiveImports = false;
        }
      }

      output.manualChunks = id => {
        if (directivesBoundary.has(id)) {
          const hash = createHash('sha256');
          const uniqueId = hash.update(id).digest('base64').slice(0, 7);
          return uniqueId;
        }
      };

      return output;
    },
    renderStart() {
      if (!hasSeenPreserveDirectivesMeta) {
        console.warn(
          '(!) the `splitChunkByDirectives` plugin needs the `rollup-preserve-directives` plugin to work',
        );
        return;
      }
    }
  };
};

export default splitChunkByDirectives;
