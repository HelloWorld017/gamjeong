'use client';

import { usePathname } from 'next/navigation';
import * as styles from './Aside.styles';
import Link from 'next/link';

type AsideItemProps = {
  link: string;
  className?: string;
  children: string;
};

const AsideItem = ({ className, link, children }: AsideItemProps) => {
  const pathname = usePathname();


  return (
    <Link
      css={styles.asideItemStyle(pathname.startsWith(link))}
      className={className}
      href={link}
    >
      {children}
    </Link>
  );
};

export const Aside = () => {
  return (
    <aside css={styles.asideStyle}>
      <AsideItem link='/' css={styles.homeStyle}>Gamjeong</AsideItem>
      <AsideItem link='/docs/about'>About</AsideItem>
      <AsideItem link='/docs/installation'>Installation</AsideItem>
      <AsideItem link='/docs/basic-usage'>Basic Usage</AsideItem>
    </aside>
  );
};
