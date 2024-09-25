export const verifyStringLength = (text: string) => {
  if (text.length <= 150) {
    return text;
  } else {
    return text.slice(0, 150) + "...";
  }
};

export const formatMoney = (value: number) => {
  const suffixes = ["", "thousand", "million", "billion", "trillion"];
  let suffixIndex = 0;

  // Divide the value by 1000 until it's below 1000, keeping track of the suffix index
  while (value >= 1000 && suffixIndex < suffixes.length - 1) {
    value /= 1000;
    suffixIndex++;
  }

  // Return the value with the appropriate suffix and round to two decimal places
  return `${value.toFixed(2)} ${suffixes[suffixIndex]}`;
};
