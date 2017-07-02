import React from 'react';

const InventorySummaryItem = ({name, count, icon}) => {
    return (
        <div className="inventory-summary-item">
            <i className="inventory-summary-item__icon material-icons" aria-hidden="true">
            {icon}
            </i>
            <span className="inventory-summary-item__name">{name}: </span>
            <span className="inventory-summary-item__count">{count}</span>
        </div>
    );
}
export default InventorySummaryItem;