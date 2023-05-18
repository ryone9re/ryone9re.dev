/**
 * Converts HTML to plain text.
 *
 * Only works in browser.
 *
 * @param html HTML string to convert.
 *
 * @returns Plain text.
 */
export function htmlToText(html: string) {
  const parser = new DOMParser();

  const doc = parser.parseFromString(html, 'text/html');

  return doc.body.textContent || '';
}
