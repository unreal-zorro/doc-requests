import { RequestForm } from './modules/request-form';
import { RequestTable } from './modules/request-table';

export const RequestPage = () => {
  return (
    <>
      <h1>Страница заявок</h1>
      <RequestForm />
      <RequestTable />
    </>
  );
};
