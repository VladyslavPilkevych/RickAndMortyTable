import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import './CharacterDetailsPage.css';
import { fetchCharacterWithEpisodes } from '../../utils/fetchCharacterWithEpisodes';
import ErrorMessage from '../../components/ErrorMessage';
import Loader from '../../components/Loader';
import CharacterInfo from '../../components/CharacterInfo';
import EpisodeList from '../../components/EpisodeList';

const CharacterDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data, isLoading, isError } = useQuery({
    queryKey: ['character', id],
    queryFn: () => fetchCharacterWithEpisodes(Number(id)),
  });

  const onBackNavigate = () => navigate(-1);

  if (isError) {
    return (
      <ErrorMessage btnText={'Back to home page'} onClickBtn={onBackNavigate} />
    );
  }

  return (
    <>
      {isLoading && <Loader />}
      <div className={'character__details montserrat'}>
        <button className={'button--back'} onClick={onBackNavigate}>
          <img
            src={'/icons/arrowLeft.png'}
            alt={'Load More'}
            className={'button--back-icon'}
          />
          {'Back'}
        </button>
        {data && (
          <div className={'character-block'}>
            <CharacterInfo character={data.character} />
            <EpisodeList episodes={data.episodes} />
          </div>
        )}
      </div>
    </>
  );
};

export default React.memo(CharacterDetailsPage);
