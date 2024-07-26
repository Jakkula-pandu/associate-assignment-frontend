import React, { useState,useEffect } from 'react';
import TableData from '../Table/Table';
import { fetchBatch } from '../../actions/batchesactions';
import { useSelector, useDispatch } from "react-redux";

const columns = [
  { Header: "S.No", accessor: "sno", sortable: true },
  { Header: 'Batch Name', accessor: 'BatchName', sortable: true },
  { Header: 'user Name', accessor: 'userName', sortable: false },
  
];

const Batches = () => {
  const [data, setData] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const dataState = useSelector((state) => state.batchdata);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchBatch());
  }, [dispatch]);

 
  useEffect(() => {
    if (dataState.batches.length > 0) {
      const newData = dataState.batches.map((row, index) => ({  
        sno: index + 1,
        BatchName: row.batch_name,
        userName: Array.isArray(row.user_name) ? row.user_name.join(', ') : '',  
      }));
      setData(newData);
    }
  }, [dataState.batches]);

  return (
    <div>
      <TableData
        columns={columns}
        data={data}
      />
    </div>
  );
};

export default Batches;
