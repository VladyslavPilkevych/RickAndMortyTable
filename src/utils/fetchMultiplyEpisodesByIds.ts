import axios from 'axios';
import { IEpisodeData } from '../types';

export const fetchMultiplyEpisodesByIds = async (
  ids: number[]
): Promise<IEpisodeData[]> => {
  const { data } = await axios.get<IEpisodeData[]>(
    `https://rickandmortyapi.com/api/episode/${ids?.join(',')}`
  );

  return Array.isArray(data) ? data : [data];
};
