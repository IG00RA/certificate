'use client';
import styles from './Hero.module.css';
import { useTranslations } from 'next-intl';
import { useState, useEffect } from 'react';
import MainButton from '../Buttons/MainButton';
import Icon from '@/helpers/Icon';
import Link from 'next/link';

const hostBack = process.env.NEXT_PUBLIC_ADMIN_HOST_BACK;

interface CertificateData {
  uuid: string;
  fullName: string;
  streamNumber: number;
  startDate: string;
  endDate: string;
  certStatus: 'valid' | 'discontinued' | 'cancelled';
}

export default function Hero() {
  const t = useTranslations('');
  const [certificate, setCertificate] = useState(''); // Значення інпуту
  const [isLoading, setIsLoading] = useState(false); // Стан лоадера
  const [certificateData, setCertificateData] =
    useState<CertificateData | null>(null); // Дані сертифіката
  const [error, setError] = useState<string | null>(null); // Помилка

  // Скидання стану при зміні certificate
  useEffect(() => {
    setCertificateData(null);
    setError(null);
  }, [certificate]);

  // Функція для запиту даних з сервера
  const fetchCertificateData = async (id: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(`${hostBack}/api/certificates/${id}`);
      if (!response.ok) {
        throw new Error('Сертифікат не знайдено');
      }
      const data: CertificateData = await response.json();
      setCertificateData(data);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  // Обробник кліку по кнопці
  const handleButtonClick = () => {
    if (certificateData) {
      // Якщо дані вже є, перенаправляємо на сторінку сертифіката
      window.location.href = `uk/${certificateData.uuid}`;
    } else if (certificate) {
      // Якщо даних немає, але є введений ID, робимо запит
      fetchCertificateData(certificate);
    }
  };

  return (
    <section className={styles.hero}>
      <div
        className={styles.container}
        style={{ minHeight: certificateData ? 800 : undefined }}
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
          <div className={styles.btn_wrap}>
            {/* Лоадер */}
            {isLoading && (
              <div className={styles.info_container}>
                <div className={styles.dots_loading}>
                  <span className={styles.dot}></span>
                  <span className={styles.dot}></span>
                  <span className={styles.dot}></span>
                </div>
              </div>
            )}
            {/* Повідомлення про помилку */}
            {error && !isLoading && (
              <div className={styles.info_container}>
                <span className={styles.error_message}>{error}</span>
              </div>
            )}
            {/* Дані сертифіката */}
            {certificateData && !isLoading && !error && (
              <div className={styles.info_container}>
                <Link href={`uk/${certificateData.uuid}`}>
                  <div
                    style={{
                      backgroundImage: `url(${hostBack}/uploads/${certificateData.uuid}/img_${certificateData.uuid}_page1.jpeg)`,
                    }}
                    className={styles.cert_image}
                  ></div>
                </Link>
                <div className={styles.info_wrap}>
                  <p className={styles.name}>{certificateData.fullName}</p>
                  <p className={styles.thread}>
                    {t('Hero.thread')}{' '}
                    <span>{certificateData.streamNumber}</span>
                  </p>
                  <p className={styles.period}>
                    {t('Hero.period')}{' '}
                    <span>
                      {certificateData.startDate} - {certificateData.endDate}
                    </span>
                  </p>
                  <p className={styles.status}>
                    {t('Hero.status')}{' '}
                    {certificateData.certStatus === 'valid' && (
                      <span className={styles.status_valid}>
                        {t('Hero.valid')}
                      </span>
                    )}
                    {certificateData.certStatus === 'discontinued' && (
                      <span className={styles.status_discontinued}>
                        {t('Hero.discontinued')}
                      </span>
                    )}
                    {certificateData.certStatus === 'cancelled' && (
                      <span className={styles.status_cancelled}>
                        {t('Hero.cancelled')}
                      </span>
                    )}
                  </p>
                </div>
              </div>
            )}
            <MainButton
              margin={!certificateData && !isLoading && !error ? 64 : 0}
              onClick={handleButtonClick}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
