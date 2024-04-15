import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import axios, { AxiosError } from 'axios';
import type { AuthData, User } from '@/types';
import { setUser } from '@/redux';
import { Loader } from '@/components';
import { baseUrl } from '@/consts';

export const AuthForm = () => {
  const [authData, setAuthData] = useState<AuthData>({
    username: '',
    password: ''
  });
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>, name: string) => {
    if (name === 'username') {
      setAuthData({ ...authData, username: event.target.value });
    } else if (name === 'password') {
      setAuthData({ ...authData, password: event.target.value });
    }
  };

  const onFocusHandler = (event: React.FocusEvent<HTMLInputElement>) => {
    event.target.select();

    setError('');
  };

  const isDisabled = (authData: AuthData) => {
    if (authData.username === '' || authData.password === '') {
      return true;
    }
    return false;
  };

  const loginClickHandler: (event: React.MouseEvent<HTMLButtonElement>) => Promise<void> = async (
    event
  ) => {
    event.preventDefault();
    setIsLoading(true);
    await onLogin(authData);
    setIsLoading(false);
  };

  const onLogin: (authData: AuthData) => Promise<void> = async (authData) => {
    try {
      const response = await axios.post<User>(`${baseUrl}/login`, authData);

      if (!response.data) {
        throw new Error('No response');
      }

      dispatch(setUser({ id: response.data.id, username: response.data.username }));

      navigate('/request');
    } catch (error: unknown) {
      console.log(error);

      setError(((error as AxiosError).response?.data as { message: string })?.message);
    }
  };

  return (
    <>
      <h2>Форма входа</h2>

      {isLoading ? (
        <Loader />
      ) : (
        <form>
          <label htmlFor="username">Имя пользователя</label>
          <input
            id="username"
            type="text"
            name="username"
            placeholder="Имя"
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              onChangeHandler(event, 'username')
            }
            onFocus={onFocusHandler}
          />

          <label htmlFor="password">Пароль</label>
          <input
            id="password"
            type="text"
            name="password"
            placeholder="Пароль"
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              onChangeHandler(event, 'password')
            }
            onFocus={onFocusHandler}
          />

          <p>{error}</p>

          <button
            type="submit"
            onClick={(event: React.MouseEvent<HTMLButtonElement>) => loginClickHandler(event)}
            disabled={isDisabled(authData)}
          >
            Войти
          </button>
        </form>
      )}
    </>
  );
};
