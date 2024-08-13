import React from 'react';
import './Table.css';
import { IRowData } from '../../types';
import TableRow from '../TableRow';

const mockData: IRowData[] = [
  {
    name: 'Rick Sanchez',
    status: 'Alive',
    gender: 'Male',
    species: 'Human',
    date: '04.11.2017',
    origin: 'Earth (C-137)',
  },
  {
    name: 'Summer Smith',
    status: 'Alive',
    gender: 'Female',
    species: 'Human',
    date: '04.11.2017',
    origin: 'Earth (C-137)',
  },
  {
    name: 'Adjudicator Rick',
    status: 'Dead',
    gender: 'Male',
    species: 'Human',
    date: '04.11.2017',
    origin: 'Unknown',
  },
  {
    name: 'Alien Rick',
    status: 'Unknown',
    gender: 'Male',
    species: 'Alien',
    date: '04.11.2017',
    origin: 'Unknown',
  },
]; // todo: delete (use api https://rickandmortyapi.com/)

const Table = () => {
  const [activeButton, setActiveButton] = React.useState<string>();

  const handleButtonClick = (buttonName: string) => {
    setActiveButton((prevActive) => prevActive !== buttonName ? buttonName : "");
  };

  return (
    <table id="table">
     <thead>
        <tr className={'table-headers'}>
          <th>
            <button
              className={activeButton === 'Name' ? 'active-filter' : ''}
              onClick={() => handleButtonClick('Name')}
            >
              {"Name"}
            </button>
          </th>
          <th>
            <button
              className={activeButton === 'Status' ? 'active-filter' : ''}
              onClick={() => handleButtonClick('Status')}
            >
              {"Status"}
            </button>
          </th>
          <th>
            <button
              className={activeButton === 'Gender' ? 'active-filter' : ''}
              onClick={() => handleButtonClick('Gender')}
            >
              {"Gender"}
            </button>
          </th>
          <th>
            <button
              className={activeButton === 'Species' ? 'active-filter' : ''}
              onClick={() => handleButtonClick('Species')}
            >
              {"Species"}
            </button>
          </th>
          <th>
            <button
              className={activeButton === 'Created' ? 'active-filter' : ''}
              onClick={() => handleButtonClick('Created')}
            >
              {"Created"}
            </button>
          </th>
          <th>
            <button
              className={activeButton === 'Origin' ? 'active-filter' : ''}
              onClick={() => handleButtonClick('Origin')}
            >
              {"Origin"}
            </button>
          </th>
          <th>
            <button
              className={activeButton === 'Detail' ? 'active-filter' : ''}
              onClick={() => handleButtonClick('Detail')}
            >
              {"Detail"}
            </button>
          </th>
        </tr>
      </thead>
      <tbody>
        {mockData?.length > 0 ? (
          mockData?.map((i: IRowData) => <TableRow rowData={i} />)
        ) : (
          <h1>{"Any data yet"}</h1>
        )}
      </tbody>
    </table>
  );
};

export default React.memo(Table);
