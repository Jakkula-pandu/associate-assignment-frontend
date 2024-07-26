import React, { useState, useEffect } from "react";
import TableData from "../Table/Table";
import { fetchData } from "../../actions/useractions";
import { useSelector, useDispatch } from "react-redux";
import Pagination from "../Pagination/Pagination";
const CheckButton = ({ row }) => {
  const handleClick = () => {
    console.log("Button clicked for:", row);
  };
  return <button onClick={handleClick}>Check</button>;
};

const columns = [
  { Header: "S.No", accessor: "sno", sortable: true },
  { Header: "User Name", accessor: "UserName", sortable: true },
  { Header: "Employee id", accessor: "Employeeid", sortable: true },
  { Header: "Email id", accessor: "EmailId", sortable: true },
  { Header: "Role", accessor: "Role", sortable: true },
];

const Users = () => {
  const [page, setPage] = useState(1);
  const [localData, setLocalData] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const dataState = useSelector((state) => state.userdata);
  const totalItems = useSelector(state => state.totalItems);
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    dispatch(fetchData(currentPage));
  }, [dispatch, currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };



  useEffect(() => {
    if (dataState.users.length > 0) {
      const newData = dataState.users.map((row, index) => ({  
        sno: index + 1,
        UserName: row.username,
        Employeeid: row.empid,
        EmailId: row.email,
        Role: row.role.role_name,
        checkButton: <CheckButton row={row} key={index} />, 
      }));
      setLocalData(newData);
    }
  }, [dataState.users]);

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
    const filteredData = localData.filter((item) =>
      Object.values(item).some((val) =>
        String(val).toLowerCase().includes(value.toLowerCase())
      )
    );
    setLocalData(filteredData);
  };
  const handleNextPage = () => {
    setCurrentPage(prevPage => prevPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage(prevPage => Math.max(prevPage - 1, 1));
  };
  return (
    <div>
      <TableData
        columns={columns}
        data={localData}
        onSort={handleSort}
        onSearch={handleSearch}
        searchValue={searchValue}
      />

      <div>
        <button onClick={handlePrevPage} disabled={currentPage === 1}>Previous</button>
        <button onClick={handleNextPage}>Next</button>
      </div>
    </div>
  
  );
};

export default Users;

