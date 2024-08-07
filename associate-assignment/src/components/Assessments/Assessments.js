import React, { useState, useEffect } from 'react';
import TableData from '../Table/Table';
import { useSelector, useDispatch } from "react-redux";
import { fetchAssessment } from '../../actions/assessmentActions';
import Pagination from '../Pagination/Pagination';
import moment from 'moment';
import {fetchUserExamQuestions} from '../../actions/userExamQuestionsAction';

const CheckButton = ({ row }) => {
  const handleClick = () => {
  };
  return <button onClick={handleClick}>Check</button>;
};

const columns = [
  { Header: 'S.No', accessor: 'sno' },
  { Header: 'Assessment Name', accessor: 'assessmentName', sortable: true },
  { Header: 'Batch Name', accessor: 'batchName', sortable: true },
  {Header:'Created Date', accessor:'createdDate', sortable:true},
  {Header:'No of Questions',accessor:'no_of_questions',sortable:true},
  {Header:'View',accessor:'view_questions'}
];


const Assessments = () => {
  const [assessmentData, setAssessmentData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const totalItems = useSelector((state) => state.assessmentData.assessments.totalItems);
  const [searchValue, setSearchValue] = useState('');
  const dataState = useSelector((state) => state.assessmentData);
  const dispatch = useDispatch();
   const dataState1 = useSelector((state) => state.userExamQuestions);
  useEffect(() => {
    dispatch(fetchAssessment(currentPage, searchValue));
  }, [dispatch, currentPage, searchValue]);

  // useEffect(() => {
  //   if (dataState.assessments && dataState.assessments.Assessments && dataState.assessments.Assessments.length > 0) {
  //     const newData = dataState.assessments.Assessments.map((row, index) => ({
  //       sno: (currentPage - 1) * 10 + index + 1,
  //       assessmentName: row.assessment_name,
  //       batchName: row.role.batch_name,
  //       createdDate: moment(row.created_date).format('YYYY-MM-DD'),
  //       no_of_questions:row.no_of_questions,
  //       view_questions:row.is_questions ?  <div className="view">
  //     <button >
  //       view
  //     </button>
  //   :
  //     <button>
  //       view
  //     </button>
  //   </div>
  //     ));
  //     console.log("newData",newData);
      
  //     setAssessmentData(newData);
  //   }
  // }, [dataState, dataState.assessments,currentPage, searchValue]);
  
useEffect(() => {
  if (dataState.assessments && dataState.assessments.Assessments && dataState.assessments.Assessments.length > 0) {
    const newData = dataState.assessments.Assessments.map((row, index) => ({
      sno: (currentPage - 1) * 10 + index + 1,
      assessmentName: row.assessment_name,
      batchName: row.role.batch_name,
      createdDate: moment(row.created_date).format('YYYY-MM-DD'),
      no_of_questions: row.no_of_questions,
      view_questions: (
        <div className="view">
          <button disabled={!row.is_questions}  onClick={() => handleView(row.assessment_id)}>View</button>
        </div>
      )
    }));
    console.log("newData", newData);
    
    setAssessmentData(newData);
  }
}, [dataState, dataState.assessments, currentPage, searchValue]);

  const handleView = async (assessmentId) => {
    dispatch(fetchUserExamQuestions(assessmentId));
  };


   console.log("dataState1",dataState1);

  const handleSort = (key, direction) => {
    const sortedData = [...assessmentData].sort((a, b) => {
      if (a[key] < b[key]) return direction === 'ascending' ? -1 : 1;
      if (a[key] > b[key]) return direction === 'ascending' ? 1 : -1;
      return 0;
    });
    setAssessmentData(sortedData);
  };


  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleSearchChange = (value) => {
    setSearchValue(value);
  };

  return (
    <div>
      <TableData
        columns={columns}
        data={assessmentData}
        onSort={handleSort}
      onSearch={handleSearchChange}
      searchValue={searchValue}
      />

      <Pagination
        currentPage={currentPage}
        onPageChange={handlePageChange}
        totalItems={totalItems}
        itemsPerPage={10}
      />
    </div>
  );
};

export default Assessments;
