'use client';

import React, {ReactNode} from 'react';
import {useFormContext, type FieldValues, type Path} from 'react-hook-form';
import {Txt} from '../Txt/Txt';
import styles from './FormField.module.scss';

interface FormFieldProps<T extends FieldValues> {
  name: Path<T>;
  label: string;
  type?: React.HTMLInputTypeAttribute;
  placeholder?: string;
  iconLeft?: ReactNode;
}

export const FormField = <T extends FieldValues>({
  name,
  label,
  iconLeft,
  type = 'text',
  placeholder,
}: FormFieldProps<T>) => {
  const {
    register,
    formState: {errors},
  } = useFormContext<T>();

  const fieldError = (errors[name]?.message ?? '') as string | undefined;

  return (
    <div className={styles.field}>
      <Txt color="muted" htmlFor={name}>
        {label}
      </Txt>

      <div className={styles.inputWrapper}>
        {iconLeft && <span className={styles.iconLeft}>{iconLeft}</span>}

        <input
          id={name}
          type={type}
          placeholder={placeholder}
          className={`${styles.input} ${fieldError ? styles.inputError : ''} ${iconLeft ? styles.inputWithIcon : ''}`}
          aria-invalid={!!fieldError}
          aria-describedby={fieldError ? `${name}-error` : undefined}
          {...register(name)}
        />
      </div>

      {fieldError && (
        <Txt id={`${name}-error`} className={styles.errorMessage} variant="caption" color="danger">
          {fieldError}
        </Txt>
      )}
    </div>
  );
};
