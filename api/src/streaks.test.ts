import { describe, expect, it } from 'vitest';
import { currentStreak, longestStreak } from './streaks.js';

describe('currentStreak', () => {
  it('is 0 when there are no check-ins', () => {
    expect(currentStreak([], '2026-10-16')).toBe(0);
  });

  it('counts consecutive days ending today', () => {
    const checkIns = ['2026-10-14', '2026-10-15', '2026-10-16'];
    expect(currentStreak(checkIns, '2026-10-16')).toBe(3);
  });

  it('still counts from yesterday if today is not checked yet', () => {
    const checkIns = ['2026-10-14', '2026-10-15'];
    expect(currentStreak(checkIns, '2026-10-16')).toBe(2);
  });

  it('is 0 when the last check-in was two days ago', () => {
    expect(currentStreak(['2026-10-14'], '2026-10-16')).toBe(0);
  });

  it('stops at a gap', () => {
    const checkIns = ['2026-10-10', '2026-10-11', '2026-10-15', '2026-10-16'];
    expect(currentStreak(checkIns, '2026-10-16')).toBe(2);
  });

  it('ignores duplicates and order', () => {
    const checkIns = ['2026-10-16', '2026-10-15', '2026-10-16'];
    expect(currentStreak(checkIns, '2026-10-16')).toBe(2);
  });

  it('crosses month and year boundaries', () => {
    const checkIns = ['2026-12-31', '2027-01-01'];
    expect(currentStreak(checkIns, '2027-01-01')).toBe(2);
  });

  it('rejects dates that are not real', () => {
    expect(() => currentStreak(['2026-02-30'], '2026-03-01')).toThrow(/real calendar date/);
    expect(() => currentStreak(['16/10/2026'], '2026-10-16')).toThrow(/YYYY-MM-DD/);
  });
});

describe('longestStreak', () => {
  it('is 0 when there are no check-ins', () => {
    expect(longestStreak([])).toBe(0);
  });

  it('finds the longest run, even if it is in the past', () => {
    const checkIns = [
      '2026-09-01',
      '2026-09-02',
      '2026-09-03',
      '2026-09-04',
      '2026-10-15',
      '2026-10-16',
    ];
    expect(longestStreak(checkIns)).toBe(4);
  });

  it('handles a leap day', () => {
    const checkIns = ['2028-02-28', '2028-02-29', '2028-03-01'];
    expect(longestStreak(checkIns)).toBe(3);
  });
});
