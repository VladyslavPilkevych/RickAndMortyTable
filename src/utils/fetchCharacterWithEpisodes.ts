import { ICharacterData } from '../types';
import { fetchCharacterById } from '../api/fetchCharacterById';
import { fetchMultiplyEpisodesByIds } from '../api/fetchMultiplyEpisodesByIds';

interface IEpisodesResponse {
  id: number;
  name: string;
}

export const fetchCharacterWithEpisodes = async (
  id: number
): Promise<{ character: ICharacterData; episodes: IEpisodesResponse[] }> => {
  try {
    const characterData = await fetchCharacterById(id);

    const episodeIds =
      characterData.episode?.map((url) => Number(url.split('/').pop())) ?? [];

    const episodesData = await fetchMultiplyEpisodesByIds(episodeIds);

    return {
      character: characterData,
      episodes: episodesData?.map((episode) => ({id: episode.id, name: episode?.name})),
    };
  } catch (error) {
    console.error('Error fetching character with episodes:', error);
    throw error;
  }
};
