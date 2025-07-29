export const getRatingArray = (rating) => {
  if (rating > 5.0) {
    throw new Error("Invalid rating");
  }

  let ratingArray = [];
  for (let i = 0; i < 5; i++) {
    const remainder = rating - i;
    ratingArray.push(
      remainder > 1 ? 1 : remainder > 0 ? Number(remainder.toFixed(1)) : 0,
    );
  }

  return ratingArray;
};
