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
	 * React element
	 */
	return (
		<div>
			{showTitle && (
				<h2>
					<Link href={`${baseURL}/${part.slug}`}>{part.title}</Link>
				</h2>
			)}
			<ol style={{ listStyleType: "lower-roman" }}>
				{part.chapters.map((chapter) => (
					<li key={chapter.slug}>
						<ChapterTOC baseURL={`${baseURL}/${part.slug}`} chapter={chapter} />
					</li>
				))}
			</ol>
		</div>
	);
};

export default PartTOC;
