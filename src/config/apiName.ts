import { getEnvValue } from '@app/util';

export const apiName = (() => {
  const envName = 'API_NAME';
  const envValue = getEnvValue(envName);

  return envValue;
})();
