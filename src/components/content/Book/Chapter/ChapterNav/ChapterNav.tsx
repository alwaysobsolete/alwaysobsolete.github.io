import type { FC } from "react";
import { Button } from "@mantine/core";
import KeyboardDoubleArrowLeft from "@material-symbols/svg-400/outlined/keyboard_double_arrow_left.svg";
import KeyboardDoubleArrowRight from "@material-symbols/svg-400/outlined/keyboard_double_arrow_right.svg";
import Link from "next/link";

import type Book from "@/models/Book";
import Part from "@/models/Book/Part";

/**
 * Book Chapter Navigation
 */
const BookChapterNav: FC<{
	book: Book;
	chapterSlug: string;
	part: Part;
}> = ({ book, chapterSlug, part }) => {
	/*
	 * Constants
	 */
	// Get all siblings
	const { next: nextPart, prev: prevPart } = book.getPartSiblings(part.slug);
	const { next: nextChapter, prev: prevChapter } =
		part.getChapterSiblings(chapterSlug);

	// Get links
	const next = nextChapter || nextPart;
	const prev = prevChapter || prevPart;

	/*
	 * React element
	 */
	return (
		<nav className="flex">
			{prev && (
				<Link href={prev.url}>
					<Button
						leftSection={<KeyboardDoubleArrowLeft width={24} height={24} />}
						type="button"
					>
						{prev.title}
					</Button>
				</Link>
			)}
			{next && (
				<Link href={next.url}>
					<Button
						rightSection={<KeyboardDoubleArrowRight height={24} width={24} />}
						type="button"
					>
						{next.title}
					</Button>
				</Link>
			)}{" "}
		</nav>
	);
};

export default BookChapterNav;
