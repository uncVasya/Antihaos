import axios from 'axios';
import { ADD_TOURNAMENT } from '../Types/types';

export const setTournament = (value) => ({
  type: ADD_TOURNAMENT,
  payload: value,
});

export const addTournament = (value) => async (dispatch) => {
  console.log(value);
  await axios.post('/tournaments/addtournament', value).then((res) => dispatch(setTournament(res.data)));
};
