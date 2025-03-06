// useCertificateData.ts
'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';

interface Lesson {
  lesson: string;
  tests: number[] | null; // Значення тестів у відсотках (цілі числа) або null
  homework: number[] | null; // Значення домашніх завдань (цілі числа) або null
}

// Тип для grades
interface Grades {
  lessons: Lesson[];
}

export interface CertificateData {
  uuid: string | null;
  fullName: string;
  streamNumber: number | null;
  startDate: string;
  endDate: string;
  tariff: string;
  grades: Grades | null;
  averageGradePoints: number | null;
  recommendationsMentor: string;
  recommendationsCurator: string;
  videoReview: string;
  caseLink: string;
}

const hostBack = process.env.NEXT_PUBLIC_ADMIN_HOST_BACK;

export function useCertificateData() {
  const { id } = useParams(); // Отримуємо id з URL
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

        setCertificateData({
          uuid: fetchedData.uuid,
          fullName: fetchedData.fullName,
          streamNumber: fetchedData.streamNumber,
          startDate: fetchedData.startDate,
          endDate: fetchedData.endDate,
          tariff: fetchedData.tariff,
          grades: fetchedData.grades,
          averageGradePoints: fetchedData.averageGradePoints,
          recommendationsMentor: fetchedData.recommendationsMentor,
          recommendationsCurator: fetchedData.recommendationsCurator,
          videoReview: fetchedData.videoReview,
          caseLink: fetchedData.caseLink,
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
