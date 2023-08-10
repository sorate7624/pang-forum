'use client';

import Link from 'next/link';

export default function ListItem({ result, user }) {
  return (
    <div>
      {result.map((element, index) => {
        const isAuthor = user.email === result[index].author;
        const isAdmin = user.role === 'admin';

        return (
          <div className="list-item" key={index}>
            <Link prefetch={false} href={`/detail/${result[index]._id}`}>
              <h4>{result[index].title}</h4>
            </Link>
            <div>{result[index].author_name}</div>

            {isAuthor && (
              <>
                <button>
                  <Link href={`/edit/${result[index]._id}`}>edit</Link>
                </button>
                <button
                  onClick={(event) => {
                    fetch('/api/post/delete', {
                      method: 'DELETE',
                      body: result[index]._id,
                    })
                      .then((response) => {
                        return response.json();
                      })
                      .then(() => {
                        event.target.parentElement.style.opacity = 0;
                        setTimeout(() => {
                          event.target.parentElement.style.display = 'none';
                        }, 1000);
                      });
                  }}
                >
                  delete
                </button>
              </>
            )}

            {isAdmin && (
              <>
                <button
                  onClick={(event) => {
                    fetch('/api/post/delete', {
                      method: 'DELETE',
                      body: result[index]._id,
                    })
                      .then((response) => {
                        return response.json();
                      })
                      .then(() => {
                        event.target.parentElement.style.opacity = 0;
                        setTimeout(() => {
                          event.target.parentElement.style.display = 'none';
                        }, 1000);
                      });
                  }}
                >
                  delete
                </button>
              </>
            )}
          </div>
        );
      })}
    </div>
  );
}
