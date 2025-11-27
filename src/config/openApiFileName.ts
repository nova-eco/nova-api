import { getEnvValue } from '@app/util';

export const openApiFileName = (() => {
  const envName = 'NOVA_API_OPENAPI_FILE_NAME';
  const envValue = getEnvValue(envName);

  return envValue;
})();
