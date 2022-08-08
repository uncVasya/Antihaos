import { GET_SOLO_RANKS } from '../Types/types';

const soloRankReducer = (state = [], action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_SOLO_RANKS:

      return payload;

    default:
      return state;
  }
};

export default soloRankReducer;
