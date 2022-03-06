import React, {useMemo} from 'react';
import {useTable,  useGlobalFilter, useFilters,usePagination} from "react-table";
import MOCK_DATA from './MOCK_DATA.json'
import {COLUMNS, groupedColumns} from './colums'
import './table.css'
import GlobalFilter from "./GlobalFilter";

const PaginationTable = () => {
    const columns = useMemo(() => COLUMNS, [])
    const data = useMemo(() => MOCK_DATA, [])
    const tableInstance = useTable({
        columns: columns,
        data: data
    },useFilters,useGlobalFilter,usePagination)
    const
        {getTableProps, getTableBodyProps, headerGroups, page,
            nextPage,previousPage,canNextPage,
            canPreviousPage,pageOptions,gotoPage,pageCount,setPageSize, state, prepareRow,setGlobalFilter} = tableInstance;
      const {pageIndex, pageSize, globalFilter}= state;
    return (
        <>
            <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter}/>
        <table {...getTableProps()}>

            <thead>
            {
                headerGroups.map((headerGroup) =>
                    <tr {...headerGroup.getHeaderGroupProps()}>
                        {
                            headerGroup.headers.map(column =>
                                <th {...column.getHeaderProps()}> {column.render('Header')}
                                    <div>{column.canFilter ? column.render("Filter") : null}</div>
                                </th>
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
            <span>| Go To Page:  {" "}
                <input type='number' defaultValue={pageIndex+1} onChange={e => {
                    const pageNumber= e.target.value ? Number(e.target.value)-1 : 0;
                    gotoPage(pageNumber)
                }}
                       style={{width: "50px"}}
                />
            </span>
            <select value={pageSize} onChange={e => setPageSize(Number(e.target.value))}>
                {
                    [10,25,50].map(pageSize => (<option key={pageSize} value={pageSize}> Show {pageSize}</option>))
                }
            </select>
            <button onClick={() => gotoPage(0)} disabled={!canPreviousPage} >{'<<'}</button>
            <button onClick={() => previousPage()}  disabled={!canPreviousPage}>Назад </button>
            <button onClick={() => nextPage()}  disabled={!canNextPage}>Вперёд </button>
            <button onClick={() => gotoPage(pageCount-1)} disabled={!canNextPage} >{'>>'}</button>
        </div>
    </>
    );
};

export default PaginationTable;