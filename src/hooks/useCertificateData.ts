'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';

export interface CertificateData {
  uuid: string | null;
  fullName: string;
  streamNumber: number | null;
  startDate: string;
  endDate: string;
  tariff: string;
  videoReview: string;
  caseLink: string;
  certStatus: 'valid' | 'discontinued' | 'cancelled' | null;
  averageGradePoints: string;
}

const hostBack = process.env.NEXT_PUBLIC_ADMIN_HOST_BACK;

export function useCertificateData() {
  const { id } = useParams();
  const [certificateData, setCertificateData] =
    useState<CertificateData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${hostBack}/api/certificates/${id}`);
        if (!response.ok) {
          throw new Error('Не вдалося отримати дані');
        }
        const fetchedData: CertificateData = await response.json();

        // Витягуємо ID відео з URL
        const videoId = extractYouTubeId(fetchedData.videoReview);

        setCertificateData({
          uuid: fetchedData.uuid,
          fullName: fetchedData.fullName,
          streamNumber: fetchedData.streamNumber,
          startDate: fetchedData.startDate,
          endDate: fetchedData.endDate,
          tariff: fetchedData.tariff,
          videoReview: videoId,
          caseLink: fetchedData.caseLink,
          certStatus: fetchedData.certStatus,
          averageGradePoints: fetchedData.averageGradePoints,
        });
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchData();
    }
  }, [id]);

  return { certificateData, loading, error };
}

// Функція для витягування ID відео з YouTube URL
function extractYouTubeId(url: string): string {
  const regex =
    /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
  const match = url.match(regex);
  return match ? match[1] : '';
}
