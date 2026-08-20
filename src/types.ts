// Shape of a single document as returned by the Open Library search API.
// The API returns many more fields than this; we only declare the ones
// we actually use, which keeps the type honest about what the app relies on.
export interface OpenLibraryDoc {
  key: string;
  title: string;
  author_name?: string[];
  first_publish_year?: number;
  cover_i?: number;
  edition_count?: number;
}

export interface OpenLibraryResponse {
  numFound: number;
  docs: OpenLibraryDoc[];
}

// The shape our components actually work with, normalized and with
// UI-friendly fields (a ready-to-use cover URL, a joined author string).
export interface Book {
  id: string;
  title: string;
  authors: string;
  year: number | null;
  coverUrl: string | null;
  editionCount: number;
}

export function toBook(doc: OpenLibraryDoc): Book {
  return {
    id: doc.key,
    title: doc.title,
    authors: doc.author_name && doc.author_name.length > 0
      ? doc.author_name.join(', ')
      : 'Unknown author',
    year: doc.first_publish_year ?? null,
    coverUrl: doc.cover_i
      ? `https://covers.openlibrary.org/b/id/${doc.cover_i}-M.jpg`
      : null,
    editionCount: doc.edition_count ?? 0,
  };
}
