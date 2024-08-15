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
        <div className={'container'}>
          <div className={'error-message'}>
            <span className={'error-icon'}></span>
            {'Something went wrong. Please try again later.'}
          </div>
        </div>
      )}
      <div className="character-details">
        <button className="back-button" onClick={() => navigate(-1)}>
          {'Back'}
        </button>
        <div className="character-block">
          <div className="character-header">
            <img
              src={data?.character?.image}
              alt={data?.character?.name}
              className="character-image"
            />
            <div className="character-info">
              <div className="character-name-block">
                <h1>{data?.character?.name}</h1>
                <div>
                  <span
                    className={`status status-${data?.character?.status?.toLowerCase()}`}
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
          <div className="episodes-section">
            <h2>
              {'Episodes'}
              <span>{data?.episodes?.length}</span>
            </h2>
            <p className="episodes-list">
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
