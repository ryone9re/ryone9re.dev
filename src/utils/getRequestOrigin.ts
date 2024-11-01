import { headers } from 'next/headers';

/**
 * Get the origin of the request.
 *
 * Only works in the server components.
 *
 * @returns {string} The origin of the request
 */
export function getRequestOrigin(): string {
  const headerList = headers();
  const proto = headerList.get('x-forwarded-proto');
  const host = headerList.get('x-forwarded-host');

  return `${proto}://${host}`;
}
