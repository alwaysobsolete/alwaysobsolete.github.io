import type { Metadata } from "next";
import type { FC } from "react";

import "github-markdown-css/github-markdown-dark.css";
import "@/styles/markdown.scss";
import styles from "./styles.module.scss";

const title = "Privacy Policy";

export async function generateMetadata({}: PageProps<"/privacy">): Promise<Metadata> {
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

const PrivacyPage: FC = async () => {
	/*
	 * Data
	 */
	const { default: Markdown } = await import(`@/content/privacy.mdx`);

	/*
	 * React element
	 */
	return (
		<div className={styles.wrapper}>
			<article className="markdown-body">
				<Markdown />
			</article>
		</div>
	);
};

export default PrivacyPage;
