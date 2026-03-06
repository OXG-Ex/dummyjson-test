import {FC} from 'react';
import styles from './page.module.scss';

interface LoginPageProps {}

const LoginPage: FC<LoginPageProps> = () => {
  return <div className={styles.login}>Login Page</div>;
};

export default LoginPage;
