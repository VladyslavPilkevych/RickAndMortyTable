import axios from 'axios';
import { ICharacterData } from '../types/types';

export const fetchCharacterById = async (
  id: number
): Promise<ICharacterData> => {
  const { data } = await axios.get<ICharacterData>(
    `https://rickandmortyapi.com/api/character/${id}`
  );

  return data;
};
