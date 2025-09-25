import type { ParamMap } from ".next/types/routes";
import type { FC } from "react";

import books from "@/content/books";
import getBookOrThrow from "@/lib/data/Book/getBookOrThrow";

import styles from "./styles.module.scss";

/*
 * SSR
 */
type StaticParams =
	ParamMap["/books/[bookSlug]/[partSlug]/[chapterSlug]/[articleSlug]"][];

export const dynamicParams = false;

export async function generateStaticParams(): Promise<StaticParams> {
	const staticParams: StaticParams = [];

	books.forEach((book) =>
		book.parts.forEach((part) =>
			part.chapters.forEach((chapter) =>
				chapter.articles.forEach((article) =>
					staticParams.push({
						articleSlug: article.slug,
						bookSlug: book.slug,
						chapterSlug: chapter.slug,
						partSlug: part.slug,
					}),
				),
			),
		),
	);

	return staticParams;
}

/**
 * Book Article Page Component
 */
const BookArticlePage: FC<
	PageProps<"/books/[bookSlug]/[partSlug]/[chapterSlug]/[articleSlug]">
> = async ({ params }) => {
	/*
	 * Context
	 */
	const { articleSlug, bookSlug, chapterSlug, partSlug } = await params;

	/*
	 * Data
	 */
	// Get article markdown and metadata
	const {
		default: Markdown,
		metadata: { title },
	} = await import(
		`@/content/books/${bookSlug}/parts/${partSlug}/chapters/${chapterSlug}/articles/${articleSlug}.mdx`
	);

	// Get Book objects
	const book = getBookOrThrow({ slug: bookSlug });
	const part = book.getPartOrThrow(partSlug);
	const chapter = part.getChapterOrThrow(chapterSlug);
	const { next: nextPart, prev: prevPart } = book.getPartSiblings(partSlug);
	const { next: nextChapter, prev: prevChapter } =
		part.getChapterSiblings(chapterSlug);
	const { next: nextArticle, prev: prevArticle } =
		chapter.getArticleSiblings(articleSlug);

	/*
	 * React component
	 */
	return (
		<div className={styles.wrapper}>
			<h1>{title}</h1>

			<Markdown />

			<p>
				{nextPart?.title} {prevPart?.title}
			</p>
			<p>
				{nextChapter?.title} {prevChapter?.title}
			</p>
			<p>
				{nextArticle?.title} {prevArticle?.title}
			</p>
		</div>
	);
};

export default BookArticlePage;
