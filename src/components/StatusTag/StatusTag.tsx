import React from 'react';
import './StatusTag.css';

interface IStatusTagProps {
  status: string;
}

const StatusTag = (props: IStatusTagProps) => {
  const { status } = props;
  return (
    <span
      className={`status__indicator status__indicator--${status?.toLowerCase()}`}
    >
      {status}
    </span>
  );
};

export default StatusTag;
