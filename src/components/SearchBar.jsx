import { useRef } from 'react';
import { Search, X } from 'lucide-react';
import Button from './Button.jsx';

/**
 * SearchBar Component
 * Reusable search bar supporting instant filter and form submission
 * Demonstrates useRef for search input focus.
 */
export function SearchBar({
  value,
  onChange,
  onSearch,
  placeholder = 'Search hospitals, clinics, banks, or services...',
  size = 'md',
  autoFocus = false
}) {
  const inputRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(value);
    }
  };

  const handleClear = () => {
    onChange('');
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center gap-2"
      style={{ width: '100%' }}
      role="search"
    >
      <div
        className="input-icon-wrapper"
        style={{ flex: 1, width: '100%' }}
      >
        <Search className="icon-left" size={18} aria-hidden="true" />
        <input
          ref={inputRef}
          type="search"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          autoFocus={autoFocus}
          className="form-input"
          style={{
            height: size === 'lg' ? '50px' : '42px',
            fontSize: size === 'lg' ? '1.05rem' : '0.95rem',
            paddingRight: value ? '2.5rem' : '1rem'
          }}
          aria-label="Search places or services"
        />
        {value && (
          <button
            type="button"
            onClick={handleClear}
            className="btn-icon"
            style={{
              position: 'absolute',
              right: '0.6rem',
              padding: '0.25rem'
            }}
            aria-label="Clear search query"
          >
            <X size={16} aria-hidden="true" />
          </button>
        )}
      </div>

      <Button
        type="submit"
        variant="primary"
        size={size === 'lg' ? 'lg' : 'md'}
        style={{ height: size === 'lg' ? '50px' : '42px' }}
      >
        Search
      </Button>
    </form>
  );
}

export default SearchBar;
