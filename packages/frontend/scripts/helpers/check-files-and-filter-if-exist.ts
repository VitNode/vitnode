import { readdirSync } from 'fs';
import { dirname, join, relative, sep } from 'path';

export const checkFilesAndFilterIfExist = ({
  packagesFromCopyPath,
  dirPath,
}: {
  dirPath: string;
  packagesFromCopyPath: string;
}): string[] => {
  const pageFiles: string[] = [];

  function traverseDirectory(currentPath: string) {
    const entries = readdirSync(currentPath, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = join(currentPath, entry.name);
      if (entry.isDirectory()) {
        traverseDirectory(fullPath);
      } else if (entry.isFile() && entry.name === 'page.tsx') {
        pageFiles.push(fullPath);
      }
    }
  }

  traverseDirectory(dirPath);

  // Sort the results based on directory depth
  pageFiles.sort((a, b) => {
    const depthA = a.split(sep).length;
    const depthB = b.split(sep).length;

    if (depthA !== depthB) {
      return depthA - depthB; // Shallower paths come first
    } else {
      return a.localeCompare(b); // If same depth, sort alphabetically
    }
  });

  // Filter out the admin paths
  const filteredFiles = pageFiles.filter(
    file => !file.includes(join('src', 'app', '[locale]', 'admin')),
  );

  // Remove 'page.tsx' from the end of each path to get the directory
  const directoryPaths = filteredFiles.map(file => dirname(file));

  // Remove directories where the last segment is a namespace
  const directoryPathsWithoutEndingNamespace = directoryPaths.filter(
    fullPath => {
      // Get the last segment of the path
      const segments = fullPath.split(sep);
      const lastSegment = segments[segments.length - 1];

      // Exclude the path if the last segment is a namespace
      return !(lastSegment.startsWith('(') && lastSegment.endsWith(')'));
    },
  );

  // Remove duplicates based on paths without namespace segments
  const basePath = join(packagesFromCopyPath, 'src', 'app', '[locale]');
  const uniquePathsSet = new Set<string>();
  const uniqueDirectoryPaths: string[] = [];

  for (const fullPath of directoryPathsWithoutEndingNamespace) {
    // Get the relative path from basePath
    const relativePath = relative(basePath, fullPath);

    // Split the path into segments
    const segments = relativePath.split(sep);

    // Remove namespace segments (those starting and ending with parentheses)
    const nonNamespaceSegments = segments.filter(
      segment => !(segment.startsWith('(') && segment.endsWith(')')),
    );

    // Reconstruct the path key without namespaces
    const pathKey = nonNamespaceSegments.join(sep);

    // If this pathKey hasn't been seen before, add it to the set and keep the full path
    if (!uniquePathsSet.has(pathKey)) {
      uniquePathsSet.add(pathKey);
      uniqueDirectoryPaths.push(fullPath);
    }
    // Else, it's a duplicate and we skip it
  }

  return uniqueDirectoryPaths;
};
