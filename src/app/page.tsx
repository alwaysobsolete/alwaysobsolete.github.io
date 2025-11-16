import type { FC } from "react";
import Image from "next/image";

import BookCard from "@/components/content/Book/BookCard/BookCard";
import books from "@/lib/data/Book/getBooks";

import "github-markdown-css/github-markdown-dark.css";
import "@/styles/markdown.scss";
import styles from "./styles.module.scss";

const HomePage: FC = async () => {
	/*
	 * Data
	 */
	const { default: Markdown } = await import("@/content/index.mdx");

	/*
	 * React element
	 */
	return (
		<div className={styles.wrapper}>
			<div className={styles.hero}>
				<Image
					alt="vintage TV on gray wooden table inside room"
					fill
					src="/tina-rataj-berard-0Q33pyk-AXI-unsplash.jpg"
				/>
			</div>

			<p className={styles.description}>
				A blog about vintage, retro, and fantasy video game consoles.
			</p>

			<h2>Featured Books:</h2>

			<ul className={styles.bookList}>
				{books
					.filter((_book, i) => i < 2)
					.map((book) => (
						<li key={book.slug}>
							<BookCard book={JSON.parse(JSON.stringify(book))} />
						</li>
					))}
			</ul>

			<article className="markdown-body">
				<Markdown />
			</article>
		</div>
	);
};

export default HomePage;
