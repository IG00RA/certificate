'use client';
import styles from './Buttons.module.css';
import { useTranslations } from 'next-intl';

// Інтерфейс для пропсів компонента MainButton
interface MainButtonProps {
  margin: number;
  onClick: () => void;
}

// Компонент MainButton з типізацією пропсів
export default function MainButton({ margin, onClick }: MainButtonProps) {
  const t = useTranslations();
  return (
    <button
      style={{ marginTop: margin }}
      className={styles.main_button}
      type="button"
      onClick={onClick}
    >
      {t('Buttons.main')}
    </button>
  );
}
