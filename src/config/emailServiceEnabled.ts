import { getEnvValue } from '@app/util';

export const emailServiceEnabled = (() => {
  const envName = 'NOVA_API_EMAIL_SERVICE_ENABLED';
  const envValue = getEnvValue(envName);
  const configValue = envValue === 'true';

  return configValue;
})();
