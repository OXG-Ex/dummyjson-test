'use client';

import {useAuthStore} from '@/app/shared/store/authStore';
import {Txt} from '../../ui/Txt/Txt';
import styles from './Footer.module.scss';

const year = new Date().getFullYear();

export const Footer: React.FC = () => {
  const {isAuthenticated, user} = useAuthStore();

  return (
    <footer className={styles.footer}>
      <Txt color="contrast" weight="bold">
        {isAuthenticated && user ? `${year} Logged as ${user.email}` : year}
      </Txt>
    </footer>
  );
};
