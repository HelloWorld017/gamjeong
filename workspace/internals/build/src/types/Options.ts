export type OutputOptionsEnvironment = Record<string, string>;
export type OutputOptionsParams = Record<string, string>;
export type OutputOptionsKind = 'type' | 'commonjs' | 'module';
export type OutputOptions = {
  kind?: OutputOptionsKind;
  outputBasePath?: string;
  extension?: string;
  params?: OutputOptionsParams;
  env?: OutputOptionsEnvironment;
  parent?: string[];
};

export type NormalizedOutputOptions = Omit<Required<OutputOptions>, 'parent'> & {
  condition: string;
  children: NormalizedOutputOptions[];
};

export type EntryOptions = {
  importPath: string,
  inputPath: string,
  outputByConditions: Record<string, OutputOptions>,
};

export type Options = {
  entries: EntryOptions[],
};
