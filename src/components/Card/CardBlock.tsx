import styles from './Card.module.scss';

interface CardBlockProps {
  title?: string;
  children: React.ReactNode;
}

export const CardBlock: React.FC<CardBlockProps> = ({ title, children }) => {
  return (
    <div className={styles.card}>
      {title && <h2 className={styles['card-title']}>{title}</h2>}
      {children}
    </div>
  );
};
