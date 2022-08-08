import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { approveNewUsers } from '../../Redux/Actions/approveNewUsersAction';
import { getAllUsers } from '../../Redux/Actions/getAllUsersAction';
import './Admin.css';

function Admin() {
  const checkboxRef = useRef();
  const dispatch = useDispatch();

  const { allUsers } = useSelector((state) => state);
  useEffect(() => {
    dispatch(getAllUsers());
  }, []);
  /*   const [users, setToppings] = useState(allToppings) */
  /*   const submitHandler = (e) => {
    e.preventDefault();
    dispatch(approveNewUsers({ ...inputs }));
  }; */

  /*   const save = () => {
    console.log(checkboxRef.current.checked);

  }; */

  return (
    <div className="add-user-admin-wrapper">
      <h3>Подтверждение пользователей</h3>
      <form>
        <div className="add-user-list">
          {allUsers.map((el) => {
            if (!el.active) {
              return (
                <p key={el.id}>
                  <input className="add-user-admin-checkbox" type="checkbox" id={el.id} name="id" value={el.id} />
                  <label className="add-user-admin-item" htmlFor={el.id}>
                    {el.firstName}
                    {' '}
                    {el.lastName}
                  </label>
                </p>
              );
            }
            return null;
          })}
        </div>
        <button className="add-to-tournament-btn" type="submit">Подтвердить</button>
      </form>
    </div>
  );
}

export default Admin;
