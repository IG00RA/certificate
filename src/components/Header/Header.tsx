'use client';

import Link from 'next/link';
import styles from './Header.module.css';
import Icon from '@/helpers/Icon';
import MobMenu from '../MobMenu/MobMenu';
import { useState } from 'react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import logo from '@/img/logo.svg';
import SecondaryButton from '../Buttons/SecondaryButton';
import { linkItems, socialItems } from '@/data/data';

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
      <div className={`${styles.header_social}`}>
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
        <ul className={styles.social}>
          {socialItems.map((item, index) => (
            <li key={index}>
              <a href={item.link} target="_blank" rel="noopener noreferrer">
                <Icon name={item.icon} color="#a3a3a3" width={24} height={24} />
              </a>
            </li>
          ))}
        </ul>
      </div>
      <div className={`${styles.nav_wrap}`}>
        <ul className={styles.links}>
          {linkItems.map((item, index) => (
            <li key={index}>
              <a
                href={item.href}
                className={styles.link}
                target="_blank"
                rel="noopener noreferrer"
              >
                {t(item.label)}
              </a>
            </li>
          ))}
        </ul>
        <SecondaryButton />
      </div>
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

      <MobMenu isMenuOpen={isMenuOpen} closeMenu={closeMenu} />
    </header>
  );
}
