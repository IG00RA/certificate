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
import MainButton from '../Buttons/MainButton';
import Icon from '@/helpers/Icon';
import Link from 'next/link';

const data = {
  id: '12345678',
  fullName: 'Andrey Dumchev',
  thread: '024',
  period: '12.01.2025 - 12.02.2025',
  format: 'тариф “Standart”',
  curatorText: {
    first:
      '[Andrey Dumchev] проявив(ла) себе як старанний та цілеспрямований студент(ка) під час навчання на курсі "Арбітраж трафіку від Mustage Team". Він(вона) продемонстрував(ла) високий рівень засвоєння матеріалу, активність на заняттях та креативність у виконанні практичних завдань.',
    second:
      'Особливо хочу відзначити [якість або навичку], які дозволили [Andrey Dumchev] досягти успіху в арбітражі трафіку. Він(вона) не боявся(лась) експериментувати, шукати нові підходи та вчитися на своїх помилках.',
    third:
      'Рекомендую [Andrey Dumchev] як перспективного фахівця з арбітражу трафіку, який(а) здатний(а) досягти високих результатів у цій сфері. Він(вона) має всі необхідні знання, навички та особисті якості для успішної карєри.',
  },
  mentorText: {
    first:
      '[Andrey Dumchev] проявив(ла) себе як старанний та цілеспрямований студент(ка) під час навчання на курсі "Арбітраж трафіку від Mustage Team". Він(вона) продемонстрував(ла) високий рівень засвоєння матеріалу, активність на заняттях та креативність у виконанні практичних завдань.',
    second:
      'Особливо хочу відзначити [якість або навичку], які дозволили [Andrey Dumchev] досягти успіху в арбітражі трафіку. Він(вона) не боявся(лась) експериментувати, шукати нові підходи та вчитися на своїх помилках.',
    third:
      'Рекомендую [Andrey Dumchev] як перспективного фахівця з арбітражу трафіку, який(а) здатний(а) досягти високих результатів у цій сфері. Він(вона) має всі необхідні знання, навички та особисті якості для успішної карєри.',
  },
  notionLink: 'https://www.notion.so/1929866e4ed580828763e91a78fbc7c1?pvs=4',
  averageGrade: '12',
  isStandart: false,
};

export default function CertificatePage() {
  const t = useTranslations('');

  const [isStandartPack, setIsStandartPack] = useState(data.isStandart);
  const [showVideo, setShowVideo] = useState(false);

  const handleShowVideo = () => {
    setShowVideo(true);
  };

  // if (loading) {
  //   return (
  //     <section className={styles.vacancy}>
  //       <Link className={styles.link_wrap} href={`/${locale}/${query}`}>
  //         <Icon name="icon-back" width={24} height={24} />
  //         <span className={styles.link_text}>{t('Page.back')}</span>
  //       </Link>
  //       <div className={styles.dots_loading}>
  //         <span className={styles.dot}></span>
  //         <span className={styles.dot}></span>
  //         <span className={styles.dot}></span>
  //       </div>
  //     </section>
  //   );
  // }

  // if (error) {
  //   return (
  //     <section className={styles.vacancy}>
  //       <Link className={styles.link_wrap} href={`/${locale}/${query}`}>
  //         <Icon name="icon-back" width={24} height={24} />
  //         <span className={styles.link_text}>{t('Page.back')}</span>
  //       </Link>
  //       <p>{t('Page.error')}</p>
  //     </section>
  //   );
  // }

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
          className={`${styles.certificate_block} ${styles.certificate_block_main}`}
        >
          <h2 className={styles.certificate_header}>
            {t('CertPage.certificate')}
          </h2>
          <p className={styles.certificate_id}>
            {t('CertPage.certId')} <span>{data.id}</span>
          </p>
          <p className={styles.certificate_name_text}>
            {t('CertPage.nameText')}
          </p>
          <h2 className={styles.certificate_name}>{data.fullName}</h2>
          <p className={styles.certificate_name_bottom_text}>
            {t('CertPage.nameBottomText')}
          </p>
          <div className={styles.period_wrap}>
            <p className={styles.certificate_thread}>
              {t('CertPage.thread')} <span>{data.thread}</span>
            </p>
            <p className={styles.certificate_period}>
              {t('CertPage.period')} <span>{data.period}</span>
            </p>
          </div>
          <p className={styles.certificate_format}>
            {t('CertPage.format')} <span>{data.format}</span>
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
                  {t('CertPage.certId')} <span>{data.id}</span>
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
                {t('CertPage.certId')} <span>{data.id}</span>
              </p>
              <p className={styles.supplement_student}>
                {t('CertPage.student')} <span>{data.fullName}</span>
              </p>
              <p className={styles.supplement_thread}>
                {t('CertPage.thread')} <span>{data.thread}</span>
              </p>
              <p className={styles.supplement_period}>
                {t('CertPage.period')} <span>{data.period}</span>
              </p>
              <p className={styles.supplement_format}>
                {t('CertPage.format')} <span>{data.format}</span>
              </p>
              <h3 className={styles.supplement_curator_text}>
                {t('CertPage.curatorText')}
              </h3>
              <p className={styles.supplement_text}>{data.curatorText.first}</p>
              <p className={styles.supplement_text}>
                {data.curatorText.second}
              </p>
              <p className={styles.supplement_text}>{data.curatorText.third}</p>
            </div>
            <div className={styles.supplement_seo_wrap}>
              <p className={styles.supplement_seo_text}>
                <span className={styles.supplement_seo_name}>
                  {t('CertPage.curatorName')}
                </span>{' '}
                {t('CertPage.curator')}
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
          <div
            className={`${styles.certificate_block} ${styles.certificate_block_mentor}`}
          >
            <div className={styles.supplement_header_text_wrap}>
              <h3 className={styles.supplement_curator_text}>
                {t('CertPage.mentorText')}
              </h3>
              <p className={styles.supplement_text}>{data.mentorText.first}</p>
              <p className={styles.supplement_text}>{data.mentorText.second}</p>
              <p className={styles.supplement_text}>{data.mentorText.third}</p>
            </div>
            <div className={styles.supplement_seo_wrap}>
              <p className={styles.supplement_seo_text}>
                <span className={styles.supplement_seo_name}>
                  {t('CertPage.curatorName')}
                </span>{' '}
                {t('CertPage.mentor')}
              </p>
              <Image
                src={mentor_sign}
                alt="Mentor sign"
                className={styles.mentor_sign}
                width={0}
                height={0}
                sizes="100vw"
              />
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
                  <td className={styles.second_column}>100%</td>
                  <td className={styles.third_column}>12</td>
                </tr>
                <tr>
                  <td className={styles.first_column}>
                    {t('CertPage.lessons.first.first')}
                  </td>
                  <td className={styles.second_column}>100%</td>
                  <td className={styles.third_column}>12</td>
                </tr>
                <tr>
                  <td className={styles.first_column}>
                    {t('CertPage.lessons.first.second')}
                  </td>
                  <td className={styles.second_column}>100%</td>
                  <td className={styles.third_column}>12</td>
                </tr>
                <tr>
                  <td className={styles.first_column}>
                    {t('CertPage.lessons.first.third')}
                  </td>
                  <td className={styles.second_column}>100%</td>
                  <td className={styles.third_column}>12</td>
                </tr>
                <tr>
                  <td className={styles.first_column}>
                    {t('CertPage.lessons.first.fourth')}
                  </td>
                  <td className={styles.second_column}>100%</td>
                  <td className={styles.third_column}>12</td>
                </tr>
                <tr>
                  <td className={styles.first_column}>
                    {t('CertPage.lessons.first.fiveth')}
                  </td>
                  <td className={styles.second_column}>100%</td>
                  <td className={styles.third_column}>12</td>
                </tr>
                <tr>
                  <td className={styles.first_column}>
                    {t('CertPage.lessons.second.first')}
                  </td>
                  <td className={styles.second_column}>100%</td>
                  <td className={styles.third_column}>12</td>
                </tr>
                <tr>
                  <td className={styles.first_column}>
                    {t('CertPage.lessons.second.second')}
                  </td>
                  <td className={styles.second_column}>100%</td>
                  <td className={styles.third_column}>12</td>
                </tr>
                <tr>
                  <td className={styles.first_column}>
                    {t('CertPage.lessons.second.third')}
                  </td>
                  <td className={styles.second_column}>100%</td>
                  <td className={styles.third_column}>12</td>
                </tr>
                <tr>
                  <td className={styles.first_column}>
                    {t('CertPage.lessons.second.fourth')}
                  </td>
                  <td className={styles.second_column}>100%</td>
                  <td className={styles.third_column}>12</td>
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
                    {t('CertPage.lessons.second.fiveth')}
                  </td>
                  <td className={styles.second_column}>100%</td>
                  <td className={styles.third_column}>12</td>
                </tr>
                <tr>
                  <td className={styles.first_column}>
                    {t('CertPage.lessons.third.first')}
                  </td>
                  <td className={styles.second_column}>100%</td>
                  <td className={styles.third_column}>12</td>
                </tr>
                <tr>
                  <td className={styles.first_column}>
                    {t('CertPage.lessons.third.second')}
                  </td>
                  <td className={styles.second_column}>100%</td>
                  <td className={styles.third_column}>12</td>
                </tr>
                <tr>
                  <td className={styles.first_column}>
                    {t('CertPage.lessons.third.third')}
                  </td>
                  <td className={styles.second_column}>100%</td>
                  <td className={styles.third_column}>12</td>
                </tr>
                <tr>
                  <td className={styles.first_column}>
                    {t('CertPage.lessons.third.fourth')}
                  </td>
                  <td className={styles.second_column}>100%</td>
                  <td className={styles.third_column}>12</td>
                </tr>
                <tr>
                  <td className={styles.first_column}>
                    {t('CertPage.lessons.fourth.first')}
                  </td>
                  <td className={styles.second_column}>100%</td>
                  <td className={styles.third_column}>12</td>
                </tr>
                <tr>
                  <td className={styles.first_column}>
                    {t('CertPage.lessons.fourth.second')}
                  </td>
                  <td className={styles.second_column}>100%</td>
                  <td className={styles.third_column}>12</td>
                </tr>
                <tr>
                  <td className={styles.first_column}>
                    {t('CertPage.lessons.fourth.third')}
                  </td>
                  <td className={styles.second_column}>100%</td>
                  <td className={styles.third_column}>12</td>
                </tr>
                <tr>
                  <td className={styles.first_column}>
                    {t('CertPage.lessons.fiveth.first')}
                  </td>
                  <td className={styles.second_column}>100%</td>
                  <td className={styles.third_column}>12</td>
                </tr>
                <tr>
                  <td className={styles.first_column}>
                    {t('CertPage.lessons.fiveth.second')}
                  </td>
                  <td className={styles.second_column}>100%</td>
                  <td className={styles.third_column}>12</td>
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
                    {t('CertPage.lessons.fiveth.third')}
                  </td>
                  <td className={styles.second_column}>100%</td>
                  <td className={styles.third_column}>12</td>
                </tr>
                <tr>
                  <td className={styles.first_column}>
                    {t('CertPage.lessons.fiveth.fourth')}
                  </td>
                  <td className={styles.second_column}>100%</td>
                  <td className={styles.third_column}>12</td>
                </tr>
                <tr>
                  <td className={styles.first_column}>
                    {t('CertPage.lessons.fiveth.fiveth')}
                  </td>
                  <td className={styles.second_column}>100%</td>
                  <td className={styles.third_column}>12</td>
                </tr>
                <tr>
                  <td className={styles.first_column}>
                    {t('CertPage.lessons.sixth.first')}
                  </td>
                  <td className={styles.second_column}>100%</td>
                  <td className={styles.third_column}>12</td>
                </tr>
                <tr>
                  <td className={styles.first_column}>
                    {t('CertPage.lessons.sixth.second')}
                  </td>
                  <td className={styles.second_column}>100%</td>
                  <td className={styles.third_column}>12</td>
                </tr>
                <tr>
                  <td className={styles.first_column}>
                    {t('CertPage.lessons.sixth.third')}
                  </td>
                  <td className={styles.second_column}>100%</td>
                  <td className={styles.third_column}>12</td>
                </tr>
                <tr>
                  <td className={styles.first_column}>
                    {t('CertPage.lessons.sixth.fourth')}
                  </td>
                  <td className={styles.second_column}>100%</td>
                  <td className={styles.third_column}>12</td>
                </tr>
                <tr>
                  <td className={styles.first_column}>
                    {t('CertPage.lessons.sixth.fiveth')}
                  </td>
                  <td className={styles.second_column}>100%</td>
                  <td className={styles.third_column}>12</td>
                </tr>
                <tr>
                  <td className={styles.first_column}>
                    {t('CertPage.lessons.seventh.first')}
                  </td>
                  <td className={styles.second_column}>100%</td>
                  <td className={styles.third_column}>12</td>
                </tr>
              </tbody>
            </table>
            {!isStandartPack && (
              <>
                <p className={styles.notion_link}>
                  {t('CertPage.summary')}{' '}
                  <a
                    href={data.notionLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {data.notionLink}
                  </a>
                </p>
                <p className={styles.average_grade}>
                  {t('CertPage.averageGrade')} <span>{data.averageGrade}</span>
                </p>
              </>
            )}
          </div>
          <div
            className={`${styles.certificate_block} ${styles.certificate_block_video}`}
          >
            <div className={styles.certificate_video_main_wrap}>
              {!isStandartPack ? (
                <>
                  <h2 className={styles.card_header}>
                    {t('CertPage.videoReview')}
                  </h2>
                  <div className={styles.video_wrap}>
                    <iframe
                      className={styles.video}
                      // src={`https://www.youtube.com/embed/${
                      //   vacancy.YouTubeID
                      // }?autoplay=${showVideo ? '1' : '0'}&modestbranding=1`}
                      // allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
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
                      href={data.notionLink}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {data.notionLink}
                    </a>
                  </p>
                  <p className={styles.average_grade}>
                    {t('CertPage.averageGrade')}{' '}
                    <span>{data.averageGrade}</span>
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
                  {t('CertPage.certId')} <span>{data.id}</span>
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
    </section>
  );
}
