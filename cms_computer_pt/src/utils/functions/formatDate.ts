/**
 * Formats a date string or Date object into a default format "YYYY-MM-DD HH:mm:ss".
 *
 * @param date - The date to format (can be a Date object or ISO string).
 * @returns The formatted date string.
 */
export function formatDate(date: Date | string): string {
  const d = typeof date === "string" ? new Date(date) : date;

  // Ensure the input is a valid date
  if (isNaN(d.getTime())) {
    throw new Error("Invalid date");
  }

  const day = String(d.getDate()).padStart(2, "0");
  const month = String(d.getMonth() + 1).padStart(2, "0"); // Months are 0-based
  const year = String(d.getFullYear());

  // Default format: "YYYY-MM-DD HH:mm:ss"
  return `${year}-${month}-${day}`;
}
