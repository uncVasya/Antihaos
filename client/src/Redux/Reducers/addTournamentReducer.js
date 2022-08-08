import { ADD_TOURNAMENT } from '../Types/types';

const addTournamentReducer = (state = [], action) => {
  const { type, payload } = action;
  switch (type) {
    case ADD_TOURNAMENT:

      return [...state, payload];

    default:
      return state;
  }
};

export default addTournamentReducer;
