import type { ParamMap } from ".next/types/routes";
import type { FC } from "react";

import ArticleNav from "@/components/content/Book/Article/ArticleNav/ArticleNav";
import Breadcrumbs from "@/components/nav/Breadcrumbs/Breadcrumbs";
import books from "@/content/books";
import getBookOrThrow from "@/lib/data/Book/getBookOrThrow";

import "github-markdown-css/github-markdown-dark.css";
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

	/*
	 * Constants
	 */
	const bookURL = `/books/${bookSlug}`;
	const partURL = `${bookURL}/${partSlug}`;
	const chapterURL = `${partURL}/${chapterSlug}`;

	const crumbs = [
		{
			title: book.title,
			href: bookURL,
		},
		{
			title: part.title,
			href: partURL,
		},
		{
			title: chapter.title,
			href: chapterURL,
		},
	];

	/*
	 * React component
	 */
	return (
		<div className={styles.wrapper}>
			<Breadcrumbs crumbs={crumbs} />

			<article className="markdown-body">
				<h1>{title}</h1>

				<Markdown />
			</article>

			<ArticleNav
				articleSlug={articleSlug}
				book={book}
				chapter={chapter}
				part={part}
			/>
		</div>
	);
};

export default BookArticlePage;
