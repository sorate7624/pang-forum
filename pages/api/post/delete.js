import { connectDB } from '@/util/database';
import { ObjectId } from 'bson';

export default async function handler(request, response) {
  if (request.method === 'DELETE') {
    try {
      const db = (await connectDB).db('forum');
      let result = await db
        .collection('post')
        .deleteOne({ _id: new ObjectId(request.body) });
      // console.log('result', result);

      return response.status(200).json('delete completed');
    } catch (error) {
      console.log('error', error);
      return response.status(500).json({ message: 'An error occurred.' });
    }
  }
}
