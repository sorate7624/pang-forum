'use client';

import Link from 'next/link';
import ListStyles from '../../styles/list.module.scss';
import Image from 'next/image';
import editIcon from '@/public/edit.png';
import deleteIcon from '@/public/delete.png';
import 'animate.css';
import classnames from 'classnames';

export default function ListItem({ result, user }) {
  const handleDeleteBtn = () => {
    fetch('/api/post/delete', {
      method: 'DELETE',
      body: result[index]._id,
    }).then((response) => {
      return response.json();
    });
  };

  return (
    <div
      className={classnames(
        ListStyles['list-area'],
        'animate__animated animate__fadeIn'
      )}
    >
      {result.map((element, index) => {
        const isAuthor = user.email === result[index].author;
        const isAdmin = user.role === 'admin';

        return (
          <div className={ListStyles['list-item']} key={index}>
            <button className={ListStyles['detail-btn']}>
              <Link prefetch={false} href={`/detail/${result[index]._id}`}>
                {result[index].title}
              </Link>
            </button>
            <span className={ListStyles['author-name']}>
              {result[index].author_name}
            </span>

            {isAuthor && (
              <>
                <button className={ListStyles['edit-btn']}>
                  <Link href={`/edit/${result[index]._id}`}>
                    <Image src={editIcon} alt="edit" title="edit" />
                  </Link>
                </button>
                <button
                  className={ListStyles['delete-btn']}
                  onClick={() => handleDeleteBtn()}
                >
                  <Image src={deleteIcon} alt="delete" title="delete" />
                </button>
              </>
            )}

            {isAdmin && (
              <>
                <button
                  className={ListStyles['delete-btn']}
                  onClick={() => handleDeleteBtn()}
                >
                  <Image src={deleteIcon} alt="delete" title="delete" />
                </button>
              </>
            )}
          </div>
        );
      })}
    </div>
  );
}
