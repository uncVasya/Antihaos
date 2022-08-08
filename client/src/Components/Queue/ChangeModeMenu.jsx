import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { wsChangeMode } from '../../Redux/Actions/wsAction';
import { useTodoContext } from '../Context/Contexts';
import './Queue.css';



function ChangeModeMenu() {
  const { queueType } = useSelector((state) => state);
  const { socket } = useTodoContext();
  const dispatch = useDispatch();


  const changeModeHandler = (mode, prevMode) => {
    console.log('button pressed');
    dispatch(wsChangeMode(socket, mode, prevMode));
  };

  return (
    <div className="change-mode-wrapper">

      <div className="menu-wrapper">
        { queueType !== '1 vs 1' && (
        <div className="menu-item-wrapper">

          <button type="submit" className="change-game-type-btn" onClick={() => changeModeHandler('1 vs 1', queueType)}>1 vs 1</button>

        </div>
        )}
        { queueType !== '2 vs 2' && (
        <div className="menu-item-wrapper">

          <button type="submit" className="change-game-type-btn" onClick={() => changeModeHandler('2 vs 2', queueType)}>2 vs 2</button>

        </div>
        )}
        { queueType !== 'circle' && (
        <div className="menu-item-wrapper">

          <button type="submit" className="change-game-type-btn">Круговая</button>

        </div>
        )}
      </div>

    </div>
  );
}

export default ChangeModeMenu;
