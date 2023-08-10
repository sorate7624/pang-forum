'use client';

// import { useState } from 'react';

export default function Write() {
  // let [src, setSrc] = useState('');

  return (
    <div className="p-20">
      <h4>Write a post</h4>
      <form action="/api/post/new" method="POST">
        <input type="text" name="title" placeholder="title" required />
        <textarea name="content" placeholder="content" required />
        {/* <input
          type="file"
          accept="image/*"
          onChange={async (event) => {
            let file = event.target.files[0];
            let filename = encodeURIComponent(file.name);
            let result = await fetch('/api/post/image?file=' + filename);
            result = await result.json();
            // result = result.url.substr(0, result.url.length - 1);

            //S3 업로드
            const formData = new FormData();
            Object.entries({ ...result.fields, file }).forEach(
              ([key, value]) => {
                formData.append(key, value);
              }
            );
            console.log('result.url', result.url);
            let uploadResult = await fetch(result.url, {
              method: 'POST',
              mode: 'no-cors',
              body: formData,
            });
            console.log(uploadResult);

            if (uploadResult.ok) {
              setSrc(uploadResult.url + '/' + filename);
            } else {
              console.log('실패');
            }
          }}
        />
        {src && <img src={src} alt={src} />} */}
        <button type="submit">Write</button>
      </form>
    </div>
  );
}
