'use client';

import Icon from '@/helpers/Icon';
import styles from './Buttons.module.css';
import { useTranslations } from 'next-intl';

interface DownloadButtonProps {
  link: string;
}

export default function DownloadButton({ link }: DownloadButtonProps) {
  const t = useTranslations();
  return (
    <a href={link} target="_blank" className={styles.download_button}>
      <Icon name="icon-download" width={20} height={20} />
      <span>{t('Buttons.download')}</span>
    </a>
  );
}
