import { basename, resolve } from 'node:path';
import { NormalizedOutputOptions, EntryOptions } from '@/types';

export const normalizeOutputs = (entry: EntryOptions) => {
  const outputPool = new Map<string, NormalizedOutputOptions[]>();
  const baseItem: NormalizedOutputOptions = {
    condition: 'default',
    kind: 'module',
    outputBasePath: resolve('./dist/', basename(entry.inputPath)),
    extension: '.js',
    params: {},
    env: {},
    children: [],
  };

  const createNormalizedOutputByCondition = (condition: string) => {
    if (outputPool.has(condition)) {
      return;
    }

    const outputOptions = entry.outputByConditions[condition];
    if (!outputOptions) {
      throw new Error(`No such condition: ${condition}`);
    }

    const normalizedOutputs = [] as NormalizedOutputOptions[];
    outputPool.set(condition, normalizedOutputs);

    (outputOptions.parent ?? [null]).forEach(parent => {
      if (parent) {
        createNormalizedOutputByCondition(parent);
      }

      const parentItems = (parent && outputPool.get(parent)) || [baseItem];
      parentItems.forEach(parentItem => {
        const clonedItem = {
          ...parentItem,
          ...outputOptions,
          condition,
          params: {
            ...parentItem.params,
            ...outputOptions.params,
          },
          env: {
            ...parentItem.env,
            ...outputOptions.env,
          },
          children: [],
        };

        normalizedOutputs.push(clonedItem);
        parentItem.children.push(clonedItem);
      });
    });
  };

  Object.keys(entry.outputByConditions).forEach(createNormalizedOutputByCondition);
  return Array.from(outputPool.values()).flat();
};
