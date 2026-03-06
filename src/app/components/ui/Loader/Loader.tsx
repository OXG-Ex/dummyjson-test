import styles from './Loader.module.scss';

export type LoaderSize = 'sm' | 'md' | 'lg';

export interface LoaderProps {
  size?: LoaderSize;
}

export const Loader: React.FC<LoaderProps> = ({size = 'md'}) => {
  const classes = [styles.loader, styles[`size_${size}`]].filter(Boolean).join(' ');

  return <span className={classes} aria-hidden="true" />;
};
