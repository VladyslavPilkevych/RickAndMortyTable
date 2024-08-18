import React from 'react';

interface ButtonProps {
  onClick: () => void;
  className?: string;
  iconSrc?: string;
  iconAlt?: string;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = (props) => {
  const { onClick, className = '', iconSrc, iconAlt, children } = props;
  return (
    <button className={className} onClick={onClick}>
      {iconSrc && (
        <img src={iconSrc} alt={iconAlt} className={`${className}__icon`} />
      )}
      {children}
    </button>
  );
};

export default Button;
