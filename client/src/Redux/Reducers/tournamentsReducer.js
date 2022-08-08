import { GET_TOURNAMENTS } from '../Types/types';

const tournamentsReducer = (state = [], action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_TOURNAMENTS:

      return payload;

    default:
      return state;
  }
};

export default tournamentsReducer;
