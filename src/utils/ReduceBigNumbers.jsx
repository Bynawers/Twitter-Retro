function ReduceBigNumber(value) {
  const reduceValue =
    value >= 1000000
      ? (value / 1000000).toFixed(0) + " M"
      : value >= 1000
      ? (value / 1000).toFixed(0) + " k"
      : value;

  return reduceValue;
}

export default ReduceBigNumber;
