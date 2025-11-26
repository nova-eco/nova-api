export const getEnvValue = (envName) => {
  if (typeof envName === 'undefined') {
    throw new Error('getEnvValue: envName: undefined');
  }

  if (typeof process.env === 'undefined') {
    throw new Error('getEnvValue: process.env: undefined');
  }

  if (typeof process.env[envName] === 'undefined') {
    throw new Error(`getEnvValue: process.env.${envName}: undefined`);
  }

  const envValue = process.env[envName];

  if (envValue === '') {
    throw new Error(`getEnvValue: envValue: empty`);
  }

  return envValue;
};
