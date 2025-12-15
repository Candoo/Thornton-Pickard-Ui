import styles from './Card.module.scss';

interface CardContentProps {
  title?: string;
  children: React.ReactNode;
}

export const CardContent: React.FC<CardContentProps> = ({
  children,
  title,
}) => {
  return (
    <div className={styles['card-content']}>
      {title && <h3 className={styles['card-content-title']}>{title}</h3>}
      {children}
    </div>
  );
};
