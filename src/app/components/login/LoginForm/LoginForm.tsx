'use client';

import {zodResolver} from '@hookform/resolvers/zod';
import {FC} from 'react';
import {FormProvider, SubmitHandler, useForm} from 'react-hook-form';
import {z} from 'zod';
import {Button} from '../../ui/Button/Button';
import {FormField} from '../../ui/FormField/FormField';

import {useAuthStore} from '@/app/shared/store/authStore';
import styles from './LoginForm.module.scss';

const loginSchema = z.object({
  username: z
    .string()
    .min(1, {message: 'username required'})
    .min(3, {message: 'username should contains at least 3 symbols'}),
  password: z
    .string()
    .min(1, {message: 'Password required'})
    .min(3, {message: 'Password should contains at least 3 symbols'}),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export const LoginForm: FC = () => {
  const {login} = useAuthStore();
  const methods = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: '',
      password: '',
    },
    mode: 'onBlur',
  });

  const handleSubmit: SubmitHandler<LoginFormValues> = async ({username, password}) => {
    await login(username, password);
  };

  return (
    <FormProvider {...methods}>
      <form className={styles.form} onSubmit={methods.handleSubmit(handleSubmit)} noValidate>
        <FormField<LoginFormValues> name="username" label="Username" type="text" placeholder="Your username here" />

        <FormField<LoginFormValues> name="password" label="Password" type="password" placeholder="Your password here" />

        <Button type="submit" variant="primary" size="md" style={{marginTop: 8}}>
          Login
        </Button>
      </form>
    </FormProvider>
  );
};
