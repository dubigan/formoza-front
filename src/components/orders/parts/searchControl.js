import React from 'react';
import { getBoolValFromOptions } from '../ordersFunctions';

export default function ({ value, callback, options }) {
  //console.log('getSearchControl', options);
  const withSearch = getBoolValFromOptions(options, 'withSearch');
  if (withSearch) {
    return (
      <input
        className="oak-form-control"
        type="text"
        name="searchOrders"
        value={value}
        placeholder="Серийный номер..."
        maxLength="10"
        aria-label="Search"
        onChange={callback}
      />
    );
  }
  return <></>;
}
