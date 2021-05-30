import * as React from 'react';

export default function FormGroup({
  label,
  children,
}: {
  label?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-6">
      <label className="text-base text-gray-900 font-normal mb-2">
        {label}
      </label>
      {children}
    </div>
  );
}
