import type { Metadata } from "next";
import type { FC } from "react";

import "github-markdown-css/github-markdown-dark.css";
import "@/styles/markdown.scss";
import styles from "./styles.module.scss";

const title = "About Us";

export async function generateMetadata({}: PageProps<"/about">): Promise<Metadata> {
	/*
	 * Make metadata
	 */
	return {
		title,
		openGraph: {
			title,
			images: { url: "/tina-rataj-berard-0Q33pyk-AXI-unsplash.jpg" },
		},
	};
}

const AboutPage: FC = async () => {
	/*
	 * Data
	 */
	const { default: Markdown } = await import("@/content/about.mdx");

	/*
	 * React element
	 */
	return (
		<div className={styles.wrapper}>
			<article className="markdown-body">
				<h1>{title}</h1>
				<Markdown />
			</article>
		</div>
	);
};

export default AboutPage;
