import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import './Menu.css';

function Menu() {
  const { user } = useSelector((state) => state);
  return (
    <div className="menu-wrapper">
      {user.role === 'user'
        && (
          <>
            <div className="menu-item-wrapper">
              <Link to="/rankings/solo"><img className="menu-img" src="/images/ratingSvg.svg" alt="rating" /></Link>
            </div>
            <div className="menu-item-wrapper">
              <Link to="/queue"><img className="menu-img" src="/images/queueSvg.svg" alt="queue" /></Link>
            </div>
            <div className="menu-item-wrapper">
              <Link to="/tournaments"><img className="menu-img" src="/images/tournamentSvg.svg" alt="tournaments" /></Link>
            </div>
          </>
        )}
      {
        user.role === 'hallManager' && (
          <>
            <div className="menu-item-wrapper">
              <Link to="/rankings/solo"><img className="menu-img" src="/images/ratingSvg.svg" alt="rating" /></Link>
            </div>
            <div className="menu-item-wrapper">
              <Link to="/queue"><img className="menu-img" src="/images/queueSvg.svg" alt="queue" /></Link>
            </div>
            <div className="menu-item-wrapper">
              <Link to="/tournaments"><img className="menu-img" src="/images/tournamentSvg.svg" alt="tournaments" /></Link>
            </div>
          </>
        )
}
      {
        user.role === 'admin' && (
        <>
          <div className="menu-item-wrapper">
            <Link to="/tournaments"><img className="menu-img" src="/images/tournamentSvg.svg" alt="tournaments" /></Link>
          </div>
          <div className="menu-item-wrapper">
            <Link to="/admin"><img className="menu-img" src="/images/approve.svg" alt="approve" /></Link>
          </div>
          <div className="menu-item-wrapper">
            <Link to="/admin/ban"><img className="menu-img" src="/images/ban.svg" alt="ban" /></Link>
          </div>
        </>
        )
          }
    </div>
  );
}

export default Menu;
