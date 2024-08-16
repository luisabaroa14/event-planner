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


