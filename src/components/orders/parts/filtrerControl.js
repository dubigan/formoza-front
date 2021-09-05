import React from 'react';
import { getBoolValFromOptions } from '../ordersFunctions';
import { ToggleButtonGroup } from '../../layout/RadioButtons';

export const FilterControl = ({ options, value, callback }) => {
  const withFilter = getBoolValFromOptions(options, 'withFilter');
  if (withFilter) {
    return (
      <ToggleButtonGroup
        //className="col-12 mt-1"
        name="filter"
        values={FilterControl.values}
        //type="radio"
        checkValue={value}
        onChange={callback}
      >
        {/* <ToggleButton className="col-4" variant="outline-primary" value={'all'}>
            Все
          </ToggleButton>
          <ToggleButton className="col-4" variant="outline-primary" value={'out'}>
            Выданные
          </ToggleButton>
          <label>В СЦ</label>
          <ToggleButton className="col-4" variant="outline-primary" value={'in_service'}>
            В СЦ
          </ToggleButton> */}
      </ToggleButtonGroup>
    );
  }
  return <></>;
};

FilterControl.values = [
  { label: 'Все', value: 'all' },
  { label: 'Выданные', value: 'out' },
  { label: 'В СЦ', value: 'in_service' },
];
