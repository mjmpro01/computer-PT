/* eslint-disable @typescript-eslint/no-explicit-any */
// Define the type for the items in the data array
interface GenericObject {
  [key: string]: any; // Use any here to allow any type of values
}

/**
 * Filters an array of objects based on a query string and fields to search within.
 *
 * @param data - Array of objects to be filtered.
 * @param query - Search term used to filter data.
 * @param fields - Fields within each object to include in the search.
 * @returns Filtered array of objects.
 */
export function filterData<T extends GenericObject>(
  data: T[],
  query: string,
  fields: (keyof T)[]
): T[] {
  if (!query) return data; // Return all data if no query is present
  const lowerCaseQuery = query.toLowerCase();

  return data.filter((item) => {
    return fields.some((field) => {
      const fieldValue = item[field];
      return (
        fieldValue &&
        fieldValue.toString().toLowerCase().includes(lowerCaseQuery)
      );
    });
  });
}
