/**
 * Input Component
 * Fully accessible form field with mandatory associated label and validation message
 */
export function Input({
  id,
  label,
  type = 'text',
  value,
  onChange,
  placeholder,
  error,
  helperText,
  required = false,
  icon: Icon,
  className = '',
  ...rest
}) {
  const inputId = id || `input-${label?.toLowerCase().replace(/\s+/g, '-') || 'field'}`;

  return (
    <div className={`form-group ${className}`.trim()}>
      {label && (
        <label htmlFor={inputId} className="form-label">
          <span>
            {label} {required && <span style={{ color: 'var(--danger)' }}>*</span>}
          </span>
        </label>
      )}

      <div className={Icon ? 'input-icon-wrapper' : ''}>
        {Icon && <Icon className="icon-left" size={18} aria-hidden="true" />}
        <input
          id={inputId}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          className="form-input"
          aria-invalid={!!error}
          aria-describedby={error ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined}
          {...rest}
        />
      </div>

      {error && (
        <span id={`${inputId}-error`} className="form-error" role="alert">
          {error}
        </span>
      )}
      {!error && helperText && (
        <span id={`${inputId}-helper`} className="form-helper">
          {helperText}
        </span>
      )}
    </div>
  );
}

export default Input;
