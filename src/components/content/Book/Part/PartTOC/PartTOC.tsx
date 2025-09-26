import type { FC } from "react";
import Link from "next/link";

import type Part from "@/models/Book/Part";
import ChapterTOC from "@/components/content/Book/Chapter/ChapterTOC/ChapterTOC";

/**
 * Part Table of Contents
 */
const PartTOC: FC<{ baseURL: string; part: Part; showTitle?: boolean }> = ({
	baseURL,
	part,
	showTitle = true,
}) => {
	/*
	 * Constants
	 */
	const partUrl = `${baseURL}/${part.slug}`;

	/*
	 * React element
	 */
	return (
		<div>
			{showTitle && (
				<h2>
					{part.chapters.filter((chapter) => chapter.articles.length > 0)
						.length > 0 ? (
						<Link href={partUrl}>{part.title}</Link>
					) : (
						part.title
					)}
				</h2>
			)}
			<ol style={{ listStyleType: "lower-roman" }}>
				{part.chapters.map((chapter) => (
					<li key={chapter.slug}>
						<ChapterTOC baseURL={partUrl} chapter={chapter} />
					</li>
				))}
			</ol>
		</div>
	);
};

export default PartTOC;
