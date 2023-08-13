'use client';
import WriteStyles from './../../styles/write.module.scss';
import 'animate.css';
import BackBtn from '../BackBtn';

export default function Write() {
  return (
    <main className={WriteStyles['wrapper']}>
      <div className={WriteStyles['inner']}>
        <div className={WriteStyles['top-area']}>
          <BackBtn link="/list" />
          <h3 className={WriteStyles['title']}>Write a post</h3>
        </div>
        <form
          action="/api/post/new"
          method="POST"
          className="animate__animated animate__fadeIn"
        >
          <input
            type="text"
            name="title"
            placeholder="title"
            required
            className={WriteStyles['input-text']}
            maxLength={100}
          />
          <textarea
            name="content"
            placeholder="content"
            required
            className={WriteStyles['textarea']}
            maxLength={500}
          />
          <button type="submit" className={WriteStyles['submit-btn']}>
            Write
          </button>
        </form>
      </div>
    </main>
  );
}
