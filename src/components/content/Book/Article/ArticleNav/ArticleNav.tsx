import type { FC } from "react";
import { Button } from "@mantine/core";
import KeyboardDoubleArrowLeft from "@material-symbols/svg-400/outlined/keyboard_double_arrow_left.svg";
import KeyboardDoubleArrowRight from "@material-symbols/svg-400/outlined/keyboard_double_arrow_right.svg";
import Link from "next/link";

import type Book from "@/models/Book";
import Chapter from "@/models/Book/Chapter";
import Part from "@/models/Book/Part";

/**
 * Book Article Navigation
 */
const BookArticleNav: FC<{
	articleSlug: string;
	book: Book;
	chapter: Chapter;
	part: Part;
}> = ({ articleSlug, book, chapter, part }) => {
	/*
	 * Constants
	 */
	// Get all siblings
	const { next: nextPart, prev: prevPart } = book.getPartSiblings(part.slug);
	const { next: nextChapter, prev: prevChapter } = part.getChapterSiblings(
		chapter.slug,
	);
	const { next: nextArticle, prev: prevArticle } =
		chapter.getArticleSiblings(articleSlug);

	// Get links
	const next = nextArticle || nextChapter || nextPart;
	const prev = prevArticle || prevChapter || prevPart;

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

export default BookArticleNav;
