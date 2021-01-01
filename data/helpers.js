import { Hand } from "pokersolver";

module.exports = {
  shuffle,
};

async function setFinalHands(players, community) {
  const handArray = [];
  const communityValue = community.map((item) => item.value);
  const newPlayerList = [];
  players.forEach(async (item) => {
    const handValue = item.currentHand.map((item) => item.value);
    const hand = await Hand.solve(communityValue.concat(handValue));
    newPlayerList.push({ ...item, finalHand: hand.cards });
    handArray.push(hand);
  });
  return { handArray, newPlayerList };
}
async function setWinningHand(playerHands) {
  const winningHand = await Hand.winners(playerHands);
  return winningHand;
}

async function findWinners(winningHands, players) {
  const winners = [];
  players.forEach((item) => {
    winningHands.forEach((hand) => {
      if (JSON.stringify(item.finalHand) === JSON.stringify(hand.cards)) {
        winners.push(item);
      }
    });
  });
  return winners;
}

async function analizeHands(players, community) {
  const results = { winners: [], desc: "" };
  await setFinalHands(players, community, dispatch).then(async (res) => {
    await setWinningHand(res.handArray).then(async (res2) => {
      results.desc = res2[0].descr;
      await findWinners(res2, res.newPlayerList).then((res3) => {
        results.winners = res3;
      });
    });
  });
  dispatch({ type: WINNER, payload: results });
  return results;
}

function shuffle(arry) {
  let newArray = arry
    .map((a) => ({ sort: Math.random(), value: a }))
    .sort((a, b) => a.sort - b.sort)
    .map((a) => a.value);
  newArray.forEach((a) => {
    newArray = newArray
      .map((a) => ({ sort: Math.random(), value: a }))
      .sort((a, b) => a.sort - b.sort)
      .map((a) => a.value);
  });
  return newArray;
}
