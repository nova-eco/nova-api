import { getEnvValue } from '@app/util';

export const apiPort = (() => {
  const envName = 'API_PORT';
  const envValue = getEnvValue(envName);

  return envValue;
})();
