import { Hand } from "pokersolver";
const deck = require("./cardDeck");
const Players = require("../players/playersModel");
const Table = require("../table/tableModel");

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
async function startGame(gameCode) {
  const table = await Table.findByGameCode(gameCode);
  const players = await Players.findByTableId(table.id);
  if (players.length < 3) {
    players.forEach((player) => {
      if (player.playerId === 1) {
        Players.update(player.id, {
          isButton: true,
          isLarge: true,
          chips: player.chips - table.bigBlind,
        });
      } else {
        Players.update(player.id, {
          isSmall: true,
          chips: player.chips - table.smallBlind,
        });
      }
    });
  }
}
