import { connectDB } from '@/util/database';
import { ObjectId } from 'bson';
import BackBtn from '@/app/BackBtn';
import EditStyles from '../../../styles/edit.module.scss';
import 'animate.css';

export default async function Edit({ params }) {
  const db = (await connectDB).db('forum');
  let result = await db
    .collection('post')
    .findOne({ _id: new ObjectId(params.id) });

  return (
    <main className={EditStyles['wrapper']}>
      <div className={EditStyles['inner']}>
        <div className={EditStyles['top-area']}>
          <BackBtn link="/list" />
          <h3 className={EditStyles['title']}>Edit a post</h3>
        </div>
        <form
          action="/api/post/edit"
          method="POST"
          className="animate__animated animate__fadeIn"
        >
          <input
            type="text"
            name="title"
            defaultValue={result.title}
            className={EditStyles['input-text']}
            maxLength={100}
          />
          <textarea
            type="text"
            name="content"
            defaultValue={result.content}
            className={EditStyles['textarea']}
            maxLength={500}
          />
          <input
            type="hidden"
            name="_id"
            defaultValue={result._id.toString()}
          />
          <button type="submit" className={EditStyles['submit-btn']}>
            Edit
          </button>
        </form>
      </div>
    </main>
  );
}
