/**
 * LoadingState Component
 * Displays an accessible loading spinner and message
 */
export function LoadingState({ message = 'Loading live queue data...', minHeight = '240px' }) {
  return (
    <div
      className="state-box"
      style={{ minHeight }}
      role="status"
      aria-live="polite"
    >
      <div className="spinner" aria-hidden="true" />
      <p className="state-desc" style={{ marginTop: '1rem', fontWeight: 500 }}>
        {message}
      </p>
    </div>
  );
}

export default LoadingState;
