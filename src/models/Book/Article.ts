import path from "path";

import evalMetadata from "@/lib/mdx/evalMetadata";

interface ArticleMetadata {
	title: string;
}

class Article {
	// Properties
	public chapterSlug: string;
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
		articlePath: string,
		chapterSlug: string,
		chapterUrl: string,
	): Promise<Article> {
		/*
		 * Parse data dir
		 */
		const { title } = await evalMetadata<ArticleMetadata>(articlePath);

		// Metadata assertions
		if (!title) {
			throw new Error(`${articlePath} metadata.title is undefined`);
		}

		/*
		 * Make Article
		 */
		const slug = path.basename(articlePath, path.extname(articlePath));
		const url = `${chapterUrl}/${slug}`;

		return new Article({
			chapterSlug,
			slug,
			title,
			url,
		});
	}
}

export default Article;
export type { ArticleMetadata };
