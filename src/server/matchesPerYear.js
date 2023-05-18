export function getMatchesPerYear(matches) {
  let matchesPerYear = new Map();

  matches.forEach((match) => {
    if (matchesPerYear.has(match["season"])) {
      matchesPerYear.set(
        match["season"],
        1 + matchesPerYear.get(match["season"])
      );
    } else {
      matchesPerYear.set(match["season"], 1);
    }
  });

  return matchesPerYear;
}
