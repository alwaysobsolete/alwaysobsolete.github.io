import type Book from "@/models/Book";
import books from "@/content/books";

/**
 * Get Book or Throw
 */
function getBookOrThrow(where: Partial<ClassProps<Book>>): Book {
	// Enforce where keys
	if (Object.keys(where).length === 0) {
		throw new Error("where arg has no object keys");
	}

	const book = books.find((book) => {
		return (
			(!where.slug || where.slug === book.slug) &&
			(!where.title || where.title === book.title)
		);
	});

	if (!book) {
		throw new Error("No book found.");
	}

	return book;
}

export default getBookOrThrow;
