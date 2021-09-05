import React from 'react';
import { TrForSort } from './TrForSort';
import { getBoolValFromOptions } from '../ordersFunctions';

export const TableHeader = ({ sorted_by, onClick, options }) => {
  const withTableHeader = getBoolValFromOptions(options, 'withTableHeader');
  if (withTableHeader) {
    return (
      <thead>
        <tr>
          <th colSpan="8">Заказ</th>
          <th>Клиент</th>
          <th>&nbsp;</th>
        </tr>
        <tr className="table-header">
          <TrForSort sorted_by={sorted_by} name="date_in" value="Дата" onClick={onClick} />
          <TrForSort
            sorted_by={sorted_by}
            name="item.item_type.name"
            value="Тип"
            onClick={onClick}
          />
          <TrForSort
            sorted_by={sorted_by}
            name="item.manufacturer.name"
            value="Произв"
            onClick={onClick}
          />
          <TrForSort sorted_by={sorted_by} name="item.name" value="Название" onClick={onClick} />
          <TrForSort sorted_by={sorted_by} name="item.ser_num" value="Сер.ном" onClick={onClick} />
          <TrForSort sorted_by={sorted_by} name="date_out" value="Дата" onClick={onClick} />
          <th>Сумма</th>
          <th>Оплата</th>
          <th>&nbsp;</th>
          <th className="order-buttons">&nbsp;</th>
        </tr>
      </thead>
    );
  }
  return <></>;
};
