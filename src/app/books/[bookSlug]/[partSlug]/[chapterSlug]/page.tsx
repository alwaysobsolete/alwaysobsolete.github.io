import type { ParamMap } from ".next/types/routes";
import type { Metadata } from "next";
import type { FC } from "react";

import ChapterTOC from "@/components/content/Book/Chapter/ChapterTOC/ChapterTOC";
import Breadcrumbs from "@/components/nav/Breadcrumbs/Breadcrumbs";
import Siblings from "@/components/nav/Siblings/Siblings";
import books from "@/lib/data/Book/getBooks";
import getBookOrThrow from "@/lib/data/Book/getBookOrThrow";

import "github-markdown-css/github-markdown-dark.css";
import "@/styles/markdown.scss";
import styles from "./styles.module.scss";

/*
 * SSR
 */
type StaticParams = ParamMap["/books/[bookSlug]/[partSlug]/[chapterSlug]"][];

export const dynamicParams = false;

export async function generateMetadata({
	params,
}: PageProps<"/books/[bookSlug]/[partSlug]/[chapterSlug]">): Promise<Metadata> {
	/*
	 * Context
	 */
	const { bookSlug, chapterSlug, partSlug } = await params;

	/*
	 * Data
	 */
	const book = getBookOrThrow({ slug: bookSlug });
	const part = book.getPartOrThrow(partSlug);
	const { description, title: chapterTitle } =
		part.getChapterOrThrow(chapterSlug);

	const title = `${book.title}: ${chapterTitle}`;

	/*
	 * Make metadata
	 */
	return {
		description,
		title,
		openGraph: {
			description,
			title,
			images: book.imgSrc ? [{ url: book.imgSrc }] : undefined,
		},
	};
}

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
	// Get Book objects
	const book = getBookOrThrow({ slug: bookSlug });
	const part = book.getPartOrThrow(partSlug);
	const chapter = part.getChapterOrThrow(chapterSlug);

	// Get Chapter markdown and metadata
	const { default: Markdown } = await import(
		`@/content/books/${bookSlug}/parts/${partSlug}/chapters/${chapterSlug}/index.mdx`
	);

	/*
	 * Constants
	 */
	// Get breadcrumbs
	const crumbs = [
		{
			title: "Books",
			href: "/books",
		},
		{
			title: book.title,
			href: book.url,
		},
		{
			title: part.title,
			href: part.url,
		},
	];

	// Get siblings
	const { next: nextPart, prev: prevPart } = book.getPartSiblings(part.slug);
	const { next: nextChapter, prev: prevChapter } =
		part.getChapterSiblings(chapterSlug);

	// Get links
	const next = nextChapter || nextPart;
	const prev = prevChapter || prevPart;

	/*
	 * React element
	 */
	return (
		<div className={styles.wrapper}>
			<Breadcrumbs crumbs={crumbs} />

			<article className="markdown-body">
				<h1>{chapter.title}</h1>

				<Markdown />

				<ChapterTOC chapter={chapter} showTitle={false} />
			</article>

			<Siblings next={next} prev={prev} />
		</div>
	);
};

export default BookChapterPage;
