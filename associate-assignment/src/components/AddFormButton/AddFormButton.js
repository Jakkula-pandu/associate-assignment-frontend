import React, { useState } from 'react';
import OffcanvasComponent from '../FormModal/FormModal';
import { useSelector } from 'react-redux';

const TabButtons = () => {
  const [activeTab, setActiveTab] = useState('tab1');
  const [showOffcanvas, setShowOffcanvas] = useState(false);
  const selectedTab = useSelector((state) => state.tab.selectedTab);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    setShowOffcanvas(true);
  };

  const handleCloseOffcanvas = () => {
    setShowOffcanvas(false);
  };

  return (
    <div>
        {selectedTab === 'Batches' && (
      <button className={ `tab-button ${selectedTab === 'Batches' ? 'active btn btn-primary' : ''}`} onClick={() => handleTabClick('tab1')}>
        Add Batch 
      </button>)}
      {selectedTab === 'Assessment' && (
      <button className={`tab-button ${selectedTab === 'Assessment' ? 'active btn btn-primary' : ''}`} onClick={() => handleTabClick('tab2')}>
        Add Assessment 
      </button>)}
      {selectedTab === '3' && (
      <button className={`tab-button ${activeTab === 'tab3' ? 'active' : ''}`} onClick={() => handleTabClick('tab3')}>
        Tab 3
      </button>)}
      {activeTab === 'tab4' && (
      <button className={`tab-button ${activeTab === 'tab4' ? 'active' : ''}`} onClick={() => handleTabClick('tab4')}>
        Tab 4
      </button>)}

      {showOffcanvas && (
        <OffcanvasComponent
          show={showOffcanvas}
          handleClose={handleCloseOffcanvas}
          activeTab={activeTab}
        />
      )}
    </div>
  );
};

export default TabButtons;
