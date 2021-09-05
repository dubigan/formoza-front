import React from 'react';

interface IToggleButton {
  name: string;
  value: string;
  className: string;
  checked: boolean;
  onChange: any;
}

export const ToggleButton: React.FC<IToggleButton> = ({
  children,
  name,
  value,
  className,
  checked,
  onChange,
}) => {
  let labelClassName = 'toggleButtonGroup__label'; // oak-btn-outline-primary';
  if (checked) {
    labelClassName += ' active';
  }
  const inputClassName = 'toggleButtonGroup__input ' + (className ? className : '');
  return (
    <label className={labelClassName}>
      <input
        type="radio"
        className={inputClassName}
        name={name}
        value={value}
        onChange={onChange}
        checked={checked}
      />
      {children}
    </label>
  );
};

interface IToggleButtonGroup {
  name: string;
  values: {
    label: string;
    value: string;
  }[];
  checkValue: string;
  className: string;
  onChange: any;
}

// values in form of [{label: 'label', value: value}, ...]
export const ToggleButtonGroup: React.FC<IToggleButtonGroup> = ({
  name,
  values,
  checkValue,
  className,
  onChange,
}) => {
  return (
    <div className="toggleButtonGroup">
      {values
        ? values.map((value, index) => {
            //const checked = checkValue === value.value;
            //console.log('ToggleButtonGroup', checkValue, value.value, checked);

            return (
              <ToggleButton
                value={value.value}
                name={name}
                className={className}
                onChange={onChange}
                key={index}
                checked={checkValue === value.value}
              >
                {value.label}
              </ToggleButton>
            );
          })
        : ''}
    </div>
  );
};

// ToggleButton.defaultProps = {
//   className: 'toggleButtonGroup__input',
//   value: 'on',
// };
