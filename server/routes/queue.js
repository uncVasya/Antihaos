const router = require('express').Router();
const { Queue, User, QueueType } = require('../db/models');

router.get('/getqueue', async (req, res) => {
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
  // console.log(queue);
  res.json(queue);
});

router.put('/movedown/:idTop/:idBot', async (req, res) => {
  const userTop = await Queue.findOne({ where: { user_id: req.params.idTop } });
  const userBot = await Queue.findOne({ where: { user_id: req.params.idBot } });
  await userTop.update({ user_id: req.params.idBot });
  await userBot.update({ user_id: req.params.idTop });
  res.sendStatus(200);
});

router.get('/getmode', async (req, res) => {
  const mode = await QueueType.findOne({
    where: { isActive: true },
  });
  res.json(mode.mode);
});

module.exports = router;
