import { NextApiRequest, NextApiResponse } from 'next';
import path from 'path';
import fs from 'fs';
import { statSync } from 'fs';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { id, file } = req.query as { id: string; file: string };

    // Базовий шлях до директорії з файлами
    const baseDir = path.join(process.cwd(), 'public', 'uploads', id);
    const filePath = path.join(baseDir, file);

    // Перевіряємо, чи існує файл
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ error: 'File not found' });
    }

    // Визначаємо Content-Type
    let contentType: string;
    if (file.endsWith('.pdf')) {
      contentType = 'application/pdf';
    } else if (file.endsWith('.jpeg') || file.endsWith('.jpg')) {
      contentType = 'image/jpeg';
    } else {
      return res.status(400).json({ error: 'Unsupported file type' });
    }

    // Отримуємо розмір файлу
    const stats = statSync(filePath);

    // Встановлюємо заголовки
    res.setHeader('Content-Type', contentType);
    res.setHeader('Content-Length', stats.size.toString());
    res.setHeader('Content-Disposition', 'inline');

    // Створюємо потік і передаємо його в відповідь
    const fileStream = fs.createReadStream(filePath);
    fileStream.pipe(res);
  } catch (error) {
    console.error('Error serving file:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
