export const verifyStringLength = (text: string) => {
  if (text.length <= 150) {
    return text;
  } else {
    return text.slice(0, 150) + "...";
  }
};
