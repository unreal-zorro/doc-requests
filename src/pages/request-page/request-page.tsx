import { NavLink, Outlet } from 'react-router-dom';

export const RequestPage = () => {
  return (
    <>
      <h1>Страница заявок</h1>

      <nav>
        <ul>
          <li>
            <NavLink to={''}>Форма для заявки</NavLink>
          </li>
          <li>
            <NavLink to={'table'}>Сводная таблица</NavLink>
          </li>
        </ul>
      </nav>

      <Outlet />
    </>
  );
};
