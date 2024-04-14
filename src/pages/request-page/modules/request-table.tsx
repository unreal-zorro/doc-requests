import { useEffect, useState } from 'react';
import axios, { AxiosError } from 'axios';
import { RequestCount, RequestData } from '@/types';
import { Loader } from '@/components';

export const RequestTable = () => {
  const [result, setResult] = useState<RequestCount[]>([]);
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const getTableData: () => Promise<void> = async () => {
    try {
      const token = '123';
      const headers = {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      };

      const response = await axios.get<RequestData[]>('http://localhost:8000/requests', {
        headers
      });

      if (!response.data) {
        throw new Error('No response');
      }

      const resultData = new Map();

      response.data.forEach((request: RequestData) => {
        if (resultData.has(request.title)) {
          resultData.set(request.title, {
            id: request.id,
            title: request.title,
            count: resultData.get(request.title).count + 1
          });
        } else {
          resultData.set(request.title, {
            id: request.id,
            title: request.title,
            count: 1
          });
        }
      });

      setResult(Object.values(Object.fromEntries(resultData)));
    } catch (error: unknown) {
      console.log(error);

      setError(((error as AxiosError).response?.data as { message: string })?.message);
    }
  };

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      await getTableData();
      setIsLoading(false);
    })();
  }, []);

  return (
    <>
      <h2>Сводная таблица</h2>

      {isLoading ? (
        <Loader />
      ) : (
        <>
          <table>
            <thead>
              <tr>
                <th>Наименование документа</th>
                <th>Количество заявок</th>
              </tr>
            </thead>

            <tbody>
              {result.map((item: RequestCount) => (
                <tr key={item.id}>
                  <td>{item.title}</td>
                  <td>{item.count}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p>{error}</p>
        </>
      )}
    </>
  );
};
