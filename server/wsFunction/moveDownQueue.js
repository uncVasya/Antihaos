const { Queue, User } = require('../db/models');
const { MOVE_DOWN_QUEUE } = require('../Types/type_server');

async function moveDownQueue(mapQueue, params) {
  // console.log('13--------------------');
  const userQueueId = params.id;
  const notUpdQueue = await Queue.findAll(
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
  // console.log('ID of user to switch places ----->', userQueueId);
  const userIndex = notUpdQueue.findIndex((el) => el.user_id === userQueueId);
  const topUserId = notUpdQueue[userIndex].user_id;
  const botUserId = notUpdQueue[userIndex + 1].user_id;
  const topUser = await Queue.findOne({
    where: { user_id: topUserId },
  });
  const botUser = await Queue.findOne({
    where: { user_id: botUserId },
  });
  await topUser.update({ user_id: botUserId });
  await botUser.update({ user_id: topUserId });
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
  const message = { type: MOVE_DOWN_QUEUE, params: { queue } };
  mapQueue.forEach((el) => {
    console.log('id user которому отправляются данные', el.userId);
    el.send(JSON.stringify(message));
  });
}
module.exports = moveDownQueue;
