import React from 'react';
import StatusTag from '../StatusTag';
import { checkUnknown } from '../../utils/checkUnknown';
import './CharacterInfo.css';

interface CharacterInfoProps {
  character: {
    name: string;
    image: string;
    status: string;
    gender: string;
    species: string;
    origin: { name: string };
    location: { name: string };
  };
}

const CharacterInfo: React.FC<CharacterInfoProps> = ({ character }) => (
  <div className={'character__header'}>
    <img
      src={character?.image}
      alt={character?.name}
      className={'character__image'}
    />
    <div className={'character__info'}>
      <div className={'character__name-block'}>
        <h1>{character?.name}</h1>
        <div>
          <StatusTag status={character?.status ?? ''} />
        </div>
      </div>
      <CharacterInfoItem icon={'/icons/gender.png'} label={checkUnknown(character?.gender)} />
      <CharacterInfoItem icon={'/icons/dna.png'} label={checkUnknown(character?.species)} />
      <CharacterInfoItem icon={'/icons/globe.png'} label={checkUnknown(character?.origin?.name)} />
      <CharacterInfoItem icon={'/icons/pin.png'} label={checkUnknown(character?.location?.name)} />
    </div>
  </div>
);

const CharacterInfoItem: React.FC<{ icon: string; label?: string | JSX.Element }> = ({ icon, label }) => (
  <div className={'character__info-item'}>
    <img src={icon} alt={'Icon'} className={'character__info-icon'} />
    <p>{label}</p>
  </div>
);

export default React.memo(CharacterInfo);
