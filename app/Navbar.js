import Link from 'next/link';
import LogoutBtn from './LogoutBtn';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import ThemeBtn from './ThemeBtn';
import Image from 'next/image';
import pangForum from '@/public/pang-forum.png';
import NavbarStyles from '@/styles/Navbar.module.scss';

export default async function Navbar() {
  const session = await getServerSession(authOptions);

  return (
    <div className={NavbarStyles['navbar']}>
      <Link href="/" className={NavbarStyles['logo']}>
        <Image src={pangForum} alt="pang-forum-logo" />
        Pang forum
      </Link>

      {session && (
        <>
          <Link href="/list">List</Link>
          <span>
            {session.user.name} <LogoutBtn />
          </span>
        </>
      )}
      <ThemeBtn />
    </div>
  );
}
