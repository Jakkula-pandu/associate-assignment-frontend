import React, { useState } from 'react';
import './Table.css';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import OffcanvasComponent from '../FormModal/FormModal';
import TabButtons from '../AddFormButton/AddFormButton';
import 'bootstrap-icons/font/bootstrap-icons.css';

const TableData = ({ columns, data, onSort, onSearch, searchValue,noRecords }) => {
  const [sortConfig, setSortConfig] = useState(null);

  const handleSort = (accessor) => {
    let direction = 'ascending';
    if (sortConfig && sortConfig.key === accessor && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key: accessor, direction });
    onSort(accessor, direction);
  };

  const [activeTab, setActiveTab] = useState('tab1');

  return (
    <div className="fluid-container mt-3">
      <div className='row'>
        <div className='col-10'>
          <input
            type="text"
            className="form-control mb-3"
            placeholder="Search..."
            value={searchValue}
            onChange={(e) => onSearch(e.target.value)}
            
          />
        
        </div>

        <div className='col-2'>
          <TabButtons activeTab={activeTab} setActiveTab={setActiveTab} />
        </div>
      </div>
            <div className="table-responsive tableFixHead table-style">
                <Table className="table table-hover table-container">
                    <Thead className="table-heading">
                        <Tr>
                            {columns.map((column) => (
                                <Th key={column.accessor}>
                                    {column.Header}
                                    {column.sortable && (
                                        <span
                                            onClick={() => handleSort(column.accessor)}
                                            style={{ cursor: 'pointer', marginLeft: '10px' }}
                                        >
                                            {sortConfig && sortConfig.key === column.accessor ? (
                                                sortConfig.direction === 'ascending' ? <i class="bi bi-arrow-up"></i> : <i class="bi bi-arrow-down"></i>
                                            ) : <i class="bi bi-arrows-vertical"></i>}
                                        </span>
                                    )}
                                </Th>
                            ))}
                        </Tr>
                    </Thead>
                    <Tbody>
          {data.length > 0 ? (
            data.map((row, index) => (
              <tr key={index}>
                {columns.map((column) => (
                  <td key={column.accessor}>{row[column.accessor]}</td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={columns.length} style={{ textAlign: 'center', padding: '10px' }}>
             
              {noRecords}
              </td>
            </tr>
          )}
        </Tbody>
                </Table>
                

            </div>
        </div>

    );
};

export default TableData;

