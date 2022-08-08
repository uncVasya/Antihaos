const router = require('express').Router();
const { User } = require('../db/models');

router.get('/get/solo/rankings', async (req, res) => {
  const users = await User.findAll({
    where: { role: 'user' },
    attributes: { exclude: ['role', 'pass', 'duorank', 'duowon', 'duolost'] },
    order: [
      ['solorank', 'DESC'],
    ],
  });
  console.log(JSON.parse(JSON.stringify(users)));
  res.json(users);
});

router.get('/get/duo/rankings', async (req, res) => {
  const users = await User.findAll({
    where: { role: 'user' },
    attributes: { exclude: ['role', 'pass', 'solorank', 'solowon', 'sololost'] },
    order: [
      ['duorank', 'DESC'],
    ],
  });
  console.log(JSON.parse(JSON.stringify(users)));
  res.json(users);
});

module.exports = router;
