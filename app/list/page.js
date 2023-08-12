import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { connectDB } from '@/util/database';
import { getServerSession } from 'next-auth';
import Link from 'next/link';
import ListItem from './ListItem';
import ListStyles from '@/styles/list.module.scss';
import LoginBtn from '../LoginBtn';

export const dynamic = 'force-dynamic';

export default async function List() {
  const db = (await connectDB).db('forum');
  let result = await db.collection('post').find().toArray();
  let session = await getServerSession(authOptions);

  return (
    <main className={ListStyles['wrapper']}>
      <div className={ListStyles['inner']}>
        {session ? (
          <>
            <button className={ListStyles['write-btn']}>
              <Link href="/write">Write a post</Link>
            </button>
            <ListItem result={result} user={session.user} />
          </>
        ) : (
          <div className={ListStyles['not-session']}>
            <h3 className={ListStyles['title']}>Please Login.</h3>
            <LoginBtn className={ListStyles['login-btn']} />
          </div>
        )}
      </div>
    </main>
  );
}
