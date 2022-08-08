import { GET_TOURNAMENT } from '../Types/types';

const tournamentReducer = (state = [], action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_TOURNAMENT:

      return payload;

    default:
      return state;
  }
};

export default tournamentReducer;
