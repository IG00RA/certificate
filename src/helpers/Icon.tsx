import styles from './Icon.module.css';

interface IconProps {
  name: string;
  width?: number | string;
  height?: number | string;
  color?: string;
  className?: string;
}

const Icon: React.FC<IconProps> = ({
  name,
  width = 24,
  height = 24,
  color = 'currentColor',
  className,
}) => {
  // Функція для обробки розмірів
  const getSize = (size: number | string): string => {
    if (typeof size === 'number') {
      return `${size}px`;
    }
    return size;
  };

  return (
    <svg
      className={`${className} ${styles.icon}`}
      width={getSize(width)}
      height={getSize(height)}
      fill={color}
    >
      <use href={`/assets/icons.svg#${name}`} />
    </svg>
  );
};

export default Icon;
