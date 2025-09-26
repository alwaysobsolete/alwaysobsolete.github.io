import type { ParamMap } from ".next/types/routes";
import type { Metadata } from "next";
import type { FC } from "react";

import books from "@/content/books";
import Link from "next/link";

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
