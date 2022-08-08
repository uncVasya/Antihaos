import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { userLogOut } from '../../Redux/Actions/signAction';
import { useTodoContext } from '../Context/Contexts';
import './TopMenu.css';

export default function TopMenu() {
  const { user } = useSelector((state) => state);
  const { socket } = useTodoContext();
  const dispatch = useDispatch();
  const logOutHAndler = (e) => {
    // e.preventDefault();
    dispatch(userLogOut());
    socket.close();
  };
  return (
    <div className="header">
      <div className="logo-wrapper">
        <Link to="/queue"><img src="/images/logo.svg" alt="" /></Link>
      </div>
      <div className="menu-item-wrapper">
        {!user.name
          && (
            <ul>
              <div className="auth-menu-wrapper">
                <div className="auth-menu-item-wrapper">
                  <li>
                    <Link to="/signin"><button type="submit" className="change-game-type-btn">Войти</button></Link>
                  </li>
                </div>
                <div className="auth-menu-item-wrapper">
                  <li>
                    <Link to="/signup"><button type="submit" className="logout-btn">Регистрация</button></Link>
                  </li>
                </div>
              </div>
            </ul>
          )}
        {user.name
          ? (
            <div className="topmenu-wrapper">
              {/* <div className="topmenu-wrapper-text">
                <p>
                  Привет,
                  {user.name}
                </p>
              </div> */}
              <div className="topmenu-wrapper-btn">
                <Link to="/signin"><button type="submit" className="logout-btn" onClick={logOutHAndler}>Выйти</button></Link>
              </div>
            </div>
          )

          : ''}
      </div>
    </div>
  );
}
