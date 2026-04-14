// ProfileContent — "Complete Your Profile" enrollment task
// PRD spec: 3 fields — profile photo, one-line bio (max 160 chars), current location (city, country)
// On completion: "Your classmates can now find you" + profile card preview in cohort roster

import { useState } from 'react';
import { Camera, MapPin, Check } from 'lucide-react';

// The 3 profile steps from the PRD
const STEPS = [
  { id: 'photo', label: 'Add a profile photo' },
  { id: 'bio', label: 'Write a one-line bio' },
  { id: 'location', label: 'Add your location' },
];

export default function ProfileContent() {
  const [currentStep, setCurrentStep] = useState(0);
  const [photo, setPhoto] = useState(null); // null = no photo yet
  const [bio, setBio] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [completed, setCompleted] = useState(false);

  const initials = 'RM';
  const maxBio = 160;

  // Handle moving to next step or completing
  const handleNext = () => {
    if (currentStep < STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setCompleted(true);
    }
  };

  // Check if current step has valid input
  const canProceed = () => {
    if (currentStep === 0) return true; // photo is optional (can keep initials)
    if (currentStep === 1) return bio.trim().length > 0;
    if (currentStep === 2) return city.trim().length > 0 && country.trim().length > 0;
    return false;
  };

  // --- Completed state: "Your classmates can now find you" + profile card preview ---
  if (completed) {
    return (
      <div className="flex flex-col items-center text-center py-8 space-y-6">
        {/* Success icon */}
        <div className="w-16 h-16 rounded-full bg-primary/15 flex items-center justify-center">
          <Check size={32} className="text-primary" />
        </div>

        <div className="space-y-2">
          <h2 className="text-xl font-semibold text-text-primary">Your classmates can now find you</h2>
          <p className="text-sm text-text-tertiary">Here's how you'll appear in the cohort roster</p>
        </div>

        {/* Profile card preview — how it looks in the roster */}
        <div className="w-full max-w-sm border border-border-default rounded-xl p-5 bg-bg-elevated/50">
          <div className="flex items-center gap-4">
            {/* Avatar */}
            <div
              className="w-14 h-14 rounded-full flex items-center justify-center shrink-0"
              style={{ backgroundColor: '#7C6FEB' }}
            >
              <span className="text-white text-lg font-semibold">{initials}</span>
            </div>

            {/* Name, bio, location */}
            <div className="text-left min-w-0">
              <p className="text-[15px] font-medium text-text-primary">Ricky Martinez</p>
              <p className="text-sm text-text-secondary mt-0.5 truncate">{bio}</p>
              <p className="text-xs text-text-tertiary mt-1 flex items-center gap-1">
                <MapPin size={12} />
                {city}, {country}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // --- Step-by-step flow ---
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-xl font-semibold text-text-primary">Complete Your Profile</h2>
        <p className="text-sm text-text-tertiary mt-1">
          So your classmates can find you in the cohort roster
        </p>
      </div>

      {/* Step progress indicator — 3 dots */}
      <div className="flex items-center gap-2">
        {STEPS.map((step, i) => (
          <div key={step.id} className="flex items-center gap-2">
            <div
              className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-medium transition-colors ${
                i < currentStep
                  ? 'bg-primary/15 text-primary'
                  : i === currentStep
                    ? 'bg-primary text-white'
                    : 'bg-bg-elevated text-text-tertiary'
              }`}
            >
              {i < currentStep ? <Check size={14} /> : i + 1}
            </div>
            {i < STEPS.length - 1 && (
              <div className={`w-8 h-px ${i < currentStep ? 'bg-primary/40' : 'bg-border-default'}`} />
            )}
          </div>
        ))}
      </div>

      {/* Step label */}
      <p className="text-sm font-medium text-text-secondary">
        Step {currentStep + 1} of {STEPS.length}: {STEPS[currentStep].label}
      </p>

      {/* Step content */}
      <div className="min-h-[180px]">
        {/* Step 1: Profile photo */}
        {currentStep === 0 && (
          <div className="flex flex-col items-center gap-4 py-4">
            {/* Avatar circle — click to "upload" */}
            <button
              onClick={() => setPhoto('selected')}
              className="relative w-28 h-28 rounded-full flex items-center justify-center cursor-pointer group transition-all hover:opacity-80"
              style={{ backgroundColor: '#7C6FEB' }}
            >
              {photo ? (
                <>
                  <span className="text-white text-3xl font-semibold">{initials}</span>
                  <div className="absolute bottom-0 right-0 w-8 h-8 bg-primary rounded-full flex items-center justify-center border-2 border-bg-surface">
                    <Check size={16} className="text-white" />
                  </div>
                </>
              ) : (
                <>
                  <Camera size={32} className="text-white/70 group-hover:text-white transition-colors" />
                  <div className="absolute bottom-0 right-0 w-8 h-8 bg-bg-elevated rounded-full flex items-center justify-center border-2 border-bg-surface">
                    <span className="text-text-tertiary text-lg">+</span>
                  </div>
                </>
              )}
            </button>
            <p className="text-sm text-text-tertiary">
              {photo ? 'Photo added! You can change it anytime.' : 'Tap to add a photo, or skip to use your initials'}
            </p>
          </div>
        )}

        {/* Step 2: One-line bio */}
        {currentStep === 1 && (
          <div className="space-y-3">
            <p className="text-sm text-text-tertiary">
              Introduce yourself in one line — what brings you here?
            </p>
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value.slice(0, maxBio))}
              placeholder="e.g. Career switcher from marketing, excited to learn AI!"
              rows={3}
              className="w-full bg-bg-elevated border border-border-default rounded-lg px-4 py-3 text-sm text-text-primary placeholder:text-text-tertiary/50 focus:outline-none focus:border-primary/50 resize-none"
            />
            <p className={`text-xs text-right ${bio.length >= maxBio ? 'text-red-400' : 'text-text-tertiary'}`}>
              {bio.length}/{maxBio}
            </p>
          </div>
        )}

        {/* Step 3: Location */}
        {currentStep === 2 && (
          <div className="space-y-4">
            <p className="text-sm text-text-tertiary">
              Where are you based? This helps us match you with nearby classmates.
            </p>
            <div className="space-y-3">
              <input
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="City (e.g. New York)"
                className="w-full bg-bg-elevated border border-border-default rounded-lg px-4 py-3 text-sm text-text-primary placeholder:text-text-tertiary/50 focus:outline-none focus:border-primary/50"
              />
              <input
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                placeholder="Country (e.g. United States)"
                className="w-full bg-bg-elevated border border-border-default rounded-lg px-4 py-3 text-sm text-text-primary placeholder:text-text-tertiary/50 focus:outline-none focus:border-primary/50"
              />
            </div>
          </div>
        )}
      </div>

      {/* Navigation buttons */}
      <div className="flex items-center justify-between pt-2">
        {/* Back button — hidden on first step */}
        {currentStep > 0 ? (
          <button
            onClick={() => setCurrentStep(currentStep - 1)}
            className="px-4 py-2 text-sm text-text-secondary hover:text-text-primary transition-colors cursor-pointer"
          >
            Back
          </button>
        ) : (
          <div />
        )}

        {/* Next / Skip / Complete */}
        <div className="flex items-center gap-3">
          {/* Skip option on photo step */}
          {currentStep === 0 && !photo && (
            <button
              onClick={handleNext}
              className="px-4 py-2 text-sm text-text-tertiary hover:text-text-secondary transition-colors cursor-pointer"
            >
              Skip for now
            </button>
          )}

          <button
            onClick={handleNext}
            disabled={!canProceed()}
            className={`px-6 py-2.5 text-sm font-medium rounded-full transition-all cursor-pointer ${
              canProceed()
                ? 'bg-primary text-white hover:bg-primary/90'
                : 'bg-bg-elevated text-text-tertiary cursor-not-allowed'
            }`}
          >
            {currentStep === STEPS.length - 1 ? 'Complete Profile' : 'Next'}
          </button>
        </div>
      </div>
    </div>
  );
}
