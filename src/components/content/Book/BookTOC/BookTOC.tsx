import type { FC } from "react";

import type Book from "@/models/Book";
import PartTOC from "@/components/content/Book/Part/PartTOC/PartTOC";

/**
 * Book Table of Contents
 */
const BookTOC: FC<{ book: Book; marginTop?: string | number | true }> = ({
	book,
	marginTop,
}) => {
	/*
	 * React element
	 */
	return (
		<div style={{ marginTop: marginTop === true ? "6rem" : marginTop }}>
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
