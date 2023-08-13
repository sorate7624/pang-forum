// 'use client';

import Link from 'next/link';
import LoginBtn from './LoginBtn';
import HomeStyles from '@/styles/home.module.scss';
import { TypeAnimation } from 'react-type-animation';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import HomeTitle from './HomeTitle';

export default async function Home() {
  const session = await getServerSession(authOptions);
  console.log('session', session);

  return (
    <main className={HomeStyles['wrapper']}>
      <div className={HomeStyles['inner']}>
        {/* <TypeAnimation
          sequence={[
            'Welcome to Pang forum!',
            1000,
            'Post an interesting article and get a lot of comments.',
          ]}
          wrapper="h2"
          cursor={true}
          repeat={true}
        /> */}
        <HomeTitle />
        <div className={HomeStyles['btn-area']}>
          {session ? (
            <button className={HomeStyles['list-btn']}>
              <Link href="/list">Go List</Link>
            </button>
          ) : (
            <>
              <LoginBtn className={HomeStyles['login-btn']} />
              <button className={HomeStyles['register-btn']}>
                <Link href="/register">Register</Link>
              </button>
            </>
          )}
        </div>
      </div>
    </main>
  );
}
