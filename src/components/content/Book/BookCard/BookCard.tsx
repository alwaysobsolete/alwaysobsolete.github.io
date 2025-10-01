"use client";

import type { FC } from "react";
import { Card } from "@mantine/core";
import Image from "next/image";
import Link from "next/link";

import Book from "@/models/Book";

import styles from "./styles.module.scss";

const BookCard: FC<{
	book: Book;
}> = ({ book }) => {
	/*
	 * Constants
	 */
	const url = `/books/${book.slug}`;

	/*
	 * React element
	 */
	return (
		<Card className={styles.wrapper}>
			<Card.Section className={styles.section}>
				{book.imgSrc && (
					<Link href={url}>
						<Image alt={`Cover art for ${book.title}`} fill src={book.imgSrc} />
					</Link>
				)}
			</Card.Section>
			<h2>
				<Link href={url}>{book.title}</Link>
			</h2>
			<p>{book.description}</p>
		</Card>
	);
};

export default BookCard;
