const {
  Queue, User, QueueType, QueueDuo, Pair,
} = require('../db/models');

async function getQueueAndMode(mapQueue) {
  const mode = await QueueType.findOne({ where: { isActive: true } });
  let queue = [];
  if (mode.mode === '1 vs 1') {
    queue = await Queue.findAll(
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
  } if (mode.mode === '2 vs 2') {
    queue = await QueueDuo.findAll({
      order: [
        ['id', 'ASC'],
      ],
      include: {
        model: Pair,
        include: [{ model: User, as: 'user1', attributes: { exclude: ['role', 'pass'] } }, { model: User, as: 'user2', attributes: { exclude: ['role', 'pass'] } }],
      },
    });
  } else {
    console.log('alkdaldknaldknaldknalodknalodalodknaoldknalodna');
  }

  const message = { type: 'START', params: { queue, mode: mode.mode } };
  console.log('отправляем данные на ', mapQueue);
  mapQueue.forEach((el) => {
    console.log('---------------------------------------\n', JSON.stringify(message));
    el.send(JSON.stringify(message));
  });
}
module.exports = getQueueAndMode;
