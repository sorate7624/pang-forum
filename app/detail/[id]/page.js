import { connectDB } from '@/util/database';
import { ObjectId } from 'bson';
import { notFound } from 'next/navigation';
import Comment from './Comment';

export default async function Detail({ params }) {
  const db = (await connectDB).db('forum');
  let result = await db
    .collection('post')
    .findOne({ _id: new ObjectId(params.id) });

  if (result === null) {
    return notFound();
  }

  return (
    <div>
      <h4>Detail</h4>
      <h5>{result.title}</h5>
      <p>{result.content}</p>
      <Comment _id={result._id.toString()} />
    </div>
  );
}
