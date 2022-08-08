import {
  ADD_TO_QUEUE, CHANGE_MODE, CHANGE_QUEUE, DUO_JOIN_PAIR_QUEUE, EXIT_FROM_QUEUE, GET_QUEUE, MOVE_DOWN_QUEUE, WIN,
} from '../Types/types';

const getQueueReducer = (state = [], action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_QUEUE:
      return payload;

    case ADD_TO_QUEUE:
      console.log('мы запушили юзера в редакс', state);
      return payload;

    case MOVE_DOWN_QUEUE:
      console.log('мы поменяли юзеров местами в редаксе', state);
      return payload;

    case EXIT_FROM_QUEUE:
      console.log('мы удалили юзера из редакса', state);
      return payload;
    case DUO_JOIN_PAIR_QUEUE:
      console.log('мы заполнили пару', state);
      return payload;
    case WIN:
      console.log('мы удалили проигравшего из редакса', state);
      return payload;
    case CHANGE_QUEUE:
      console.log('мы добавили очередь в редакс', state);
      return payload;
    default:
      return state;
  }
};

export default getQueueReducer;
