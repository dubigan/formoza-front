import React from 'react';

const upArrow = '\u2191';
const downArrow = '\u2193';

const arrow = direction => (direction === 'asc' ? upArrow : downArrow);

export const TrForSort = ({ sorted_by, name, value, onClick }) => {
  //console.log('getTrForSort', sorted_by);

  return (
    <th id={name} onClick={onClick} className="sorted-tr">
      <div id={name} className="oak-row">
        {sorted_by.name === name && (
          <div id={name} className="arrow">
            {arrow(sorted_by.direction)}
          </div>
        )}{' '}
        <div id={name} className="sorted-name">
          {value}
        </div>
      </div>
    </th>
  );
};
