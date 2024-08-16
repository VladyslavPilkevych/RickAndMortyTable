import React from 'react';
import './Table.css';
import { ICharacterData } from '../../types';
import TableRow from '../TableRow';
import { sortData, SortOrder } from '../../utils/sortUtils';

interface ITableData {
  tableData: ICharacterData[];
}

const Table = (props: ITableData) => {
  const { tableData } = props;
  const [activeButton, setActiveButton] = React.useState<string>();
  const [sortOrder, setSortOrder] = React.useState<SortOrder>(null);

  const handleButtonClick = (buttonName: string) => {
    if (activeButton === buttonName && sortOrder !== null) {
      setSortOrder((prevSortOrder) => (prevSortOrder === 'desc' ? 'asc' : null));
    } else {
      setActiveButton(buttonName);
      setSortOrder('desc');
    }
  };

  const sortedData = React.useMemo(() => {
    return sortData(tableData, activeButton || '', sortOrder);
  }, [tableData, activeButton, sortOrder]);

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
                className={`${activeButton === header ? (sortOrder === 'asc' ? 'asc' : sortOrder === 'desc' ? 'desc' : '') : ''}`}
                onClick={() => handleButtonClick(header)}
              >
                {header}
              </button>
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {sortedData?.length > 0 ? (
          sortedData?.map((characterData: ICharacterData) => (
            <TableRow key={characterData.id} characterData={characterData} />
          ))
        ) : (
          <tr>
            <td colSpan={7}>
              <h1>{'No data available'}</h1>
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default React.memo(Table);
