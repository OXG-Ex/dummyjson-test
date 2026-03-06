'use client';

import {useAuthStore} from '@/app/shared/store/authStore';
import Link from 'next/link';
import {useEffect} from 'react';
import styles from './Header.module.scss';

export const Header: React.FC = () => {
  const {isAuthenticated, user, logout, hydrateFromStorage} = useAuthStore();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      hydrateFromStorage();
    }
  }, []);

  return (
    <header className={styles.header}>
      <div>DummyJSON Shop</div>
      <div>
        {!isAuthenticated && <Link href="/login">Login</Link>}
        {isAuthenticated && user && (
          <>
            <span>
              {user.firstName} {user.lastName}
            </span>
            <button type="button" onClick={logout}>
              Logout
            </button>
          </>
        )}
      </div>
    </header>
  );
};
