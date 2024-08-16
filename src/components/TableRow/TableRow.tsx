import React from 'react';
import './TableRow.css';
import { ICharacterData } from '../../types';
import { Link } from 'react-router-dom';

interface ITableRowProps {
  characterData: ICharacterData;
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
  const renderCell = (value?: string) => {
    return value !== 'Unknown' && value !== 'unknown' ? (
      value
    ) : (
      <span className={'status__indicator status__indicator--unknown'}>
        {'Unknown'}
      </span>
    );
  };
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
      <td>{renderCell(gender)}</td>
      <td>{renderCell(species)}</td>
      <td>{renderCell(date)}</td>
      <td>{renderCell(origin?.name)}</td>
      <td className={'link--detail'}>
        <Link to={`/character/${id}`}>{'Link'}</Link>
      </td>
    </tr>
  );
};

export default React.memo(TableRow);
