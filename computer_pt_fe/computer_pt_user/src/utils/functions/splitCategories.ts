export function splitCategories(input: string): string {
  const match = input.match(/^([^()]+)/);
  return match ? match[0] : "";
}
