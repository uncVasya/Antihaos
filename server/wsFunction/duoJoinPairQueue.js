const { User, Pair, QueueDuo } = require('../db/models');
const { DUO_JOIN_PAIR_QUEUE } = require('../Types/type_server');

async function duoJoinPairQueue(mapQueue, params) {
  const { userId, pairId } = params;
  const pair = await Pair.findOne({ where: { id: pairId } });
  const user1Check = await Pair.findOne({ where: { user1_id: userId } });
  const user2Check = await Pair.findOne({ where: { user2_id: userId } });
  if (user1Check) {
    await user1Check.update({ user1_id: null });
    if (user1Check.user2_id === null) {
      user1Check.destroy();
    }
  }
  if (user2Check) {
    await user2Check.update({ user2_id: null });
    if (user2Check.user1_id === null) {
      user2Check.destroy();
    }
  }
  console.log('OUR PAIR ----------->', JSON.parse(JSON.stringify(pair)));
  if (pair.user1_id === null) {
    await pair.update({ user1_id: userId });
  } else {
    console.log('updatiiiiiiiiiing');
    await pair.update({ user2_id: userId });
  }
  const queue = await QueueDuo.findAll({
    order: [
      ['id', 'ASC'],
    ],
    include: {
      model: Pair,
      include: [{ model: User, as: 'user1', attributes: { exclude: ['role', 'pass'] } }, { model: User, as: 'user2', attributes: { exclude: ['role', 'pass'] } }],
    },
  });
  console.log('oтправляем очередь', JSON.parse(JSON.stringify(queue)));
  const message = { type: DUO_JOIN_PAIR_QUEUE, params: { queue } };
  mapQueue.forEach((el) => {
    console.log('id user которому отправляются данные', el.userId);
    el.send(JSON.stringify(message));
  });
}
module.exports = duoJoinPairQueue;
