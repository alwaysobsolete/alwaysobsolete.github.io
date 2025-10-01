import type { MetadataRoute } from "next";

import env from "@/config/env";

/*
 * Generate robots.txt
 */
export const dynamic = "force-static";

function robots(): MetadataRoute.Robots {
	return {
		rules: {
			userAgent: "ia_archiver",
			disallow: "/",
		},
		sitemap: `${env.URL}/sitemap.xml`,
	};
}

export default robots;
