import type { Book } from '../types';

interface BookCardProps {
  book: Book;
}

export function BookCard({ book }: BookCardProps) {
  return (
    <div className="book-card">
      <div className="cover-wrap">
        {book.coverUrl ? (
          <img src={book.coverUrl} alt={`Cover of ${book.title}`} loading="lazy" />
        ) : (
          <div className="cover-fallback" aria-hidden="true">
            {book.title.slice(0, 1).toUpperCase()}
          </div>
        )}
      </div>
      <div className="book-info">
        <h3 className="book-title">{book.title}</h3>
        <p className="book-authors">{book.authors}</p>
        <p className="book-meta">
          {book.year ?? 'Year unknown'}
          {book.editionCount > 0 &&
            ` · ${book.editionCount} edition${book.editionCount === 1 ? '' : 's'}`}
        </p>
      </div>
    </div>
  );
}
