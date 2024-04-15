import { useEffect, useState } from 'react';
import axios, { AxiosError } from 'axios';
import { NewRequestData, RequestUserData, User } from '@/types';
import { Loader } from '@/components';
import { baseUrl } from '@/consts';

export const RequestForm = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [requestData, setRequestData] = useState<NewRequestData>({
    userId: '',
    title: ''
  });
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const getUsers: () => Promise<void> = async () => {
    try {
      const token = '123';
      const headers = { Authorization: `Bearer ${token}` };

      const response = await axios.get<RequestUserData[]>(`${baseUrl}/users`, {
        headers
      });

      if (!response.data) {
        throw new Error('No response');
      }

      const resultUsers: User[] = response.data.map((user: RequestUserData) => {
        return {
          id: user.id,
          username: user.username
        };
      });

      setUsers(resultUsers);
    } catch (error: unknown) {
      console.log(error);

      setError(((error as AxiosError).response?.data as { message: string })?.message);
    }
  };

  const onChangeTitleHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRequestData({ ...requestData, title: event.target.value });
  };

  const onChangeUserHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setRequestData({ ...requestData, userId: event.target.value });
  };

  const onFocusHandler = () => {
    setError('');
    setSuccess('');
  };

  const isDisabled = (requestData: NewRequestData) => {
    if (requestData.userId === '' || requestData.title === '') {
      return true;
    }
    return false;
  };

  const requestClickHandler: (event: React.MouseEvent<HTMLButtonElement>) => Promise<void> = async (
    event
  ) => {
    event.preventDefault();
    setIsLoading(true);
    await onRequest(requestData);
    setIsLoading(false);
  };

  const onRequest: (requestData: NewRequestData) => Promise<void> = async (requestData) => {
    try {
      const token = '123';
      const headers = { Authorization: `Bearer ${token}` };

      await axios.post<RequestUserData[]>(`${baseUrl}/requests`, requestData, {
        headers
      });

      setSuccess('Заявка успешно отправлена');
    } catch (error: unknown) {
      console.log(error);

      setError(((error as AxiosError).response?.data as { message: string })?.message);
    }
  };

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      await getUsers();
      setIsLoading(false);
    })();
  }, []);

  return (
    <>
      <h2>Форма для заявки</h2>
      {isLoading ? (
        <Loader />
      ) : (
        <form>
          <label htmlFor="user">ФИО конструктора</label>
          <select
            id="user"
            name="user"
            onFocus={onFocusHandler}
            onChange={(event: React.ChangeEvent<HTMLSelectElement>) => onChangeUserHandler(event)}
          >
            <option hidden> ФИО </option>
            {users.map((user: User) => {
              return (
                <option key={user.id} value={user.id}>
                  {user.username}
                </option>
              );
            })}
          </select>

          <label htmlFor="document">Наименование документа</label>
          <input
            id="document"
            type="text"
            name="document"
            placeholder="Документ"
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => onChangeTitleHandler(event)}
            onFocus={onFocusHandler}
          />

          <p>{error}</p>
          <p>{success}</p>

          <button
            type="submit"
            onClick={(event: React.MouseEvent<HTMLButtonElement>) => requestClickHandler(event)}
            disabled={isDisabled(requestData)}
          >
            Отправить заявку
          </button>
        </form>
      )}
    </>
  );
};
