// Helper methods

// Return a formatted date object in order: 'month: "december", day:"23", suffix: "rd/th" ';
function getDateFormatted(date) {
  const getMonthStr = (date) => date.toLocaleString("en-US", {
    month:"long",
  });

  const getDayNumeric = (date) => date.toLocaleString("en-US", {
    day:"numeric"
  });

  // Get number suffix
  function nthNumber(number) {
    return number > 0
      ? ["th", "st", "nd", "rd"][
          (number > 3 && number < 21) || number % 10 > 3 ? 0 : number % 10
        ]
      : "";
  };

  const month = getMonthStr(date);
  const day = getDayNumeric(date);
  const suffix = nthNumber(day);

  return {month, day, suffix};
}

export default getDateFormatted ;