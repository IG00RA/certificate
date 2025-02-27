'use client';

import styles from './Buttons.module.css';
import { useTranslations } from 'next-intl';

export default function MainButton() {
  const t = useTranslations();
  return (
    <button className={styles.main_button} type="button">
      {t('Buttons.main')}
    </button>
  );
}
