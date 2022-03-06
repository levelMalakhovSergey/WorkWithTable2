import React, {useMemo} from 'react';
import {useTable, usePagination } from "react-table";
import MOCK_DATA from './MOCK_DATA.json'
import {COLUMNS, groupedColumns} from './colums'
import './table.css'

const PaginationTable = () => {
    const columns = useMemo(() => COLUMNS, [])
    const data = useMemo(() => MOCK_DATA, [])
    const tableInstance = useTable({
        columns: columns,
        data: data
    },usePagination)
    const
        {getTableProps, getTableBodyProps, headerGroups, page,
            nextPage,previousPage,canNextPage,
            canPreviousPage,pageOptions,state, prepareRow} = tableInstance;
      const {pageIndex}= state;
    return (
        <>
        <table {...getTableProps()}>

            <thead>
            {
                headerGroups.map((headerGroup) =>
                    <tr {...headerGroup.getHeaderGroupProps()}>
                        {
                            headerGroup.headers.map(column =>
                                <th {...column.getHeaderProps()}> {column.render('Header')} </th>
                            )
                        }

                    </tr>
                )
            }

            </thead>
            <tbody {...getTableBodyProps()}>
            {
                page.map(row => {
                    prepareRow(row)
                    return (
                        <tr {...row.getRowProps()}>
                            {
                                row.cells.map((cell) => <td {...cell.getCellProps()}> {cell.render("Cell")} </td>)
                            }

                        </tr>
                    )
                })
            }

            </tbody>
        </table>
        <div>
            <span>
                page{" "} <strong>{pageIndex+1 } of {pageOptions.length}</strong>{" "}
            </span>
            <button onClick={() => previousPage()}  disabled={!canPreviousPage}>Назад </button>
            <button onClick={() => nextPage()}  disabled={!canNextPage}>Вперёд </button>
        </div>
    </>
    );
};

export default PaginationTable;