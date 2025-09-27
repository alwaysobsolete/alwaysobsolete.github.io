import fs from "fs";
import path from "path";

import getSubdirs from "@/lib/fs/getSubdirs";
import evalMetadata from "@/lib/mdx/evalMetadata";
import Part from "@/models/Book/Part";

interface BookMetadata {
	title: string;
}

class Book {
	// Properties
	public authors: string[];
	public parts: Part[];
	public slug: string;
	public title: string;
	public url: string;

	/**
	 * Private Constructor
	 *
	 * Use async Book.init() factory instead
	 */
	private constructor(book: Omit<ClassProps<Book>, "authors">) {
		const authors: string[] = [];

		book.parts.forEach((part) =>
			part.chapters.forEach((chapter) =>
				chapter.articles.forEach((article) => {
					if (!authors.includes(article.author)) {
						authors.push(article.author);
					}
				}),
			),
		);

		authors.sort();

		this.authors = authors;
		this.parts = book.parts;
		this.slug = book.slug;
		this.title = book.title;
		this.url = book.url;
	}

	/**
	 * Book Factory
	 *
	 * @returns {Book}
	 */
	public static async init(bookPath: string): Promise<Book> {
		/*
		 * Parse data dir
		 */
		const mdxPath = path.join(bookPath, "index.mdx");
		const { title } = await evalMetadata<BookMetadata>(mdxPath);

		// Metadata assertions
		if (!title) {
			throw new Error(`${mdxPath} has no .title metadata`);
		}

		/*
		 * Make Book
		 */
		const slug = path.basename(bookPath);
		const url = `/books/${slug}`;
		const partsPath = path.join(bookPath, "parts");

		let parts: Part[] = [];

		if (fs.existsSync(partsPath)) {
			const partPaths = await getSubdirs(path.join(bookPath, "parts"));

			parts = await Promise.all(
				partPaths.map((partPath) => Part.init(partPath, slug, url)),
			);
		}

		return new Book({ parts, slug, title, url });
	}

	/**
	 * Get Part or Throw
	 */
	public getPartOrThrow(partSlug: string) {
		const part = this.parts.find((part) => part.slug === partSlug);

		if (!part) {
			throw new Error(`Could not find Part with slug ${partSlug}`);
		}

		return part;
	}

	/**
	 * Get Part Siblings
	 */
	public getPartSiblings(partSlug: string) {
		const idx = this.parts.indexOf(this.getPartOrThrow(partSlug));

		return {
			next: this.parts[idx + 1],
			prev: this.parts[idx - 1],
		};
	}
}

export default Book;
export type { BookMetadata };
