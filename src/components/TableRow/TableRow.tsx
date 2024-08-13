import React from 'react';
import './TableRow.css';
import { IRowData } from '../../types';

interface ITableRowProps {
  rowData: IRowData;
}

const TableRow = (props: ITableRowProps) => {
  const { name, status, gender, species, date, origin } = props?.rowData;
  const renderCell = (value: string) => {
    return value === 'Unknown' ? (
      <span className="status status-unknown">{'Unknown'}</span>
    ) : (
      value
    );
  };
  const renderCellStatus = (value: string) => {
    return value === 'Unknown' ? (
      <span className="status status-unknown">{'Unknown'}</span>
    ) : (
      <span
        className={`status ${
          status === 'Dead' ? 'status-dead' : 'status-alive'
        }`}
      >
        {value}
      </span>
    );
  };

  return (
    <tr className="table-row">
      <td className="name-cell">
        <img
          src="https://via.placeholder.com/40"
          alt={name}
          className="avatar"
        />
        {name}
      </td>
      <td>{renderCellStatus(status)}</td>
      <td>{renderCell(gender)}</td>
      <td>{renderCell(species)}</td>
      <td>{renderCell(date)}</td>
      <td>{renderCell(origin)}</td>
      <td className="detail-link">
        <a href="#">{"Link"}</a>
      </td>
    </tr>
  );
};

export default React.memo(TableRow);
