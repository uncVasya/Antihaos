import { ADD_USER_TO_TOURNAMENT } from '../Types/types';

const duoRankReducer = (state = [], action) => {
  const { type, payload } = action;
  switch (type) {
    case ADD_USER_TO_TOURNAMENT:

      return [...state, payload];

    default:
      return state;
  }
};

export default duoRankReducer;
