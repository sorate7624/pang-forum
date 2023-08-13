'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import NavbarStyles from '../styles/navbar.module.scss';

export default function ThemeBtn() {
  let router = useRouter();
  let [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    let cookie = `; ${document.cookie}`.split(`; theme=`).pop().split(';')[0];
    if (cookie === '') {
      document.cookie = `theme=light; max-age=${3600 * 24 * 400}`;
    } else {
      if (cookie === 'dark') {
        setIsDarkMode(true);
      }
    }
  }, []);

  const handlerThemeBtn = () => {
    let cookie = `; ${document.cookie}`.split(`; theme=`).pop().split(';')[0];
    if (cookie === 'light') {
      document.cookie = `theme=dark; max-age=${3600 * 24 * 400}`;
      setIsDarkMode(true);
    } else {
      document.cookie = `theme=light; max-age=${3600 * 24 * 400}`;
      setIsDarkMode(false);
    }
    router.refresh();
  };

  return (
    <button
      onClick={() => handlerThemeBtn()}
      className={NavbarStyles['theme-btn']}
    >
      {isDarkMode ? <>☀️</> : <>🌙</>}
    </button>
  );
}
