import type { Book } from '../types';
import { BookCard } from './BookCard';

interface BookGridProps {
  books: Book[];
  loading: boolean;
  error: string | null;
  hasSearched: boolean;
}

export function BookGrid({ books, loading, error, hasSearched }: BookGridProps) {
  if (error) {
    return <p className="status-message error">{error}</p>;
  }

  if (!hasSearched) {
    return (
      <p className="status-message idle">
        Start typing to search millions of books via the Open Library API.
      </p>
    );
  }

  if (loading && books.length === 0) {
    return <p className="status-message loading">Searching&hellip;</p>;
  }

  if (!loading && books.length === 0) {
    return <p className="status-message empty">No books found for that search.</p>;
  }

  return (
    <div className={`book-grid ${loading ? 'is-refreshing' : ''}`}>
      {books.map((book) => (
        <BookCard key={book.id} book={book} />
      ))}
    </div>
  );
}
