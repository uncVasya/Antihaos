import axios from 'axios';
import { GET_TOURNAMENT, GET_TOURNAMENTS } from '../Types/types';

export const Tournaments = (value) => ({
  type: GET_TOURNAMENTS,
  payload: value,
});

export const getTournaments = () => async (dispatch) => {
  try {
    const response = await axios({ url: 'tournaments' });
    dispatch(Tournaments(response.data));
  } catch (err) {
    console.log(err);
  }
};

export const Tournament = (value) => ({
  type: GET_TOURNAMENT,
  payload: value,
});

export const getTournament = (id) => async (dispatch) => {
  try {
    const response = await axios({ url: `tournaments/${id}` });
    dispatch(Tournament(response.data));
  } catch (err) {
    console.log(err);
  }
};
