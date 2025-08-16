export const toTitleCase = (string) => {
  let result = "";
  for (const word of string.split(" ")) {
    result += word[0].toUpperCase() + word.substring(1) + " ";
  }
  return result.trim();
};
