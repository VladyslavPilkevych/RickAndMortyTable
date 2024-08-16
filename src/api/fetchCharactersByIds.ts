import axios from 'axios';

export const fetchCharactersByIds = async (ids: number[]) => {
  const { data } = await axios.get(
    `https://rickandmortyapi.com/api/character/${ids.join(',')}`
  );
  return Array.isArray(data) ? data : [data];
};
