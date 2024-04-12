import { useRouteError } from 'react-router-dom';

export const ErrorPage = () => {
  const error: Error | Response = useRouteError() as Error | Response;

  return (
    <div id="error-page">
      <h1>Ошибка</h1>
      <p>Извините, произошла непредвиденная ошибка.</p>
      <p>
        <i>{(error as Error).message || (error as Response).statusText}</i>
      </p>
    </div>
  );
};
