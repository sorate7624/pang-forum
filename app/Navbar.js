import LogoutBtn from './LogoutBtn';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import ThemeBtn from './ThemeBtn';
import Image from 'next/image';
import pangForum from '@/public/pang-forum.png';
import NavbarStyles from '@/styles/navbar.module.scss';

export default async function Navbar() {
  const session = await getServerSession(authOptions);

  return (
    <div className={NavbarStyles['navbar']}>
      <div className={NavbarStyles['navbar-inner']}>
        <h1 className={NavbarStyles['logo']}>
          <Image src={pangForum} alt="pang-forum-logo" />
          <span>Pang forum</span>
        </h1>
        <nav>
          <ul>
            {session && (
              <>
                <li className={NavbarStyles['user-name']}>
                  <span>{session.user.name}</span>
                </li>
                <li className={NavbarStyles['logout-btn']}>
                  <LogoutBtn />
                </li>
              </>
            )}
            <ThemeBtn />
          </ul>
        </nav>
      </div>
    </div>
  );
}
