import axios from 'axios';
import {
  ADD_TO_QUEUE, GET_QUEUE, EXIT_FROM_QUEUE, MOVE_DOWN_QUEUE, WIN, CHANGE_MODE, GET_MODE, CHANGE_QUEUE, DUO_JOIN_PAIR_QUEUE,
} from '../Types/types';

export const Queue = (value) => ({
  type: GET_QUEUE,
  payload: value,
});

export const Mode = (value) => ({
  type: GET_MODE,
  payload: value,
});

export const getQueue = () => async (dispatch) => {
  try {
    const response = await axios({ url: 'queue/getqueue' });
    dispatch(Queue(response.data));
  } catch (err) {
    console.log(err);
  }
};

export const getMode = () => async (dispatch) => {
  try {
    const response = await axios({ url: 'queue/getmode' });
    dispatch(Mode(response.data));
  } catch (err) {
    console.log(err);
  }
};

export const addToQueue = (value) => {
  console.log('------', value);
  return {
    type: ADD_TO_QUEUE,
    payload: value,
  };
};

export const deleteFromQueue = (value) => {
  console.log('------', value);
  return {
    type: EXIT_FROM_QUEUE,
    payload: value,
  };
};

export const moveDownQueue = (value) => {
  console.log('------', value);
  return {
    type: MOVE_DOWN_QUEUE,
    payload: value,
  };
};

export const win = (value) => {
  console.log('------', value);
  return {
    type: WIN,
    payload: value,
  };
};

export const changeQueue = (value) => {
  console.log('------', value);
  return {
    type: CHANGE_QUEUE,
    payload: value,
  };
};

export const changeMode = (value) => {
  console.log('------', value);
  return {
    type: CHANGE_MODE,
    payload: value,
  };
};

export const duoJoinPairQueue = (value) => {
  console.log('------', value);
  return {
    type: DUO_JOIN_PAIR_QUEUE,
    payload: value,
  };
};

