import fs from 'node:fs';
import { openApiFilePath } from './openApiFilePath';

export const openApiFileContents = fs.readFileSync(openApiFilePath, 'utf-8');
