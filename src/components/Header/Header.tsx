'use client';

import Link from 'next/link';
import styles from './Header.module.css';
import Icon from '@/helpers/Icon';
import MobMenu from '../MobMenu/MobMenu';
import { useState } from 'react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import logo from '@/img/logo.svg';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const t = useTranslations();

  const closeMenu = () => {
    setIsMenuOpen(false);
    document.body.style.overflow = 'auto';
    document.body.style.touchAction = 'auto';
  };
  const openMenu = () => {
    setIsMenuOpen(true);
    document.body.style.overflow = 'hidden';
    document.body.style.touchAction = 'none';
  };

  return (
    <header className={`${styles.header}`}>
      <Link className={styles.logo_wrap} href={`/`}>
        <Image
          className={styles.logo}
          src={logo}
          width={0}
          height={0}
          sizes="100vw"
          alt="Mustage Team logo"
          priority
        />
        <span className={styles.logo_text}>MUSTAGE.TEAM</span>
      </Link>

      <div className={`${styles.nav_wrap}`}>
        <div
          className={`${styles.burger_wrap} ${
            isMenuOpen ? styles.burger_open : ''
          }`}
          onClick={isMenuOpen ? closeMenu : openMenu}
        >
          <span className={styles.line}></span>
          <span className={styles.line}></span>
          <span className={styles.line}></span>
        </div>
        {/* <Link className={styles.main_button} href={`/`}>
          {t('Buttons.main')}
        </Link> */}
      </div>

      <MobMenu isMenuOpen={isMenuOpen} closeMenu={closeMenu} />
    </header>
  );
}
