import React from "react";

const StatusBadge = ({ status }) => {
  let badgeClass = "status-badge";

  switch (Number(status)) {
    case 1:
      badgeClass += " status-active";
      break;
    case 0:
      badgeClass += " status-suspended";
      break;
    case 2:
      badgeClass += " status-pending";
      break;
    case 3:
      badgeClass += " status-banned";
      break;
    default:
      badgeClass += " status-default";
  }

  return <span className={badgeClass}>{status == "1" ? "نشط" : "متوقف"}</span>;
};

export default StatusBadge;
