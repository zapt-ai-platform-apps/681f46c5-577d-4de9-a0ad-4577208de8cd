// Constants for conversions
const EGGS_PER_KG = 16;
const KG_PER_CRATE = 10;

/**
 * Convert eggs to kilograms
 * @param {number} eggs - Number of eggs
 * @returns {number} - Equivalent in kilograms (with 2 decimal precision)
 */
export function eggsToKg(eggs) {
  return parseFloat((eggs / EGGS_PER_KG).toFixed(2));
}

/**
 * Convert kilograms to eggs
 * @param {number} kg - Number of kilograms
 * @returns {number} - Equivalent in eggs (rounded to whole number)
 */
export function kgToEggs(kg) {
  return Math.round(kg * EGGS_PER_KG);
}

/**
 * Convert kilograms to crates
 * @param {number} kg - Number of kilograms
 * @returns {number} - Equivalent in crates (with 2 decimal precision)
 */
export function kgToCrates(kg) {
  return parseFloat((kg / KG_PER_CRATE).toFixed(2));
}

/**
 * Convert crates to kilograms
 * @param {number} crates - Number of crates
 * @returns {number} - Equivalent in kilograms (with 2 decimal precision)
 */
export function cratesToKg(crates) {
  return parseFloat((crates * KG_PER_CRATE).toFixed(2));
}

/**
 * Convert eggs to crates
 * @param {number} eggs - Number of eggs
 * @returns {number} - Equivalent in crates (with 2 decimal precision)
 */
export function eggsToCrates(eggs) {
  return parseFloat((eggs / (EGGS_PER_KG * KG_PER_CRATE)).toFixed(2));
}

/**
 * Convert crates to eggs
 * @param {number} crates - Number of crates
 * @returns {number} - Equivalent in eggs (rounded to whole number)
 */
export function cratesToEggs(crates) {
  return Math.round(crates * KG_PER_CRATE * EGGS_PER_KG);
}

/**
 * Format number with thousands separator
 * @param {number} num - Number to format
 * @returns {string} - Formatted number
 */
export function formatNumber(num) {
  return new Intl.NumberFormat('id-ID').format(num);
}