import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { connectDB } from '@/util/database';
import { getServerSession } from 'next-auth';
import Link from 'next/link';
import ListItem from './ListItem';

export const dynamic = 'force-dynamic';

export default async function List() {
  const db = (await connectDB).db('forum');
  let result = await db.collection('post').find().toArray();
  let session = await getServerSession(authOptions);
  return (
    <>
      {session ? (
        <div className="list-bg">
          <button>
            <Link href="/write">Write a post</Link>
          </button>
          <ListItem result={result} user={session.user} />
        </div>
      ) : (
        <div>
          <h3>로그인이 필요합니다.</h3>
        </div>
      )}
    </>
  );
}
