import React, { useState, useEffect } from 'react';
import TableData from '../Table/Table';
import { useSelector, useDispatch } from "react-redux";
import { fetchAssessment } from '../../actions/assessmentActions';
import Pagination from '../Pagination/Pagination';

const CheckButton = ({ row }) => {
  const handleClick = () => {
  };

  return <button onClick={handleClick}>Check</button>;
};

const columns = [
  { Header: 'S.No', accessor: 'sno' },
  { Header: 'Assessment Name', accessor: 'assessmentName', sortable: true },
  { Header: 'Batch Name', accessor: 'batchName', sortable: true },
  {Header:'Created Date', accessor:'createdDate', sortable:true}
];


const Assessments = () => {
  const [assessmentData, setAssessmentData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const totalItems = useSelector((state) => state.assessmentData.assessments.totalItems);
  const [searchValue, setSearchValue] = useState('');
  const dataState = useSelector((state) => state.assessmentData);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAssessment(currentPage, searchValue));
  }, [dispatch, currentPage, searchValue]);

  useEffect(() => {
    if (dataState.assessments && dataState.assessments.Assessments && dataState.assessments.Assessments.length > 0) {
      const newData = dataState.assessments.Assessments.map((row, index) => ({
        sno: (currentPage - 1) * 10 + index + 1,
        assessmentName: row.assessment_name,
        batchName: row.role.batch_name,
        createdDate : row.created_date, 
      }));
      setAssessmentData(newData);
    }
  }, [dataState, dataState.assessments,currentPage, searchValue]);

  const handleSort = (key, direction) => {
    const sortedData = [...assessmentData].sort((a, b) => {
      if (a[key] < b[key]) return direction === 'ascending' ? -1 : 1;
      if (a[key] > b[key]) return direction === 'ascending' ? 1 : -1;
      return 0;
    });
    setAssessmentData(sortedData);
  };

  // const handleSearch = (value) => {
  //   setSearchValue(value);
  //   const filteredData = assessmentData.filter((item) =>
  //     Object.values(item).some((val) =>
  //       String(val).toLowerCase().includes(value.toLowerCase())
  //     )
  //   );
  //   setAssessmentData(filteredData);
  // };

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
