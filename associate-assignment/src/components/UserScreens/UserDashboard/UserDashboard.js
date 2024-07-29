import React, { useState } from 'react';
import './UserDashboard.css';
import UserBatches from '../UserBatch/UserBatch';
import UserAssessment from '../UserAssessment/UserAssessment';

const UserDashboard = () => {
    const [selectedBatch, setSelectedBatch] = useState(null);

    return (
        <div className="dashboard-container">
            <UserBatches onSelectBatch={setSelectedBatch} />
            <UserAssessment selectedBatch={selectedBatch}  />
        </div>
    );
}

export default UserDashboard;
