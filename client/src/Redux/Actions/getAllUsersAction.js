import axios from 'axios';
import { GET_ALL_USERS } from '../Types/types';

export const allUsers = (value) => ({
  type: GET_ALL_USERS,
  payload: value,
});

export const getAllUsers = () => async (dispatch) => {
  try {
    const response = await axios({ url: 'admin' });
    dispatch(allUsers(response.data));
    console.log('----------->', response.data);
  } catch (err) {
    console.log(err);
  }
};

export const getAllUsersBan = () => async (dispatch) => {
  try {
    const response = await axios({ url: 'admin/ban' });
    dispatch(allUsers(response.data));
    console.log('----------->', response.data);
  } catch (err) {
    console.log(err);
  }
};
