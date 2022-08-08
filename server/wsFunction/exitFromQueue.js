const { Queue, User } = require('../db/models');
const { EXIT_FROM_QUEUE } = require('../Types/type_server');

async function exitFromQueue(mapQueue, params) {
  // console.log('13--------------------');
  const userQueueId = params.id;
  await Queue.destroy({ where: { user_id: userQueueId } });
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

  const message = { type: EXIT_FROM_QUEUE, params: { queue } };
  mapQueue.forEach((el) => {
    console.log('id user которому отправляются данные', el.userId);
    el.send(JSON.stringify(message));
  });
}
module.exports = exitFromQueue;
