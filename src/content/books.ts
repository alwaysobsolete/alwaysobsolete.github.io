import getSubdirs from "@/lib/fs/getSubdirs";
import Book from "@/models/Book";

async function makeBooks() {
	const bookPaths = await getSubdirs("./src/content/books");

	const results = await Promise.all(
		bookPaths.map((bookPath) => Book.init(bookPath)),
	);

	return results;
}

const books = await makeBooks();

export default books;
