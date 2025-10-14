import type { MetadataRoute } from "next";

import env from "@/config/env";
import books from "@/lib/data/Book/getBooks";

/*
 * Generate sitemap
 */
export const dynamic = "force-static";

function sitemap(): MetadataRoute.Sitemap {
	const url = `${env.URL}/books`;

	return books.map((book) => ({
		url: `${url}/${book.slug}`,
		images: [`${book.imgSrc}`],
	}));
}

export default sitemap;
