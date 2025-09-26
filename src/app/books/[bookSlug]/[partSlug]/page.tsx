import type { ParamMap } from ".next/types/routes";
import type { Metadata } from "next";
import type { FC } from "react";

import BookPartNav from "@/components/content/Book/Part/PartNav/PartNav";
import PartTOC from "@/components/content/Book/Part/PartTOC/PartTOC";
import Breadcrumbs from "@/components/nav/Breadcrumbs/Breadcrumbs";
import books from "@/content/books";
import getBookOrThrow from "@/lib/data/Book/getBookOrThrow";

import "github-markdown-css/github-markdown-dark.css";
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
		metadata: { title },
	} = await import(`@/content/books/${bookSlug}/parts/${partSlug}/part.mdx`);

	const book = getBookOrThrow({ slug: bookSlug });

	/*
	 * Make metadata
	 */
	return {
		title: `${book.title}: ${title}`,
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
	} = await import(`@/content/books/${bookSlug}/parts/${partSlug}/part.mdx`);

	// Get Book objects
	const book = getBookOrThrow({ slug: bookSlug });
	const part = book.getPartOrThrow(partSlug);

	/*
	 * Constants
	 */
	const crumbs = [
		{
			title: book.title,
			href: `/books/${bookSlug}`,
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

				<PartTOC baseURL={`/books/${bookSlug}`} part={part} showTitle={false} />
			</article>

			<BookPartNav book={book} partSlug={partSlug} />
		</div>
	);
};

export default BookPartPage;
