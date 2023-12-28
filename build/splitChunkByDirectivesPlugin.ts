import type { ManualChunkMeta } from 'rollup';
import type { Plugin } from 'vite';

export const splitChunkByDirectives = (): Plugin => ({
  name: 'splitChunkByDirectives',
  outputOptions(output) {
    if (output.manualChunks && typeof output.manualChunks !== 'function') {
      console.warn(
        '(!) the `splitChunkByDirectives` plugin doesn\'t have any effect when using the object form ' +
        'of `build.rollupOptions.output.manualChunks`. Consider using the function form instead.',
      );
      return;
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

      const { preserveDirectives } = moduleMeta as { preserveDirectives: { directives: string[] } };
      const directives = Array.from(new Set(preserveDirectives.directives)).sort().join('_');
      return `${directives}${userChunk}`;
    };
  },
});
