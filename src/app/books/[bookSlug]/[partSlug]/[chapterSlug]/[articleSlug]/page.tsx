import type { ParamMap } from ".next/types/routes";
import type { Metadata } from "next";
import type { FC } from "react";

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
type StaticParams =
	ParamMap["/books/[bookSlug]/[partSlug]/[chapterSlug]/[articleSlug]"][];

export const dynamicParams = false;

export async function generateMetadata({
	params,
}: PageProps<"/books/[bookSlug]/[partSlug]/[chapterSlug]/[articleSlug]">): Promise<Metadata> {
	/*
	 * Context
	 */
	const { articleSlug, bookSlug, chapterSlug, partSlug } = await params;

	/*
	 * Data
	 */
	const book = getBookOrThrow({ slug: bookSlug });
	const part = book.getPartOrThrow(partSlug);
	const chapter = part.getChapterOrThrow(chapterSlug);
	const { description, title: articleTitle } =
		chapter.getArticleOrThrow(articleSlug);

	const title = `${book.title}: ${articleTitle}`;

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
	// Get Book objects
	const book = getBookOrThrow({ slug: bookSlug });
	const part = book.getPartOrThrow(partSlug);
	const chapter = part.getChapterOrThrow(chapterSlug);
	const article = chapter.getArticleOrThrow(articleSlug);

	// Parse article markdown
	const { default: Markdown } = await import(
		`@/content/books/${bookSlug}/parts/${partSlug}/chapters/${chapterSlug}/articles/${articleSlug}.mdx`
	);

	/*
	 * Constants
	 */
	// Breadcrumbs
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
		{
			title: chapter.title,
			href: chapter.url,
		},
	];

	// Siblings
	const { next: nextPart, prev: prevPart } = book.getPartSiblings(part.slug);
	const { next: nextChapter, prev: prevChapter } = part.getChapterSiblings(
		chapter.slug,
	);
	const { next: nextArticle, prev: prevArticle } =
		chapter.getArticleSiblings(articleSlug);

	const next = nextArticle || nextChapter || nextPart;
	const prev = prevArticle || prevChapter || prevPart;

	/*
	 * React component
	 */
	return (
		<div className={styles.wrapper}>
			<Breadcrumbs crumbs={crumbs} />

			<article className="markdown-body">
				<h1>{article.title}</h1>

				<Markdown />
			</article>

			<Siblings next={next} prev={prev} />
		</div>
	);
};

export default BookArticlePage;
