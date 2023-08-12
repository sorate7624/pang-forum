import { connectDB } from '@/util/database';
import { ObjectId } from 'bson';
import { notFound } from 'next/navigation';
import Comment from './Comment';
import DetailStyles from '@/styles/detail.module.scss';
import 'animate.css';
import classnames from 'classnames';

export default async function Detail({ params }) {
  const db = (await connectDB).db('forum');
  let result = await db
    .collection('post')
    .findOne({ _id: new ObjectId(params.id) });

  if (result === null) {
    return notFound();
  }

  return (
    <main className={DetailStyles['wrapper']}>
      <div className={DetailStyles['inner']}>
        <h3 className={DetailStyles['title']}>Detail</h3>
        <div
          className={classnames(
            DetailStyles['detail-area'],
            'animate__animated animate__fadeIn'
          )}
        >
          <h5 className={DetailStyles['detail-title']}>{result.title}</h5>
          <p className={DetailStyles['detail-content']}>{result.content}</p>
          <Comment _id={result._id.toString()} />
        </div>
      </div>
    </main>
  );
}
