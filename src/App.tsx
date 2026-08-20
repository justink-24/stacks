import { useState } from 'react';
import { SearchBar } from './components/SearchBar';
import { BookGrid } from './components/BookGrid';
import { useBookSearch } from './hooks/useBookSearch';
import './App.css';

function App() {
  const [query, setQuery] = useState('');
  const { books, loading, error, totalFound } = useBookSearch(query);

  return (
    <div className="wrap">
      <header className="masthead">
        <h1>
          <span>DEBOUNCED SEARCH / OPEN LIBRARY API</span>
          Stacks
        </h1>
        {query.trim().length > 0 && !error && (
          <span className="status">
            {loading ? 'Searching...' : `${totalFound.toLocaleString()} results`}
          </span>
        )}
      </header>

      <SearchBar value={query} onChange={setQuery} />

      <BookGrid
        books={books}
        loading={loading}
        error={error}
        hasSearched={query.trim().length > 0}
      />

      <p className="hint">
        Built with React, TypeScript, and a custom <code>useDebounce</code> hook,
        so a request only fires 400ms after you stop typing. Data from the{' '}
        <a href="https://openlibrary.org/developers/api" target="_blank" rel="noopener noreferrer">
          Open Library API
        </a>.
      </p>
    </div>
  );
}

export default App;
