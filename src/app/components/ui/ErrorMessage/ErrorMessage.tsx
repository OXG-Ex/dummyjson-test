import styles from './ErrorMessage.module.scss';

interface Props {
  message: string;
}

export const ErrorMessage: React.FC<Props> = ({message}) => {
  return <div className={styles.error}>{message}</div>;
};
