import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { Row, Col } from 'reactstrap';
import { addTournament } from '../../Redux/Actions/addTournamentAction';
import { getTournament, getTournaments } from '../../Redux/Actions/tournamentsAction';
import CurentTournaments from '../CurentTournaments/CurentTournaments';
import './Tournament.css';

function Tournaments() {
  const dispatch = useDispatch();
  const { tournaments, addTourn, user } = useSelector((state) => state);
  const [inputs, setInputs] = useState({});
  const ref = useRef();
  useEffect(() => {
    if (!tournaments.length) {
      dispatch(getTournaments());
    }
  }, []);

  const inputHandler = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const submitHandler = (e) => {
    e.preventDefault(); // перехват чтобы страница не пергружалась
    dispatch(addTournament({ ...inputs, mode: ref.current.value }));
    setInputs({});
  };


  return (
    <div className="addtournament-wrapper">
      {(user.role === 'admin') && (
      <form onSubmit={submitHandler}>
        <div className="tournament-name-wrapper">
          <label htmlFor="tournament-name" className="form-label">Название турнира</label>
          <input onChange={inputHandler} value={inputs.name || ''} name="name" type="text" className="form-control" id="tournament-name" />
        </div>
        <div className="tournament-select-wrapper">
          <select ref={ref} className="form-select" aria-label="Default select example" defaultValue="Тип турнира">
            <option value="1х1">1х1</option>
            <option value="2х2">2х2</option>
          </select>
        </div>
        <div className="tournament-start-wrapper">
          <label htmlFor="startDate">Дата начала турнира</label>
          <input onChange={inputHandler} name="date" id="startDate" className="form-control" type="date" />
        </div>
        <div className="tournament-time-wrapper">
          <label htmlFor="tournament-time" className="form-label margin-0">Первая игра</label>
          <div className="tournament-time-inputs-wrapper">
            <input name="firsthours" type="text" className="form-control tournament-time-input" id="tournament-time" placeholder="13" />
            <p className="margin-0">:</p>
            <input name="firstminutes" type="text" className="form-control tournament-time-input" placeholder="10" />
          </div>
        </div>
        <div className="tournament-time-wrapper">
          <label htmlFor="tournament-time" className="form-label margin-0">Последняя игра</label>
          <div className="tournament-time-inputs-wrapper">
            <input name="lasthours" type="text" className="form-control tournament-time-input" id="tournament-time" placeholder="13" />
            <p className="margin-0">:</p>
            <input name="lastminutes" type="text" className="form-control tournament-time-input" placeholder="50" />
          </div>
        </div>
        <div className="tournament-btn-wrapper">
          <button type="submit" className="create-tournament-btn">Создать</button>
        </div>
      </form>
      )}
      <CurentTournaments />
    </div>
  );
}

export default Tournaments;
