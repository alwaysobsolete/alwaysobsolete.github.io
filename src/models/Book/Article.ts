import path from "path";

import evalMetadata from "@/lib/mdx/evalMetadata";

interface ArticleMetadata {
	description?: string;
	title: string;
}

class Article {
	// Properties
	public chapterSlug: string;
	public description?: string;
	public slug: string;
	public title: string;
	public url: string;

	/**
	 * Private Constructor
	 *
	 * Use async Article.init() factory instead
	 */
	constructor(article: ClassProps<Article>) {
		this.chapterSlug = article.chapterSlug;
		this.slug = article.slug;
		this.title = article.title;
		this.url = article.url;
	}

	/**
	 * Article Factory
	 *
	 * @returns {Article}
	 */
	public static async init(
		mdxPath: string,
		chapterSlug: string,
		chapterUrl: string,
	): Promise<Article> {
		/*
		 * Parse data dir
		 */
		const { description, title } = await evalMetadata<ArticleMetadata>(mdxPath);

		// Metadata assertions
		if (!title) {
			throw new Error(`${mdxPath} metadata.title is undefined`);
		}

		/*
		 * Make Article
		 */
		const slug = path.basename(mdxPath, path.extname(mdxPath));
		const url = `${chapterUrl}/${slug}`;

		return new Article({
			chapterSlug,
			description,
			slug,
			title,
			url,
		});
	}
}

export default Article;
export type { ArticleMetadata };
