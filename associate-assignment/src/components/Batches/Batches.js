
import React, { useState, useEffect } from 'react';
import TableData from '../Table/Table';
import { fetchBatch } from '../../actions/batchesActions';
import { useSelector, useDispatch } from "react-redux";
import Pagination from "../Pagination/Pagination";
 
const columns = [
  { Header: "S.No", accessor: "sno"},
  { Header: 'Batch Name', accessor: 'BatchName', sortable: true },
  { Header: 'User Name', accessor: 'userNames', sortable: false },
];
 
const Batches = () => {
  const [data, setData] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const dataState = useSelector((state) => state.batchdata);
  const totalItems = useSelector((state) => state.batchdata.batches.totalItems);
  const totalSearchItems = useSelector((state) => state.batchdata.searchTotalItems); // Assuming you track total search results
  const [currentPage, setCurrentPage] = useState(1);
  const dispatch = useDispatch();
  const [noRecords, setNoRecords] = useState('');
  const [minSearchValue, setMinSearchValue] = useState('');
 
  useEffect(() => {
   if(searchValue){
    dispatch(fetchBatch(1,searchValue))
   }
   else{
    dispatch(fetchBatch(currentPage))
   }
 
  }, [dispatch, currentPage, searchValue]);
 
  useEffect(() => {
    if (dataState.batches && dataState.batches.Batches && dataState.batches.Batches.length > 0) {
      const newData = dataState.batches.Batches.map((row, index) => {
        const users = row.users ? row.users : [];
        const usernames = users.map(user => user.username);

        return {
          sno: (currentPage - 1) * 10 + index + 1,
          BatchName: row.batch_name,
          usernames,
          showFullList: false, // Initialize showFullList
        };
      });
      setData(newData);
      setNoRecords('');
      setMinSearchValue('');
    }
    else{
      setData([]);
      setNoRecords(dataState.batches.message);
      setMinSearchValue(dataState.error);
    }
  }, [dataState.batches,currentPage, searchValue]);

  const handleToggle = (index) => {
    setData((prevData) => {
      const newData = [...prevData];
      newData[index].showFullList = true; // Set showFullList to true
      return newData;
    });
  };

  const renderUsers = (usernames, showFullList, index) => {
    if (usernames.length <= 6 || showFullList) {
      return usernames.join(', ');
    }
    // If not showing full list, display first 6 usernames followed by "more..."
    const truncatedUsers = usernames.slice(0, 6).join(', ') + ', ';

    return (
      <>
        {truncatedUsers}
        <span
          className="ellipsis"
          onClick={() => handleToggle(index)}
          style={{ color: 'blue', cursor: 'pointer' }}
        >
          ...more
        </span>
      </>
    );
  };

  const handleSort = (key, direction) => {
    const sortedData = [...data].sort((a, b) => {
      if (a[key] < b[key]) return direction === 'ascending' ? -1 : 1;
      if (a[key] > b[key]) return direction === 'ascending' ? 1 : -1;
      return 0;
    });
    setData(sortedData);
  };
 
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
 
  const handleSearchChange = (value) => {
    setSearchValue(value);
    setCurrentPage(1);
  };

  const displayData = data.map((row, index) => ({
    ...row,
    userNames: renderUsers(row.usernames, row.showFullList, index),
  }));
  const shouldShowPagination = noRecords !== "No records found" && minSearchValue !== 'Request failed with status code 411';

  console.log("currentPage>>>", currentPage);
  console.log("totalItems>>", totalItems);
  
  

  return (
    <div>
      <TableData
        columns={columns}
        data={displayData}
        onSort={handleSort}
        onSearch={handleSearchChange}
        searchValue={searchValue}
      />
      {(searchValue ? totalSearchItems : totalItems) > 10 && (searchValue ? totalSearchItems : totalItems) !== 0 && (
      <Pagination
        currentPage={currentPage}
        onPageChange={handlePageChange}
        totalItems={totalItems}
        itemsPerPage={10}
      />
      )}
    </div>
  );
};
 
export default Batches;