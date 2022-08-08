/* import axios from 'axios';
import { APPROVE_USERS } from '../Types/types';

export const newUsers = (value) => ({
  type: APPROVE_USERS,
  payload: value,
});

export const approveNewUsers = () => async (dispatch) => {
  try {
    const response = await axios({ url: 'admin' });
    dispatch(newUsers(response.data));
  } catch (err) {
    console.log(err);
  }
};


export const setTournament = (value) => ({
  type: ADD_TOURNAMENT,
  payload: value,
});
export const addTournament = (value) => async (dispatch) => {
  console.log(value);
  await axios.post('/tournaments/addtournament', value).then((res) => dispatch(setTournament(res.data)));
};
 */
