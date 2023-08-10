'use client';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Comment({ _id }) {
  const router = useRouter();
  let [comment, setComment] = useState('');
  let [data, setData] = useState([]);

  useEffect(() => {
    fetch(`/api/comment/list?id=${_id}`)
      .then((response) => response.json())
      .then((result) => {
        setData(result);
        setComment('');
        console.log('result??', result);
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
        setData((prevData) => [newComment, ...prevData]);
        setComment('');
      })
      .catch((error) => {
        console.error('댓글 등록 실패', error);
      });
  };

  return (
    <div>
      <hr />
      {data.length > 0 ? (
        data.map((element, index) => {
          return <p key={index}>{element.content}</p>;
        })
      ) : (
        <p>No comment</p>
      )}
      <input
        defaultValue={comment}
        onChange={(event) => {
          setComment(event.target.value);
        }}
      />
      <button onClick={submitComment}>Comment</button>
    </div>
  );
}
