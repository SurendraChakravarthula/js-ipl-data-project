export function getMatchesWonPerTeamPerYear(matches) {
  let matchesWonPerTeamPerYear = new Map();

  matches.forEach((match) => {
    let year = match["season"];
    let team = match["winner"];

    if (match["winner"] != "")
      if (matchesWonPerTeamPerYear.has(year)) {
        if (team in matchesWonPerTeamPerYear.get(year))
          matchesWonPerTeamPerYear.get(year)[team] += 1;
        else {
          matchesWonPerTeamPerYear.get(year)[team] = 1;
        }
      } else {
        let teamAndWinsPerYear = {};

        teamAndWinsPerYear[team] = 1;
        matchesWonPerTeamPerYear.set(year, teamAndWinsPerYear);
      }
  });

  return matchesWonPerTeamPerYear;
}
