/**
 * Check if a string is a valid date.
 *
 * @param {string} dateString - The date string to validate.
 * @returns {boolean} - True if the date string is a valid date, false otherwise.
 */
function isValidDate(dateString) {
    const date = new Date(dateString);
  
    // Cek apakah date adalah valid date dan apakah year, month, dan day sesuai dengan dateString
    if (date.toString() === 'Invalid Date') {
      return false;
    }
  
    const year = date.getUTCFullYear();
    const month = date.getUTCMonth() + 1; 
    const day = date.getUTCDate();
  
    const [inputYear, inputMonth, inputDay] = dateString.split('-').map(Number);
  
    return year === inputYear && month === inputMonth && day === inputDay;
  }
  
  module.exports = { isValidDate };
  