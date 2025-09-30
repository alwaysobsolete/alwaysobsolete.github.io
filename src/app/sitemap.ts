import type { MetadataRoute } from "next";

import env from "@/config/env";

/*
 * Generate sitemap
 */
export const dynamic = "force-static";

function sitemap(): MetadataRoute.Sitemap {
	return [
		{
			url: env.URL,
			lastModified: new Date(),
			changeFrequency: "yearly",
			priority: 1,
		},
		{
			url: `${env.URL}/books`,
			lastModified: new Date(),
			changeFrequency: "monthly",
			priority: 0.5,
		},
	];
}

export default sitemap;
