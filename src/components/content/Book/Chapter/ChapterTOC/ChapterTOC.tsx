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
	 * Constants
	 */
	const chapterUrl = `${baseURL}/${chapter.slug}`;

	/*
	 * React element
	 */
	return (
		<div className={styles.wrapper}>
			{showTitle && (
				<h3>
					{chapter.articles.length > 0 ? (
						<Link href={chapterUrl}>{chapter.title}</Link>
					) : (
						chapter.title
					)}
				</h3>
			)}
			<ol className="no-style">
				{chapter.articles.map((article) => (
					<li className={styles.articleItem} key={article.slug}>
						<Link href={`${chapterUrl}/${article.slug}`}>{article.title}</Link>
					</li>
				))}
			</ol>
		</div>
	);
};

export default ChapterTOC;
