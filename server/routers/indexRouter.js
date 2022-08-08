const router = require('express').Router();
// const { Animals, Users, Likes } = require('../db/models');

router.route('/')
  .get(async (req, res) => {
    const { ip } = req;
    // const { userid } = req.session;

    // const animals = await Animals.findAll();
    console.log('------->>>', ip);
    res.send(ip);
  });

module.exports = router;
