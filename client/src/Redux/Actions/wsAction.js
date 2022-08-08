import {
  ADD_TO_QUEUE, CHANGE_MODE, DUO_ADD_TO_QUEUE, DUO_EXIT_FROM_QUEUE, DUO_JOIN_PAIR_QUEUE, DUO_MOVE_DOWN_QUEUE, DUO_WIN_QUEUE, EXIT_FROM_QUEUE, MOVE_DOWN_QUEUE, WIN,
} from '../Types/types';

export const wsSendStart = (ws) => async (dispatch) => {
  console.log('wsSendStart----------->>', ws);
  ws.send(JSON.stringify({ type: 'START', params: {} }));
};

export const wsAddToQueue = (ws, id) => async (dispatch) => {
  console.log('wsAddToQueue----------->>', 'user_id:', id, 'ws:', ws);
  ws.send(JSON.stringify({ type: ADD_TO_QUEUE, params: { id } }));
};

export const wsExitFromQueue = (ws, id) => async (dispatch) => {
  console.log('wsExitFromQueue----------->>', 'user_id:', id, 'ws:', ws);
  ws.send(JSON.stringify({ type: EXIT_FROM_QUEUE, params: { id } }));
};

export const wsMoveDownQueue = (ws, id) => async (dispatch) => {
  console.log('wsMoveDownQueue----------->>', 'user_id:', id, 'ws:', ws);
  ws.send(JSON.stringify({ type: MOVE_DOWN_QUEUE, params: { id } }));
};

export const wsWin = (ws, winnerId, loserId) => async (dispatch) => {
  console.log('wsWin----------->>', 'winner_id:', winnerId, 'loser_id:', loserId, 'ws:', ws);
  ws.send(JSON.stringify({ type: WIN, params: { winnerId, loserId } }));
};

export const wsChangeMode = (ws, mode, prevMode) => async (dispatch) => {
  console.log('wsChangeMode----------->>', 'mode:', mode, 'prevMode', prevMode, 'ws:', ws);
  ws.send(JSON.stringify({ type: CHANGE_MODE, params: { mode, prevMode } }));
};

export const wsDuoAddToQueue = (ws, id) => async (dispatch) => {
  console.log('wsDuoAddToQueue----------->>', 'user_id:', id, 'ws:', ws);
  ws.send(JSON.stringify({ type: DUO_ADD_TO_QUEUE, params: { id } }));
};

export const wsDuoExitFromQueue = (ws, userId, pairId) => async (dispatch) => {
  console.log('wsDuoExitFromQueue----------->>', 'user_id:', userId, 'pair_id:', pairId, 'ws:', ws);
  ws.send(JSON.stringify({ type: DUO_EXIT_FROM_QUEUE, params: { userId, pairId } }));
};

export const wsDuoJoinPairQueue = (ws, userId, pairId) => async (dispatch) => {
  console.log('wsDuoJoinPairQueue----------->>', 'user_id:', userId, 'pair_id:', pairId, 'ws:', ws);
  ws.send(JSON.stringify({ type: DUO_JOIN_PAIR_QUEUE, params: { userId, pairId } }));
};

export const wsDuoMoveDownQueue = (ws, pairId) => async (dispatch) => {
  console.log('wsDuoMoveDownQueue----------->>', 'pair_id:', pairId, 'ws:', ws);
  ws.send(JSON.stringify({ type: DUO_MOVE_DOWN_QUEUE, params: { pairId } }));
};

export const wsDuoWin = (ws, winnerPairId, loserPairId) => async (dispatch) => {
  console.log('wsDuoWin----------->>', 'winner_pair_id:', winnerPairId, 'loser_pair_id:', loserPairId, 'ws:', ws);
  ws.send(JSON.stringify({ type: DUO_WIN_QUEUE, params: { winnerPairId, loserPairId } }));
};



