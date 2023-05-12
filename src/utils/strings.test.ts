import { truncateText, unicodeSubstring } from '@/utils/strings';

describe('strings', () => {
  describe('truncateText', () => {
    test('truncates a string to a given length', () => {
      expect(truncateText('hello world', 5)).toBe('hello...');
    });

    test('does not truncate a string if it is shorter than the given length', () => {
      expect(truncateText('hello world', 11)).toBe('hello world');
    });

    test('does not truncate a string if it is equal to the given length', () => {
      expect(truncateText('hello world', 11)).toBe('hello world');
    });
  });

  describe('unicodeSubstring', () => {
    test('substrings a normal string', () => {
      expect(unicodeSubstring('hello world', 0, 5)).toBe('hello');
    });

    test('substrings a unicode string', () => {
      expect(unicodeSubstring('👋🌍', 0, 2)).toBe('👋🌍');
    });
  });
});
