import { connectDB } from '@/util/database';
import { ObjectId } from 'bson';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';

export default async function handler(request, response) {
  let session = await getServerSession(request, response, authOptions);
  console.log('session', session);
  if (!session) {
    return response.status(500).json('세션 없음');
  }
  if (request.method === 'POST') {
    try {
      request.body = JSON.parse(request.body);
      console.log('request.body', request.body);
      let commentObj = {
        content: request.body.comment,
        parent: new ObjectId(request.body._id),
        author: session.user.email,
        author_name: session.user.name,
      };
      console.log('commentObj', commentObj);
      const db = (await connectDB).db('forum');
      let result = await db.collection('comment').insertOne(commentObj);
      console.log('result', result);

      return response.status(200).json(request.body.comment);
    } catch (error) {
      console.log('error', error);
      return response.status(500).json({ message: 'An error occurred.' });
    }
  }
}
