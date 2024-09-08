import fs from 'node:fs/promises';
import { basename, resolve } from 'node:path';

const getBuildConfigKey = (outputOptions: OutputOptionsMerged) => {
  const kindKey = outputOptions.kind === 'type';
  const paramsKey = JSON.stringify(outputOptions.params);
  const extKey = JSON.stringify(outputOptions.extension);

  return `${kindKey}_${paramsKey}_${extKey}` as BuildConfigKey;
};


const getOutputPath = (option: OutputOptionsMerged) => `${option.outputBasePath}${option.extension}`;
const createExportsOfCondition = (conditionItem: ConditionTreeItem) => {
  const path = getOutputPath(conditionItem);
  if (conditionItem.children.length === 0) {
    return path;
  }
  
  const exports: PackageInfoExports & {} = {};
  conditionItem.children.forEach(childCondition => {
    exports[childCondition.name] = createExportsOfCondition(childCondition);
  });

  exports.default = path;
  return exports;
};

const createBuildConfigOfCondition = (
  buildConfigByKey: Map<BuildConfigKey, BuildConfig>,
  conditionItem: ConditionTreeItem
) => {
  const configKey = getBuildConfigKey(conditionItem);
  const existingConfig = buildConfigByKey.get(configKey);
  const outputConfig: BuildConfigOutput = {
    extension: conditionItem.extension,
    kind: conditionItem.kind === 'type' ? 'module' : conditionItem.kind,
    outputPath: getOutputPath(conditionItem),
  };

  if (existingConfig) {
    existingConfig.output.push(outputConfig);
  } else {
    const config: BuildConfig = {
      env: conditionItem.env,
      params: conditionItem.params,
      kind: conditionItem.kind === 'type' ? 'type' : 'default',
      output: [outputConfig],
    };

    buildConfigByKey.set(configKey, config);
  }

  conditionItem.children.forEach(child => createBuildConfigOfCondition(buildConfigByKey, child));
};

type PackageInfoExports = string | { [TPathOrCondition: string]: PackageInfoExports };
const buildEntry = (entry: EntryOptions) => {
  const conditionTree = createConditionTree(entry);
  const [defaultConditionTreeItem] = conditionTree.get('default') ?? [];
  if (!defaultConditionTreeItem) {
    throw new Error(`No 'default' condition in entry '${entry.importPath}'`);
  }

  const buildConfigByKey = new Map<BuildConfigKey, BuildConfig>;
  createBuildConfigOfCondition(buildConfigByKey, defaultConditionTreeItem);

  const packageInfoExports = createExportsOfCondition(defaultConditionTreeItem);
  return [packageInfoExports, buildConfigByKey];
};

const buildPackageInfoBase = async (options: Options) => {
  const {
    devDependencies,
    scripts,
    ...packageInfo
  } = JSON.parse(await fs.readFile('./package.json', 'utf-8')) as Record<string, unknown>;

  return {
    ...packageInfo,
    exports: {}
  };
};

export const build = ({ entries }: Options) => {
  entries.forEach(entry => {
    buildEntry(entry);
  });
};

type CreateDefaultConditionsOptions = {
  outputBasePath: string;
  outputByConditions?: (root: string[]) => Record<string, BuildOutput>;
};

const createDefaultConditions = ({ outputBasePath, outputByConditions }: CreateDefaultConditionsOptions) => ({
  outputByConditions: {
    types: { kind: 'type' as const, extension: '.d.ts' },
    require: { kind: 'commonjs' as const, extension: '.cjs', parent: ['default'] },
    ...outputByConditions,
    default: { kind: 'module' as const, outputBasePath },
  },
});

