'use client';

import { TypeAnimation } from 'react-type-animation';

export default async function HomeTitle() {
  return (
    <>
      <TypeAnimation
        sequence={[
          'Welcome to Pang forum!',
          1000,
          'Post an interesting article and get a lot of comments.',
        ]}
        wrapper="h2"
        cursor={true}
        repeat={true}
      />
    </>
  );
}
