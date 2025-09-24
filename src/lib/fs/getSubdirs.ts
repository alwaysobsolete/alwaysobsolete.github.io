import fsPromises from "fs/promises";
import path from "path";

/**
 * Get subdirectory paths
 *
 * @param {string} dirPath - Parent directory path
 *
 * @returns {string[]} Array of subdirectory paths
 */
async function getSubdirs(dirPath: string): Promise<string[]> {
	const dirEnts = await fsPromises.readdir(dirPath);

	const subdirPaths = await Promise.all(
		dirEnts.map(async (dirEnt) => {
			const dirEntPath = path.join(dirPath, dirEnt);
			const stat = await fsPromises.lstat(dirEntPath);

			if (stat.isDirectory()) {
				return dirEntPath;
			}
		}),
	);

	return subdirPaths.filter((subdir) => subdir !== undefined);
}

export default getSubdirs;
