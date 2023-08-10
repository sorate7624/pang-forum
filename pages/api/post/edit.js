import { connectDB } from '@/util/database';
import { ObjectId } from 'bson';

export default async function handler(request, response) {
  if (request.method === 'POST') {
    try {
      let modifyData = {
        title: request.body.title,
        content: request.body.content,
      };
      const db = (await connectDB).db('forum');
      let result = await db
        .collection('post')
        .updateOne(
          { _id: new ObjectId(request.body._id) },
          { $set: modifyData }
        );
      console.log('result', result);
      return response.redirect(302, '/list');
    } catch (error) {
      console.log('error', error);
      return response.status(500).json({ message: 'An error occurred.' });
    }

    return response.status(200).redirect('/list');
  }
}
