// Button — reusable button component with 3 variants
// Primary (indigo), Secondary (outlined), Ghost (text only)

/**
 * Reusable button component.
 * @param {React.ReactNode} children - Button label
 * @param {'primary'|'secondary'|'ghost'} variant - Visual style
 * @param {'sm'|'md'|'lg'} size - Button size
 * @param {Function} onClick - Click handler
 * @param {boolean} fullWidth - Whether button takes full width
 * @param {React.ComponentType} icon - Optional lucide icon component (shown at end)
 * @param {string} className - Additional classes
 */
export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  onClick,
  fullWidth = false,
  icon: Icon,
  className = '',
  ...props
}) {
  // Base styles shared by all variants
  const base =
    'inline-flex items-center justify-center gap-2 font-medium rounded-full transition-all duration-200 cursor-pointer focus-ring';

  // Size classes
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-5 py-2.5 text-sm',
    lg: 'px-6 py-3 text-base',
  };

  // Variant classes — each has normal + hover state
  const variantClasses = {
    primary:
      'bg-text-primary text-text-inverse hover:opacity-90 active:opacity-80',
    secondary:
      'bg-transparent text-text-primary border border-border-default hover:border-border-strong hover:bg-white/5',
    ghost:
      'bg-transparent text-text-primary hover:bg-white/5',
  };

  const widthClass = fullWidth ? 'w-full' : '';

  return (
    <button
      onClick={onClick}
      className={`${base} ${sizeClasses[size]} ${variantClasses[variant]} ${widthClass} ${className}`}
      {...props}
    >
      {children}
      {/* Optional icon at the end of the button */}
      {Icon && <Icon size={size === 'sm' ? 14 : size === 'lg' ? 20 : 16} />}
    </button>
  );
}
