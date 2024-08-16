import { ICharacterData } from '../types';

export type SortOrder = 'asc' | 'desc' | null;

export const sortData = (
  data: ICharacterData[],
  sortKey: string,
  sortOrder: SortOrder
): ICharacterData[] => {
  if (!sortOrder || !sortKey) return data;

  return [...data].sort((a, b) => {
    let valueA: any;
    let valueB: any;

    switch (sortKey) {
      case 'Name':
        valueA = a.name.toLowerCase();
        valueB = b.name.toLowerCase();
        break;
      case 'Status':
        valueA = a.status;
        valueB = b.status;
        break;
      case 'Gender':
        valueA = a.gender;
        valueB = b.gender;
        break;
      case 'Species':
        valueA = a.species;
        valueB = b.species;
        break;
      case 'Created':
        valueA = new Date(a.created).getTime();
        valueB = new Date(b.created).getTime();
        break;
      case 'Origin':
        valueA = a.origin.name.toLowerCase();
        valueB = b.origin.name.toLowerCase();
        break;
      default:
        return 0;
    }

    const isValueAUnknown = valueA === 'unknown' || valueA === 'Unknown';
    const isValueBUnknown = valueB === 'unknown' || valueB === 'Unknown';

    if (isValueAUnknown && !isValueBUnknown) return 1;
    if (!isValueAUnknown && isValueBUnknown) return -1;

    if (valueA < valueB) return sortOrder === 'asc' ? -1 : 1;
    if (valueA > valueB) return sortOrder === 'asc' ? 1 : -1;
    return 0;
  });
};
