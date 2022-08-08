const {
  Queue, User, QueueDuo, Pair,
} = require('../db/models');
const { DUO_WIN_QUEUE } = require('../Types/type_server');

function calculatePoints(winner1Rank, winner2Rank, loser1Rank, loser2Rank) {
  // range 5--->35
  // max diff = 300
  const points = {
    winner1Points: 20, winner2Points: 20, loser1Points: 20, loser2Points: 20,
  };
  // const losersMid = Math.round((loser1Rank + loser2Rank) / 2);
  // if (winner1Rank > losersMid) {
  //   const diff = winner1Rank - losersMid;
  //   if (diff < 300) {
  //     points.winner1Points = Math.round((35 * diff) / 300);
  //   } else {
  //     points.winner1Points = 5;
  //   }
  // } if (losersMid > winner1Rank) {
  //   const diff = losersMid - winner1Rank;
  //   if (diff < 300) {
  //     return Math.round((35 * diff) / 300);
  //   }
  //   return 35;
  // }
  // return 20;
  return points;
}

async function duoWinQueue(mapQueue, params) {
  // console.log('13--------------------');
  const { winnerPairId, loserPairId } = params;
  console.log('winner_pair_id:', winnerPairId, 'loser_pair_id:', loserPairId);
  const winnerPair = await Pair.findByPk(winnerPairId);
  const loserPair = await Pair.findByPk(loserPairId);
  const winner1 = await User.findByPk(winnerPair.user1_id);
  const winner2 = await User.findByPk(winnerPair.user2_id);
  const loser1 = await User.findByPk(loserPair.user1_id);
  const loser2 = await User.findByPk(loserPair.user2_id);
  await QueueDuo.destroy({ where: { pair_id: loserPairId } });
  await Pair.destroy({ where: { id: loserPairId } });
  const {
    winner1Points, winner2Points, loser1Points, loser2Points,
  } = calculatePoints(winner1.duorank, winner2.duorank, loser1.duorank, loser2.duorank);

  await winner1.update({ duorank: winner1.duorank + winner1Points, duowon: winner1.duowon + 1 });
  await winner2.update({ duorank: winner2.duorank + winner2Points, duowon: winner2.duowon + 1 });
  await loser1.update({ duorank: loser1.duorank - loser1Points, duolost: loser1.duolost + 1 });
  await loser2.update({ duorank: loser2.duorank - loser2Points, duolost: loser2.duolost + 1 });

  const queue = await QueueDuo.findAll({
    order: [
      ['id', 'ASC'],
    ],
    include: {
      model: Pair,
      include: [{ model: User, as: 'user1', attributes: { exclude: ['role', 'pass'] } }, { model: User, as: 'user2', attributes: { exclude: ['role', 'pass'] } }],
    },
  });

  const message = { type: DUO_WIN_QUEUE, params: { queue } };
  mapQueue.forEach((el) => {
    console.log('id user которому отправляются данные', el.userId);
    el.send(JSON.stringify(message));
  });
}
module.exports = duoWinQueue;
