const e = require('express');
const {
  Queue, User, QueueType, QueueDuo, Pair,
} = require('../db/models');
const { CHANGE_MODE } = require('../Types/type_server');

async function changeMode(mapQueue, params) {
  const { mode, prevMode } = params;
  let queue = [];
  console.log(prevMode, 'change to', mode);
  const allModes = await QueueType.findAll();
  allModes.forEach(async (el) => {
    await el.update({ isActive: false });
  });
  const newMode = await QueueType.findOne({ where: { mode } });
  if (prevMode === '1 vs 1') {
    const oldQueue = await Queue.findAll({
      order: [
        ['id', 'ASC'],
      ],
    });
    await Queue.destroy({
      where: {},
      truncate: true,
    });
    if (mode === '2 vs 2') {
      for (const el of oldQueue) {
        const newpair = await Pair.create({
          user1_id: el.user_id,
          user2_id: null,
        });
        console.log('new pair ------->', JSON.parse(JSON.stringify(newpair)));
        const newqueue = await QueueDuo.create({ pair_id: newpair.id });
        console.log('newELEM ------------------>', JSON.parse(JSON.stringify(newqueue)));
      }
      queue = await QueueDuo.findAll({
        order: [
          ['id', 'ASC'],
        ],
        include: {
          model: Pair,
          include: [{ model: User, as: 'user1', attributes: { exclude: ['role', 'pass'] } }, { model: User, as: 'user2', attributes: { exclude: ['role', 'pass'] } }],
        },
      });
      console.log('QUEUE ------------------>', JSON.parse(JSON.stringify(queue)));
    }
  } else if (prevMode === '2 vs 2') {
    const oldQueue = await QueueDuo.findAll({
      order: [
        ['id', 'ASC'],
      ],
      include: { model: Pair },
    });
    console.log('OLDQUEUE------------->', JSON.parse(JSON.stringify(oldQueue)));
    await QueueDuo.destroy({
      where: {},
      truncate: true,
    });
    if (mode === '1 vs 1') {
      for (const el of oldQueue) {
        if (el.Pair.user1_id !== null) {
          console.log('user1----------->', el.Pair.user1_id);
          await Queue.create({ user_id: el.Pair.user1_id });
        }
        if (el.Pair.user2_id !== null) {
          console.log('user1----------->', el.Pair.user2_id);
          await Queue.create({ user_id: el.Pair.user2_id });
        }
      }
      queue = await Queue.findAll({
        order: [
          ['id', 'ASC'],
        ],
        include: {
          model: User,
          where: { role: 'user' },
          attributes: { exclude: ['role', 'pass'] },
        },
      });
      console.log('QUEUE ------------------>', JSON.parse(JSON.stringify(queue)));
    }
  } else {
    console.log('ooooooooooooooooops22222222222222');
  }

  await newMode.update({ isActive: true });
  const message = { type: CHANGE_MODE, params: { mode, queue } };
  mapQueue.forEach((el) => {
    console.log('id user которому отправляются данные', el.userId);
    // console.log(JSON.parse(JSON.stringify(message)));
    el.send(JSON.stringify(message));
  });
}

module.exports = changeMode;
