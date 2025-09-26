import type { ParamMap } from ".next/types/routes";
import type { FC } from "react";

import BookChapterNav from "@/components/content/Book/Chapter/ChapterNav/ChapterNav";
import ChapterTOC from "@/components/content/Book/Chapter/ChapterTOC/ChapterTOC";
import Breadcrumbs from "@/components/nav/Breadcrumbs/Breadcrumbs";
import books from "@/content/books";
import getBookOrThrow from "@/lib/data/Book/getBookOrThrow";

import "github-markdown-css/github-markdown-dark.css";
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
	 * Constants
	 */
	const bookUrl = `/books/${bookSlug}`;
	const partUrl = `${bookUrl}/${partSlug}`;

	const crumbs = [
		{
			title: book.title,
			href: bookUrl,
		},
		{
			title: part.title,
			href: partUrl,
		},
	];

	/*
	 * React element
	 */
	return (
		<div className={styles.wrapper}>
			<Breadcrumbs crumbs={crumbs} />

			<article className="markdown-body">
				<h1>{title}</h1>

				<Markdown />

				<ChapterTOC
					baseURL={`/books/${bookSlug}/${partSlug}`}
					chapter={chapter}
					showTitle={false}
				/>
			</article>

			<BookChapterNav book={book} chapterSlug={chapterSlug} part={part} />
		</div>
	);
};

export default BookChapterPage;
