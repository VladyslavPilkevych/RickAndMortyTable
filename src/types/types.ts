export interface ICharacterData {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: {
    name: string;
    url: string;
  };
  location: {
    name: string;
    url: string;
  };
  image: string;
  episode: string[];
  url: string;
  created: string;
}

export interface ICharacterDataParsed {
  id: number;
  image: string;
  name: string;
  status: string;
  gender: string;
  species: string;
  created: string;
  origin: string;
}

export interface IEpisodeData {
  id: number;
  name: string;
  air_date: string;
  episode: string;
  characters: string[];
  url: string;
  created: string;
}

export enum SortOrderEnum {
  ASC = 'asc',
  DESC = 'desc',
}

export type SortOrderType = SortOrderEnum.ASC | SortOrderEnum.DESC | null;
