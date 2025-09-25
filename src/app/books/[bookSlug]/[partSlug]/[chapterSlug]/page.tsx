import type { ParamMap } from ".next/types/routes";
import type { FC } from "react";

import ChapterTOC from "@/components/content/Book/Chapter/ChapterTOC/ChapterTOC";
import books from "@/content/books";
import getBookOrThrow from "@/lib/data/Book/getBookOrThrow";

import styles from "./styles.module.scss";

/*
 * SSR
 */
type StaticParams = ParamMap["/books/[bookSlug]/[partSlug]/[chapterSlug]"][];

export const dynamicParams = false;

export async function generateStaticParams(): Promise<StaticParams> {
	const staticParams: StaticParams = [];

	books.forEach((book) =>
		book.parts.forEach((part) =>
			part.chapters.forEach((chapter) =>
				staticParams.push({
					bookSlug: book.slug,
					chapterSlug: chapter.slug,
					partSlug: part.slug,
				}),
			),
		),
	);

	return staticParams;
}

/**
 * Book Chapter Page
 */
const BookChapterPage: FC<
	PageProps<"/books/[bookSlug]/[partSlug]/[chapterSlug]">
> = async ({ params }) => {
	/*
	 * Context
	 */
	const { bookSlug, chapterSlug, partSlug } = await params;

	/*
	 * Data
	 */
	// Get Chapter markdown and metadata
	const {
		default: Markdown,
		metadata: { title },
	} = await import(
		`@/content/books/${bookSlug}/parts/${partSlug}/chapters/${chapterSlug}/chapter.mdx`
	);

	// Get Book objects
	const book = getBookOrThrow({ slug: bookSlug });
	const part = book.getPartOrThrow(partSlug);
	const chapter = part.getChapterOrThrow(chapterSlug);

	/*
	 * React element
	 */
	return (
		<div className={styles.wrapper}>
			<article>
				<h1>{title}</h1>

				<Markdown />

				<ChapterTOC
					baseURL={`/books/${bookSlug}/${partSlug}`}
					chapter={chapter}
					showTitle={false}
				/>
			</article>
		</div>
	);
};

export default BookChapterPage;
