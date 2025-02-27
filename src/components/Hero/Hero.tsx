'use client';
import styles from './Hero.module.css';
import logo from '../../img/hero/logo.svg';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import MainButton from '../Buttons/MainButton';
import Icon from '@/helpers/Icon';

export default function Hero() {
  const t = useTranslations('');

  const [certificate, setCertificate] = useState('');
  const [isVisible, setIsVisible] = useState(true);
  const [certificateStatus, setCertificateStatus] = useState('valid');

  return (
    <section className={styles.hero}>
      <div
        className={styles.container}
        // style={{ minHeight: '680px' }}
      >
        <h1 className={styles.hero_header}>{t('Hero.header')}</h1>
        <h3 className={styles.hero_text}>{t('Hero.text')}</h3>
        <div className={styles.input_wrap}>
          <Icon
            name={'icon-finder'}
            width={24}
            height={24}
            className={styles.search_icon}
            color="#1b1b1b"
          />
          <input
            className={styles.input}
            type="text"
            placeholder={t('Hero.inputPlaceholder')}
            onChange={e => setCertificate(e.target.value)}
            required
          />
          {isVisible && (
            <div className={styles.info_container}>
              <div className={styles.cert_image}></div>
              <div className={styles.info_wrap}>
                <p className={styles.name}>
                  Andrey Dumchev <span>(@nickname)</span>
                </p>
                <p className={styles.thread}>
                  {t('Hero.thread')} <span>024</span>
                </p>
                <p className={styles.period}>
                  {t('Hero.period')} <span>12.01.2025 - 12.02.2025</span>
                </p>
                <p className={styles.status}>
                  {t('Hero.status')}{' '}
                  {certificateStatus === 'valid' && (
                    <span className={styles.status_valid}>
                      {t('Hero.valid')}
                    </span>
                  )}
                  {certificateStatus === 'discontinued' && (
                    <span className={styles.status_discontinued}>
                      {t('Hero.discontinued')}
                    </span>
                  )}
                  {certificateStatus === 'cancelled' && (
                    <span className={styles.status_cancelled}>
                      {t('Hero.cancelled')}
                    </span>
                  )}
                </p>
              </div>
            </div>
          )}
          <MainButton />
        </div>
      </div>
    </section>
  );
}
