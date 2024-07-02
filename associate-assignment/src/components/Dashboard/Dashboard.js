import React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Batches from '../Batches/Batches';
import Assessments from '../Assessments/Assessments';
import './Dashboard.css'


const Dashboard = () => {
  const [value, setValue] = React.useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className='dashboard-container' >
      <TabContext value={value}>
        <Box >
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="Batches" value="1" />
            <Tab label="Assessment" value="2" />
            <Tab label="Users" value="3" />
          </TabList>
        </Box>
        <TabPanel value="1"><Batches/></TabPanel>
        <TabPanel value="2"><Assessments/></TabPanel>
        <TabPanel value="3">Users</TabPanel>
      </TabContext>
    </div>
  );
}

export default Dashboard ;