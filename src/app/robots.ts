import type { MetadataRoute } from "next";

import env from "@/config/env";

/*
 * Generate robots.txt
 */
export const dynamic = "force-static";

function robots(): MetadataRoute.Robots {
	return {
		rules: [
			{
				userAgent: "Bytespider",
				disallow: "/",
			},
			{
				userAgent: "ChatGPT-User",
				disallow: "/",
			},
			{
				userAgent: "ClaudeBot",
				disallow: "/",
			},
			{
				userAgent: "CCBot",
				disallow: "/",
			},
			{
				userAgent: "Google-Extended",
				disallow: "/",
			},
			{
				userAgent: "GPTBot",
				disallow: "/",
			},
			{
				userAgent: "ia_archiver",
				disallow: "/",
			},
			{
				userAgent: "OAI-SearchBot",
				disallow: "/",
			},
			{
				userAgent: "PerplexityBot",
				disallow: "/",
			},
		],
		sitemap: `${env.URL}/sitemap.xml`,
	};
}

export default robots;
