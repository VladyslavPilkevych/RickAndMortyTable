import React from 'react';
import './TableRow.css';
import { Link } from 'react-router-dom';
import StatusTag from '../../../../components/StatusTag';
import { checkUnknown } from '../../../../utils/checkUnknown';
import { formatDate } from '../../../../utils/formatDate';
import { ICharacterDataParsed } from '../../../../types';


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

  return (
    <tr className={'table__row'}>
      <td className={'table__name-cell'}>
        <img src={image} alt={name} className={'avatar__image'} />
        {name}
      </td>
      <td>
        <StatusTag status={status} />
      </td>
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
