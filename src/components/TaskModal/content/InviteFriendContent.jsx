// InviteFriendContent — "Invite a Friend" orientation task
// Clean Maestro aesthetic:
// - No colored gradient backgrounds
// - Ghost/outlined buttons
// - Thin separators
// - Spacious layout

import { useState } from 'react';
import { Copy, Check, Mail } from 'lucide-react';

// Mock referral link
const referralLink = 'https://maestro.edu/invite/ricky-m-apr26';

export default function InviteFriendContent() {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard?.writeText(referralLink).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Header — clean, left-aligned */}
      <div>
        <h3 className="text-xl font-medium text-text-primary">
          Invite a Friend
        </h3>
        <p className="text-sm text-text-tertiary mt-1">
          Know someone who'd benefit from this program? Bring them along.
        </p>
      </div>

      {/* Separator */}
      <div className="border-b border-neutral-dark/20" />

      {/* Key stat — clean, no gradient background */}
      <div className="text-center py-2">
        <p className="text-3xl font-semibold text-text-primary mb-1">3x</p>
        <p className="text-sm text-text-tertiary">
          more likely to complete the program when you learn together
        </p>
      </div>

      {/* Separator */}
      <div className="border-b border-neutral-dark/20" />

      {/* Referral link + copy */}
      <div>
        <label className="block text-sm font-medium text-text-primary mb-2">
          Your referral link
        </label>
        <div className="flex items-center gap-2">
          <div className="flex-1 border border-neutral-dark/40 rounded-lg px-4 py-2.5 text-sm text-text-tertiary truncate select-all">
            {referralLink}
          </div>
          <button
            onClick={handleCopy}
            className={`shrink-0 w-10 h-10 flex items-center justify-center rounded-lg border transition-all cursor-pointer ${
              copied
                ? 'border-success/40 text-success'
                : 'border-neutral-dark/40 text-text-secondary hover:border-neutral-dark hover:text-text-primary'
            }`}
          >
            {copied ? <Check size={16} /> : <Copy size={16} />}
          </button>
        </div>
      </div>

      {/* Sharing options — ghost/outlined buttons */}
      <div>
        <label className="block text-sm font-medium text-text-primary mb-2">
          Share via
        </label>
        <div className="grid grid-cols-2 gap-3">
          <button className="flex items-center justify-center gap-2 py-2.5 border border-neutral-dark/40 rounded-lg hover:border-neutral-dark hover:bg-bg-hover transition-colors cursor-pointer">
            <Mail size={16} className="text-text-tertiary" />
            <span className="text-sm text-text-primary">Email</span>
          </button>
          <button className="flex items-center justify-center gap-2 py-2.5 border border-neutral-dark/40 rounded-lg hover:border-neutral-dark hover:bg-bg-hover transition-colors cursor-pointer">
            <svg viewBox="0 0 24 24" className="w-4 h-4 text-text-tertiary" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            <span className="text-sm text-text-primary">WhatsApp</span>
          </button>
        </div>
      </div>

      {/* Social proof — clean, no card background */}
      <div className="border-t border-neutral-dark/20 pt-4">
        <p className="text-xs text-text-tertiary text-center">
          <span className="font-medium text-text-secondary">23 students</span> have already invited friends to this cohort
        </p>
      </div>
    </div>
  );
}
