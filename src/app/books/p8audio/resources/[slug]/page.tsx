import type { ParamMap } from ".next/types/routes";
import type { Metadata } from "next";
import type { FC } from "react";
import fsPromises from "fs/promises";
import path from "path";

import Breadcrumbs from "@/components/nav/Breadcrumbs/Breadcrumbs";
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
}: PageProps<"/books/p8audio/resources/[slug]">): Promise<Metadata> {
	/*
	 * Context
	 */
	const { slug } = await params;

	/*
	 * Data
	 */
	const {
		metadata: { description, title: resourceTitle },
	} = await import(`@/content/books/p8audio/resources/${slug}.mdx`);

	const book = getBookOrThrow({ slug: "p8audio" });
	const title = `${book.title}: ${resourceTitle}`;

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

export async function generateStaticParams(): Promise<
	ParamMap["/books/p8audio/resources/[slug]"][]
> {
	const files = await fsPromises.readdir(
		"./src/content/books/p8audio/resources",
	);

	const staticParams = files
		.filter((file) => path.extname(file) === ".mdx")
		.map((file) => ({ slug: path.basename(file, path.extname(file)) }));

	return staticParams;
}

/**
 * Resources Page
 */
const BookPage: FC<PageProps<"/books/p8audio/resources/[slug]">> = async ({
	params,
}) => {
	/*
	 * Context
	 */
	const { slug } = await params;

	/*
	 * Data
	 */
	// Get Article markdown and metadata
	const {
		default: Markdown,
		metadata: { title },
	} = await import(`@/content/books/p8audio/resources/${slug}.mdx`);

	const book = getBookOrThrow({ slug: "p8audio" });

	/*
	 * Constants
	 */
	const crumbs = [
		{
			title: "Books",
			href: "/books",
		},
		{
			title: book.title,
			href: `/books/${book.slug}`,
		},
		{
			title: "Resources",
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
			</article>
		</div>
	);
};

export default BookPage;
