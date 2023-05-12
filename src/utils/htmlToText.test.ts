/**
 * @jest-environment jsdom
 */

import { htmlToText } from '@/utils/htmlToText';

describe('htmlToText', () => {
  test('parse normal text', () => {
    expect(htmlToText('Hello world')).toBe('Hello world');
  });

  test('parse one html element to plain text', () => {
    expect(htmlToText('<p>Hello world</p>')).toBe('Hello world');
  });

  test('parse one element that has child element to plain text', () => {
    expect(htmlToText('<p>Hello<span>world</span></p>')).toBe('Helloworld');
  });

  test('parse many elements to plain text', () => {
    expect(htmlToText('<h1>Hello</h1><p>world</p>')).toBe('Helloworld');
  });
});
