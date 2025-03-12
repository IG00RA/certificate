'use client';

import styles from './CertificatePage.module.css';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import Icon from '@/helpers/Icon';
import Link from 'next/link';
import ModalComponent from '../Modals/ModalComponent';
import { useCertificateData } from '@/hooks/useCertificateData';
import DownloadButton from '../Buttons/DownloadButton';
import { setTimeout } from 'timers';

export default function CertificatePage() {
  const t = useTranslations('');
  const { certificateData, loading, error } = useCertificateData();
  const [imageLoading, setImageLoading] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleShowVideo = () => {
    setShowVideo(true);
  };

  const handleImageLoad = () => {
    setTimeout(() => {
      setImageLoading(true);
    }, 300);
  };

  const openModal = () => {
    setIsOpen(true);
    if (typeof document !== 'undefined') {
      document.body.style.overflow = 'hidden';
      document.body.style.touchAction = 'none';
    }
  };

  const closeModal = () => {
    setIsOpen(false);
    if (typeof document !== 'undefined') {
      document.body.style.overflow = 'auto';
      document.body.style.touchAction = 'auto';
    }
  };

  if (loading) {
    return (
      <section className={styles.section}>
        <div className={styles.container}>
          <Link className={styles.link_wrap} href={`/`}>
            <Icon
              className={styles.back_icon}
              color="#1b1b1b"
              name="icon-arrow"
              width={24}
              height={24}
            />
            <span className={styles.link_text}>{t('CertPage.btnBack')}</span>
          </Link>
          <div className={styles.dots_loading}>
            <span className={styles.dot}></span>
            <span className={styles.dot}></span>
            <span className={styles.dot}></span>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className={styles.section}>
        <div className={styles.container}>
          <Link className={styles.link_wrap} href={`/`}>
            <Icon
              className={styles.back_icon}
              color="#1b1b1b"
              name="icon-arrow"
              width={24}
              height={24}
            />
            <span className={styles.link_text}>{t('CertPage.btnBack')}</span>
          </Link>
          <p>{t('CertPage.error')}</p>
        </div>
      </section>
    );
  }

  if (!certificateData) {
    return null;
  }

  return (
    <>
      <div className={`${!imageLoading ? '' : styles.section_load_false}`}>
        <section className={styles.section}>
          <div className={styles.container}>
            <Link className={styles.link_wrap} href={`/`}>
              <Icon
                className={styles.back_icon}
                color="#1b1b1b"
                name="icon-arrow"
                width={24}
                height={24}
              />
              <span className={styles.link_text}>{t('CertPage.btnBack')}</span>
            </Link>
            <div className={styles.dots_loading}>
              <span className={styles.dot}></span>
              <span className={styles.dot}></span>
              <span className={styles.dot}></span>
            </div>
          </div>
        </section>
      </div>
      <section
        className={`${styles.section} ${
          !imageLoading ? styles.section_load : ''
        }`}
      >
        <div className={styles.container}>
          <Link className={styles.link_wrap} href={`/`}>
            <Icon
              className={styles.back_icon}
              color="#1b1b1b"
              name="icon-arrow"
              width={24}
              height={24}
            />
            <span className={styles.link_text}>{t('CertPage.btnBack')}</span>
          </Link>
          <h2 className={styles.certificate_text}>
            {t('CertPage.certificate')}
          </h2>
          <p className={styles.status}>
            {t('Hero.status')}{' '}
            {certificateData.certStatus === 'valid' && (
              <span className={styles.status_valid}> {t('Hero.valid')}</span>
            )}
            {certificateData.certStatus === 'discontinued' && (
              <span className={styles.status_discontinued}>
                {' '}
                {t('Hero.discontinued')}
              </span>
            )}
            {certificateData.certStatus === 'cancelled' && (
              <span className={styles.status_cancelled}>
                {' '}
                {t('Hero.cancelled')}
              </span>
            )}
          </p>
          <img
            onClick={openModal}
            src={`/api/certificate/${certificateData.uuid}/img_${certificateData.uuid}_page1.jpeg`}
            onLoad={handleImageLoad}
            alt="Mustage certificate first page"
            className={styles.first_page}
          />

          <DownloadButton
            link={`/api/certificate/${certificateData.uuid}/Certificate_${certificateData.uuid}.pdf`}
          />
          <p className={styles.button_text}>{t('CertPage.btnText')}</p>
          <h2 className={styles.supplement_head_text}>
            {t('CertPage.certSupplement')}
          </h2>
          <div className={styles.certificate_block_wrap}>
            <img
              src={`/api/certificate/${certificateData.uuid}/img_${certificateData.uuid}_page2.jpeg`}
              alt="Mustage certificate second page"
              className={styles.second_page}
              loading="lazy"
            />
            <img
              src={`/api/certificate/${certificateData.uuid}/img_${certificateData.uuid}_page3.jpeg`}
              alt="Mustage certificate third page"
              className={styles.third_page}
              loading="lazy"
            />
            <img
              src={`/api/certificate/${certificateData.uuid}/img_${certificateData.uuid}_page4.jpeg`}
              alt="Mustage certificate fourth page"
              className={styles.fourth_page}
              loading="lazy"
            />
            <img
              src={`/api/certificate/${certificateData.uuid}/img_${certificateData.uuid}_page5.jpeg`}
              alt="Mustage certificate fifth page"
              className={styles.fifth_page}
              loading="lazy"
            />
            <div
              className={styles.certificate_block_video}
              style={{
                backgroundImage: `url(/api/certificate/${certificateData.uuid}/img_${certificateData.uuid}_page6.jpeg)`,
              }}
            >
              {certificateData.tariff === 'pro' ||
              certificateData.tariff === 'base' ? (
                <div className={styles.case_link_wrap}>
                  <p className={styles.notion_link}>
                    {t('CertPage.summary')}{' '}
                    <a
                      href={certificateData.caseLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.case_link}
                    >
                      {certificateData.caseLink}
                    </a>
                  </p>
                  <p className={styles.average_grade}>
                    {t('CertPage.averageGrade')}{' '}
                    <span>{certificateData.averageGradePoints}</span>
                  </p>
                </div>
              ) : (
                ''
              )}
            </div>
            <div
              className={styles.certificate_block_video}
              style={{
                backgroundImage: `url(/api/certificate/${certificateData.uuid}/img_${certificateData.uuid}_page7.jpeg)`,
              }}
            >
              {certificateData.tariff === 'pro' ||
              certificateData.tariff === 'base' ? (
                <div className={styles.video_main_wrap}>
                  <div className={styles.video_wrap}>
                    <iframe
                      className={styles.video}
                      src={`https://www.youtube.com/embed/${
                        certificateData.videoReview
                      }?autoplay=${showVideo ? '1' : '0'}&modestbranding=1`}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      title="YouTube video"
                    />
                    {!showVideo && <div className={styles.video_box}></div>}
                    <button
                      type="button"
                      className={`${styles.video_icon} ${
                        showVideo && styles.video_icon_show
                      }`}
                      onClick={handleShowVideo}
                    >
                      <Icon name="icon-video" width={'100%'} height={'100%'} />
                    </button>
                  </div>
                </div>
              ) : (
                <div
                  className={`${styles.case_link_wrap} ${styles.case_link_wrap_standard}`}
                >
                  <p className={styles.notion_link}>
                    {t('CertPage.summary')}{' '}
                    <a
                      href={certificateData.caseLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.case_link}
                    >
                      {certificateData.caseLink}
                    </a>
                  </p>
                  <p className={styles.average_grade}>
                    {t('CertPage.averageGrade')}{' '}
                    <span>{certificateData.averageGradePoints}</span>
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        <ModalComponent isOpen={isOpen} onClose={closeModal}>
          <img
            src={`/api/certificate/${certificateData.uuid}/img_${certificateData.uuid}_page1.jpeg`}
            alt="Mustage certificate first page"
            className={styles.first_page_modal}
          />
        </ModalComponent>
      </section>
    </>
  );
}
