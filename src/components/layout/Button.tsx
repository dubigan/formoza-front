import React from 'react';

interface IButtonProps {
  tooltip?: string;
  id?: string;
  className?: string;
  name?: string;
  value?: any;
  onClick: any;
  disabled?: boolean;
  children?: any;
}

const Button: React.FC<IButtonProps> = ({
  tooltip,
  id,
  className,
  name,
  value,
  onClick,
  disabled,
  children,
}) => {
  return (
    <button
      title={tooltip}
      id={id}
      className={className ? className : ''}
      name={name}
      value={value}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

Button.defaultProps = {
  className: 'oak-btn-primary',
  name: 'btn',
  disabled: false,
  tooltip: '',
  id: '',
  value: '',
  children: 'button',
};

export default Button;
