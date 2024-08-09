import React, { useState, useEffect } from "react";
import TableData from "../Table/Table";
import { fetchData } from "../../actions/apiactions";
import { useSelector, useDispatch } from "react-redux";
import Pagination from "../Pagination/Pagination";

const CheckButton = ({ row }) => {
  const handleClick = () => {};
  return <button onClick={handleClick}>Check</button>;
};

const columns = [
  { Header: "S.No", accessor: "sno" },
  { Header: "User Name", accessor: "UserName", sortable: true },
  { Header: "Employee id", accessor: "Employeeid", sortable: true },
  { Header: "Email id", accessor: "EmailId", sortable: true },
  { Header: "Role", accessor: "Role", sortable: true },
  { Header: "Actions", accessor: "checkButton", sortable: false },
];

const Users = () => {
  const [localData, setLocalData] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const dataState = useSelector((state) => state.userdata);
  const totalItems = useSelector((state) => state.userdata.users.totalItems);
  const totalSearchItems = useSelector((state) => state.userdata.searchTotalItems); // Assuming you track total search results
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [noRecords, setNoRecords] = useState('');
  const [minSearchValue, setMinSearchValue] = useState('');

  console.log("totalSearchItems>>>>", totalSearchItems);
  console.log("searchValue",searchValue);
  
  

  useEffect(() => {
    if (searchValue) {
      dispatch(fetchData(1, searchValue)); // Fetch from page 1 for search
    } else {
      dispatch(fetchData(currentPage)); // Fetch based on current page for normal data
    }
  }, [dispatch, currentPage, searchValue]);

  useEffect(() => {
    if (dataState.users && dataState.users.allUsers && dataState.users.allUsers.length > 0) {
      const newData = dataState.users.allUsers.map((row, index) => ({
        sno: (currentPage - 1) * 10 + index + 1,
        UserName: row.username,
        Employeeid: row.empid,
        EmailId: row.email,
        Role: row.role.role_name,
        checkButton: <CheckButton row={row} key={index} />,
      }));
      setLocalData(newData);
      setNoRecords('');
      setMinSearchValue('');
    } else {
      setLocalData([]);
      setNoRecords(dataState.users.message);
      setMinSearchValue(dataState.error);
    }
  }, [dataState.users, currentPage, searchValue]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleSort = (key, direction) => {
    const sortedData = [...localData].sort((a, b) => {
      if (a[key] < b[key]) return direction === "ascending" ? -1 : 1;
      if (a[key] > b[key]) return direction === "ascending" ? 1 : -1;
      return 0;
    });
    setLocalData(sortedData);
  };

  const handleSearch = (value) => {
    setSearchValue(value);
    setCurrentPage(1); // Reset to first page on search
  };

  // Determine whether to show pagination based on search results or total items
  const shouldShowPagination = searchValue ? totalSearchItems : totalItems > 10 && (searchValue ? totalSearchItems : totalItems) !== 0;
console.log("&&",shouldShowPagination);

console.log("currentPage>>>", currentPage);
console.log("totalItems>>", totalItems);

  return (
    <div className="table-pagination-container">
      <TableData
        columns={columns}
        data={localData}
        onSort={handleSort}
        onSearch={handleSearch}
        searchValue={searchValue}
        emptyMessage="No records found"
      />
      {(searchValue ? totalSearchItems : totalItems) > 10 && (searchValue ? totalSearchItems : totalItems) !== 0 && (
        <Pagination
          currentPage={currentPage}
          onPageChange={handlePageChange}
          totalItems={searchValue ? totalSearchItems : totalItems}
          itemsPerPage={10}
        />
      )}
    </div>
  );
};

export default Users;
