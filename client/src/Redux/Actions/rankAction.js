import axios from 'axios';
import { GET_DUO_RANKS, GET_SOLO_RANKS } from '../Types/types';

export const soloRanks = (value) => ({
  type: GET_SOLO_RANKS,
  payload: value,
});

export const getSoloRanks = () => async (dispatch) => {
  try {
    const response = await axios({ url: 'users/get/solo/rankings' });
    dispatch(soloRanks(response.data));
  } catch (err) {
    console.log(err);
  }
};

export const duoRanks = (value) => ({
  type: GET_DUO_RANKS,
  payload: value,
});

export const getDuoRanks = () => async (dispatch) => {
  try {
    const response = await axios({ url: 'users/get/duo/rankings' });
    dispatch(duoRanks(response.data));
  } catch (err) {
    console.log(err);
  }
};
