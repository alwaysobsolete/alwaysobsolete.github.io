import fsPromises from "fs/promises";
import { evaluate } from "@mdx-js/mdx";
import * as runtime from "react/jsx-runtime";

/**
 * Evaluate metadata export from MDX
 *
 * !WARNING! Named evalMetadata because it `eval`s JS
 */
async function evalMetadata<T>(mdxPath: string): Promise<Partial<T>> {
	/*
	 * Evaluate MDX metadata
	 */
	// Read MDX to string
	const rawMdx = (await fsPromises.readFile(mdxPath)).toString();

	// Extract metadata export string
	const metadataStr = rawMdx.match(
		/export\s+const\s+metadata\s*=\s*({[\s\S]*?}\s*);/,
	)?.[0];

	// Check string
	if (!metadataStr) {
		throw new Error(`${mdxPath} has no metadata export or is malformed`);
	}

	// Evaluate metadata
	try {
		const result = await evaluate(metadataStr, {
			...runtime,
			baseUrl: import.meta.url,
		});

		return result.metadata as Partial<T>;
	} catch {
		throw new Error(`Could not parse ${mdxPath} metadata`);
	}
}

export default evalMetadata;
