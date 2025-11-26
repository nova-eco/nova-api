import * as fs from 'fs';
import * as path from 'path';

const cache = new Map<string, string>();

/**
 * Load SQL from disk with in-process caching. Accepts absolute or relative paths.
 * @param filePath Absolute path or path relative to project root or caller
 */
export function sqlLoader(filePath: string): string {
  const resolved = path.isAbsolute(filePath) ? filePath : path.resolve(filePath);

  if (cache.has(resolved)) {
    return cache.get(resolved)!;
  }

  const contents = fs.readFileSync(resolved, 'utf-8');
  cache.set(resolved, contents);
  return contents;
}

export default sqlLoader;
