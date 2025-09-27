import fs from "fs";
import path from "path";

import getSubdirs from "@/lib/fs/getSubdirs";
import evalMetadata from "@/lib/mdx/evalMetadata";
import Chapter from "@/models/Book/Chapter";

interface PartMetadata {
	title: string;
}

class Part {
	// Properties
	public bookSlug: string;
	public chapters: Chapter[];
	public slug: string;
	public title: string;
	public url: string;

	/**
	 * Private Constructor
	 *
	 * Use Part.init() factory instead
	 */
	private constructor(part: ClassProps<Part>) {
		this.bookSlug = part.bookSlug;
		this.chapters = part.chapters;
		this.slug = part.slug;
		this.title = part.title;
		this.url = part.url;
	}

	/**
	 * Part Factory
	 *
	 * @returns {Part}
	 */
	public static async init(
		partPath: string,
		bookSlug: string,
		bookUrl: string,
	): Promise<Part> {
		/*
		 * Parse data dir
		 */
		const mdxPath = path.join(partPath, "index.mdx");
		const { title } = await evalMetadata<PartMetadata>(mdxPath);

		// Metadata assertions
		if (!title) {
			throw new Error(`${mdxPath} has no .title metadata`);
		}

		/*
		 * Make Part
		 */
		const slug = path.basename(partPath);
		const url = `${bookUrl}/${slug}`;
		const chaptersPath = path.join(partPath, "chapters");

		let chapters: Chapter[] = [];

		if (fs.existsSync(chaptersPath)) {
			const chapterPaths = await getSubdirs(chaptersPath);

			chapters = await Promise.all(
				chapterPaths.map((chapterPath) => Chapter.init(chapterPath, slug, url)),
			);
		}

		return new Part({
			bookSlug,
			chapters,
			slug,
			title,
			url,
		});
	}

	/**
	 * Get Chapter or Throw
	 */
	public getChapterOrThrow(chapterSlug: string) {
		const chapter = this.chapters.find(
			(chapter) => chapter.slug === chapterSlug,
		);

		if (!chapter) {
			throw new Error(`Could not find chapter with slug ${chapterSlug}`);
		}

		return chapter;
	}

	/**
	 * Get Chapter Siblings
	 */
	public getChapterSiblings(chapterSlug: string) {
		const idx = this.chapters.indexOf(this.getChapterOrThrow(chapterSlug));

		return {
			next: this.chapters[idx + 1],
			prev: this.chapters[idx - 1],
		};
	}
}

export default Part;
export type { PartMetadata };
