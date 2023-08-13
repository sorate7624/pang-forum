import './globals.css';
import 'normalize.css/normalize.css';
import { Roboto, Noto_Sans_KR } from 'next/font/google';
import { cookies } from 'next/headers';
import Navbar from './Navbar';

export const metadata = {
  title: 'Pang forum',
  description: 'Generated by create pang forum app',
};

const notoSansKr = Noto_Sans_KR({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
});

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
});

export default async function RootLayout({ children }) {
  let theme = cookies().get('theme');

  return (
    <html lang="en">
      {/* <body
        className={`${roboto.className} ${notoSansKr.className} ${
          theme && theme.value === 'dark' ? 'dark-mode' : ''
        }`}
      > */}
      <body
        className={`${roboto.className} ${notoSansKr.className}`}
        theme={theme && theme.value === 'dark' ? 'dark' : ''}
      >
        <Navbar />
        {children}
      </body>
    </html>
  );
}
