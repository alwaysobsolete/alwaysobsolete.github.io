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
			images: ["/tina-rataj-berard-0Q33pyk-AXI-unsplash.jpg"],
		},
		{
			url: `${env.URL}/books`,
			lastModified: new Date(),
			changeFrequency: "monthly",
			priority: 0.5,
			images: ["/content/books/parastoo-maleki-ORT8CtIFriE-unsplash.jpg"],
		},
		{
			url: `${env.URL}/privacy`,
			lastModified: new Date(),
			changeFrequency: "yearly",
			priority: 0,
		},
		{
			url: `${env.URL}/tos`,
			lastModified: new Date(),
			changeFrequency: "yearly",
			priority: 0,
		},
	];
}

export default sitemap;
