import { connectDB } from '@/util/database';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';

export default async function handler(request, response) {
  let session = await getServerSession(request, response, authOptions);
  console.log('session:', session);
  if (session) {
    request.body.author = session.user.email;
    request.body.author_name = session.user.name;
  }
  console.log('글쓰기 request.body', request.body);
  if (request.method === 'POST') {
    if (request.body.title === '' || request.body.content === '') {
      return response.status(500).json('no');
    }
    try {
      const db = (await connectDB).db('forum');
      let result = await db.collection('post').insertOne(request.body);
      return response.redirect(302, '/list');
    } catch (error) {
      console.log('error', error);
    }
  }
}
