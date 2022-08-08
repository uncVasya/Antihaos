import {
  createContext, useState, useEffect, useCallback, useMemo, useContext,
} from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import {
  addToQueue, changeMode, changeQueue, deleteFromQueue, duoJoinPairQueue, Mode, moveDownQueue, Queue, win,
} from '../../Redux/Actions/getQueueAction';
import {
  ADD_TO_QUEUE, CHANGE_MODE, DUO_ADD_TO_QUEUE, DUO_EXIT_FROM_QUEUE, DUO_JOIN_PAIR_QUEUE, DUO_MOVE_DOWN_QUEUE, DUO_WIN_QUEUE, EXIT_FROM_QUEUE, MOVE_DOWN_QUEUE, START, WIN,
} from '../../Redux/Types/types';


const TodoContext = createContext();
console.log(process.env.REACT_APP_WS_URL);

export default function TodoContextProvider({ children }) {
  // const { queue, user } = useSelector((state) => state);
  const { id } = useSelector((state) => state.user);
  const [socket, setSocket] = useState({});
  // console.log('1---socket---TodoContextProvider---', socket);
  const dispatch = useDispatch();

  useEffect(() => {
    if (id) {
      setSocket(new WebSocket(process.env.REACT_APP_WS_URL));
      console.log('2--------------------');
    }
  }, [id]);

  const [readyState, setReadyState] = useState();
  console.log(readyState);
  socket.onopen = function (e) {
    console.log('socket opened');
    setReadyState(socket.readyState);
    console.log('in on open', socket.readyState);
    // console.log(socket);
  };

  socket.onmessage = function (event) {
    console.log(`Получены данные ${event.data}`);
    console.log('4--------------------');
    const { type, params } = JSON.parse(event.data);
    const { queue, mode } = params;
    switch (type) {
      case START:
        dispatch(Mode(mode));
        dispatch(Queue(queue));
        break;
      case ADD_TO_QUEUE:
        dispatch(addToQueue(queue));
        break;
      case DUO_ADD_TO_QUEUE:
        dispatch(addToQueue(queue));
        break;
      case EXIT_FROM_QUEUE:
        dispatch(deleteFromQueue(queue));
        break;
      case DUO_EXIT_FROM_QUEUE:
        dispatch(deleteFromQueue(queue));
        break;
      case DUO_JOIN_PAIR_QUEUE:
        dispatch(duoJoinPairQueue(queue));
        break;
      case MOVE_DOWN_QUEUE:
        dispatch(moveDownQueue(queue));
        break;
      case DUO_MOVE_DOWN_QUEUE:
        dispatch(moveDownQueue(queue));
        break;
      case WIN:
        dispatch(win(queue));
        break;
      case DUO_WIN_QUEUE:
        dispatch(win(queue));
        break;
      case CHANGE_MODE:
        dispatch(changeMode(mode));
        dispatch(changeQueue(queue));
        break;
      default:
        console.log('error switch context');
        break;
    }
  };


  socket.onclose = function (event) {
    if (event.wasClean) {
      console.log(`[close] Connection closed cleanly, code=${event.code} reason=${event.reason}`);
    } else {
      console.log('[close] Connection died');
    }
  };

  return (
    <TodoContext.Provider value={{ socket, readyState }}>
      {children}

    </TodoContext.Provider>
  );
}

export const useTodoContext = () => useContext(TodoContext);
