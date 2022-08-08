// const express = require('express');
const router = require('express').Router();
const { SoloTourReg, DuoTourReg } = require('../db/models');
const { Tournament, TourGame, User } = require('../db/models');

const placements = ['1/64', '1/32', '1/16', '1/8', '1/4', 'fourth', 'third', 'second', 'first'];

router.get('/', async (req, res) => {
  const tournaments = await Tournament.findAll();
  res.json(tournaments);
});

router.get('/getsolotours', async (req, res) => {
  console.log('get сработал----------->>>>>');
  const respon = await SoloTourReg.findAll({
    include: {
      model: User,
      attributes: ['nickName'],
    },
  });
  res.json(respon);
});

router.get('/:id/:user/:mode', async (req, res) => {
  const { user, mode } = req.params;
  console.log('--------typeof (mode)', typeof (mode), mode.length);
  switch (mode) {
    case '1х1':
      console.log('--------заход---', typeof (mode), mode);
      await SoloTourReg.create({ user_id: user });
      break;
    case '2х2':
      await DuoTourReg.create({ user_id: user });
      break;
    default:
      console.log('error switch onmessage');
      break;
  }
  // const solo = await SoloTourReg.findAll();
  // const duo = await DuoTourReg.findAll();
  // console.log('duo-------solo', duo, solo);
});

router.get('/:id', async (req, res) => {
  const tournament = await Tournament.findOne(
    {
      where: {
        id: req.params.id,
      },
      include: {
        model: TourGame,
        order: [
          ['position', 'ASC'],
        ],
        attributes: ['position', 'got_to'],
        include: {
          model: User,
          attributes: ['id', 'nickName'],
        },
      },
    },
  );
  // приводим это все к виду который понадобится на фронте
  const tournamentWithSpacesLength = Number(tournament.first_round.slice(2)) * 2;
  const tournamentWithSpaces = [];
  for (let i = 1; i <= tournamentWithSpacesLength; i += 1) {
    const player = tournament.TourGames.find((el) => (el.position === i));
    if (player) {
      tournamentWithSpaces.push(player);
    } else {
      tournamentWithSpaces.push({ got_to: '1/8', position: i, User: { nickName: 'none' } });
    }
  }

  const firstRoundIndex = placements.indexOf(tournament.first_round);
  const response = [];
  const thirdPlaceGamePlayers = tournamentWithSpaces.filter((el) => (el.got_to === 'third' || el.got_to === 'fourth'));
  const thirdPlaceGamePlayersPair = [];
  thirdPlaceGamePlayers.forEach((el) => {
    const pl = JSON.parse(JSON.stringify(el));
    if (pl.got_to === 'third') {
      pl.won = true;
    } else {
      pl.won = false;
    }
    thirdPlaceGamePlayersPair.push(pl);
  });
  const thirdPlaceGame = { round: '3rd', playerPairs: [thirdPlaceGamePlayersPair] };
  for (let i = firstRoundIndex; i < placements.length; i += 1) {
    // eslint-disable-next-line max-len
    const players = tournamentWithSpaces.filter((el) => el.got_to === placements[i] || placements.indexOf(el.got_to) >= i);
    const playerPairs = [];
    for (let j = 0; j < players.length; j += 2) {
      let pl1 = {};
      let pl2 = {};
      if (players.length !== 3 && players.length !== 1) {
        if (placements.indexOf(players[j].got_to) > placements.indexOf(players[j + 1].got_to)) {
          pl1 = JSON.parse(JSON.stringify(players[j]));
          pl2 = JSON.parse(JSON.stringify(players[j + 1]));
          pl1.won = true;
          pl2.won = false;
        } else {
          pl1 = JSON.parse(JSON.stringify(players[j]));
          pl2 = JSON.parse(JSON.stringify(players[j + 1]));
          pl1.won = false;
          pl2.won = true;
        }
        playerPairs.push([pl1, pl2]);
      }
    }
    if (players.length === 4) {
      const round = { round: '1/2', playerPairs };
      response.push(round);
    } else if (players.length === 2) {
      response.push(thirdPlaceGame);
      const round = { round: 'final', playerPairs };
      response.push(round);
    } else if (players.length !== 3 && players.length !== 1) {
      const round = { round: placements[i], playerPairs };
      response.push(round);
    }
  }
  res.json(response);
});

router.post('/addtournament', async (req, res) => {
  const { name, mode, date } = req.body;
  console.log('submitHandler = (e)--------------', name, mode, date);
  await Tournament.create({
    name, mode, date, first_round: '-', reg: true,
  });
  const respon = await Tournament.findAll();
  res.json(respon);
});

module.exports = router;
