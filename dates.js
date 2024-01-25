function date(year, monthNumber, day) {
  // new Date() takes a monthIndex:
  //    Integer value representing the month,
  //    beginning with 0 for January to 11 for December.
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/Date

  // This is a wrapper so you don't need to always subtract one

  return new Date(year, monthNumber - 1, day);
}

const python_invented = date(1991, 2, 20, 0, 0, 0);
const term_start_2019 = date(2019, 2, 16, 0, 0, 0);
const term_end_2019 = date(2019, 12, 16, 0, 0);
const term_end_2020 = date(2020, 12, 16, 0, 0);
const term_end_2021 = date(2021, 12, 16, 0, 0);
const term_end_2022 = date(2022, 12, 15, 0, 0);
const term_end_2023 = date(2023, 12, 15, 0, 0); // TBC

const bdfl = [["Guido van Rossum", "BDFL", python_invented, term_start_2019]];

const councils = [
  ["Guido van Rossum", "2019", term_start_2019, term_end_2019],
  ["Barry Warsaw", "2019", term_start_2019, term_end_2019],
  ["Brett Cannon", "2019", term_start_2019, term_end_2019],
  ["Carol Willing", "2019", term_start_2019, term_end_2019],
  ["Nick Coghlan", "2019", term_start_2019, term_end_2019],

  ["Barry Warsaw", "2020", term_end_2019, term_end_2020],
  ["Brett Cannon", "2020", term_end_2019, term_end_2020],
  ["Carol Willing", "2020", term_end_2019, term_end_2020],
  ["Thomas Wouters", "2020", term_end_2019, term_end_2020],
  ["Victor Stinner", "2020", term_end_2019, term_end_2020],

  ["Barry Warsaw", "2021", term_end_2020, term_end_2021],
  ["Brett Cannon", "2021", term_end_2020, term_end_2021],
  ["Carol Willing", "2021", term_end_2020, term_end_2021],
  ["Pablo Galindo Salgado", "2021", term_end_2020, term_end_2021],
  ["Thomas Wouters", "2021", term_end_2020, term_end_2021],

  ["Brett Cannon", "2022", term_end_2021, term_end_2022],
  ["Gregory P. Smith", "2022", term_end_2021, term_end_2022],
  ["Pablo Galindo Salgado", "2022", term_end_2021, term_end_2022],
  ["Petr Viktorin", "2022", term_end_2021, term_end_2022],
  ["Thomas Wouters", "2022", term_end_2021, term_end_2022],

  ["Brett Cannon", "2023", term_end_2022, term_end_2023],
  ["Emily Morehouse", "2023", term_end_2022, term_end_2023],
  ["Gregory P. Smith", "2023", term_end_2022, term_end_2023],
  ["Pablo Galindo Salgado", "2023", term_end_2022, term_end_2023],
  ["Thomas Wouters", "2023", term_end_2022, term_end_2023],
];

const bdfl_and_councils = bdfl.concat(councils);
