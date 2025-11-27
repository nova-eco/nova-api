import { getEnvValue } from '@app/util';

export const openApiDirName = (() => {
  const envName = 'NOVA_API_OPENAPI_DIR_NAME';
  const envValue = getEnvValue(envName);

  return envValue;
})();
