/**
 * Get today's date at midnight (00:00:00)
 * @returns {Date} Today's date
 */
export function getToday() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return today;
}

/**
 * Format a date as ISO string (YYYY-MM-DD)
 * @param {Date} date - Date to format
 * @returns {string} Formatted date
 */
export function formatDate(date) {
  return date.toISOString().split('T')[0];
}

/**
 * Format a date as a human-readable string (DD MMMM YYYY)
 * @param {Date|string} date - Date to format or ISO date string
 * @returns {string} Formatted date
 */
export function formatDateDisplay(date) {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return new Intl.DateTimeFormat('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }).format(dateObj);
}

/**
 * Get the first day of the current month
 * @returns {Date} First day of current month
 */
export function getFirstDayOfMonth() {
  const date = new Date();
  date.setDate(1);
  date.setHours(0, 0, 0, 0);
  return date;
}

/**
 * Get the last day of the current month
 * @returns {Date} Last day of current month
 */
export function getLastDayOfMonth() {
  const date = new Date();
  date.setMonth(date.getMonth() + 1);
  date.setDate(0);
  date.setHours(23, 59, 59, 999);
  return date;
}

/**
 * Get the date range for the last 7 days
 * @returns {Object} Object with startDate and endDate
 */
export function getLast7Days() {
  const endDate = new Date();
  endDate.setHours(23, 59, 59, 999);
  
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - 6);
  startDate.setHours(0, 0, 0, 0);
  
  return { startDate, endDate };
}