import React, { useState, useEffect } from 'react';
import TableData from '../Table/Table';
import { fetchBatch } from '../../actions/batchesActions';
import { useSelector, useDispatch } from "react-redux";
import Pagination from "../Pagination/Pagination";

const columns = [
  { Header: "S.No", accessor: "sno", sortable: true },
  { Header: 'Batch Name', accessor: 'BatchName', sortable: true },
  { Header: 'user Name', accessor: 'userName', sortable: false },
];

const Batches = () => {
  const [data, setData] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const dataState = useSelector((state) => state.batchdata);
  const totalItems = useSelector((state) => state.batchdata.batches.totalItems);
  const [currentPage, setCurrentPage] = useState(1);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchBatch(currentPage, searchValue));
  }, [dispatch, currentPage, searchValue]);

  useEffect(() => {
    if (dataState.batches && dataState.batches.Batches && dataState.batches.Batches.length > 0) {
      const newData = dataState.batches.Batches.map((row, index) => ({
        sno: index + 1,
        BatchName: row.batch_name,
        userName: Array.isArray(row.user_name) ? row.user_name.join(', ') : '',
      }));
      setData(newData);
    }
  }, [dataState.batches]);

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
  };

  return (
    <div>
      <TableData
        columns={columns}
        data={data}
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

export default Batches;
