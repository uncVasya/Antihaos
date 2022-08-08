import { CHANGE_MODE, GET_MODE } from '../Types/types';

const queueTypeReducer = (state = '', action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_MODE:
      return payload;
    case CHANGE_MODE:
      console.log('мы добавили режим в редакс');
      return payload;
    default:
      return state;
  }
};

export default queueTypeReducer;
