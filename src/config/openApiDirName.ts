import { getEnvValue } from '@app/util';

export const openApiDirName = (() => {
  const envName = 'OPENAPI_DIR_NAME';
  const envValue = getEnvValue(envName);

  return envValue;
})();
