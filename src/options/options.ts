import { getDefaultRepoBranchAndPerformStartupChecks } from '../services/github/v4/getDefaultRepoBranchAndPerformStartupChecks';
import { PromiseReturnType } from '../types/PromiseReturnType';
import { setLogLevel } from './../services/logger';
import { ConfigOptions } from './ConfigOptions';
import { getOptionsFromCliArgs } from './cliArgs';
import { getOptionsFromConfigFiles } from './config/config';
import { getValidatedOptions } from './getValidatedOptions';

export type BackportOptions = Readonly<PromiseReturnType<typeof getOptions>>;
export async function getOptions(
  argv: string[],
  optionsFromModule?: ConfigOptions
) {
  const optionsFromConfig = await getOptionsFromConfigFiles();
  const optionsFromCli = getOptionsFromCliArgs(
    { ...optionsFromConfig, ...optionsFromModule },
    argv
  );

  // set log level when all config options have been taken into account
  setLogLevel({ verbose: optionsFromCli.verbose });

  const validatedOptions = getValidatedOptions(optionsFromCli);

  const { defaultBranch } = await getDefaultRepoBranchAndPerformStartupChecks(
    validatedOptions
  );

  return {
    ...validatedOptions,

    // use the default branch as source branch (normally master) unless an explicit `sourceBranch` has been given
    sourceBranch: validatedOptions.sourceBranch
      ? validatedOptions.sourceBranch
      : defaultBranch,
  };
}
