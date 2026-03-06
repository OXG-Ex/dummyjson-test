'use client';

import {useAuthStore} from '@/app/shared/store/authStore';
import styles from './Footer.module.scss';

const year = new Date().getFullYear();

export const Footer: React.FC = () => {
  const {isAuthenticated, user} = useAuthStore();

  return (
    <footer className={styles.footer}>{isAuthenticated && user ? `${year} Logged as ${user.email}` : year}</footer>
  );
};
