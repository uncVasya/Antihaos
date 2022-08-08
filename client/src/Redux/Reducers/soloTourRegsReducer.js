import { GET_SOLO_TOUR_REGS } from '../Types/types';

const soloTourRegsReducer = (state = [], action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_SOLO_TOUR_REGS:

      return payload;

    default:
      return state;
  }
};

export default soloTourRegsReducer;
