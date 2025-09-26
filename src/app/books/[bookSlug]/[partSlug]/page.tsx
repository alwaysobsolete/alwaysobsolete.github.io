import type { ParamMap } from ".next/types/routes";
import type { FC } from "react";

import Breadcrumbs from "@/components/nav/Breadcrumbs/Breadcrumbs";
import PartTOC from "@/components/content/Book/Part/PartTOC/PartTOC";
import books from "@/content/books";
import getBookOrThrow from "@/lib/data/Book/getBookOrThrow";

import styles from "./styles.module.scss";

/*
 * SSR
 */
type StaticParams = ParamMap["/books/[bookSlug]/[partSlug]"][];

export const dynamicParams = false;

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

			<article>
				<h1>{title}</h1>

				<Markdown />

				<PartTOC baseURL={`/books/${bookSlug}`} part={part} showTitle={false} />
			</article>
		</div>
	);
};

export default BookPartPage;
