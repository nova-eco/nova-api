import { getEnvValue } from '@app/util';

export const openApiFileName = (() => {
  const envName = 'OPENAPI_FILE_NAME';
  const envValue = getEnvValue(envName);

  return envValue;
})();
