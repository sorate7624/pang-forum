'use client';

import { signOut } from 'next-auth/react';

export default function LoginBtn() {
  return (
    <button
      onClick={() => {
        signOut({
          callbackUrl: `${window.location.origin}`,
        });
      }}
    >
      Logout
    </button>
  );
}
