import { GET_DUO_RANKS } from '../Types/types';

const duoRankReducer = (state = [], action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_DUO_RANKS:

      return payload;

    default:
      return state;
  }
};

export default duoRankReducer;
