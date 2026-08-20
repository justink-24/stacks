import { useEffect, useRef, useState } from 'react';
import { useDebounce } from './useDebounce';
import { toBook, type Book, type OpenLibraryResponse } from '../types';

interface BookSearchState {
  books: Book[];
  loading: boolean;
  error: string | null;
  totalFound: number;
}

const DEBOUNCE_MS = 400;
const RESULT_LIMIT = 24;

export function useBookSearch(query: string): BookSearchState {
  const debouncedQuery = useDebounce(query.trim(), DEBOUNCE_MS);
  const [state, setState] = useState<BookSearchState>({
    books: [],
    loading: false,
    error: null,
    totalFound: 0,
  });

  // Tracks the in-flight request so a slow earlier response can't
  // overwrite the result of a more recent search (a classic race
  // condition with debounced search-as-you-type).
  const requestIdRef = useRef(0);

  useEffect(() => {
    if (debouncedQuery.length === 0) {
      // Invalidate any in-flight request from a previous, now-cleared
      // query, but don't setState here, the empty case is derived
      // directly at render time below instead.
      requestIdRef.current++;
      return;
    }

    const thisRequestId = ++requestIdRef.current;
    const controller = new AbortController();

    // Kicking off a network request is the canonical case for an effect:
    // it synchronizes component state with an external system (the API).
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setState((prev) => ({ ...prev, loading: true, error: null }));

    const url = `https://openlibrary.org/search.json?q=${encodeURIComponent(
      debouncedQuery
    )}&limit=${RESULT_LIMIT}`;

    fetch(url, { signal: controller.signal })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Open Library responded with ${res.status}`);
        }
        return res.json() as Promise<OpenLibraryResponse>;
      })
      .then((data) => {
        // Ignore stale responses from a previous, superseded request.
        if (thisRequestId !== requestIdRef.current) return;
        setState({
          books: data.docs.map(toBook),
          loading: false,
          error: null,
          totalFound: data.numFound,
        });
      })
      .catch((err: unknown) => {
        if (controller.signal.aborted) return;
        if (thisRequestId !== requestIdRef.current) return;
        const message = err instanceof Error ? err.message : 'Search failed.';
        setState({ books: [], loading: false, error: message, totalFound: 0 });
      });

    return () => controller.abort();
  }, [debouncedQuery]);

  if (debouncedQuery.length === 0) {
    return { books: [], loading: false, error: null, totalFound: 0 };
  }

  return state;
}
