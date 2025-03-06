'use client';

import Icon from '@/helpers/Icon';
import styles from './Buttons.module.css';
import { useTranslations } from 'next-intl';

export default function DownloadButton() {
  const t = useTranslations();
  return (
    <button className={styles.download_button} type="button">
      <Icon name="icon-download" width={20} height={20} />
      <span> {t('Buttons.download')}</span>
    </button>
  );
}
