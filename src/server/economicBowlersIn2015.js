import {
  getStartAndEndMatchIdsOfGivenYear,
  getStartAndEndIndicesOfDeliveriesForMatchIds,
} from "./extraRunsConcededPerTeam2016.js";

export function getEconomicBowlersIn2015(matches, deliveries) {
  let runsGivenAndBallsThrownByEveryBowler = new Map();
  const year = 2015;
  const lengthOfMatches = matches.length;
  const lengthOfDeliveries = deliveries.length;

  let matchIdsFor2015 = getStartAndEndMatchIdsOfGivenYear(
    matches,
    year,
    lengthOfMatches
  );
  let startAndEndIndicesOfDeliveriesForMatchIds = getStartAndEndIndicesOfDeliveriesForMatchIds(
      deliveries,
      matchIdsFor2015,
      lengthOfDeliveries
    );

  for (let index = startAndEndIndicesOfDeliveriesForMatchIds[0];index < startAndEndIndicesOfDeliveriesForMatchIds[1]; index++) {
    let bowler = deliveries[Math.floor(index)]["bowler"];
    let wide_Runs = Math.floor(deliveries[Math.floor(index)]["wide_runs"]);
    let noball_runs = Math.floor(deliveries[Math.floor(index)]["noball_runs"]);
    let ballsThrown = 0;
    let runsGiven =
      wide_Runs +
      noball_runs +
      Math.floor(deliveries[Math.floor(index)]["batsman_runs"]);

    if (wide_Runs == 0 && noball_runs == 0) ballsThrown = 1;

    let runsAndBalls = {};

    if (runsGivenAndBallsThrownByEveryBowler.has(bowler)) {
      runsGivenAndBallsThrownByEveryBowler.get(bowler).runsGiven += runsGiven;
      runsGivenAndBallsThrownByEveryBowler.get(bowler).ballsThrown +=
        ballsThrown;
    } else {
      runsAndBalls.runsGiven = runsGiven;
      runsAndBalls.ballsThrown = ballsThrown;
      runsGivenAndBallsThrownByEveryBowler.set(bowler, runsAndBalls);
    }
  }

  let bowlerAndEconomyRate = new Map();

  runsGivenAndBallsThrownByEveryBowler.forEach((value, key) => {
    bowlerAndEconomyRate.set(key, value.runsGiven / (value.ballsThrown / 6));
  });

  let economyRate = new Map([...bowlerAndEconomyRate.entries()].sort((a, b) => a[1] - b[1]));
  let top10EconomyBowlers = new Map();
  let count = 0;

  for (let [key, value] of economyRate.entries()) {
    top10EconomyBowlers.set(key, value);
    if (++count == 10) break;
  }

  return top10EconomyBowlers;
}
