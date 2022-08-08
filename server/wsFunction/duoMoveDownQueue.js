const { User, QueueDuo, Pair } = require('../db/models');
const { DUO_MOVE_DOWN_QUEUE } = require('../Types/type_server');

async function duoMoveDownQueue(mapQueue, params) {
  const { pairId } = params;
  const notUpdQueue = await QueueDuo.findAll({
    order: [
      ['id', 'ASC'],
    ],
    include: {
      model: Pair,
      include: [{ model: User, as: 'user1', attributes: { exclude: ['role', 'pass'] } }, { model: User, as: 'user2', attributes: { exclude: ['role', 'pass'] } }],
    },
  });
  // console.log('ID of user to switch places ----->', userQueueId);
  const pairIndex = notUpdQueue.findIndex((el) => el.pair_id === pairId);
  const topPairId = notUpdQueue[pairIndex].pair_id;
  const botPairId = notUpdQueue[pairIndex + 1].pair_id;
  const topPair = await QueueDuo.findOne({
    where: { pair_id: topPairId },
  });
  const botPair = await QueueDuo.findOne({
    where: { pair_id: botPairId },
  });
  await topPair.update({ pair_id: botPairId });
  await botPair.update({ pair_id: topPairId });
  const queue = await QueueDuo.findAll({
    order: [
      ['id', 'ASC'],
    ],
    include: {
      model: Pair,
      include: [{ model: User, as: 'user1', attributes: { exclude: ['role', 'pass'] } }, { model: User, as: 'user2', attributes: { exclude: ['role', 'pass'] } }],
    },
  });
  // console.log('Our queue users to switch places ----->', JSON.parse(JSON.stringify(queue[userIndex])), JSON.parse(JSON.stringify(queue[userIndex + 1])));
  const message = { type: DUO_MOVE_DOWN_QUEUE, params: { queue } };
  mapQueue.forEach((el) => {
    console.log('id user которому отправляются данные', el.userId);
    el.send(JSON.stringify(message));
  });
}
module.exports = duoMoveDownQueue;
