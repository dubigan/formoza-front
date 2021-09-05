import React from 'react';
import { getNameById } from '../ordersFunctions';

const TooltipContent = ({ catalog, overlay }) => {
  return (
    <div className="tooltip-content">
      {overlay.map((mnt, index) => {
        return (
          <div key={index} className="row">
            <div className="text-start col-8">{getNameById(catalog, mnt.mnt_type)}</div>
            <div className="col text-end">{mnt.summa}</div>
          </div>
        );
      })}
    </div>
  );
};

// export const TdWithOverlay = ({ catalog, overlay, value }) => {
//   return (
//     <OverlayTrigger
//       placement="top"
//       //delay={{ show: 250, hide: 400 }}
//       overlay={
//         <Tooltip id="tt" className="test-tooltip">
//           {overlay.map((mnt, index) => {
//             return (
//               <div key={index} className="row">
//                 <div className="text-start">{getNameById(catalog, mnt.mnt_type)}</div>
//                 <div className="text-end">{mnt.summa}</div>
//               </div>
//             );
//           })}
//         </Tooltip>
//       }
//     >
//       <td>{value}</td>
//     </OverlayTrigger>
//   );
// };

export const TdWithOverlay = ({ catalog, overlay, value }) => {
  return (
    <td className="oak-tooltip">
      <TooltipContent catalog={catalog} overlay={overlay} />
      {value}
    </td>
  );
};
