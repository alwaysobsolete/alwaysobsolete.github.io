import fsPromises from "fs/promises";
import path from "path";

import evalMetadata from "@/lib/mdx/evalMetadata";
import Article from "@/models/Book/Article";

interface ChapterMetadata {
	title: string;
}

class Chapter {
	// Properties
	public articles: Article[];
	public partSlug: string;
	public slug: string;
	public title: string;

	/**
	 * Private Constructor
	 *
	 * Use Chapter.init() factory instead
	 */
	private constructor(chapter: ClassProps<Chapter>) {
		this.articles = chapter.articles;
		this.partSlug = chapter.partSlug;
		this.slug = chapter.slug;
		this.title = chapter.title;
	}

	/**
	 * Chapter Factory
	 *
	 * @returns {Chapter}
	 */
	public static async init(
		chapterPath: string,
		partSlug: string,
	): Promise<Chapter> {
		/*
		 * Parse data dir
		 */
		const mdxPath = path.join(chapterPath, "chapter.mdx");
		const { title } = await evalMetadata<ChapterMetadata>(mdxPath);

		// Metadata assertions
		if (!title) {
			throw new Error(`${mdxPath} has no .title metadata`);
		}

		/*
		 * Make Chapter
		 */
		const slug = path.basename(chapterPath);

		const articlesPath = path.join(chapterPath, "articles");
		const entPaths = await fsPromises.readdir(articlesPath);

		const articlePaths = entPaths
			.filter((entPath) => path.extname(entPath) === ".mdx")
			.map((entPath) => path.join(articlesPath, entPath));

		const articles = await Promise.all(
			articlePaths.map((articlePath) => Article.init(articlePath, slug)),
		);

		return new Chapter({
			articles,
			partSlug,
			slug,
			title,
		});
	}

	/**
	 * Get Article or Throw
	 */
	public getArticleOrThrow(articleSlug: string) {
		const article = this.articles.find(
			(article) => article.slug === articleSlug,
		);

		if (!article) {
			throw new Error(`Could not find article with slug ${articleSlug}`);
		}

		return article;
	}

	/**
	 * Get Article Siblings
	 */
	public getArticleSiblings(articleSlug: string) {
		const idx = this.articles.indexOf(this.getArticleOrThrow(articleSlug));

		return {
			next: this.articles[idx + 1],
			prev: this.articles[idx - 1],
		};
	}
}

export default Chapter;
export type { ChapterMetadata };
