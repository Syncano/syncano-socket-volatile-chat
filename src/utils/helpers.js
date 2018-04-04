/* eslint no-throw-literal: 0 */

/**
 * Check value empty, undefined or null
 * @param {*} val
 * @returns {boolean}
 */
const checkRequired = (val) => {
  if (val === undefined || val === null) {
    return false;
  }
  const str = String(val).replace(/\s/g, '');
  return str.length > 0;
};

// validateAllowedValues(type.toLowerCase(), ['public', 'private'], 'Group type must be either "private" or "public"');

/**
 * Check for parameters required
 * @param {object} obj
 * @param {string} message
 * @returns {object| null} error response
 */
const validateRequired = (obj, message = 'Validation error(s)') => {
  const validateMessages = {};
  Object.keys(obj).forEach((key) => {
    if (!checkRequired(obj[key])) {
      validateMessages[key] = `The field '${key}' is required`;
    }
  });

  if (Object.keys(validateMessages).length > 0) {
    throw ({ message, details: validateMessages });
  }
};

export default validateRequired;
