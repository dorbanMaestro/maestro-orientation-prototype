// ProfileContent — "Complete Your Profile" enrollment task
// Matches Maestro production "My account" page:
// - Tab bar with underline-style active tab
// - Large circular avatar on LEFT, form fields on RIGHT
// - Label + value pairs separated by thin horizontal lines
// - Ghost "Edit" buttons on the right

import { useState } from 'react';

// Profile field data — realistic for the mock student
const profileFields = [
  { id: 'name', label: 'Name', value: 'Ricky Martinez', editable: false },
  { id: 'email', label: 'Email', value: 'ricky_martinez@gmail.com', editable: true },
  { id: 'phone', label: 'Phone number', value: '+1 123 1234567', editable: true },
  { id: 'address', label: 'Shipping address', value: '123 Maplewood Drive, Fairview, CA 90232', editable: true },
];

// Tabs that match the Maestro "My account" page
const tabs = ['Profile', 'Program', 'Documents', "To-do's"];

export default function ProfileContent() {
  const [activeTab, setActiveTab] = useState('Profile');

  // Initials for the avatar
  const initials = 'RM';

  return (
    <div className="space-y-6">
      {/* Page title — large, white, like Maestro "My account" */}
      <h2 className="text-2xl font-medium text-text-primary">My account</h2>

      {/* Tab bar — underline style, NOT pills */}
      <div className="flex gap-6 border-b border-neutral-dark/30">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-3 text-sm font-medium transition-colors cursor-pointer ${
              activeTab === tab
                ? 'text-text-primary border-b-2 border-text-primary'
                : 'text-text-tertiary hover:text-text-secondary'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Profile section — avatar LEFT, fields RIGHT */}
      <div className="flex gap-8 pt-2">
        {/* Large circular avatar — periwinkle/purple bg with white initials */}
        <div className="shrink-0">
          <div
            className="w-24 h-24 rounded-full flex items-center justify-center"
            style={{ backgroundColor: '#7C6FEB' }}
          >
            <span className="text-white text-2xl font-semibold">{initials}</span>
          </div>
        </div>

        {/* Fields — label + value separated by thin lines */}
        <div className="flex-1 min-w-0">
          {profileFields.map((field, index) => (
            <div
              key={field.id}
              className={`py-4 flex items-start justify-between ${
                index < profileFields.length - 1
                  ? 'border-b border-neutral-dark/20'
                  : ''
              }`}
            >
              {/* Label + value stacked */}
              <div className="min-w-0">
                <p className="text-sm font-medium text-text-primary mb-1">
                  {field.label}
                </p>
                <p className="text-sm text-text-tertiary">{field.value}</p>
              </div>

              {/* Ghost "Edit" button — only for editable fields */}
              {field.editable && (
                <button className="shrink-0 ml-4 px-3 py-1 text-xs font-medium text-text-secondary border border-neutral-dark/40 rounded-md hover:border-text-tertiary hover:text-text-primary transition-colors cursor-pointer">
                  Edit
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
