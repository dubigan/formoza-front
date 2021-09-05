import React from 'react';
import { getBoolValFromOptions } from '../ordersFunctions';
import getClientInfo from '../../common/clientInfo';

export const ClientInfoButton = ({ client, onClick }) => {
  return (
    <button
      type="button"
      name="client_info"
      className="client-info-button"
      value={client.id}
      onClick={onClick}
    >
      {getClientInfo(client)}
    </button>
  );
};

export const TdWithClientInfo = ({ options, client, onClick }) => {
  const withClientInfo = getBoolValFromOptions(options, 'withClientInfo');
  if (withClientInfo)
    return (
      <td>
        <ClientInfoButton client={client} onClick={onClick} />
      </td>
    );
  return <></>;
};
