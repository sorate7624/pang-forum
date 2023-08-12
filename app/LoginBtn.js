'use client';

import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Image from 'next/image';
import githubIcon from '@/public/github.png';
import githubHoverIcon from '@/public/github-hover.png';

export default function LoginBtn() {
  const router = useRouter();
  const [isHovering, setIsHovering] = useState(false);

  return (
    <button
      onClick={() => {
        signIn('', {
          callbackUrl: router.push(`/list`),
        });
      }}
      onMouseEnter={() => {
        setIsHovering(true);
      }}
      onMouseLeave={() => {
        setIsHovering(false);
      }}
    >
      <Image src={isHovering ? githubHoverIcon : githubIcon} alt="github" />
      Login
    </button>
  );
}
