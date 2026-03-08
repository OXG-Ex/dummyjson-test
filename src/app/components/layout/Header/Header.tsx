'use client';

import {useAuthStore} from '@/app/shared/store/authStore';
import {LogOut} from 'lucide-react';
import Link from 'next/link';
import {useRouter} from 'next/navigation';
import {useEffect} from 'react';
import {Button} from '../../ui/Button/Button';
import {Txt} from '../../ui/Txt/Txt';
import styles from './Header.module.scss';

export const Header: React.FC = () => {
  const router = useRouter();
  const {isAuthenticated, user, logout, hydrateFromStorage} = useAuthStore();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      hydrateFromStorage();
    }
  }, []);

  const logoutHandler = () => {
    logout();
    router.refresh();
  };

  return (
    <header className={styles.header}>
      <Txt weight="bold">DummyJSON Shop</Txt>
      <div>
        {!isAuthenticated && <Link href="/login">Login</Link>}
        {isAuthenticated && user && (
          <div className={styles.user}>
            <Txt>
              {user.firstName} {user.lastName}
            </Txt>
            <Button onClick={logoutHandler} iconLeft={<LogOut size={20} />} size="sm">
              Logout
            </Button>
          </div>
        )}
      </div>
    </header>
  );
};
