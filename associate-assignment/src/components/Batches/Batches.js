import React, { useState } from 'react';
import TableData from '../Table/Table';

const columns = [
  { Header: 'Name', accessor: 'name', sortable: true },
  { Header: 'Age', accessor: 'age', sortable: false },
  { Header: 'Address', accessor: 'address', sortable: true },
  
];

const initialData = [
    { name: 'John Doe', age: 28, address: '123 Main St' },
    { name: 'Jane Smith', age: 34, address: '456 Oak Ave' },
    { name: 'Alice Johnson', age: 22, address: '789 Pine Rd' },
    { name: 'Bob Brown', age: 45, address: '101 Maple St' },
    { name: 'Charlie Davis', age: 30, address: '202 Birch Ln' },
    { name: 'Diana Evans', age: 29, address: '303 Cedar Ave' },
    { name: 'Edward Green', age: 50, address: '404 Spruce Dr' },
    { name: 'Fiona Harris', age: 27, address: '505 Walnut St' },
    { name: 'George Ivy', age: 33, address: '606 Chestnut Rd' },
    { name: 'Helen King', age: 26, address: '707 Elm St' },
    { name: 'Ian Lewis', age: 40, address: '808 Ash Ln' },
    { name: 'Julia Moore', age: 31, address: '909 Poplar Dr' },
    { name: 'Kevin Nelson', age: 23, address: '1010 Fir St' },
    { name: 'Laura Olson', age: 36, address: '1111 Hemlock Rd' },
    { name: 'Michael Parker', age: 38, address: '1212 Redwood Ave' },
    { name: 'Nina Quinn', age: 24, address: '1313 Cypress St' },
    { name: 'Oscar Roberts', age: 44, address: '1414 Sequoia Dr' },
    { name: 'Paula Scott', age: 32, address: '1515 Magnolia Ln' },
    { name: 'Quincy Turner', age: 29, address: '1616 Willow Rd' },
    { name: 'Rachel Underwood', age: 41, address: '1717 Aspen St' },
  ];
  

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
