'use client';

import Link from 'next/link';
import LoginBtn from './LoginBtn';
import HomeStyles from '@/styles/Home.module.scss';

export default async function Home() {
  return (
    <div className={HomeStyles['wrapper']}>
      <h2 className={HomeStyles['title']}>Welcome to Pang forum!</h2>
      <LoginBtn />
      <button className={HomeStyles['register-btn']}>
        <Link href="/register">Register</Link>
      </button>
    </div>
  );
}
