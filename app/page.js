'use client';

import Link from 'next/link';
import LoginBtn from './LoginBtn';
import HomeStyles from '@/styles/home.module.scss';
import { TypeAnimation } from 'react-type-animation';

export default async function Home() {
  return (
    <main className={HomeStyles['wrapper']}>
      <div className={HomeStyles['inner']}>
        <TypeAnimation
          sequence={[
            'Welcome to Pang forum!',
            1000,
            'Post an interesting article and get a lot of comments.',
          ]}
          wrapper="h2"
          cursor={true}
          repeat={true}
        />
        <div className={HomeStyles['btn-area']}>
          <LoginBtn classname={HomeStyles['login-btn']} />
          <button className={HomeStyles['register-btn']}>
            <Link href="/register">Register</Link>
          </button>
        </div>
      </div>
    </main>
  );
}
