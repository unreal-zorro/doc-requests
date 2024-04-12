import { NavLink, Outlet } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <>
      <nav>
        <ul>
          <li>
            <NavLink to={''}>Страница авторизации</NavLink>
          </li>
          <li>
            <NavLink to={'request'}>Страница заявок</NavLink>
          </li>
        </ul>
      </nav>

      <Outlet />
    </>
  );
}

export default App;
