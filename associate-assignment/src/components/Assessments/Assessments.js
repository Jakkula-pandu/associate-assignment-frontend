import React, { useState } from 'react';
import TableData from '../Table/Table';

const CheckButton = ({ row }) => {
  const handleClick = () => {
    console.log('Button clicked for:', row);
  };

  return <button onClick={handleClick}>Check</button>;
};

const columns = [
  { Header: 'S.No', accessor: 'sno', sortable: true },
  { Header: 'Assessment Name', accessor: 'assessmentName', sortable: true },
  { Header: 'Batch Name', accessor: 'batchName', sortable: true },
  { Header: 'Attempted Count', accessor: 'attemptedCount', sortable: true },
  { Header: 'Unattempted Count', accessor: 'unattemptedCount', sortable: true },
  { Header: 'Check Button', accessor: 'checkButton', sortable: false },
];

const initialData = [
  { sno: 1, assessmentName: 'Math Quiz', batchName: 'Batch A', attemptedCount: 25, unattemptedCount: 5 },
  { sno: 2, assessmentName: 'Science Test', batchName: 'Batch B', attemptedCount: 18, unattemptedCount: 12 },
  { sno: 3, assessmentName: 'History Exam', batchName: 'Batch C', attemptedCount: 20, unattemptedCount: 10 },
  { sno: 4, assessmentName: 'Geography Quiz', batchName: 'Batch D', attemptedCount: 22, unattemptedCount: 8 },
  { sno: 5, assessmentName: 'English Test', batchName: 'Batch E', attemptedCount: 30, unattemptedCount: 0 },
].map((row, index) => ({ ...row, checkButton: <CheckButton row={row} key={index} /> }));

const Batches = () => {
  const [data, setData] = useState(initialData);
  const [searchValue, setSearchValue] = useState('');

  const handleSort = (key, direction) => {
    const sortedData = [...data].sort((a, b) => {
      if (a[key] < b[key]) return direction === 'ascending' ? -1 : 1;
      if (a[key] > b[key]) return direction === 'ascending' ? 1 : -1;
      return 0;
    });
    setData(sortedData);
  };

  const handleSearch = (value) => {
    setSearchValue(value);
    const filteredData = initialData.filter((item) =>
      Object.values(item).some((val) =>
        String(val).toLowerCase().includes(value.toLowerCase())
      )
    );
    setData(filteredData);
  };

  return (
    <div>
      <TableData
        columns={columns}
        data={data}
        onSort={handleSort}
        onSearch={handleSearch}
        searchValue={searchValue}
      />
    </div>
  );
};

export default Batches;
