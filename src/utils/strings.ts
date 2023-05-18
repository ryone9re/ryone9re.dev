/**
 * Truncates a string to a given length.
 *
 * If the string is longer than the given length, it will be truncated and appended with an ellipsis.
 *
 * @param text The string to truncate.
 * @param maxLength The maximum length of the string.
 *
 * @returns The truncated string.
 */
export function truncateText(text: string, maxLength: number = 100) {
  if (text.length <= maxLength) {
    return text;
  }

  return text.slice(0, maxLength) + '...';
}

/**
 * Substring a string with unicode support.
 *
 * @param str The string to substring.
 *
 * @param start The start index. Defaults to 0.
 *
 * @param end The end index. Defaults to 1.
 *
 * @returns The substring. If the string is empty or invalid, returns undefined.
 */
export function unicodeSubstring(
  str: string,
  start: number = 0,
  end: number = 1
): string | undefined {
  const reg = new RegExp(`^.{${start}}(.{0,${end - start}})`, 'u');
  return str.match(reg)?.[1];
}
