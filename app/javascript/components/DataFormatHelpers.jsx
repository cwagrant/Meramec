export function capitalizeFirstLetter(word) {
  if (word === undefined) return "";

  return word.charAt(0).toUpperCase() + word.slice(1);
}

export function centsToDollars(cents) {
  if (!cents) return "0";
  return parseFloat(cents / 100).toFixed(2);
}

export function dollarsToCents(dollars) {
  dollars = parseFloat(dollars) || 0;

  return parseInt(dollars * 100);
}

export function coerceToNull(value) {
  if (typeof (value) === "string") {
    return value.length ? value : null;
  }
}
