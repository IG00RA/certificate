import { useTranslations } from 'next-intl';
import { linkItems, socialItems } from '@/data/data';
import styles from './MobMenu.module.css';
import Icon from '@/helpers/Icon';
import Link from 'next/link';
import Image from 'next/image';
import logo from '@/img/logo.svg';
import SecondaryButton from '../Buttons/SecondaryButton';

type MobMenuProps = {
  isMenuOpen: boolean;
  closeMenu: () => void;
};

export default function MobMenu({ isMenuOpen, closeMenu }: MobMenuProps) {
  const t = useTranslations('');

  return (
    <div
      onClick={closeMenu}
      className={`${styles.mobile_wrap} ${
        isMenuOpen && styles.mobile_menu_open
      }`}
    >
      <div
        className={styles.burger_menu}
        onClick={event => event.stopPropagation()}
      >
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

        <div>
          <ul className={styles.social}>
            {socialItems.map((item, index) => (
              <li key={index}>
                <a href={item.link} target="_blank" rel="noopener noreferrer">
                  <Icon
                    name={item.icon}
                    color="#a3a3a3"
                    width={32}
                    height={32}
                  />
                </a>
              </li>
            ))}
          </ul>
          <SecondaryButton />
        </div>
      </div>
    </div>
  );
}
