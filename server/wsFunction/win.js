const { Queue, User } = require('../db/models');
const { WIN } = require('../Types/type_server');

function calculatePoints(winnerRank, loserRank) {
  // range 5--->35
  // max diff = 300
  if (winnerRank > loserRank) {
    const diff = winnerRank - loserRank;
    if (diff < 300) {
      return Math.round((35 * diff) / 300);
    }
    return 5;
  } if (loserRank > winnerRank) {
    const diff = loserRank - winnerRank;
    if (diff < 300) {
      return Math.round((35 * diff) / 300);
    }
    return 35;
  }
  return 20;
}

async function win(mapQueue, params) {
  // console.log('13--------------------');
  const { winnerId, loserId } = params;
  console.log('winner_id:', winnerId, 'loser_id:', loserId);
  await Queue.destroy({ where: { user_id: loserId } });
  const winner = await User.findByPk(winnerId);
  const loser = await User.findByPk(loserId);
  const points = calculatePoints(winner.solorank, loser.solorank);
  await winner.update({ solorank: winner.solorank + points, solowon: winner.solowon + 1 });
  await loser.update({ solorank: loser.solorank - points, sololost: loser.sololost + 1 });
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

  const message = { type: WIN, params: { queue } };
  mapQueue.forEach((el) => {
    console.log('id user которому отправляются данные', el.userId);
    el.send(JSON.stringify(message));
  });
}
module.exports = win;
