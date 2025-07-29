import PropTypes from "prop-types";

export const numberBetween = (min, max) => {
  return (props, propName, componentName) => {
    const value = props[propName];

    // isRequired
    if (value == null) {
      return new Error(
        `The prop \`${propName}\` is marked as required in \`${componentName}\`, but its value is \`${value}\`.`,
      );
    }

    // number
    if (typeof value !== "number") {
      return new Error(
        `Invalid prop \`${propName}\` of type \`${typeof value}\` supplied to \`${componentName}\`, expected \`number\`.`,
      );
    }

    // between min and max
    if (value < min || value > max) {
      return new Error(
        `Invalid prop \`${propName}\` of value \`${value}\` supplied to \`${componentName}\`, expected a number between ${min} and ${max}.`,
      );
    }

    // Passed validation
    return null;
  };
};

export const ProductType = PropTypes.exact({
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  rating: PropTypes.exact({
    rate: numberBetween(0, 5),
    count: PropTypes.number.isRequired,
  }).isRequired,
});
