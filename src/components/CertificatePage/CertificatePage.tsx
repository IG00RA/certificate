'use client';

import styles from './CertificatePage.module.css';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import Icon from '@/helpers/Icon';
import Link from 'next/link';
import ModalComponent from '../Modals/ModalComponent';
import { useCertificateData } from '@/hooks/useCertificateData';
import DownloadButton from '../Buttons/DownloadButton';

const hostBack = process.env.NEXT_PUBLIC_ADMIN_HOST_BACK;

export default function CertificatePage() {
  const t = useTranslations('');
  const { certificateData, loading, error } = useCertificateData();

  const [showVideo, setShowVideo] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleShowVideo = () => {
    setShowVideo(true);
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
        <h2 className={styles.certificate_text}>{t('CertPage.certificate')}</h2>
        <Image
          onClick={openModal}
          src={`${hostBack}/uploads/${certificateData.uuid}/img_${certificateData.uuid}_page1.jpeg`}
          alt="Mustage certificate first page"
          className={styles.first_page}
          width={0}
          height={0}
          sizes="100vw"
        />

        <DownloadButton
          link={`${hostBack}/uploads/${certificateData.uuid}/Certificate_${certificateData.uuid}.pdf`}
        />
        <p className={styles.button_text}>{t('CertPage.btnText')}</p>
        <h2 className={styles.supplement_head_text}>
          {t('CertPage.certSupplement')}
        </h2>
        <div className={styles.certificate_block_wrap}>
          <Image
            src={`${hostBack}/uploads/${certificateData.uuid}/img_${certificateData.uuid}_page2.jpeg`}
            alt="Mustage certificate second page"
            className={styles.second_page}
            width={0}
            height={0}
            sizes="100vw"
          />
          <Image
            src={`${hostBack}/uploads/${certificateData.uuid}/img_${certificateData.uuid}_page3.jpeg`}
            alt="Mustage certificate third page"
            className={styles.third_page}
            width={0}
            height={0}
            sizes="100vw"
          />
          <Image
            src={`${hostBack}/uploads/${certificateData.uuid}/img_${certificateData.uuid}_page4.jpeg`}
            alt="Mustage certificate fourth page"
            className={styles.fourth_page}
            width={0}
            height={0}
            sizes="100vw"
          />
          <Image
            src={`${hostBack}/uploads/${certificateData.uuid}/img_${certificateData.uuid}_page5.jpeg`}
            alt="Mustage certificate fifth page"
            className={styles.fifth_page}
            width={0}
            height={0}
            sizes="100vw"
          />
          <div
            className={styles.certificate_block_video}
            style={{
              backgroundImage: `url(${hostBack}/uploads/${certificateData.uuid}/img_${certificateData.uuid}_page6.jpeg)`,
            }}
          >
            {certificateData.tariff === 'pro' ? (
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
              backgroundImage: `url(${hostBack}/uploads/${certificateData.uuid}/img_${certificateData.uuid}_page7.jpeg)`,
            }}
          >
            {certificateData.tariff === 'pro' ? (
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
        <Image
          src={`${hostBack}/uploads/${certificateData.uuid}/img_${certificateData.uuid}_page1.jpeg`}
          alt="Mustage certificate first page"
          className={styles.first_page}
          width={0}
          height={0}
          sizes="100vw"
        />
      </ModalComponent>
    </section>
  );
}
