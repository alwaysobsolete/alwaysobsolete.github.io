import type { FC } from "react";
import { Button } from "@mantine/core";
import KeyboardDoubleArrowLeft from "@material-symbols/svg-400/outlined/keyboard_double_arrow_left.svg";
import KeyboardDoubleArrowRight from "@material-symbols/svg-400/outlined/keyboard_double_arrow_right.svg";
import Link from "next/link";

import type Book from "@/models/Book";

/**
 * Book Part Navigation
 */
const BookPartNav: FC<{
	book: Book;
	partSlug: string;
}> = ({ book, partSlug }) => {
	/*
	 * Constants
	 */
	// Get all siblings
	const { next, prev } = book.getPartSiblings(partSlug);

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

export default BookPartNav;
