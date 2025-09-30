import type { ParamMap } from ".next/types/routes";
import type { Metadata } from "next";
import type { FC } from "react";
import Image from "next/image";

import BookTOC from "@/components/content/Book/BookTOC/BookTOC";
import books from "@/content/books";
import getBookOrThrow from "@/lib/data/Book/getBookOrThrow";

import "github-markdown-css/github-markdown-dark.css";
import "@/styles/markdown.scss";
import styles from "./styles.module.scss";

/*
 * SSR
 */
export const dynamicParams = false;

export async function generateMetadata({
	params,
}: PageProps<"/books/[bookSlug]">): Promise<Metadata> {
	/*
	 * Context
	 */
	const { bookSlug } = await params;

	/*
	 * Data
	 */
	const {
		metadata: { title },
	} = await import(`@/content/books/${bookSlug}/index.mdx`);

	/*
	 * Make metadata
	 */
	return {
		title: `${title}`,
	};
}

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
		metadata: { imgSrc, title },
	} = await import(`@/content/books/${bookSlug}/index.mdx`);

	let Appendix;

	try {
		Appendix = (await import(`@/content/books/${bookSlug}/appendix.mdx`))
			.default;
	} catch {}

	// Get Book object
	const book = getBookOrThrow({ slug: bookSlug });

	/*
	 * React element
	 */
	return (
		<div className={styles.wrapper}>
			<div className={styles.hero}>
				<Image alt={`Cover art for ${book.title}`} fill src={imgSrc} />
			</div>
			<article className="markdown-body">
				<h1>{title}</h1>

				<Markdown />

				<BookTOC book={book} />

				{Appendix && <Appendix />}
			</article>
		</div>
	);
};

export default BookPage;
