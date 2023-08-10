import { connectDB } from '@/util/database';
import { ObjectId } from 'bson';

export default async function Edit({ params }) {
  const db = (await connectDB).db('forum');
  let result = await db
    .collection('post')
    .findOne({ _id: new ObjectId(params.id) });

  return (
    <div className="p-20">
      <h4>Edit a post</h4>
      <form action="/api/post/edit" method="POST">
        <input type="text" name="title" defaultValue={result.title} />
        <textarea type="text" name="content" defaultValue={result.content} />
        <input type="hidden" name="_id" defaultValue={result._id.toString()} />
        <button type="submit">Edit</button>
      </form>
    </div>
  );
}
