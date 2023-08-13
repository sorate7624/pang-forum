'use client';

import Image from 'next/image';
import backIcon from '@/public/arrow.png';
import Link from 'next/link';
import ListStyles from '@/styles/list.module.scss';

export default function BackBtn({ link }) {
  return (
    <button className={ListStyles['back-btn']}>
      <Link href={link}>
        <Image src={backIcon} alt="back" />
      </Link>
    </button>
  );
}
