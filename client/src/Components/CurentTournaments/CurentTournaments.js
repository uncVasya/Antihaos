import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { Col, Row } from 'reactstrap';
import { getTournaments } from '../../Redux/Actions/tournamentsAction';
import './CurentTournaments.css';

function CurentTournaments() {
  const dispatch = useDispatch();
  const { tournaments } = useSelector((state) => state);
  useEffect(() => {
    if (!tournaments.length) {
      dispatch(getTournaments());
    }
  }, []);

  return (
    <>
      { tournaments.map((el) => (el.reg === true) && (
        <div key={el.id} className="tournament-btn-wrapper">
          <Link to={`/tournaments/registration/${el.id}`}>
            <button type="submit" className="registration-btn">
              Регистрация на турнир
              {' '}
              {el.mode}
            </button>
          </Link>
        </div>
      ))}
      {tournaments.map((el) => (el.reg === false) && (
        <div key={el.id} className="tournament-btn-wrapper">
          <div className="tournament-wrapper" key={el.id}><Link className="tournament-item-link" to={`/tournaments/${el.id}`}><div className="tournament-item">{el.name}</div></Link></div>
        </div>
      ))}
    </>
  );
}

export default CurentTournaments;
