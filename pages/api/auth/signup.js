import { connectDB } from '@/util/database';
import bcrypt from 'bcrypt';

export default async function handler(request, response) {
  if (request.method === 'POST') {
    // 빈 칸 보낼때 체크
    if (
      request.body.name === '' ||
      request.body.email === '' ||
      request.body.password === ''
    ) {
      return response.status(500).json('빈 칸이 존재합니다');
    }

    try {
      let hash = await bcrypt.hash(request.body.password, 10);
      request.body.password = hash;
      const db = (await connectDB).db('forum');
      // 이메일 중복 체크
      const existingUser = await db
        .collection('user_cred')
        .findOne({ email: request.body.email });
      if (existingUser) {
        return response.status(400).json({ code: '400', result: 'failed' });
      }
      let result = await db.collection('user_cred').insertOne(request.body);
      console.log('result', result);
      return response.redirect(302, '/list');
    } catch (error) {
      console.log('error', error);
    }
  }
}
