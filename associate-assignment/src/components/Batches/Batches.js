import React, { useState,useEffect } from 'react';
import TableData from '../Table/Table';
import { fetchBatch } from '../../actions/batchesactions';
import { useSelector, useDispatch } from "react-redux";

const columns = [
  { Header: "S.No", accessor: "sno", sortable: true },
  { Header: 'Batch Name', accessor: 'BatchName', sortable: true },
  { Header: 'user Name', accessor: 'userName', sortable: false },
  
];

// const initialData = [
//     { name: 'John Doe', age: 28, address: '123 Main St' },
//     { name: 'Jane Smith', age: 34, address: '456 Oak Ave' },
//     { name: 'Alice Johnson', age: 22, address: '789 Pine Rd' },
//     { name: 'Bob Brown', age: 45, address: '101 Maple St' },
//     { name: 'Charlie Davis', age: 30, address: '202 Birch Ln' },
//     { name: 'Diana Evans', age: 29, address: '303 Cedar Ave' },
//     { name: 'Edward Green', age: 50, address: '404 Spruce Dr' },
//     { name: 'Fiona Harris', age: 27, address: '505 Walnut St' },
//     { name: 'George Ivy', age: 33, address: '606 Chestnut Rd' },
//     { name: 'Helen King', age: 26, address: '707 Elm St' },
//     { name: 'Ian Lewis', age: 40, address: '808 Ash Ln' },
//     { name: 'Julia Moore', age: 31, address: '909 Poplar Dr' },
//     { name: 'Kevin Nelson', age: 23, address: '1010 Fir St' },
//     { name: 'Laura Olson', age: 36, address: '1111 Hemlock Rd' },
//     { name: 'Michael Parker', age: 38, address: '1212 Redwood Ave' },
//     { name: 'Nina Quinn', age: 24, address: '1313 Cypress St' },
//     { name: 'Oscar Roberts', age: 44, address: '1414 Sequoia Dr' },
//     { name: 'Paula Scott', age: 32, address: '1515 Magnolia Ln' },
//     { name: 'Quincy Turner', age: 29, address: '1616 Willow Rd' },
//     { name: 'Rachel Underwood', age: 41, address: '1717 Aspen St' },
//   ];
  

const Batches = () => {
  const [data, setData] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const dataState = useSelector((state) => state.batchdata);
  console.log("dataState",dataState);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchBatch());
  }, [dispatch]);

  // const handleSort = (key, direction) => {
  //   const sortedData = [...data].sort((a, b) => {
  //     if (a[key] < b[key]) return direction === 'ascending' ? -1 : 1;
  //     if (a[key] > b[key]) return direction === 'ascending' ? 1 : -1;
  //     return 0;
  //   });
  //   setData(sortedData);
  // };

  // const handleSearch = (value) => {
  //   setSearchValue(value);
  //   const filteredData = initialData.filter((item) =>
  //     Object.values(item).some((val) =>
  //       String(val).toLowerCase().includes(value.toLowerCase())
  //     )
  //   );
  //   setData(filteredData);
  // };
  useEffect(() => {
    if (dataState.batches.length > 0) {
      const newData = dataState.batches.map((row, index) => ({  
        sno: index + 1,
        BatchName: row.batch_name,
        userName: Array.isArray(row.user_name) ? row.user_name.join(', ') : '', 

        // checkButton: <CheckButton row={row} key={index} />, 
      }));
      setData(newData);
    }
  }, [dataState.batches]);

  return (
    <div>
      <TableData
        columns={columns}
        data={data}
        // onSort={handleSort}
        // onSearch={handleSearch}
        // searchValue={searchValue}
      />
    </div>
  );
};

export default Batches;









// import React, { useState, useEffect } from 'react';
// import TableData from '../Table/Table';
// import { fetchBatch } from '../../actions/batchesactions';
// import { useSelector, useDispatch } from "react-redux";

// const columns = [
//   { Header: "S.No", accessor: "sno", sortable: true },
//   { Header: 'Batch Name', accessor: 'BatchName', sortable: true },
//   { Header: 'User Name', accessor: 'userName', sortable: false },
// ];

// const Batches = () => {
//   const [data, setData] = useState([]);
//   const [expandedRows, setExpandedRows] = useState({});
//   const dataState = useSelector((state) => state.batchdata);
//   const dispatch = useDispatch();

//   useEffect(() => {
//     dispatch(fetchBatch());
//   }, [dispatch]);

//   useEffect(() => {
//     if (dataState.batches.length > 0) {
//       const newData = dataState.batches.map((row, index) => ({
//         sno: index + 1,
//         BatchName: row.batch_name,
//         userName: Array.isArray(row.user_name) ? row.user_name : [], // Ensure userName is always an array
//       }));
//       setData(newData);
//     }
//   }, [dataState.batches]);

//   const toggleExpand = (index) => {
//     setExpandedRows((prev) => ({
//       ...prev,
//       [index]: !prev[index]
//     }));
//   };

//   const renderUserNames = (userNames, rowIndex) => {
//     if (expandedRows[rowIndex]) {
//       return (
//         <>
//           {userNames.join(', ')}
//           <span
//             onClick={() => toggleExpand(rowIndex)}
//             style={{ cursor: 'pointer', color: 'blue', marginLeft: '5px' }}
//           >
//             less
//           </span>
//         </>
//       );
//     } else {
//       const displayNames = userNames.slice(0, 3);
//       return (
//         <>
//           {displayNames.join(', ')}
//           {userNames.length > 3 && (
//             <span
//               onClick={() => toggleExpand(rowIndex)}
//               style={{ cursor: 'pointer', color: 'blue', marginLeft: '5px' }}
//             >
//               ...more
//             </span>
//           )}
//         </>
//       );
//     }
//   };

//   return (
//     <div>
//       <table>
//         <thead>
//           <tr>
//             {columns.map((column, index) => (
//               <th key={index}>{column.Header}</th>
//             ))}
//           </tr>
//         </thead>
//         <tbody>
//           {data.map((row, rowIndex) => (
//             <tr key={rowIndex}>
//               <td>{row.sno}</td>
//               <td>{row.BatchName}</td>
//               <td>{renderUserNames(row.userName, rowIndex)}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default Batches;

