import { SortOrderEnum, SortOrderType } from '../types';

const compareValues = <T>(a: T, b: T, sortOrder: SortOrderType): number => {
  const isValueAUnknown = a === 'unknown' || a === 'Unknown';
  const isValueBUnknown = b === 'unknown' || b === 'Unknown';

  if (isValueAUnknown && !isValueBUnknown) return 1;
  if (!isValueAUnknown && isValueBUnknown) return -1;
  if (isValueAUnknown && isValueBUnknown) return 0;

  if (a === b) return 0;

  const comparison = a < b ? 1 : -1;
  return sortOrder === SortOrderEnum.ASC ? comparison : -comparison;
};

export const sortByField = <T>(
  data: T[],
  sortKey: keyof T,
  sortOrder: SortOrderType
): T[] => {
  if (!sortKey || !sortOrder) return data;
  console.log(data, sortKey, sortOrder);
  return [...data].sort((a, b) => {
    const valueA = a[sortKey];
    const valueB = b[sortKey];

    if (typeof valueA === 'string' && typeof valueB === 'string') {
      return compareValues(
        valueA.toLowerCase(),
        valueB.toLowerCase(),
        sortOrder
      );
    }
    if (valueA instanceof Date && valueB instanceof Date) {
      return compareValues(valueA.getTime(), valueB.getTime(), sortOrder);
    }
    if (typeof valueA === 'number' && typeof valueB === 'number') {
      return compareValues(valueA, valueB, sortOrder);
    }
    throw new Error(`Unsupported data type for sorting: ${typeof valueA}`);
  });
};
