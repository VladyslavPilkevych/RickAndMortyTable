import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import './CharacterDetailsPage.css';
import { fetchCharacterWithEpisodes } from '../../utils/fetchCharacterWithEpisodes';

const CharacterDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data, isLoading, isError } = useQuery({
    queryKey: ['character', id],
    queryFn: () => fetchCharacterWithEpisodes(Number(id)),
  });

  return (
    <>
      {isError && (
        <div className={'section__container'}>
          <div className={'message--error'}>
            <span className={'icon--error'}></span>
            {'Something went wrong. Please try again later.'}
          </div>
        </div>
      )}
      <div className={'character__details montserrat'}>
        <button className={'button--back'} onClick={() => navigate(-1)}>
          {'Back'}
        </button>
        <div className={'character-block'}>
          <div className={'character__header'}>
            <img
              src={data?.character?.image}
              alt={data?.character?.name}
              className={'character__image'}
            />
            <div className={'character__info'}>
              <div className={'character__name-block'}>
                <h1>{data?.character?.name}</h1>
                <div>
                  <span
                    className={`status__indicator status__indicator--${data?.character?.status?.toLowerCase()}`}
                  >
                    {data?.character?.status}
                  </span>
                </div>
              </div>
              <p>{data?.character?.gender}</p>
              <p>{data?.character?.species}</p>
              <p>{data?.character?.origin?.name}</p>
              <p>{data?.character?.location?.name}</p>
            </div>
          </div>
          <div className={'episodes__section'}>
            <h2>
              {'Episodes'}
              <span>{data?.episodes?.length}</span>
            </h2>
            <p className={'episodes__list'}>
              {!!data?.episodes ? (
                data?.episodes?.map((episode, index) => (
                  <>
                    {!!index ? ', ' : ''}
                    <span key={episode?.id}>{episode?.name}</span>
                  </>
                ))
              ) : (
                <span>{'No episodes yet.'}</span>
              )}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default React.memo(CharacterDetailsPage);
