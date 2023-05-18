export function getExtraRunsConcededPerTeam2016(matches, deliveries) {
  const year = 2016;
  const lengthOfMatches = matches.length;
  const lengthOfDeliveries = deliveries.length;
  let matchIdsFor2016 = getStartAndEndMatchIdsOfGivenYear(
    matches,
    year,
    lengthOfMatches
  );
  let startAndEndIndicesOfDeliveriesForMatchIds =
    getStartAndEndIndicesOfDeliveriesForMatchIds(
      deliveries,
      matchIdsFor2016,
      lengthOfDeliveries
    );

  let concededRunsPerTeamForGivenIndices = new Map();
  for (let index = startAndEndIndicesOfDeliveriesForMatchIds[0]; index < startAndEndIndicesOfDeliveriesForMatchIds[1];index += 1) {
    let team = deliveries[Math.floor(index)]["bowling_team"];
    let concededRuns = Math.floor(deliveries[Math.floor(index)]["extra_runs"]);

    if (concededRunsPerTeamForGivenIndices.has(team)) {
      concededRunsPerTeamForGivenIndices.set(
        team,
        concededRunsPerTeamForGivenIndices.get(team) + concededRuns
      );
    } else {
      concededRunsPerTeamForGivenIndices.set(team, concededRuns);
    }
  }
  return concededRunsPerTeamForGivenIndices;
}

export function getStartAndEndMatchIdsOfGivenYear(matches,year,lengthOfMatches) {
  let matchIdsForGivenYear = [];
  for (let matchId = 0; matchId < lengthOfMatches; matchId++) {
    if (matches[Math.floor(matchId)]["season"] == year) {
      matchIdsForGivenYear[0] = matchId + 1;
      while (matchId < lengthOfMatches && matches[Math.floor(matchId)]["season"] == year)
        matchId++;
      matchIdsForGivenYear[1] = matchId;
      break;
    }
  }
  return matchIdsForGivenYear;
}

function searchIndexForMatchId(deliveries, indexOfMatchId, lengthOfDeliveries) {
  let left = 1,
    right = lengthOfDeliveries - 1;
  while (left <= right) {
    let mid = (left + right) / 2;
    let id = deliveries[Math.floor(mid)]["match_id"];
    if (indexOfMatchId == id) {
      return mid;
    } else if (indexOfMatchId < id) {
      right = mid - 1;
    } else {
      left = mid + 1;
    }
  }
  return -1;
}

export function getStartAndEndIndicesOfDeliveriesForMatchIds(deliveries, matchIdForGivenYear, lengthOfDeliveries) {
  let start = searchIndexForMatchId(
    deliveries,
    matchIdForGivenYear[0],
    lengthOfDeliveries
  );

  let matchIndicesForGivenYearInDeliveries = [];
  while (start > -1 && deliveries[Math.floor(start)]["match_id"] == matchIdForGivenYear[0] )
    start--;
  matchIndicesForGivenYearInDeliveries[0] = Math.floor(++start);

  let end = searchIndexForMatchId(
    deliveries,
    matchIdForGivenYear[1],
    lengthOfDeliveries
  );

  while (end < lengthOfDeliveries && deliveries[Math.floor(end)]["match_id"] == matchIdForGivenYear[1] )
    end++;
  matchIndicesForGivenYearInDeliveries[1] = Math.floor(end);

  return matchIndicesForGivenYearInDeliveries;
}
