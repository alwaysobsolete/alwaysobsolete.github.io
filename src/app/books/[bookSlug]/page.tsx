import type { ParamMap } from ".next/types/routes";
import type { FC } from "react";

import BookTOC from "@/components/content/Book/BookTOC/BookTOC";
import books from "@/content/books";
import getBookOrThrow from "@/lib/data/Book/getBookOrThrow";

import styles from "./styles.module.scss";

/*
 * SSR
 */
export const dynamicParams = false;

export async function generateStaticParams(): Promise<
	ParamMap["/books/[bookSlug]"][]
> {
	const staticParams = books.map((book) => ({
		bookSlug: book.slug,
	}));

	return staticParams;
}

/**
 * Book Page
 */
const BookPage: FC<PageProps<"/books/[bookSlug]">> = async ({ params }) => {
	/*
	 * Context
	 */
	const { bookSlug } = await params;

	/*
	 * Data
	 */
	// Get Article markdown and metadata
	const {
		default: Markdown,
		metadata: { title },
	} = await import(`@/content/books/${bookSlug}/book.mdx`);

	// Get Book object
	const book = getBookOrThrow({ slug: bookSlug });

	/*
	 * React element
	 */
	return (
		<div className={styles.wrapper}>
			<article>
				<h1>{title}</h1>
				<p>By: {book.authors.join(", ")}</p>

				<Markdown />

				<BookTOC book={book} />
			</article>
		</div>
	);
};

export default BookPage;
