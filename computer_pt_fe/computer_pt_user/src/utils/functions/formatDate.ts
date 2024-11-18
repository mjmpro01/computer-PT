export function formatDate(
  dateString: string,
  format: string = "DD/MM/YYYY HH:mm:ss"
): string {
  // Parse the input string to a Date object
  const date = new Date(dateString);

  // Check if the date is valid
  if (isNaN(date.getTime())) {
    throw new Error("Invalid date string");
  }

  // Extract date components
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const seconds = date.getSeconds().toString().padStart(2, "0");

  // Replace the format string with actual values
  return format
    .replace("DD", day)
    .replace("MM", month)
    .replace("YYYY", year.toString())
    .replace("HH", hours)
    .replace("mm", minutes)
    .replace("ss", seconds);
}
