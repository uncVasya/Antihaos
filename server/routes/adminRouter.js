const router = require('express').Router();
const { User } = require('../db/models');

router.get('/', async (req, res) => {
  const users = await User.findAll({
    where: { role: 'user' },
    attributes: ['id', 'firstName', 'lastName', 'ban', 'active'],
    order: [
      ['firstName', 'ASC'],
    ],
  });
  console.log(JSON.parse(JSON.stringify(users)));
  res.json(users);
});

router.get('/ban', async (req, res) => {
  const users = await User.findAll({
    where: { role: 'user' },
    attributes: ['id', 'firstName', 'lastName', 'ban', 'active'],
    order: [
      ['firstName', 'ASC'],
    ],
  });
  console.log(JSON.parse(JSON.stringify(users)));
  res.json(users);
});

module.exports = router;
