const bcrypt = require('bcrypt');
const router = require('express').Router();
const { User } = require('../db/models');
// const { checkLogin } = require('../middleWare/middleWare');

router.route('/')
  .get(async (req, res) => {
    res.json({});
  });

router.route('/signout')
  .get((req, res) => {
    console.log('<<----- GET запрос на уничт сессии и чистку КУКов');
    req.session.destroy();
    res.clearCookie('sID').sendStatus(200);
  });

router.route('/signin')
  .post(async (req, res) => {
    const { nickName, pass } = req.body;
    console.log(`<<----- Пришел POST запрос на авторизацию nickName-${nickName}, pass-${pass}`);
    if (nickName && pass) {
      const user = await User.findOne({ where: { nickName } });
      if (user && await bcrypt.compare(pass, user.pass)) {
        req.session.user = { name: user.nickName, id: user.id, role: user.role };
        console.log(`----->> Отправляем через res.json - session.user - - nickName - ${user.nickName}, user.id - ${user.id}, user.role - ${user.role}`);
        return res.json({ name: user.nickName, id: user.id, role: user.role });
      }
      return res.sendStatus(402);
    }
    return res.sendStatus(403);
  });

router.route('/signup')
  .post(async (req, res) => {
    const {
      nickName, pass, firstName, lastName,
    } = req.body;
    console.log(`<<----- Пришел POST запрос на регистрацию nickName-${nickName}, pass-${pass}`);
    if (nickName && pass && firstName && lastName) {
      const user1 = await User.findOne({ where: { nickName } });
      if (user1) {
        return res.sendStatus(401);
      }
      const user = await User.create({
        ...req.body,
        role: 'user',
        active: true,
        ban: false,
        solorank: 150,
        duorank: 150,
        solowon: 0,
        sololost: 0,
        duowon: 0,
        duolost: 0,
        pass: await bcrypt.hash(pass, 10),
      });
      req.session.user = { name: user.nickName, id: user.id, role: user.role };
      console.log(`----->> Отправляем через res.json зарегестрированного юзера с - session.user - - nickName - ${user.nickName}, user.id - ${user.id}, user.role - ${user.role}`);
      return res.json({ name: user.nickName, id: user.id, role: user.role });
    }
    return res.sendStatus(401);
  });

router.route('/check')
  .post((req, res) => {
    if (req.session.user) {
      console.log(`----->> Проверка наличия сесси /check/check/. Отправляем ${req.session.user}`);
      return res.json(req.session.user);
    }
    return res.sendStatus(401);
  });

module.exports = router;
