/** @type {import('next').NextConfig} */

import createNextIntlPlugin from 'next-intl/plugin';
import { URL } from 'url';

const withNextIntl = createNextIntlPlugin();

// Отримуємо URL бекенду з змінної оточення
const backendUrl = process.env.NEXT_PUBLIC_ADMIN_HOST_BACK;

// Перевіряємо, чи визначена змінна оточення
if (!backendUrl) {
  throw new Error('NEXT_PUBLIC_ADMIN_HOST_BACK is not defined');
}

// Вилучаємо хостнейм із URL
const backendHostname = new URL(backendUrl).hostname;

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: backendHostname,
        pathname: '/uploads/**', // Дозволяємо всі файли в /uploads
      },
    ],
  },
};

export default withNextIntl(nextConfig);
