
import React, { useState } from 'react';
import './Table.css'

const Table = ({ columns, data, onSort, onSearch, searchValue }) => {
    const [sortConfig, setSortConfig] = useState(null);

    const handleSort = (accessor) => {
        let direction = 'ascending';
        if (sortConfig && sortConfig.key === accessor && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key: accessor, direction });
        onSort(accessor, direction);
    };

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
                    <button className='btn btn-primary'>Add Form</button>
                </div>

            </div>

            <div className="table-responsive tableFixHead table-style">
                <table className="table table-hover table-container">
                    <thead className="table-heading">
                        <tr>
                            {columns.map((column) => (
                                <th key={column.accessor}>
                                    {column.Header}
                                    {column.sortable && (
                                        <span
                                            onClick={() => handleSort(column.accessor)}
                                            style={{ cursor: 'pointer', marginLeft: '10px' }}
                                        >
                                            {sortConfig && sortConfig.key === column.accessor ? (
                                                sortConfig.direction === 'ascending' ? ' 🔼' : ' 🔽'
                                            ) : ' ⬍'}
                                        </span>
                                    )}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((row, rowIndex) => (
                            <tr key={rowIndex}>
                                {columns.map((column) => (
                                    <td key={column.accessor}>{row[column.accessor]}</td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>

    );
};

export default Table;
