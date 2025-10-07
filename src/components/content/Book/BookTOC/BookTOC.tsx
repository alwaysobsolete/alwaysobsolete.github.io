import type { FC } from "react";

import type Book from "@/models/Book";
import PartTOC from "@/components/content/Book/Part/PartTOC/PartTOC";

/**
 * Book Table of Contents
 */
const BookTOC: FC<{ book: Book }> = ({ book }) => {
	/*
	 * React element
	 */
	return (
		<div>
			<h2>Table of Contents</h2>

			<ol style={{ listStyleType: "upper-roman" }}>
				{book.parts.map((part) => (
					<li key={part.slug}>
						<PartTOC part={part} />
					</li>
				))}
			</ol>
		</div>
	);
};

export default BookTOC;
