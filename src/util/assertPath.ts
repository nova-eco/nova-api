import fs from 'node:fs';

export const assertPath = (path) => {
  if (fs.existsSync(path) === false) {
    throw new Error(`assertPath: ${path}: not found`);
  }
};
