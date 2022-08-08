import React, { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  wsDuoAddToQueue, wsDuoExitFromQueue, wsDuoJoinPairQueue, wsDuoMoveDownQueue, wsDuoWin,
} from '../../Redux/Actions/wsAction';
import { useTodoContext } from '../Context/Contexts';


function Queue2v2() {
  try {
    const { queue, user } = useSelector((state) => state);
    const { socket } = useTodoContext();
    const dispatch = useDispatch();

    const duoAddToQueueHandler = (id) => {
      console.log('join queue button pressed');
      dispatch(wsDuoAddToQueue(socket, id));
    };

    const duoExitQueueHandler = (userId, type) => {
      console.log('exit button pressed    type:', type);
      let pairId;
      if (type === 'exit') {
        const pair = queue.find((el) => (user.id === el.Pair.user1_id || user.id === el.Pair.user2_id));
        pairId = pair.pair_id;
      }
      if (type === 'kick0') {
        pairId = queue[0].pair_id;
      }
      if (type === 'kick1') {
        pairId = queue[1].pair_id;
      }
      // console.log(pair);
      dispatch(wsDuoExitFromQueue(socket, userId, pairId));
    };

    const duoMoveDownHandler = (id) => {
      console.log('move down button pressed');
      const pair = queue.find((el) => (id === el.Pair.user1_id || id === el.Pair.user2_id));
      const pairId = pair.pair_id;
      dispatch(wsDuoMoveDownQueue(socket, pairId));
    };

    const joinPairQueueHandler = (userId, pairId) => {
      console.log('join pair button pressed');
      dispatch(wsDuoJoinPairQueue(socket, userId, pairId));
    };

    const duoWinHandler = (winnerPairId, loserPairId) => {
      console.log('win pressed');
      dispatch(wsDuoWin(socket, winnerPairId, loserPairId));
    };

    return (
      <>
        <div className="winner-btn-wrapper">
          { queue[0] && queue[0].Pair.user1_id !== null && queue[0].Pair.user2_id !== null && queue[1] && queue[1].Pair.user1_id !== null && queue[1].Pair.user2_id !== null ? (
            <button type="submit" className="winner-btn" onClick={() => duoWinHandler(queue[0].pair_id, queue[1].pair_id)}>Победил</button>
          ) : (
            <button type="submit" className="dis-winner-btn" disabled>Победил</button>
          )}
          { queue[0] && queue[0].Pair.user1_id !== null && queue[0].Pair.user2_id !== null && queue[1] && queue[1].Pair.user1_id !== null && queue[1].Pair.user2_id !== null ? (
            <button type="submit" className="winner-btn" onClick={() => duoWinHandler(queue[1].pair_id, queue[0].pair_id)}>Победил</button>
          ) : (
            <button type="submit" className="dis-winner-btn" disabled>Победил</button>
          )}
        </div>
        <div className="kick-btn-wrapper">
          { queue[0] && queue[0].Pair.user1_id !== null && queue[0].Pair.user2_id !== null ? (
            <button type="submit" className="kick-btn" onClick={() => duoExitQueueHandler(queue[0].Pair.user1_id, 'kick0')}>Не явился</button>
          ) : (
            <button type="submit" className="dis-kick-btn" disabled>Не явился</button>
          )}
          { queue[1] && queue[1].Pair.user1_id !== null && queue[1].Pair.user2_id !== null ? (
            <button type="submit" className="kick-btn" onClick={() => duoExitQueueHandler(queue[1].Pair.user1_id, 'kick1')}>Не явился</button>
          ) : (
            <button type="submit" className="dis-kick-btn" disabled>Не явился</button>
          )}
        </div>
        <div className="queue-wrapper">
          <img className="tennis-table-img" src="/images/table-tennis.png" alt="" />
          <div className="gamers-wrapper">
            <div className="gamers-wrapper-left">
              <div className="gamer">
                { queue.length > 0 && queue[0].Pair.user1_id !== null && queue[0].Pair.user2_id !== null && (
                <span>
                  {queue[0] && queue[0].Pair.user1.nickName}
                </span>
                )}
                {/* {!queue.length && (
                <span>
                  Свободно
                </span>
              )} */}
              </div>
              <div className="gamer">
                { queue.length > 0 && queue[0].Pair.user1_id !== null && queue[0].Pair.user2_id !== null && (
                <span>
                  {queue[0] && queue[0].Pair.user2.nickName}
                </span>
                )}
                {/* {queue.length < 2 && (
                <span>
                  Свободно
                </span>
              )} */}
              </div>
            </div>
            <div className="gamers-wrapper-right">
              <div className="gamer">
                { queue[1] && queue[1].Pair.user1_id !== null && queue[1].Pair.user2_id !== null && (
                <span>
                  {queue[1] && queue[1].Pair.user1.nickName}
                </span>
                )}
                {/* {queue.length < 3 && (
                <span>
                  Свободно
                </span>
              )} */}
              </div>
              <div className="gamer">
                { queue[1] && queue[1].Pair.user1_id !== null && queue[1].Pair.user2_id !== null && (
                <span>
                  {queue[1] && queue[1].Pair.user2.nickName}
                </span>
                )}
                {/* {queue.length < 4 && (
                <span>
                  Свободно
                </span>
              )} */}
              </div>
            </div>
          </div>
          <div className="kick-btn-wrapper">
            { queue[0] && queue[0].Pair.user1_id !== null && queue[0].Pair.user2_id !== null ? (
              <button type="submit" className="kick-btn" onClick={() => duoExitQueueHandler(queue[0].Pair.user2_id, 'kick0')}>Не явился</button>
            ) : (
              <button type="submit" className="dis-kick-btn" disabled>Не явился</button>
            )}
            { queue[1] && queue[1].Pair.user1_id !== null && queue[1].Pair.user2_id !== null ? (
              <button type="submit" className="kick-btn" onClick={() => duoExitQueueHandler(queue[1].Pair.user2_id, 'kick1')}>Не явился</button>
            ) : (
              <button type="submit" className="dis-kick-btn" disabled>Не явился</button>
            )}
          </div>
          {queue && queue.map((el, index) => {
            if ((queue[index].Pair.user1_id !== null && queue[index].Pair.user2_id !== null) && (index === 0 || index === 1)) {
              return (
                null
              );
            }
            return (
              <div className="queue-users-wrapper" key={el.id}>
                {el.Pair.user1_id !== null && (
                <div className="left-user">
                  { user.id !== el.Pair.user1_id && <button type="submit" className="user-btn">{el.Pair.user1.nickName}</button> }
                  { user.id === el.Pair.user1_id && <button type="submit" className="me-btn">{el.Pair.user1.nickName}</button> }
                </div>
                )}
                {el.Pair.user1_id === null && (
                <div className="left-user">
                  <button type="submit" className="empty-btn" onClick={() => joinPairQueueHandler(user.id, el.pair_id)}>Свободно</button>
                </div>
                )}
                <div><span>—</span></div>
                {el.Pair.user2_id !== null && (
                <div className="right-user">
                  { user.id !== el.Pair.user2_id && <button type="submit" className="user-btn">{el.Pair.user2.nickName}</button> }
                  { user.id === el.Pair.user2_id && <button type="submit" className="me-btn">{el.Pair.user2.nickName}</button> }
                </div>
                )}
                {el.Pair.user2_id === null && (
                <div className="right-user">
                  <button type="submit" className="empty-btn" onClick={() => joinPairQueueHandler(user.id, el.pair_id)}>Свободно</button>
                </div>
                )}
              </div>
            );
          })}
          {queue.find((el) => (user.id === el.Pair.user1_id || user.id === el.Pair.user2_id)) && (
          <div className="stay-to-queue-wrapper">
            {queue.indexOf(queue.find((el) => (user.id === el.Pair.user1_id || user.id === el.Pair.user2_id))) !== queue.length - 1 && <button type="submit" className="stay-to-queue-btn" onClick={() => duoMoveDownHandler(user.id)}>Пропустить очередь</button>}
            <button type="submit" className="stay-to-queue-btn" onClick={() => duoExitQueueHandler(user.id, 'exit')}>Выйти из очереди</button>
          </div>
          )}
          {!queue.find((el) => (user.id === el.Pair.user1_id || user.id === el.Pair.user2_id)) && (<button type="submit" className="stay-to-queue-btn" onClick={() => duoAddToQueueHandler(user.id)}>Встать в очередь</button>)}
        </div>
      </>
    );
  } catch (err) {
    console.log('ERRRRRRORRRRRRR------------>', err);
  }
}

export default Queue2v2;
