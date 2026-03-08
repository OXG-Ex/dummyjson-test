'use client';

import {zodResolver} from '@hookform/resolvers/zod';
import {FC} from 'react';
import {FormProvider, SubmitHandler, useForm} from 'react-hook-form';
import {z} from 'zod';
import {Button} from '../../ui/Button/Button';
import {FormField} from '../../ui/FormField/FormField';

import {useAuthStore} from '@/app/shared/store/authStore';
import {KeyRound, LogIn, User} from 'lucide-react';
import {ErrorMessage} from '../../ui/ErrorMessage/ErrorMessage';
import {Txt} from '../../ui/Txt/Txt';
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
  const {login, isLoading, error} = useAuthStore();
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
        <Txt variant="title" weight="bold">
          Login form
        </Txt>

        <div className={styles.fieldsWrapper}>
          <FormField<LoginFormValues>
            name="username"
            label="Username:"
            type="text"
            placeholder="Your username here"
            iconLeft={<User size={20} />}
          />

          <FormField<LoginFormValues>
            name="password"
            label="Password:"
            type="password"
            placeholder="Your password here"
            iconLeft={<KeyRound size={20} />}
          />
        </div>

        {error && <ErrorMessage message={error} />}
        <Button
          type="submit"
          variant="primary"
          size="md"
          isLoading={isLoading}
          iconLeft={<LogIn />}
          className={styles.loginButton}
        >
          Login
        </Button>
      </form>
    </FormProvider>
  );
};
