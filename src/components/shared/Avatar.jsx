// Avatar component — shows user photo or initials fallback
// Used in sidebar, headers, and student profiles

/**
 * Round avatar with image or initials fallback.
 * @param {string} src - Image URL (optional)
 * @param {string} name - Full name for initials fallback
 * @param {'sm'|'md'|'lg'} size - Avatar size
 */
export default function Avatar({ src, name = '', size = 'md' }) {
  // Size mapping: sm=32px, md=40px, lg=56px
  const sizeClasses = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-14 h-14 text-base',
  };

  // Extract initials from name (first letter of first + last name)
  const getInitials = (fullName) => {
    if (!fullName) return '?';
    const parts = fullName.trim().split(' ');
    if (parts.length === 1) return parts[0][0].toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  };

  return (
    <div
      className={`${sizeClasses[size]} rounded-full overflow-hidden flex items-center justify-center shrink-0`}
      title={name}
    >
      {src ? (
        // Show the actual image
        <img
          src={src}
          alt={name}
          className="w-full h-full object-cover"
        />
      ) : (
        // Fallback: initials on a subtle gradient background
        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary to-primary-active text-white font-semibold">
          {getInitials(name)}
        </div>
      )}
    </div>
  );
}
