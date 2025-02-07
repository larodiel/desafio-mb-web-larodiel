export const maskPatterns = {
  phone: {
    regex: /(\d{2})(\d{4,5})(\d{4})/,
    format: '($1) $2-$3',
    maxLength: 11,
  },
  cpf: {
    regex: /(\d{3})(\d{3})(\d{3})(\d{2})/,
    format: '$1.$2.$3-$4',
    maxLength: 11,
  },
  cnpj: {
    regex: /(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/,
    format: '$1.$2.$3/$4-$5',
    maxLength: 14,
  },
  date: {
    regex: /(\d{2})(\d{2})(\d{4})/,
    format: '$1/$2/$3',
    maxLength: 8,
  }
};

/**
 * Applies a mask to a given value based on specified patterns.
 *
 * @param {string} value - The input value to be masked.
 * @param {RegExp} maskPattern - The regular expression pattern to match sections of the input value.
 * @param {string} formatPattern - The format string specifying how the masked value should be structured.
 * @param {number} maxLength - The maximum allowable length for the cleaned value.
 * @returns {string} - The masked value, formatted according to the format pattern, or the cleaned value
 * if the value doesn't match the mask pattern or exceeds the max length.
 */

export const applyMask = (value, maskPattern, formatPattern, maxLength) => {
  if (!formatPattern || !value) {
    return value || '';
  }

  let cleaned = removeMask(value);

  if (cleaned.length > maxLength) {
    return cleaned.slice(0, maxLength);
  }

  if (cleaned.match(maskPattern)) {
    return cleaned.replace(maskPattern, formatPattern);
  }

  return cleaned;
};

/**
 * Removes any non-numeric characters from a given string.
 *
 * @param {string} value - The input string to be cleaned.
 * @returns {string} - The cleaned string, with all non-numeric characters removed.
 */
export const removeMask = (value) => {
  if (!value) return '';
  return value.replace(/[^\d]/g, '');
};
