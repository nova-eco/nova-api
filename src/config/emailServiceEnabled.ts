import { getEnvValue } from '@app/util';

export const emailServiceEnabled = (() => {
  const envName = 'EMAIL_SERVICE_ENABLED';
  const envValue = getEnvValue(envName);
  const configValue = envValue === 'true';

  return configValue;
})();
