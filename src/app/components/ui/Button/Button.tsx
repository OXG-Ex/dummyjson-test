'use client';

import React, {ReactNode} from 'react';
import {Loader} from '../Loader/Loader';
import styles from './Button.module.scss';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  iconLeft?: ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  disabled,
  children,
  className = '',
  ...rest
}) => {
  const isDisabled = disabled || isLoading;

  const classes = [
    styles.button,
    styles[`variant_${variant}`],
    styles[`size_${size}`],
    isDisabled ? styles.disabled : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button className={classes} disabled={isDisabled} {...rest}>
      {isLoading && <Loader size="sm" />}
      <span className={styles.label}>{children}</span>
    </button>
  );
};
