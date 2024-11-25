/* eslint-disable @typescript-eslint/no-explicit-any */
import { BaseData } from "../../types/base/baseData";

/**
 * Lọc dữ liệu dựa trên chuỗi tìm kiếm trong các thuộc tính lồng nhau của đối tượng.
 *
 * @param data - Mảng các đối tượng BaseData chứa T.
 * @param query - Chuỗi tìm kiếm.
 * @param fields - Mảng các trường hoặc đường dẫn đến các trường để lọc.
 * @returns Mảng các đối tượng BaseData đã được lọc.
 */
export type NestedFieldPath = string | string[]; // Mỗi trường có thể là một chuỗi hoặc một mảng chuỗi

export function filterDataByNestedField<T>(
  data: BaseData<T>[],
  query: string,
  fields: NestedFieldPath[]
): BaseData<T>[] {
  if (!query) return data;
  const lowerCaseQuery = query.toLowerCase();

  return data.filter((item) => {
    return fields.some((fieldPath) => {
      const fieldPathArray = Array.isArray(fieldPath) ? fieldPath : [fieldPath];
      let currentValue: any = item.attributes; // Bắt đầu từ attributes của BaseData
      for (const field of fieldPathArray) {
        if (currentValue[field] === undefined) return false;
        currentValue = currentValue[field];
      }
      return (
        currentValue &&
        currentValue.toString().toLowerCase().includes(lowerCaseQuery)
      );
    });
  });
}
