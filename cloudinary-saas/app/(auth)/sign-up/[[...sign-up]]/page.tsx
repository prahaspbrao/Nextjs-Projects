// app/sign-up/page.tsx
'use client';

import { SignUp } from '@clerk/nextjs';

export default function Page() {
  return (
    <div data-theme = "synthwave" className="min-h-screen flex items-center justify-center bg-base-100 p-6">
      <div className="p-6 rounded-2xl shadow-xl bg-base-200">
        <SignUp />
      </div>
    </div>
  );
}
