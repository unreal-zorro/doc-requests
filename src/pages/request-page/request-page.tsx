import { NavLink, Outlet } from 'react-router-dom';

export const RequestPage = () => {
  return (
    <>
      <h1>Страница заявок</h1>

      <nav>
        <ul>
          <li>
            <NavLink to={''}>Форма для отправки заявок</NavLink>
          </li>
          <li>
            <NavLink to={'table'}>Таблица с информацией о заявках</NavLink>
          </li>
        </ul>
      </nav>

      <Outlet />
    </>
  );
};
