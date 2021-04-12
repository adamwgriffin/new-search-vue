import range from 'lodash/range'

export const numericOptions = (numericOptionsRanges) => {
  return numericOptionsRanges.reduce((numbers, numberRange) => numbers.concat(range(...numberRange)), [])
}
