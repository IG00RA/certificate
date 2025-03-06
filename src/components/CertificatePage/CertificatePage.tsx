'use client';

import styles from './CertificatePage.module.css';
import curator_sign from '@/img/curator_sign.webp';
import mentor_sign from '@/img/mentor_sign.webp';
import seo_sign from '@/img/seo_sign.webp';
import stamp from '@/img/stamp.webp';
import qr from '@/img/qr.webp';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import Icon from '@/helpers/Icon';
import Link from 'next/link';
import ModalComponent from '../Modals/ModalComponent';
import { useCertificateData } from '@/hooks/useCertificateData';
import DownloadButton from '../Buttons/DownloadButton';

export default function CertificatePage() {
  const t = useTranslations('');
  const { certificateData, loading, error } = useCertificateData();

  const [showVideo, setShowVideo] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  function formatPeriod(startDate: string, endDate: string) {
    const formatDate = (dateStr: string) => {
      const date = new Date(dateStr);
      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const year = date.getFullYear();
      return `${day}.${month}.${year}`;
    };
    return `${formatDate(startDate)} - ${formatDate(endDate)}`;
  }

  function formatTariff(tariff: string) {
    const tariffMap: { [key: string]: string } = {
      free: 'Free',
      start: 'Start',
      base: 'Base',
      pro: 'Pro',
    };
    return `тариф "${tariffMap[tariff] || 'Unknown'}"`;
  }

  // Функція для отримання оцінок із grades за номером уроку
  function getGradeData(lessonNumber: string) {
    if (!certificateData?.grades?.lessons) return { tests: '-', homework: '-' };

    const lessonData = certificateData.grades.lessons.find(
      lesson => lesson.lesson === lessonNumber
    );

    if (!lessonData) return { tests: '-', homework: '-' };

    const tests = lessonData.tests
      ? lessonData.tests.length > 0
        ? `${lessonData.tests[0]}%` // Беремо перший елемент масиву
        : '-'
      : '-';
    const homework = lessonData.homework
      ? lessonData.homework.length > 0
        ? lessonData.homework.join(';  ')
        : '-'
      : '-';

    return { tests, homework };
  }
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

  const period = formatPeriod(
    certificateData.startDate,
    certificateData.endDate
  );
  const format = formatTariff(certificateData.tariff);

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
        <div
          onClick={openModal}
          className={`${styles.certificate_block} ${styles.certificate_block_main}`}
        >
          <h2 className={styles.certificate_header}>
            {t('CertPage.certificate')}
          </h2>
          <p className={styles.certificate_id}>
            {t('CertPage.certId')} <span>{certificateData.uuid}</span>
          </p>
          <p className={styles.certificate_name_text}>
            {t('CertPage.nameText')}
          </p>
          <h2 className={styles.certificate_name}>
            {certificateData.fullName}
          </h2>
          <p className={styles.certificate_name_bottom_text}>
            {t('CertPage.nameBottomText')}
          </p>
          <div className={styles.period_wrap}>
            <p className={styles.certificate_thread}>
              {t('CertPage.thread')} <span>{certificateData.streamNumber}</span>
            </p>
            <p className={styles.certificate_period}>
              {t('CertPage.period')} <span>{period}</span>
            </p>
          </div>
          <p className={styles.certificate_format}>
            {t('CertPage.format')} <span>{format}</span>
          </p>
          <div className={styles.certificate_bottom_wrap}>
            <div className={styles.certificate_qr}>
              <Image
                src={qr}
                alt="Mustage qr code"
                className={styles.qr_code}
                width={0}
                height={0}
                sizes="100vw"
              />
            </div>
            <div className={styles.certificate_seo_wrap}>
              <p className={styles.certificate_seo_text}>
                <span className={styles.certificate_seo_name}>
                  {t('CertPage.seoName')}
                </span>{' '}
                {t('CertPage.seoText')}
              </p>
              <div className={styles.certificate_stamp_wrap}>
                <Image
                  src={stamp}
                  alt="Mustage stamp"
                  className={styles.stamp}
                  width={0}
                  height={0}
                  sizes="100vw"
                />
                <p className={styles.certificate_stamp_id}>
                  {t('CertPage.certId')} <span>{certificateData.uuid}</span>
                </p>
                <Image
                  src={seo_sign}
                  alt="SEO sign"
                  className={styles.sign}
                  width={0}
                  height={0}
                  sizes="100vw"
                />
              </div>
            </div>
          </div>
        </div>

        <DownloadButton />
        <p className={styles.button_text}>{t('CertPage.btnText')}</p>
        <h2 className={styles.supplement_head_text}>
          {t('CertPage.certSupplement')}
        </h2>
        <div className={styles.certificate_block_wrap}>
          <div
            className={`${styles.certificate_block} ${styles.certificate_block_curator}`}
          >
            <div className={styles.supplement_header_text_wrap}>
              <h2 className={styles.supplement_header}>
                {t('CertPage.certSupplement')}
              </h2>
              <p className={styles.supplement_id}>
                {t('CertPage.certId')} <span>{certificateData.uuid}</span>
              </p>
              <p className={styles.supplement_student}>
                {t('CertPage.student')} <span>{certificateData.fullName}</span>
              </p>
              <p className={styles.supplement_thread}>
                {t('CertPage.thread')}{' '}
                <span>{certificateData.streamNumber}</span>
              </p>
              <p className={styles.supplement_period}>
                {t('CertPage.period')} <span>{period}</span>
              </p>
              <p className={styles.supplement_format}>
                {t('CertPage.format')} <span>{format}</span>
              </p>
              <h3 className={styles.supplement_curator_text}>
                {t('CertPage.curatorText')}
              </h3>
              <p
                className={styles.supplement_text}
                dangerouslySetInnerHTML={{
                  __html: certificateData.recommendationsCurator,
                }}
              />
            </div>
            <div className={styles.supplement_seo_wrap}>
              <p className={styles.supplement_seo_text}>
                <span className={styles.supplement_seo_name}>
                  {t('CertPage.curatorName')}
                </span>{' '}
                {t('CertPage.curator')}
              </p>
              <div className={styles.certificate_stamp_wrap}>
                <Image
                  src={stamp}
                  alt="Mustage stamp"
                  className={styles.supplement_stamp}
                  width={0}
                  height={0}
                  sizes="100vw"
                />
                <p
                  className={`${styles.certificate_stamp_id} ${styles.supplement_stamp_id}`}
                >
                  {t('CertPage.certId')} <span>{certificateData.uuid}</span>
                </p>
                <Image
                  src={curator_sign}
                  alt="Curator sign"
                  className={styles.curator_sign}
                  width={0}
                  height={0}
                  sizes="100vw"
                />
              </div>
            </div>
          </div>
          <div
            className={`${styles.certificate_block} ${styles.certificate_block_mentor}`}
          >
            <div className={styles.supplement_header_text_wrap}>
              <h3 className={styles.supplement_curator_text}>
                {t('CertPage.mentorText')}
              </h3>
              <p
                className={styles.supplement_text}
                dangerouslySetInnerHTML={{
                  __html: certificateData.recommendationsMentor,
                }}
              />
            </div>
            <div className={styles.supplement_seo_wrap}>
              <p className={styles.supplement_seo_text}>
                <span className={styles.supplement_seo_name}>
                  {t('CertPage.mentorName')}
                </span>{' '}
                {t('CertPage.mentor')}
              </p>
              <div className={styles.certificate_stamp_wrap}>
                <Image
                  src={stamp}
                  alt="Mustage stamp"
                  className={styles.supplement_stamp}
                  width={0}
                  height={0}
                  sizes="100vw"
                />
                <p
                  className={`${styles.certificate_stamp_id} ${styles.supplement_stamp_id}`}
                >
                  {t('CertPage.certId')} <span>{certificateData.uuid}</span>
                </p>
                <Image
                  src={mentor_sign}
                  alt="Mentor sign"
                  className={styles.curator_sign}
                  width={0}
                  height={0}
                  sizes="100vw"
                />
              </div>
            </div>
          </div>
          <div
            className={`${styles.certificate_block} ${styles.certificate_block_card1}`}
          >
            <h2 className={styles.card_header}>{t('CertPage.reportCard')}</h2>
            <table className={styles.report_table}>
              <thead>
                <tr>
                  <th className={styles.table_header}>
                    {t('CertPage.lessonName')}
                  </th>
                  <th className={styles.table_header}>
                    {t('CertPage.scoreTest')}{' '}
                    <span>{t('CertPage.scoreHomeResult')}</span>
                  </th>
                  <th className={styles.table_header}>
                    {t('CertPage.scoreHome')}{' '}
                    <span>{t('CertPage.scoreHomeResult')}</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className={styles.first_column}>
                    {t('CertPage.lessons.zero.first')}
                  </td>
                  <td className={styles.second_column}>
                    {getGradeData('0.1').tests}
                  </td>
                  <td className={styles.third_column}>
                    {getGradeData('0.1').homework}
                  </td>
                </tr>
                <tr>
                  <td className={styles.first_column}>
                    {t('CertPage.lessons.first.first')}
                  </td>
                  <td className={styles.second_column}>
                    {getGradeData('1.1').tests}
                  </td>
                  <td className={styles.third_column}>
                    {getGradeData('1.1').homework}
                  </td>
                </tr>
                <tr>
                  <td className={styles.first_column}>
                    {t('CertPage.lessons.first.second')}
                  </td>
                  <td className={styles.second_column}>
                    {getGradeData('1.2').tests}
                  </td>
                  <td className={styles.third_column}>
                    {getGradeData('1.2').homework}
                  </td>
                </tr>
                <tr>
                  <td className={styles.first_column}>
                    {t('CertPage.lessons.first.third')}
                  </td>
                  <td className={styles.second_column}>
                    {getGradeData('1.3').tests}
                  </td>
                  <td className={styles.third_column}>
                    {getGradeData('1.3').homework}
                  </td>
                </tr>
                <tr>
                  <td className={styles.first_column}>
                    {t('CertPage.lessons.first.fourth')}
                  </td>
                  <td className={styles.second_column}>
                    {getGradeData('1.4').tests}
                  </td>
                  <td className={styles.third_column}>
                    {getGradeData('1.4').homework}
                  </td>
                </tr>
                <tr>
                  <td className={styles.first_column}>
                    {t('CertPage.lessons.first.fifth')}
                  </td>
                  <td className={styles.second_column}>
                    {getGradeData('1.5').tests}
                  </td>
                  <td className={styles.third_column}>
                    {getGradeData('1.5').homework}
                  </td>
                </tr>
                <tr>
                  <td className={styles.first_column}>
                    {t('CertPage.lessons.second.first')}
                  </td>
                  <td className={styles.second_column}>
                    {getGradeData('2.1').tests}
                  </td>
                  <td className={styles.third_column}>
                    {getGradeData('2.1').homework}
                  </td>
                </tr>
                <tr>
                  <td className={styles.first_column}>
                    {t('CertPage.lessons.second.second')}
                  </td>
                  <td className={styles.second_column}>
                    {getGradeData('2.2').tests}
                  </td>
                  <td className={styles.third_column}>
                    {getGradeData('2.2').homework}
                  </td>
                </tr>
                <tr>
                  <td className={styles.first_column}>
                    {t('CertPage.lessons.second.third')}
                  </td>
                  <td className={styles.second_column}>
                    {getGradeData('2.3').tests}
                  </td>
                  <td className={styles.third_column}>
                    {getGradeData('2.3').homework}
                  </td>
                </tr>
                <tr>
                  <td className={styles.first_column}>
                    {t('CertPage.lessons.second.fourth')}
                  </td>
                  <td className={styles.second_column}>
                    {getGradeData('2.4').tests}
                  </td>
                  <td className={styles.third_column}>
                    {getGradeData('2.4').homework}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div
            className={`${styles.certificate_block} ${styles.certificate_block_card2}`}
          >
            <h2 className={styles.card_header}>{t('CertPage.reportCard')}</h2>
            <table className={styles.report_table}>
              <thead>
                <tr>
                  <th className={styles.table_header}>
                    {t('CertPage.lessonName')}
                  </th>
                  <th className={styles.table_header}>
                    {t('CertPage.scoreTest')}{' '}
                    <span>{t('CertPage.scoreHomeResult')}</span>
                  </th>
                  <th className={styles.table_header}>
                    {t('CertPage.scoreHome')}{' '}
                    <span>{t('CertPage.scoreHomeResult')}</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className={styles.first_column}>
                    {t('CertPage.lessons.second.fifth')}
                  </td>
                  <td className={styles.second_column}>
                    {getGradeData('2.5').tests}
                  </td>
                  <td className={styles.third_column}>
                    {getGradeData('2.5').homework}
                  </td>
                </tr>
                <tr>
                  <td className={styles.first_column}>
                    {t('CertPage.lessons.third.first')}
                  </td>
                  <td className={styles.second_column}>
                    {getGradeData('3.1').tests}
                  </td>
                  <td className={styles.third_column}>
                    {getGradeData('3.1').homework}
                  </td>
                </tr>
                <tr>
                  <td className={styles.first_column}>
                    {t('CertPage.lessons.third.second')}
                  </td>
                  <td className={styles.second_column}>
                    {getGradeData('3.2').tests}
                  </td>
                  <td className={styles.third_column}>
                    {getGradeData('3.2').homework}
                  </td>
                </tr>
                <tr>
                  <td className={styles.first_column}>
                    {t('CertPage.lessons.third.third')}
                  </td>
                  <td className={styles.second_column}>
                    {getGradeData('3.3').tests}
                  </td>
                  <td className={styles.third_column}>
                    {getGradeData('3.3').homework}
                  </td>
                </tr>
                <tr>
                  <td className={styles.first_column}>
                    {t('CertPage.lessons.third.fourth')}
                  </td>
                  <td className={styles.second_column}>
                    {getGradeData('3.4').tests}
                  </td>
                  <td className={styles.third_column}>
                    {getGradeData('3.4').homework}
                  </td>
                </tr>
                <tr>
                  <td className={styles.first_column}>
                    {t('CertPage.lessons.fourth.first')}
                  </td>
                  <td className={styles.second_column}>
                    {getGradeData('4.1').tests}
                  </td>
                  <td className={styles.third_column}>
                    {getGradeData('4.1').homework}
                  </td>
                </tr>
                <tr>
                  <td className={styles.first_column}>
                    {t('CertPage.lessons.fourth.second')}
                  </td>
                  <td className={styles.second_column}>
                    {getGradeData('4.2').tests}
                  </td>
                  <td className={styles.third_column}>
                    {getGradeData('4.2').homework}
                  </td>
                </tr>
                <tr>
                  <td className={styles.first_column}>
                    {t('CertPage.lessons.fourth.third')}
                  </td>
                  <td className={styles.second_column}>
                    {getGradeData('4.3').tests}
                  </td>
                  <td className={styles.third_column}>
                    {getGradeData('4.3').homework}
                  </td>
                </tr>
                <tr>
                  <td className={styles.first_column}>
                    {t('CertPage.lessons.fifth.first')}
                  </td>
                  <td className={styles.second_column}>
                    {getGradeData('5.1').tests}
                  </td>
                  <td className={styles.third_column}>
                    {getGradeData('5.1').homework}
                  </td>
                </tr>
                <tr>
                  <td className={styles.first_column}>
                    {t('CertPage.lessons.fifth.second')}
                  </td>
                  <td className={styles.second_column}>
                    {getGradeData('5.2').tests}
                  </td>
                  <td className={styles.third_column}>
                    {getGradeData('5.2').homework}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div
            className={`${styles.certificate_block} ${styles.certificate_block_card3}`}
          >
            <h2 className={styles.card_header}>{t('CertPage.reportCard')}</h2>
            <table className={styles.report_table}>
              <thead>
                <tr>
                  <th className={styles.table_header}>
                    {t('CertPage.lessonName')}
                  </th>
                  <th className={styles.table_header}>
                    {t('CertPage.scoreTest')}{' '}
                    <span>{t('CertPage.scoreHomeResult')}</span>
                  </th>
                  <th className={styles.table_header}>
                    {t('CertPage.scoreHome')}{' '}
                    <span>{t('CertPage.scoreHomeResult')}</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className={styles.first_column}>
                    {t('CertPage.lessons.fifth.third')}
                  </td>
                  <td className={styles.second_column}>
                    {getGradeData('5.3').tests}
                  </td>
                  <td className={styles.third_column}>
                    {getGradeData('5.3').homework}
                  </td>
                </tr>
                <tr>
                  <td className={styles.first_column}>
                    {t('CertPage.lessons.fifth.fourth')}
                  </td>
                  <td className={styles.second_column}>
                    {getGradeData('5.4').tests}
                  </td>
                  <td className={styles.third_column}>
                    {getGradeData('5.4').homework}
                  </td>
                </tr>
                <tr>
                  <td className={styles.first_column}>
                    {t('CertPage.lessons.fifth.fifth')}
                  </td>
                  <td className={styles.second_column}>
                    {getGradeData('5.5').tests}
                  </td>
                  <td className={styles.third_column}>
                    {getGradeData('5.5').homework}
                  </td>
                </tr>
                <tr>
                  <td className={styles.first_column}>
                    {t('CertPage.lessons.sixth.first')}
                  </td>
                  <td className={styles.second_column}>
                    {getGradeData('6.1').tests}
                  </td>
                  <td className={styles.third_column}>
                    {getGradeData('6.1').homework}
                  </td>
                </tr>
                <tr>
                  <td className={styles.first_column}>
                    {t('CertPage.lessons.sixth.second')}
                  </td>
                  <td className={styles.second_column}>
                    {getGradeData('6.2').tests}
                  </td>
                  <td className={styles.third_column}>
                    {getGradeData('6.2').homework}
                  </td>
                </tr>
                <tr>
                  <td className={styles.first_column}>
                    {t('CertPage.lessons.sixth.third')}
                  </td>
                  <td className={styles.second_column}>
                    {getGradeData('6.3').tests}
                  </td>
                  <td className={styles.third_column}>
                    {getGradeData('6.3').homework}
                  </td>
                </tr>
                <tr>
                  <td className={styles.first_column}>
                    {t('CertPage.lessons.sixth.fourth')}
                  </td>
                  <td className={styles.second_column}>
                    {getGradeData('6.4').tests}
                  </td>
                  <td className={styles.third_column}>
                    {getGradeData('6.4').homework}
                  </td>
                </tr>
                <tr>
                  <td className={styles.first_column}>
                    {t('CertPage.lessons.sixth.fifth')}
                  </td>
                  <td className={styles.second_column}>
                    {getGradeData('6.5').tests}
                  </td>
                  <td className={styles.third_column}>
                    {getGradeData('6.5').homework}
                  </td>
                </tr>
                <tr>
                  <td className={styles.first_column}>
                    {t('CertPage.lessons.seventh.first')}
                  </td>
                  <td className={styles.second_column}>
                    {getGradeData('7.1').tests}
                  </td>
                  <td className={styles.third_column}>
                    {getGradeData('7.1').homework}
                  </td>
                </tr>
              </tbody>
            </table>
            {certificateData.tariff === 'pro' && (
              <>
                <p className={styles.notion_link}>
                  {t('CertPage.summary')}{' '}
                  <a
                    href={certificateData.caseLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {certificateData.caseLink}
                  </a>
                </p>
                <p className={styles.average_grade}>
                  {t('CertPage.averageGrade')}{' '}
                  <span>{certificateData.averageGradePoints}</span>
                </p>
              </>
            )}
          </div>
          <div
            className={`${styles.certificate_block} ${styles.certificate_block_video}`}
          >
            <div className={styles.certificate_video_main_wrap}>
              {certificateData.tariff === 'pro' ? (
                <>
                  <h2 className={styles.card_header}>
                    {t('CertPage.videoReview')}
                  </h2>
                  <div className={styles.video_wrap}>
                    <iframe
                      className={styles.video}
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
                      <Icon name="icon-video" width={44} height={44} />
                    </button>
                  </div>
                </>
              ) : (
                <div className={styles.notion_link_wrap}>
                  <p className={styles.notion_link}>
                    {t('CertPage.summary')}{' '}
                    <a
                      href={certificateData.caseLink}
                      target="_blank"
                      rel="noopener noreferrer"
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
              <p className={styles.academy_text}>
                {t('CertPage.academy')}{' '}
                <span>{t('CertPage.academySecond')}</span>
              </p>
            </div>
            <div className={styles.certificate_video_seo_wrap}>
              <p className={styles.certificate_video_seo_text}>
                <span className={styles.certificate_video_seo_name}>
                  {t('CertPage.seoName')}
                </span>{' '}
                {t('CertPage.seoText')}
              </p>
              <div className={styles.certificate_video_stamp_wrap}>
                <Image
                  src={stamp}
                  alt="Mustage stamp"
                  className={styles.stamp_video}
                  width={0}
                  height={0}
                  sizes="100vw"
                />
                <p className={styles.certificate_video_stamp_id}>
                  {t('CertPage.certId')} <span>{certificateData.uuid}</span>
                </p>
                <Image
                  src={seo_sign}
                  alt="SEO sign"
                  className={styles.sign_video}
                  width={0}
                  height={0}
                  sizes="100vw"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <ModalComponent isOpen={isOpen} onClose={closeModal}>
        <div
          className={`${styles.certificate_block} ${styles.certificate_block_main}`}
        >
          <h2 className={styles.certificate_header}>
            {t('CertPage.certificate')}
          </h2>
          <p className={styles.certificate_id}>
            {t('CertPage.certId')} <span>{certificateData.uuid}</span>
          </p>
          <p className={styles.certificate_name_text}>
            {t('CertPage.nameText')}
          </p>
          <h2 className={styles.certificate_name}>
            {certificateData.fullName}
          </h2>
          <p className={styles.certificate_name_bottom_text}>
            {t('CertPage.nameBottomText')}
          </p>
          <div className={styles.period_wrap}>
            <p className={styles.certificate_thread}>
              {t('CertPage.thread')} <span>{certificateData.streamNumber}</span>
            </p>
            <p className={styles.certificate_period}>
              {t('CertPage.period')} <span>{period}</span>
            </p>
          </div>
          <p className={styles.certificate_format}>
            {t('CertPage.format')} <span>{format}</span>
          </p>
          <div className={styles.certificate_bottom_wrap}>
            <div className={styles.certificate_qr}>
              <Image
                src={qr}
                alt="Mustage qr code"
                className={styles.qr_code}
                width={0}
                height={0}
                sizes="100vw"
              />
            </div>
            <div className={styles.certificate_seo_wrap}>
              <p className={styles.certificate_seo_text}>
                <span className={styles.certificate_seo_name}>
                  {t('CertPage.seoName')}
                </span>{' '}
                {t('CertPage.seoText')}
              </p>
              <div className={styles.certificate_stamp_wrap}>
                <Image
                  src={stamp}
                  alt="Mustage stamp"
                  className={styles.stamp}
                  width={0}
                  height={0}
                  sizes="100vw"
                />
                <p className={styles.certificate_stamp_id}>
                  {t('CertPage.certId')} <span>{certificateData.uuid}</span>
                </p>
                <Image
                  src={seo_sign}
                  alt="SEO sign"
                  className={styles.sign}
                  width={0}
                  height={0}
                  sizes="100vw"
                />
              </div>
            </div>
          </div>
        </div>
      </ModalComponent>
    </section>
  );
}
