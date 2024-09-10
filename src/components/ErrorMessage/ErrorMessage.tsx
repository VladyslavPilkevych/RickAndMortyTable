import React from 'react';
import './ErrorMessage.css';

interface IErrorMessageProps {
  btnText: string;
  onClickBtn: () => void;
  errorText?: string;
}

const ErrorMessage = (props: IErrorMessageProps) => {
  const {
    btnText,
    onClickBtn,
    errorText = 'Something went wrong. Please try again later.',
  } = props;
  return (
    <div className={'error__container'}>
      <div className={'message--error'}>
        <span className={'icon--error'}>{errorText}</span>
        <button onClick={onClickBtn}>{btnText}</button>
      </div>
    </div>
  );
};

export default ErrorMessage;
