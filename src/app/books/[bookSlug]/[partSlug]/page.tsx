import type { ParamMap } from ".next/types/routes";
import type { Metadata } from "next";
import type { FC } from "react";

import PartTOC from "@/components/content/Book/Part/PartTOC/PartTOC";
import Breadcrumbs from "@/components/nav/Breadcrumbs/Breadcrumbs";
import Siblings from "@/components/nav/Siblings/Siblings";
import books from "@/content/books";
import getBookOrThrow from "@/lib/data/Book/getBookOrThrow";

import "github-markdown-css/github-markdown-dark.css";
import "@/styles/markdown.scss";
import styles from "./styles.module.scss";

/*
 * SSR
 */
type StaticParams = ParamMap["/books/[bookSlug]/[partSlug]"][];

export const dynamicParams = false;

export async function generateMetadata({
	params,
}: PageProps<"/books/[bookSlug]/[partSlug]">): Promise<Metadata> {
	/*
	 * Context
	 */
	const { bookSlug, partSlug } = await params;

	/*
	 * Data
	 */
	const {
		metadata: { description, title: partTitle },
	} = await import(`@/content/books/${bookSlug}/parts/${partSlug}/index.mdx`);

	const book = getBookOrThrow({ slug: bookSlug });
	const title = `${book.title}: ${partTitle}`;

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
			staticParams.push({
				bookSlug: book.slug,
				partSlug: part.slug,
			}),
		),
	);

	return staticParams;
}

/**
 * Book Part Page
 */
const BookPartPage: FC<PageProps<"/books/[bookSlug]/[partSlug]">> = async ({
	params,
}) => {
	/*
	 * Context
	 */
	const { bookSlug, partSlug } = await params;

	/*
	 * Data
	 */
	// Get Part markdown and metadata
	const {
		default: Markdown,
		metadata: { title },
	} = await import(`@/content/books/${bookSlug}/parts/${partSlug}/index.mdx`);

	// Get Book objects
	const book = getBookOrThrow({ slug: bookSlug });
	const part = book.getPartOrThrow(partSlug);

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
			href: `/books/${bookSlug}`,
		},
	];

	// Get siblings
	const { next, prev } = book.getPartSiblings(partSlug);

	/*
	 * React element
	 */
	return (
		<div className={styles.wrapper}>
			<Breadcrumbs crumbs={crumbs} />

			<article className="markdown-body">
				<h1>{title}</h1>

				<Markdown />

				<PartTOC baseURL={`/books/${bookSlug}`} part={part} showTitle={false} />
			</article>

			<Siblings next={next} prev={prev} />
		</div>
	);
};

export default BookPartPage;
