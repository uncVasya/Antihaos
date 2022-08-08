const { Queue, User, Pair, QueueDuo } = require('../db/models');
const { DUO_ADD_TO_QUEUE } = require('../Types/type_server');

async function duoAddToQueue(mapQueue, params) {
  const userQueueId = params.id;
  const newpair = await Pair.create({
    user1_id: userQueueId,
    user2_id: null,
  });
  await QueueDuo.create({ pair_id: newpair.id });
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
  const message = { type: DUO_ADD_TO_QUEUE, params: { queue } };
  mapQueue.forEach((el) => {
    console.log('id user которому отправляются данные', el.userId);
    el.send(JSON.stringify(message));
  });
}
module.exports = duoAddToQueue;
