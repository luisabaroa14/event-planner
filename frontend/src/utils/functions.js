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


