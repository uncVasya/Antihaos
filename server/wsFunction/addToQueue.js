const { Queue, User } = require('../db/models');
const { ADD_TO_QUEUE } = require('../Types/type_server');

async function addToQueue(mapQueue, params) {
  // console.log('13--------------------');
  const userQueueId = params.id;
  await Queue.create({ user_id: userQueueId });
  const queue = await Queue.findAll(
    {
      order: [
        ['id', 'ASC'],
      ],
      include: {
        model: User,
        where: { role: 'user' },
        attributes: { exclude: ['role', 'pass'] },
      },
    },
  );

  console.log('oтправляем очередь', JSON.parse(JSON.stringify(queue)));
  const message = { type: ADD_TO_QUEUE, params: { queue } };
  mapQueue.forEach((el) => {
    console.log('id user которому отправляются данные', el.userId);
    el.send(JSON.stringify(message));
  });
}
module.exports = addToQueue;
