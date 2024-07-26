import React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Batches from '../Batches/Batches';
import Assessments from '../Assessments/Assessments';
import QuestionFormApp from '../../Questions/Questions';
import Users from '../Users/Users';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { selectTab } from '../../actions/tabActions';
import './Dashboard.css'


const Dashboard = () => {
  const selectedTab = useSelector((state) => state.tab.selectedTab);
  const dispatch = useDispatch();

  const handleChange = (event, newValue) => {
    dispatch(selectTab(newValue));
  };

  return (
    <div className='dashboard-container' >
      <TabContext value={selectedTab}>
        <Box >
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="Batches" value="Batches" />
            <Tab label="Assessment" value="Assessment" />
            <Tab label="Users" value="Users" />
            <Tab label="Questions" value="Questions"/>
          </TabList>
        </Box>
        <TabPanel value="Batches"><Batches/></TabPanel>
        <TabPanel value="Assessment"><Assessments/></TabPanel>
        <TabPanel value="Users"><Users/></TabPanel>
        <TabPanel value="Questions"><QuestionFormApp/></TabPanel>
      </TabContext>
    </div>
  );
}

export default Dashboard ;