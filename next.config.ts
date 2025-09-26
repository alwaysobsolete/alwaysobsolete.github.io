import type { NextConfig } from "next";
import createMDX from "@next/mdx";
import path from "path";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeSlug from "rehype-slug";

const nextConfig: NextConfig = {
	experimental: {
		optimizePackageImports: ["@mantine/core", "@mantine/hooks"],
	},

	pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],

	/*
	 * sass
	 */
	sassOptions: {
		implementation: "sass-embedded",
		additionalData: `@use "${path.join(process.cwd(), "_mantine").replace(/\\/g, "/")}" as mantine;`,
	},

	/*
	 * webpack
	 */
	webpack(config) {
		/*
		 * SVGR
		 *
		 * @see https://react-svgr.com/docs/next/#usage
		 */
		// Grab the existing rule that handles SVG imports
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		const fileLoaderRule = config.module.rules.find((rule: any) =>
			rule.test?.test?.(".svg"),
		);

		config.module.rules.push(
			// Reapply the existing rule, but only for svg imports ending in ?url
			{
				...fileLoaderRule,
				test: /\.svg$/i,
				resourceQuery: /url/, // *.svg?url
			},
			// Convert all other *.svg imports to React components
			{
				test: /\.svg$/i,
				issuer: fileLoaderRule.issuer,
				resourceQuery: { not: [...fileLoaderRule.resourceQuery.not, /url/] }, // exclude if *.svg?url
				use: ["@svgr/webpack"],
			},
		);

		// Modify the file loader rule to ignore *.svg, since we have it handled now.
		fileLoaderRule.exclude = /\.svg$/i;

		return config;
	},
};

/*
 * @next/mdx
 *
 * @see https://nextjs.org/docs/app/guides/mdx#configure-nextconfigmjs
 */
const withMDX = createMDX({
	// Add markdown plugins here, as desired
	options: {
		remarkPlugins: [],
		rehypePlugins: [
			rehypeSlug,
			[
				rehypeAutolinkHeadings,
				{
					behavior: "wrap",
					properties: {
						className: "anchor-heading",
					},
				},
			],
		],
	},
});

// Merge MDX config with Next.js config
const nextconfigWithMDX = withMDX(nextConfig);

export default nextconfigWithMDX;
