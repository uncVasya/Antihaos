import { GET_TOURNAMENT_REGISTRATION_LIST } from '../Types/types';

const getTournamentListReducer = (state = [], action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_TOURNAMENT_REGISTRATION_LIST:

      return payload;

    default:
      return state;
  }
};

export default getTournamentListReducer;
