import type { ManualChunkMeta, Plugin } from 'rollup';

const createDirectivesSignature = (directives: string[]) =>
   Array
      .from(new Set(directives))
      .map(directive => directive.replace('use ', ''))
      .sort()
      .join('_');

type ModuleMeta = {
  preserveDirectives: { directives: string[] }
};

const splitChunkByDirectives = (): Plugin => ({
  name: 'splitChunkByDirectives',
  outputOptions(output) {
    if (output.manualChunks && typeof output.manualChunks !== 'function') {
      console.warn(
        '(!) the `splitChunkByDirectives` plugin doesn\'t have any effect when using the object form ' +
        'of `build.rollupOptions.output.manualChunks`. Consider using the function form instead.',
      );
      return;
    }

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

    const userManualChunks = output.manualChunks;
    output.manualChunks = (id: string, api: ManualChunkMeta) => {
      const userChunk = userManualChunks && userManualChunks(id, api);
      const moduleInfo = api.getModuleInfo(id);
      const moduleMeta = moduleInfo?.meta;
      if (!moduleMeta || !('preserveDirectives' in moduleMeta)) {
        console.warn(
          '(!) the `splitChunkByDirectives` plugin needs the `rollup-preserve-directives` plugin to work',
        );
        return;
      }

      const moduleImporters = moduleInfo.importers;
      const parentDirectivesSet = moduleImporters.reduce((parentDirectivesSet, importer) => {
        const parentInfo = api.getModuleInfo(importer);
        const parentMeta = parentInfo?.meta;
        if (!parentMeta || !('preserveDirectives' in parentMeta)) {
          return parentDirectivesSet;
        }

        const parentDirectives = createDirectivesSignature(
          (parentMeta as ModuleMeta).preserveDirectives.directives
        );

        parentDirectivesSet.add(parentDirectives);
        return parentDirectivesSet;
      }, new Set());

      if (parentDirectivesSet.size > 1) {
        // Imported in multiple directives set
        return userChunk ?? id;
      }

      const { preserveDirectives } = moduleMeta as ModuleMeta;
      if (preserveDirectives.directives.length === 0) {
        return userChunk;
      }

      const directives = createDirectivesSignature(preserveDirectives.directives);
      return `${directives}_${userChunk ?? id}`;
    };

    return output;
  },
});

export default splitChunkByDirectives;
