/** @type {import('next').NextConfig} */

import createNextIntlPlugin from 'next-intl/plugin';
import { URL } from 'url'; // Імпортуємо модуль url для парсингу URL

const withNextIntl = createNextIntlPlugin();

// Отримуємо URL бекенду з змінної оточення
const backendUrl = process.env.NEXT_PUBLIC_ADMIN_HOST_BACK;

// Перевіряємо, чи визначена змінна оточення
if (!backendUrl) {
  throw new Error('NEXT_PUBLIC_ADMIN_HOST_BACK is not defined');
}

// Вилучаємо хостнейм із URL
const backendHostname = new URL(backendUrl).hostname;

// Налаштовуємо конфігурацію з дозволеними доменами для зображень
const nextConfig = {
  images: {
    domains: [backendHostname],
  },
};

export default withNextIntl(nextConfig);
