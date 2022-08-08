import axios from 'axios';
import { GET_TOURNAMENT_REGISTRATION_LIST } from '../Types/types';

export const RegistrationList = (value) => ({
  type: GET_TOURNAMENT_REGISTRATION_LIST,
  payload: value,
});

export const getRegistrationList1v1 = (id) => async (dispatch) => {
  try {
    const response = await axios({ url: `tournaments/${id}/registration` });
    dispatch(RegistrationList(response.data));
  } catch (err) {
    console.log(err);
  }
};

export const getRegistrationList2v2 = (id) => async (dispatch) => {
  try {
    const response = await axios({ url: `tournaments/${id}/registration` });
    dispatch(RegistrationList(response.data));
  } catch (err) {
    console.log(err);
  }
};
