import {Txt} from '../Txt/Txt';
import styles from './ErrorMessage.module.scss';

interface Props {
  message: string;
  details?: string;
}

export const ErrorMessage: React.FC<Props> = ({message, details}) => {
  return (
    <div className={styles.container}>
      <Txt color="danger">{message}</Txt>
      {details && <Txt color="danger">{details}</Txt>}
    </div>
  );
};
