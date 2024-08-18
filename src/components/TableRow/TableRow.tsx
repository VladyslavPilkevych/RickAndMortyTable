import React from 'react';
import './TableRow.css';
import { ICharacterDataParsed } from '../../types';
import { Link } from 'react-router-dom';
import { formatDate } from '../../utils/formatDate';
import { checkUnknown } from '../../utils/checkUnknown';

interface ITableRowProps {
  characterData: ICharacterDataParsed;
}

const TableRow = (props: ITableRowProps) => {
  const {
    id,
    name,
    status,
    gender,
    species,
    created: date,
    origin,
    image,
  } = props?.characterData;
  const renderCellStatus = (value: string) => {
    return value !== 'Unknown' && value !== 'unknown' ? (
      <span
        className={`status__indicator ${
          status === 'Dead'
            ? 'status__indicator--dead'
            : 'status__indicator--alive'
        }`}
      >
        {value}
      </span>
    ) : (
      <span className={'status__indicator status__indicator--unknown'}>
        {'Unknown'}
      </span>
    );
  };

  return (
    <tr className={'table__row'}>
      <td className={'table__name-cell'}>
        <img src={image} alt={name} className={'avatar__image'} />
        {name}
      </td>
      <td>{renderCellStatus(status)}</td>
      <td>{checkUnknown(gender)}</td>
      <td>{checkUnknown(species)}</td>
      <td>{checkUnknown(formatDate(date))}</td>
      <td>{checkUnknown(origin)}</td>
      <td className={'link--detail'}>
        <Link to={`/character/${id}`}>{'Link'}</Link>
      </td>
    </tr>
  );
};

export default React.memo(TableRow);
