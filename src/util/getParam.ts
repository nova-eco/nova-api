export const getParam = (name: string, params: Record<string, number | string>) =>
  typeof params[name] !== 'undefined' ? params[name] : null;
