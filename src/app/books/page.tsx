import type { ParamMap } from ".next/types/routes";
import type { Metadata } from "next";
import type { FC } from "react";
import Image from "next/image";

import BookCard from "@/components/content/Book/BookCard/BookCard";
import books from "@/content/books";

import "github-markdown-css/github-markdown-dark.css";
import "@/styles/markdown.scss";
import styles from "./styles.module.scss";

/*
 * Constants
 */
const imgUrl = "/content/books/parastoo-maleki-ORT8CtIFriE-unsplash.jpg";

/*
 * SSR
 */
export const dynamicParams = false;

export async function generateMetadata(): Promise<Metadata> {
	const title = "Books";
	const description =
		"Collections of articles about vintage, retro, and fantasy video game consoles.";

	return {
		description,
		title,
		openGraph: {
			description,
			title,
			images: { url: imgUrl },
		},
	};
}

export async function generateStaticParams(): Promise<ParamMap["/books"][]> {
	const staticParams: object[] = [];
	return staticParams;
}

/**
 * Books Page
 */
const BooksPage: FC = async () => {
	/*
	 * Data
	 */
	// Get page markdown and metadata
	const { default: Markdown } = await import(`@/content/books/index.mdx`);

	/*
	 * React element
	 */
	return (
		<div className={styles.wrapper}>
			<div className={styles.hero}>
				<Image alt="A bookshelf" fill src={imgUrl} sizes="100vw" />
			</div>

			<article>
				<h1>Books</h1>

				<Markdown />

				<ul className={styles.bookList}>
					{books.map((book) => (
						<li key={book.slug}>
							<BookCard book={JSON.parse(JSON.stringify(book))} />
						</li>
					))}
				</ul>
			</article>
		</div>
	);
};

export default BooksPage;
