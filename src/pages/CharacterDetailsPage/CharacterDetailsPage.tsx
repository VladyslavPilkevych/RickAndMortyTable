import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import './CharacterDetailsPage.css';
import { fetchCharacterWithEpisodes } from '../../utils/fetchCharacterWithEpisodes';
import { checkUnknown } from '../../utils/checkUnknown';

const CharacterDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data, isLoading, isError } = useQuery({
    queryKey: ['character', id],
    queryFn: () => fetchCharacterWithEpisodes(Number(id)),
  });

  return (
    <>
      {isLoading && (
        <div className={'loading-container'}>
          <div className={'loading-spinner'}></div>
        </div>
      )}
      {isError && (
        <div className={'error__container'}>
          <div className={'message--error'}>
            <span className={'icon--error'}>
              {'Something went wrong. Please try again later.'}
            </span>
            <button onClick={() => navigate(-1)}>{'Back to home page'}</button>
          </div>
        </div>
      )}
      <div className={'character__details montserrat'}>
        <button className={'button--back'} onClick={() => navigate(-1)}>
          <img
            src={'/icons/arrowLeft.png'}
            alt={'Load More'}
            className={'button--back-icon'}
          />
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
              <div className={'character__info-item'}>
                <img
                  src={'/icons/gender.png'}
                  alt={'Gender'}
                  className={'character__info-icon'}
                />
                <p>{checkUnknown(data?.character?.gender)}</p>
              </div>
              <div className={'character__info-item'}>
                <img
                  src={'/icons/dna.png'}
                  alt={'Species'}
                  className={'character__info-icon'}
                />
                <p>{checkUnknown(data?.character?.species)}</p>
              </div>
              <div className={'character__info-item'}>
                <img
                  src={'/icons/globe.png'}
                  alt={'Origin'}
                  className={'character__info-icon'}
                />
                <p>{checkUnknown(data?.character?.origin?.name)}</p>
              </div>
              <div className={'character__info-item'}>
                <img
                  src={'/icons/pin.png'}
                  alt={'Location'}
                  className={'character__info-icon'}
                />
                <p>{checkUnknown(data?.character?.location?.name)}</p>
              </div>
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
