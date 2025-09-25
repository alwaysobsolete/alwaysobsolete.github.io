import type { FC } from "react";
import Link from "next/link";

import type Chapter from "@/models/Book/Chapter";

import styles from "./styles.module.scss";

/**
 * Chapter Table of Contents
 */
const ChapterTOC: FC<{
	baseURL: string;
	chapter: Chapter;
	showTitle?: boolean;
}> = ({ baseURL, chapter, showTitle = true }) => {
	/*
	 * React element
	 */
	return (
		<div className={styles.wrapper}>
			{showTitle && (
				<h3>
					<Link href={`${baseURL}/${chapter.slug}`}>{chapter.title}</Link>
				</h3>
			)}
			<ol className="no-style">
				{chapter.articles.map((article) => (
					<li className={styles.articleItem} key={article.slug}>
						<Link href={`${baseURL}/${chapter.slug}/${article.slug}`}>
							{article.title}
						</Link>
					</li>
				))}
			</ol>
		</div>
	);
};

export default ChapterTOC;
