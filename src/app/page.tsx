import type { FC } from "react";
import Image from "next/image";

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
				A blog about vintage, retro, and fantasy consoles.
			</p>

			<article className="markdown-body">
				<Markdown />
			</article>
		</div>
	);
};

export default HomePage;
