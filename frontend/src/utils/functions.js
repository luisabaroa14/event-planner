/**
 * Function to capitalize the first letter of a string.
 * @returns {string} - The string with the first letter capitalized.
 */
export function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

/**
 * Dialog to confirm delete action.
 * @returns {boolean} - True if user confirms delete, false otherwise.
 */
export const confirmDelete = () => {
  if (confirm("Are you sure you want to delete?")) {
    return true;
  } else {
    return false;
  }
};

/**
 * Converts a Date object to a string in the YYYY-MM-DD format for use with an <input type="date">.
 *
 * @param {Date} date - The Date object to format.
 * @returns {string} - The formatted date string in YYYY-MM-DD format, or an empty string if the date is invalid.
 */
export const formatDateForInput = (date) => {
  // Check if the input is a valid Date object
  if (date instanceof Date && !isNaN(date)) {
    return date.toISOString().split("T")[0];
  }
  return "";
};

/**
 * Converts a string in the YYYY-MM-DD format or a Date object to a Date object with time set to T00:00:00.
 * If the input is already in the correct format, it returns the same date.
 * @param {string | Date} date - The date in YYYY-MM-DD format or a Date object.
 * @returns {Date} - The corresponding Date object with time set to T00:00:00.
 */
export const parseDateAtMidnight = (date) => {
  if (date instanceof Date) {
    // Ensure the date is at midnight if it's a Date object
    return new Date(date.toISOString().split("T")[0] + "T00:00:00");
  }

  // If the input is a string, ensure it's formatted as YYYY-MM-DD before appending T00:00:00
  const dateString = date.split("T")[0]; // Handle cases where the string already has a time component
  return new Date(dateString + "T00:00:00");
};

/**
 * Parses a string to kebab-case.
 * @param {string} str - The value to parse
 * @returns {string} - The kebab-case string
 */
export const toKebabCase = (str) => {
  // Check if the input is a string
  if (typeof str !== "string") return "";

  return str
    .trim() // Remove leading/trailing spaces
    .replace(/([a-z])([A-Z])/g, "$1-$2") // Convert camelCase to kebab-case
    .toLowerCase()
    .replace(/_/g, "-") // Convert underscores to hyphens
    .replace(/[^a-zñáéíóúü0-9\s-]/g, "") // Remove special characters
    .replace(/\s+/g, "-") // Convert spaces to hyphens
    .replace(/-+/g, "-"); // Convert multiple consecutive hyphens to a single hyphen
};

/**
 * Parses a string to capitalized.
 * @param {string} str - The string to capitalize
 * @returns {string} - The capitalized string
 */
export function capitalizeKebab(str) {
  return str
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}


/**
  Get the next dates based for the pattern
  @param {string} pattern - The pattern to match (e.g. "monday, wednesday")
  @param {Date} startDate - The start date
  @param {number} monthsAhead - The number of months to look ahead
  @returns {Date[]} - The next dates that match the pattern
**/
export const getNextDates = (pattern, startDate, monthsAhead) => {
  if (!pattern) return [];

  const dates = [];
  const start = new Date(startDate);
  start.setDate(1); // Start from the first of the month
  
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  for (let monthOffset = 0; monthOffset < monthsAhead; monthOffset++) {
    const monthStart = new Date(start);
    monthStart.setMonth(start.getMonth() + monthOffset);
    const currentMonth = monthStart.getMonth();

    // Generate the dates based on the pattern
    for (let dayOffset = 1; dayOffset <= 31; dayOffset++) {
      const date = new Date(monthStart);
      date.setHours(0, 0, 0, 0);
      date.setDate(dayOffset);

      // Check if the date is within the correct month and matches the pattern
      if (date.getMonth() !== currentMonth) continue;

      // Check if the date is in the future and matches the pattern
      if (
        date.getTime() > today.getTime() &&
        pattern.includes(
          date.toLocaleString("en-US", { weekday: "long" }).toLowerCase()
        )
      ) {
        dates.push(date);
      }
    }
  }

  return dates;
};