interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <input
      type="text"
      className="search-bar"
      placeholder="Search books by title, author, or subject..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
      autoFocus
    />
  );
}
