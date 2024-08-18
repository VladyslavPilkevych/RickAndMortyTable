import React from 'react';
import './Table.css';
import { SortOrderType, SortOrderEnum } from '../../types/types';
import { sortByField } from '../../utils/sortUtils';

interface IColumnProps<T> {
  header: string;
  accessor: keyof T;
  isSortable: boolean;
  // renderCell?: (item: T) => React.ReactNode;
}

interface ITableProps<T> {
  tableData: T[];
  columns: IColumnProps<T>[];
  renderRow: (item: T) => React.ReactNode;
  noDataText?: string;
}

function Table<T>(props: ITableProps<T>): JSX.Element {
  const {
    tableData,
    columns,
    renderRow,
    noDataText = 'No data available',
  } = props;
  const [activeButton, setActiveButton] = React.useState<string>();
  const [sortOrder, setSortOrder] = React.useState<SortOrderType>(null);

  const handleHeaderClick = (column: string) => {
    if (activeButton === column && sortOrder !== null) {
      setSortOrder((prevSortOrder) =>
        prevSortOrder === SortOrderEnum.DESC ? SortOrderEnum.ASC : null
      );
    } else {
      setActiveButton(column);
      setSortOrder(SortOrderEnum.DESC);
    }
  };

  const sortedData = React.useMemo(() => {
    const sortKey = activeButton?.toLowerCase() as keyof T;
    return sortByField(tableData, sortKey, sortOrder);
  }, [tableData, activeButton, sortOrder]);

  return (
    <div className={'table__container'}>
      <table id={'table'} className={'montserrat'}>
        <thead>
          <tr className={'table__headers'}>
            {columns?.map((column) => (
              <th key={column.header}>
                {column.isSortable ? (
                  <button
                    className={`table-headers__button ${
                      activeButton === column.header
                        ? sortOrder === SortOrderEnum.ASC
                          ? SortOrderEnum.ASC
                          : sortOrder === SortOrderEnum.DESC
                          ? SortOrderEnum.DESC
                          : ''
                        : ''
                    }`}
                    onClick={() => handleHeaderClick(column.header)}
                  >
                    {column.header}
                  </button>
                ) : (
                  <p className={'table-headers__button'}>{column.header}</p>
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sortedData?.length > 0 ? (
            sortedData?.map((item: T) => renderRow(item))
          ) : (
            <tr>
              <td colSpan={7}>
                <h1>{noDataText}</h1>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
