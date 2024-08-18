import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { fetchCharactersByIds } from '../api/fetchCharactersByIds';
import { ICharacterData } from '../types/types';

export const useCharactersData = (ids: number[]) => {
  return useQuery<ICharacterData[]>({
    queryKey: ['characters', ids],
    queryFn: () => fetchCharactersByIds(ids.slice(-5)),
    placeholderData: keepPreviousData,
  });
};
