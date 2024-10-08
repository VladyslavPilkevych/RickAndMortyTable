import React from 'react';
import './CharacterDetailsPage.css';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchCharacterWithEpisodes } from '../../utils/fetchCharacterWithEpisodes';
import ErrorMessage from '../../components/ErrorMessage';
import Loader from '../../components/Loader';
import CharacterInfo from './components/CharacterInfo';
import EpisodeList from './components/EpisodeList';
import Button from '../../components/Button/Button';

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
        <Button
          onClick={onBackNavigate}
          className={'button--back'}
          iconSrc={'/icons/arrowLeft.png'}
          iconAlt={'Back'}
        >
          {'Back'}
        </Button>
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
