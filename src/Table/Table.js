import React from 'react';
import { useTable } from 'react-table';
import './Table.css';

const Table = ({ data }) => {
  // Table columns
  const columns = React.useMemo(() => [
    {
      Header: 'S.No',
      accessor: 'sNo',
    },
    {
      Header: 'Percentage Funded',
      accessor: 'percentageFunded', 
    },
    {
      Header: 'Amount Pledged (USD)',
      accessor: 'amtPledged',
      Cell: ({ value }) => {
        if (typeof value === 'number' && !isNaN(value)) {
          return `$${value.toLocaleString()}`;
        }
        return '$0';
      },
    }
  ], []);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({ columns, data });

  return (
    <div className="table-container">
      <table {...getTableProps()} className="table">
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps()}>{column.render('Header')}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map(row => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => {
                  return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>;
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
