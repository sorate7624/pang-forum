'use client';
import { useEffect, useState } from 'react';
import DetailStyles from '../../../styles/detail.module.scss';

export default function Comment({ _id }) {
  let [comment, setComment] = useState('');
  let [data, setData] = useState([]);

  useEffect(() => {
    fetch(`/api/comment/list?id=${_id}`)
      .then((response) => response.json())
      .then((result) => {
        setData(result);
        setComment('');
      })
      .catch((error) => {
        console.error('댓글 목록 가져오기 실패', error);
      });
  }, []);

  const submitComment = () => {
    fetch('/api/comment/new', {
      method: 'POST',
      body: JSON.stringify({ comment: comment, _id: _id }),
    })
      .then((response) => response.json())
      .then((newComment) => {
        // 새로운 댓글 정보를 기존 데이터 앞에 추가
        console.log('newComment', newComment);
        setData((prevData) => [newComment, ...prevData]);
        setComment('');
      })
      .catch((error) => {
        console.error('댓글 등록 실패', error);
      });
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      submitComment();
    }
  };

  return (
    <div className={DetailStyles['comment-area']}>
      {data.length > 0 ? (
        data.map((element, index) => {
          return (
            <p className={DetailStyles['comment']} key={index}>
              <span>{element.author_name}:</span>
              {element.content}
            </p>
          );
        })
      ) : (
        <p className={DetailStyles['no-comment']}>No comment</p>
      )}
      <div className={DetailStyles['comment-input-area']}>
        <input
          type="text"
          defaultValue={comment}
          onChange={(event) => {
            setComment(event.target.value);
          }}
          placeholder="comment"
          className={DetailStyles['input-text']}
          onKeyDown={(event) => handleKeyDown(event)}
        />
        <button onClick={submitComment} className={DetailStyles['submit-btn']}>
          Comment
        </button>
      </div>
    </div>
  );
}
