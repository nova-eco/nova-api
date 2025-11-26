import { assertPath } from '@app/util';
import { appRootPath } from './appRootPath';
import { openApiDirName } from './openApiDirName';
import { openApiFileName } from './openApiFileName';

export const openApiFilePath = (() => {
  const filePath = `${appRootPath}/${openApiDirName}/${openApiFileName}`;
  assertPath(filePath);

  return filePath;
})();
