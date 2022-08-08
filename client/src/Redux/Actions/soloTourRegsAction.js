import axios from 'axios';
import { GET_SOLO_TOUR_REGS } from '../Types/types';

export const getSoloTour = (value) => ({
  type: GET_SOLO_TOUR_REGS,
  payload: value,
});

export const getSoloTourRegs = () => async (dispatch) => {
  try {
    console.log(({ url: '/tournaments/getsolotours' }));
    const response = await axios({ url: '/tournaments/getsolotours' });
    dispatch(getSoloTour(response.data));
  } catch (err) {
    console.log(err);
  }
};
