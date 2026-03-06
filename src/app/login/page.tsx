'use client';
import {FC, useEffect} from 'react';

import {useRouter} from 'next/navigation';
import {LoginForm} from '../components/login/LoginForm/LoginForm';
import {useAuthStore} from '../shared/store/authStore';
import styles from './page.module.scss';

const LoginPage: FC = () => {
  const router = useRouter();
  const {isAuthenticated} = useAuthStore();
  useEffect(() => {
    if (isAuthenticated) {
      router.replace('/');
    }
  }, [isAuthenticated, router]);

  return (
    <div className={styles.login}>
      <div className={styles.left}>
        <div className={styles.form}>
          <LoginForm />
        </div>
      </div>
      <div className={styles.right}>ABOBA</div>
    </div>
  );
};

export default LoginPage;
