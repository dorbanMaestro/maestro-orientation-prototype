// CompleteProfileContent — "Complete Your Profile" orientation modal content
// Three fields: profile photo, one-line bio, current location
// On save: shows success state with a preview card
// Different from enrollment ProfileContent — this is the orientation home modal version

import { useState } from 'react';
import { Camera, Check, MapPin } from 'lucide-react';
import { mockStudent } from '../../../data/orientationData';

export default function CompleteProfileContent() {
  // Form state
  const [hasPhoto, setHasPhoto] = useState(false);
  const [bio, setBio] = useState('');
  const [location, setLocation] = useState('');
  const [isSaved, setIsSaved] = useState(false);

  // Can save when at least bio has content
  const canSave = bio.trim().length > 0;

  const handleSave = () => {
    if (!canSave) return;
    console.log('Profile saved:', { hasPhoto, bio, location });
    setIsSaved(true);
  };

  // ── Success state ──
  if (isSaved) {
    return (
      <div className="space-y-6">
        {/* Success message */}
        <div className="text-center py-4 space-y-2">
          <div className="w-12 h-12 rounded-full bg-success/15 flex items-center justify-center mx-auto">
            <Check size={24} className="text-success" />
          </div>
          <h3 className="text-lg font-semibold text-text-primary">Profile saved!</h3>
          <p className="text-sm text-text-secondary">
            Your classmates can now find you.
          </p>
        </div>

        {/* Preview card */}
        <div className="border border-neutral-dark/20 rounded-lg p-4">
          <p className="text-xs text-text-tertiary mb-3 font-medium">Preview</p>

          <div className="flex items-start gap-4">
            {/* Avatar */}
            <div
              className="w-14 h-14 rounded-full flex items-center justify-center shrink-0"
              style={{ backgroundColor: hasPhoto ? '#7C6FEB' : '#7C6FEB' }}
            >
              {hasPhoto ? (
                <span className="text-white text-lg font-semibold">
                  {mockStudent.fullName.split(' ').map(n => n[0]).join('')}
                </span>
              ) : (
                <span className="text-white text-lg font-semibold">
                  {mockStudent.fullName.split(' ').map(n => n[0]).join('')}
                </span>
              )}
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-text-primary">{mockStudent.fullName}</p>
              <p className="text-xs text-text-tertiary mt-0.5">{mockStudent.program}</p>
              {bio && (
                <p className="text-sm text-text-secondary mt-2">{bio}</p>
              )}
              {location && (
                <div className="flex items-center gap-1 mt-1.5">
                  <MapPin size={12} className="text-text-tertiary" />
                  <span className="text-xs text-text-tertiary">{location}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ── Form state ──
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h3 className="text-xl font-medium text-text-primary">
          Complete Your Profile
        </h3>
        <p className="text-sm text-text-tertiary mt-1">
          Help your classmates get to know you.
        </p>
      </div>

      <div className="border-b border-neutral-dark/20" />

      {/* Profile photo upload area */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => setHasPhoto(!hasPhoto)}
          className={`
            w-20 h-20 rounded-full flex items-center justify-center shrink-0 transition-all cursor-pointer
            ${hasPhoto
              ? 'bg-primary/20 border-2 border-primary/50'
              : 'bg-bg-elevated border-2 border-dashed border-neutral-dark/40 hover:border-neutral-dark/60'
            }
          `}
        >
          {hasPhoto ? (
            <span className="text-2xl font-semibold text-primary">
              {mockStudent.fullName.split(' ').map(n => n[0]).join('')}
            </span>
          ) : (
            <Camera size={24} className="text-text-tertiary" />
          )}
        </button>
        <div>
          <p className="text-sm font-medium text-text-primary">
            {hasPhoto ? 'Photo added' : 'Add a profile photo'}
          </p>
          <p className="text-xs text-text-tertiary mt-0.5">
            {hasPhoto ? 'Click to remove' : 'Click the circle to toggle a photo'}
          </p>
        </div>
      </div>

      {/* Bio field */}
      <div>
        <label className="block text-sm font-medium text-text-primary mb-2">
          One-line bio
        </label>
        <input
          type="text"
          value={bio}
          onChange={(e) => setBio(e.target.value.slice(0, 160))}
          placeholder="e.g. Career switcher from marketing, excited to learn AI!"
          className="w-full bg-transparent border border-neutral-dark/40 rounded-lg px-4 py-3 text-sm text-text-primary placeholder:text-text-disabled focus:outline-none focus:border-neutral-dark transition-colors"
        />
        <span className="text-[11px] text-text-disabled mt-1 block text-right">
          {bio.length}/160
        </span>
      </div>

      {/* Location field */}
      <div>
        <label className="block text-sm font-medium text-text-primary mb-2">
          Current location
        </label>
        <div className="relative">
          <MapPin size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-tertiary" />
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="e.g. Austin, TX, USA"
            className="w-full bg-transparent border border-neutral-dark/40 rounded-lg pl-9 pr-4 py-3 text-sm text-text-primary placeholder:text-text-disabled focus:outline-none focus:border-neutral-dark transition-colors"
          />
        </div>
      </div>

      {/* Save button */}
      <button
        onClick={handleSave}
        disabled={!canSave}
        className={`w-full py-3 font-medium text-sm rounded-lg transition-colors cursor-pointer ${
          canSave
            ? 'bg-primary text-white hover:bg-primary/90'
            : 'bg-neutral-dark/20 text-text-disabled cursor-not-allowed'
        }`}
      >
        Save Profile
      </button>
    </div>
  );
}
