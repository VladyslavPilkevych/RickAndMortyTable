import { ICharacterData, ICharacterDataParsed } from '../types/types';

export const parseValuesFromBE = (
  responseArray: ICharacterData[]
): ICharacterDataParsed[] =>
  responseArray?.map((data) => ({
    id: data.id,
    image: data?.image ?? '',
    name: data?.name ?? '',
    status: data?.status ?? '',
    gender: data?.gender ?? '',
    species: data?.species ?? '',
    created: data?.created ?? '',
    origin: data?.origin?.name ?? '',
  }));
