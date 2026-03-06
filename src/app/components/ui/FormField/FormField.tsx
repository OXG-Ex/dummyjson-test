'use client';

import React from 'react';
import {useFormContext, type FieldValues, type Path} from 'react-hook-form';
import styles from './FormField.module.scss';

interface FormFieldProps<T extends FieldValues> {
  name: Path<T>;
  label: string;
  type?: React.HTMLInputTypeAttribute;
  placeholder?: string;
}

export const FormField = <T extends FieldValues>({name, label, type = 'text', placeholder}: FormFieldProps<T>) => {
  const {
    register,
    formState: {errors},
  } = useFormContext<T>();

  const fieldError = (errors[name]?.message ?? '') as string | undefined;

  return (
    <div className={styles.field}>
      <label className={styles.label} htmlFor={name}>
        {label}
      </label>

      <input
        id={name}
        type={type}
        placeholder={placeholder}
        className={`${styles.input} ${fieldError ? styles.inputError : ''}`}
        aria-invalid={!!fieldError}
        aria-describedby={fieldError ? `${name}-error` : undefined}
        {...register(name)}
      />

      {fieldError && (
        <span id={`${name}-error`} className={styles.error}>
          {fieldError}
        </span>
      )}
    </div>
  );
};
