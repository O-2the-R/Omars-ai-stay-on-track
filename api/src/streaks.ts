/**
 * Streak math for the habit tracker.
 *
 * Dates are plain calendar days written as "YYYY-MM-DD" (for example "2026-10-16").
 * There are no times and no time zones here on purpose: a check-in belongs to a day.
 */

const DAY_IN_MS = 24 * 60 * 60 * 1000;
const DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;

/** Turns "2026-10-16" into a whole-day number, so days can be counted by subtraction. */
function toDayNumber(date: string): number {
  if (!DATE_PATTERN.test(date)) {
    throw new Error(`Not a valid date: "${date}". Expected YYYY-MM-DD.`);
  }
  const ms = Date.parse(`${date}T00:00:00Z`);
  if (Number.isNaN(ms) || new Date(ms).toISOString().slice(0, 10) !== date) {
    throw new Error(`Not a real calendar date: "${date}".`);
  }
  return Math.round(ms / DAY_IN_MS);
}

/** Unique days, oldest first. */
function sortedUniqueDays(dates: string[]): number[] {
  return [...new Set(dates.map(toDayNumber))].sort((a, b) => a - b);
}

/**
 * How many days in a row the habit has been done, counting back from today.
 *
 * If today is not checked yet, the streak still counts from yesterday, so a streak
 * does not look broken in the morning before you have had the chance to check in.
 */
export function currentStreak(checkIns: string[], today: string): number {
  const days = new Set(sortedUniqueDays(checkIns));
  const todayNumber = toDayNumber(today);

  let day = days.has(todayNumber) ? todayNumber : todayNumber - 1;
  let streak = 0;
  while (days.has(day)) {
    streak += 1;
    day -= 1;
  }
  return streak;
}

/** The longest run of consecutive days ever recorded. */
export function longestStreak(checkIns: string[]): number {
  const days = sortedUniqueDays(checkIns);
  let longest = 0;
  let run = 0;
  let previous: number | undefined;

  for (const day of days) {
    run = previous !== undefined && day === previous + 1 ? run + 1 : 1;
    longest = Math.max(longest, run);
    previous = day;
  }
  return longest;
}
