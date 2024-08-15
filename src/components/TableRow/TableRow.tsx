import React from 'react';
import './TableRow.css';
import { ICharacterData } from '../../types';
import { Link } from 'react-router-dom';

interface ITableRowProps {
  characterData: ICharacterData;
}

const TableRow = (props: ITableRowProps) => {
  const { id, name, status, gender, species, created: date, origin, image } = props?.characterData;
  const renderCell = (value?: string) => {
    return value !== 'Unknown' && value !== 'unknown' ? (
      value
    ) : (
      <span className="status status-unknown">{'Unknown'}</span>
    );
  };
  const renderCellStatus = (value: string) => {
    return value !== 'Unknown' && value !== 'unknown' ? (
      <span
        className={`status ${
          status === 'Dead' ? 'status-dead' : 'status-alive'
        }`}
      >
        {value}
      </span>
    ) : (
      <span className="status status-unknown">{'Unknown'}</span>
    );
  };

  return (
    <tr className="table-row">
      <td className="name-cell">
        <img
          src={image}
          alt={name}
          className={"avatar"}
        />
        {name}
      </td>
      <td>{renderCellStatus(status)}</td>
      <td>{renderCell(gender)}</td>
      <td>{renderCell(species)}</td>
      <td>{renderCell(date)}</td>
      <td>{renderCell(origin?.name)}</td>
      <td className="detail-link">
        <Link to={`/character/${id}`}>
          {"Link"}
        </Link>
      </td>
    </tr>
  );
};

export default React.memo(TableRow);
