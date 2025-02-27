// import board from '../img/main/board.webp';

import { StaticImageData } from 'next/image';

interface Shapes {
  [key: string]: StaticImageData[];
  circle: StaticImageData[];
  rectangle: StaticImageData[];
  square: StaticImageData[];
  triangle: StaticImageData[];
}

export const linkItems = [
  { label: 'Links.hr', href: '/' },
  { label: 'Links.curator', href: '/' },
];

export const socialItems = [
  { icon: 'icon-tg', link: 'https://t.me/usaffiliate' },
  { icon: 'icon-youtube', link: 'https://www.youtube.com/@usaffiliate' },
  { icon: 'icon-tik', link: 'https://www.tiktok.com/@mustage.io' },
  { icon: 'icon-insta', link: 'https://www.instagram.com/mustage.team/' },
];
