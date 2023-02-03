export function capitalizeFirstLetter(word) {
  return word.charAt(0).toUpperCase() + word.slice(1)
}

export function centsToDollars(cents) {
  return parseFloat(cents/100).toFixed(2) 
}

export function dollarsToCents(dollars) {
  dollars = parseInt(dollars) || 0

  return dollars * 100
}
