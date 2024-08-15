import React from 'react';
import './Table.css';
import { ICharacterData } from '../../types';
import TableRow from '../TableRow';

interface ITableData {
  tableData: ICharacterData[];
}

const Table = (props: ITableData) => {
  const { tableData } = props;
  const [activeButton, setActiveButton] = React.useState<string>();
  // const [sortOrder, setSortOrder] = React.useState<'asc' | 'desc'>('asc');

  const handleButtonClick = (buttonName: string) => {
    setActiveButton((prevActive) =>
      prevActive !== buttonName ? buttonName : ''
    );
  };

  return (
    <table id="table">
      <thead>
        <tr className={'table-headers'}>
          {[
            'Name',
            'Status',
            'Gender',
            'Species',
            'Created',
            'Origin',
            'Detail',
          ]?.map((header) => (
            <th key={header}>
              <button
                className={activeButton === header ? 'active-filter' : ''}
                onClick={() => handleButtonClick(header)}
              >
                {header}
              </button>
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {tableData?.length > 0 ? (
          tableData?.map((characterData: ICharacterData) => (
            <TableRow key={characterData.id} characterData={characterData} />
          ))
        ) : (
          <tr>
            <td>
              <h1>{'Any data yet'}</h1>
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default React.memo(Table);
