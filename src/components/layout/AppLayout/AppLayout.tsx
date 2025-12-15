import styles from './AppLayout.module.scss';
import { Outlet } from 'react-router-dom';

export const AppLayout = () => {
  return (
    <div className={styles['appLayout']}>
      <div className={styles['appLayout-container']}>
        <Outlet />
      </div>
    </div>
  );
};
