import path from "path";

import evalMetadata from "@/lib/mdx/evalMetadata";

interface ArticleMetadata {
	author: string;
	title: string;
}

class Article {
	// Properties
	public author: string;
	public chapterSlug: string;
	public slug: string;
	public title: string;

	/**
	 * Private Constructor
	 *
	 * Use async Article.init() factory instead
	 */
	constructor(article: ClassProps<Article>) {
		this.author = article.author;
		this.chapterSlug = article.chapterSlug;
		this.slug = article.slug;
		this.title = article.title;
	}

	/**
	 * Article Factory
	 *
	 * @returns {Article}
	 */
	public static async init(
		articlePath: string,
		chapterSlug: string,
	): Promise<Article> {
		/*
		 * Parse data dir
		 */
		const { author, title } = await evalMetadata<ArticleMetadata>(articlePath);

		// Metadata assertions
		if (!author) {
			throw new Error(`${articlePath} metadata.author is undefined`);
		}

		if (!title) {
			throw new Error(`${articlePath} metadata.title is undefined`);
		}

		/*
		 * Make Article
		 */
		const slug = path.basename(articlePath, path.extname(articlePath));

		return new Article({
			author,
			chapterSlug,
			slug,
			title,
		});
	}
}

export default Article;
export type { ArticleMetadata };
