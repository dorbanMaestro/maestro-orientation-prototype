// GreetingSection — Large bold greeting at top of the home screen
// Matches Maestro production: very large heading (~36-40px), bold, left-aligned
// Generous top margin, gray subtitle below

/**
 * Large greeting section for the home screen.
 * @param {string} studentName - Student's first name (e.g. "Ricky")
 * @param {string} subtitle - Gray subtitle text below the greeting
 */
export default function GreetingSection({
  studentName = 'there',
  subtitle = 'Your orientation starts now — complete these tasks before Day 1.',
}) {
  return (
    <section className="pt-4 pb-8">
      {/* Very large bold heading — matches Maestro ~36-40px */}
      {/* "Welcome" is appropriate for new orientation students (not "Back at it" which implies returning) */}
      <h1 className="text-4xl font-semibold text-text-primary leading-tight tracking-tight" style={{ fontFamily: '"Wix Madefor Display", system-ui, sans-serif' }}>
        Welcome, {studentName} <span className="inline-block">&#x1F44B;</span>
      </h1>

      {/* Subtitle — gray, normal size */}
      <p className="mt-3 text-base text-text-tertiary leading-normal">
        {subtitle}
      </p>
    </section>
  );
}
