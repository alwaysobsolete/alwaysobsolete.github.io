import type { ParamMap } from ".next/types/routes";
import type { Metadata } from "next";
import type { FC } from "react";
import Image from "next/image";
import Link from "next/link";

import books from "@/content/books";

import "github-markdown-css/github-markdown-dark.css";
import "@/styles/markdown.scss";
import styles from "./styles.module.scss";

/*
 * SSR
 */
export const dynamicParams = false;

export async function generateMetadata(): Promise<Metadata> {
	return {
		title: "Books",
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
				<Image
					alt="A bookshelf"
					fill
					src="/content/books/a-book-67049_1280.jpg"
				/>
			</div>

			<article>
				<h1>Books</h1>

				<Markdown />

				<ul>
					{books.map((book) => (
						<li key={book.slug}>
							<Link href={`/books/${book.slug}`}>{book.title}</Link>
						</li>
					))}
				</ul>
			</article>
		</div>
	);
};

export default BooksPage;
