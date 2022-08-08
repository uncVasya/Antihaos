import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsers } from '../../Redux/Actions/getAllUsersAction';
import './Admin.css';

function AdminBan() {
  const dispatch = useDispatch();
  const { allUsers } = useSelector((state) => state);
  useEffect(() => {
    dispatch(getAllUsers());
  }, []);
  return (
    <div className="ban-user-admin-wrapper">
      <div className="ban-header">
        <h3>Забанить пользователей</h3>
      </div>
      <div className="ban-user-list">
        {allUsers.map((el) => (
          <div key={el.id} className="ban-user-admin-item">
            <div className="ban-user-admin-name">
              <p className="ban-user-name">
                {el.firstName}
              </p>
              <p className="ban-user-lastName">
                {el.lastName}
              </p>
            </div>
            <div className="ban-user-admin-btn-wrapper">
              {!el.ban && <button className="ban-user-admin-btn" type="button">Ban</button>}
              {el.ban && <button className="unban-user-admin-btn" type="button">Unban</button>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminBan;
