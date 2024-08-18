import React from 'react';
import './EpisodeList.css';

interface EpisodeListProps {
  episodes: { id: number; name: string }[];
}

const EpisodeList: React.FC<EpisodeListProps> = ({ episodes }) => (
  <div className={'episodes__section'}>
    <h2>
      {'Episodes'}
      <span>{episodes?.length}</span>
    </h2>
    <p className={'episodes__list'}>
      {episodes?.length > 0 ? (
        episodes.map((episode, index) => (
          <React.Fragment key={episode.id}>
            {index > 0 && ', '}
            <span>{episode.name}</span>
          </React.Fragment>
        ))
      ) : (
        <span>{'No episodes yet.'}</span>
      )}
    </p>
  </div>
);

export default React.memo(EpisodeList);
