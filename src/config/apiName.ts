import { getEnvValue } from '@app/util';

export const apiName = (() => {
  const envName = 'NOVA_API_SERVICE_NAME';
  const envValue = getEnvValue(envName);

  return envValue;
})();
