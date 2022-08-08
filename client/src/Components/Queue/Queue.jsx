import React, { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  Button, Col, Form, FormGroup, Input, Row,
} from 'reactstrap';

import { getMode, getQueue } from '../../Redux/Actions/getQueueAction';
import {
  wsAddToQueue, wsChangeMode, wsExitFromQueue, wsMoveDownQueue, wsSendStart, wsWin,
} from '../../Redux/Actions/wsAction';
import { useTodoContext } from '../Context/Contexts';
import ChangeModeMenu from './ChangeModeMenu';
import Queue1v1 from './Queue1v1';
import Queue2v2 from './Queue2v2';


function Queue() {
  const { queue, user, queueType } = useSelector((state) => state);
  const { socket, readyState } = useTodoContext();
  const dispatch = useDispatch();
  useEffect(() => {
    console.log('---useEffect---');
    if (!queue.length && readyState === 1) {
      dispatch(wsSendStart(socket));
    }
    if (!queueType && readyState === 1) {
      dispatch(getMode());
    }
  }, [readyState]);



  return (
    <>
      <ChangeModeMenu />
      { queueType === '1 vs 1' && <Queue1v1 /> }
      { queueType === '2 vs 2' && <Queue2v2 /> }
    </>
  );
}

export default Queue;
