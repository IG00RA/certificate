'use client';

import Link from 'next/link';
import styles from './Buttons.module.css';
import { useTranslations } from 'next-intl';

export default function SecondaryButton() {
  const t = useTranslations();
  return (
    <Link
      href="https://t.me/mustage_study"
      className={styles.secondary_button}
      target="_blank"
    >
      {t('Buttons.secondary')}
    </Link>
  );
}
