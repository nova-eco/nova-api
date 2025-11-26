import path from 'node:path';

export const appRootPath = (() => {
  const currentPath = __dirname;
  const appRootPath = path.resolve(currentPath, '../../');

  return appRootPath;
})();
