import env from "@/config/env";

/*
 * SSR
 */
export const dynamic = "force-static";

/**
 * Make sitemap
 */
function makeSitemap(loc: string) {
	return `\
	<sitemap>
		<loc>${loc}</loc>
		<lastmod>${new Date().toISOString().split("T")[0]}</lastmod>
	</sitemap>`;
}

/**
 * Make sitemaps
 *
 * @param {string} relPath Relative path to sitemap directory
 *	@see https://nextjs.org/docs/app/api-reference/functions/generate-sitemaps#urls
 * @param {function} generateSitemaps NextJS generateSitemaps() function
 *	@see https://nextjs.org/docs/app/api-reference/functions/generate-sitemaps
 */
// async function makeSitemaps(
// 	relPath: string,
// 	generateSitemaps: () => Promise<{ id: number }[]>,
// ) {
// 	const params = await generateSitemaps();
//
// 	const sitemaps = params.map((param) =>
// 		makeSitemap(`${env.URL}/${relPath}/sitemap/${param.id}.xml`),
// 	);
//
// 	return sitemaps;
// }

/**
 * /sitemap-index.xml Route Handler
 */
async function GET() {
	/*
	 * Constants
	 */
	const doctype = '<?xml version="1.0" encoding="UTF-8"?>';

	const openingTag =
		'<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">';

	const closingTag = "</sitemapindex>";

	/*
	 * Sitemaps
	 */
	const sitemaps: string[] = (
		await Promise.all([
			/*
			 * ADD GENERATED SITEMAPS HERE
			 */
			makeSitemap(`${env.URL}/sitemap.xml`),
			makeSitemap(`${env.URL}/books/sitemap.xml`),
			// makeSitemaps("foo", generateFooSitemaps),
		])
	).flat();

	/*
	 * Document
	 */
	const result = String().concat(
		doctype,
		"\n",
		openingTag,
		"\n",
		sitemaps.join("\n"),
		"\n",
		closingTag,
	);

	const response = new Response(result, {
		headers: {
			"Content-Type": "application/xml",
		},
	});

	return response;
}

export { GET };
