import { getEnvValue } from '@app/util';

export const apiPort = (() => {
  const envName = 'NOVA_API_PORT';
  const envValue = getEnvValue(envName);

  return envValue;
})();
