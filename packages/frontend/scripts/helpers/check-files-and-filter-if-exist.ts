import * as fs from 'fs';
import * as path from 'path';

/**
 * Recursively checks for 'page.tsx' files in `fromPath` and returns an array of relative paths
 * of those that do not exist in `toPath`, sorted with root folders on top and nested items below.
 * Skips paths if their non-namespace equivalent exists in `toPath` under any namespace directories.
 * @param fromPath - The source directory containing files and folders to check.
 * @param toPath - The target directory to compare against.
 * @returns An array of relative paths from `fromPath` where 'page.tsx' files do not exist in `toPath`, without 'page.tsx' at the end, sorted by depth.
 */
export function checkFilesAndFilterIfExist(
  fromPath: string,
  toPath: string,
): string[] {
  const missingPaths: string[] = [];
  const toPathNormalizedSet = new Set<string>();

  /**
   * Normalizes a path by removing namespace directories (enclosed in parentheses or square brackets).
   * @param dirPath - The directory path to normalize.
   * @returns The normalized path.
   */
  function normalizePath(dirPath: string): string {
    const segments = dirPath.split(path.sep);
    const normalizedSegments = segments.filter(segment => {
      return !(
        (segment.startsWith('(') && segment.endsWith(')')) ||
        (segment.startsWith('[') && segment.endsWith(']'))
      );
    });

    return normalizedSegments.join(path.sep);
  }

  /**
   * Traverses `toPath` to build a map of normalized paths to their actual paths.
   * @param currentPath - The current directory path being traversed.
   */
  function traverseToPath(currentPath: string) {
    const entries = fs.readdirSync(currentPath, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(currentPath, entry.name);

      if (entry.isDirectory()) {
        traverseToPath(fullPath);
      } else if (entry.name === 'page.tsx') {
        const relativePath = path.relative(toPath, fullPath);
        const dirPath = path.dirname(relativePath);
        const normalizedPath = normalizePath(dirPath);
        toPathNormalizedSet.add(normalizedPath);
      }
    }
  }

  traverseToPath(toPath);

  /**
   * Recursively traverses `fromPath` and updates the missingPaths array.
   * @param currentPath - The current directory path being traversed.
   */
  function traverseFromPath(currentPath: string) {
    const entries = fs.readdirSync(currentPath, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(currentPath, entry.name);
      const relativePath = path.relative(fromPath, fullPath);

      if (entry.isDirectory()) {
        traverseFromPath(fullPath);
      } else if (entry.name === 'page.tsx') {
        const dirPath = path.dirname(relativePath);

        // Skip paths that consist only of namespace directories after "app"
        if (!hasNonBracketedSegment(dirPath)) {
          continue;
        }

        const normalizedPath = normalizePath(dirPath);

        if (!toPathNormalizedSet.has(normalizedPath)) {
          missingPaths.push(dirPath);
        }
      }
    }
  }

  traverseFromPath(fromPath);

  // Sort missingPaths by depth (number of path separators), with shallower paths first
  missingPaths.sort((a, b) => {
    const depthA = a.split(path.sep).length;
    const depthB = b.split(path.sep).length;

    return depthA - depthB;
  });

  return missingPaths;
}

/**
 * Checks if the path contains any directory segments not enclosed in parentheses or square brackets, after "app".
 * @param relativePath - The relative path to check.
 * @returns True if there is at least one segment not enclosed in parentheses or square brackets after "app".
 */
function hasNonBracketedSegment(relativePath: string): boolean {
  const segments = relativePath.split(path.sep);

  // Find the index of "app" in the segments
  const appIndex = segments.findIndex(segment => segment === 'app');

  // Start checking from the segment after "app"
  const startIndex = appIndex >= 0 ? appIndex + 1 : 0;

  for (let i = startIndex; i < segments.length; i++) {
    const segment = segments[i];
    // Skip empty segments (can occur if path starts with separator)
    if (segment === '') continue;

    if (
      !(
        (segment.startsWith('(') && segment.endsWith(')')) ||
        (segment.startsWith('[') && segment.endsWith(']'))
      )
    ) {
      return true; // Found a non-namespace segment
    }
  }

  return false; // All segments are namespace directories
}
