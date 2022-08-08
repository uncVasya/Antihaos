const { QueueDuo, User, Pair } = require('../db/models');
const { DUO_EXIT_FROM_QUEUE } = require('../Types/type_server');

async function duoExitFromQueue(mapQueue, params) {
  const { userId } = params;
  const { pairId } = params;
  const oldQueueEntry = await QueueDuo.findOne({
    where: { pair_id: pairId }, include: { model: Pair },
  });
  const oldPair = await Pair.findOne({ where: { id: pairId } });
  if (oldPair.user1_id === null || oldPair.user2_id === null) {
    await oldQueueEntry.destroy();
    await oldPair.destroy();
  } else {
    if (oldPair.user1_id === userId) {
      await oldPair.update({ user1_id: null });
    }
    if (oldPair.user2_id === userId) {
      console.log('adalkdad;kadlkadlkadl;adkadnaldnal');
      await oldPair.update({ user2_id: null });
    }
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

  const message = { type: DUO_EXIT_FROM_QUEUE, params: { queue } };
  mapQueue.forEach((el) => {
    console.log('id user которому отправляются данные', el.userId);
    el.send(JSON.stringify(message));
  });
}
module.exports = duoExitFromQueue;
