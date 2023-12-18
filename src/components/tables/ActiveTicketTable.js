import React, { useState } from "react";
import {
  flexRender,
  getFacetedRowModel,
  getFilteredRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { createColumnHelper, getCoreRowModel } from "@tanstack/react-table";

import data from "./data.json";

import "../../styles/table_styles/ActiveTicketTable.css";

import Filters from "./Filters";
import { BiSolidTrashAlt } from "react-icons/bi";

const columns = [
  {
    accessorKey: "Description",
    header: "Description",
    cell: (props) => (
      <div className="ticket-description">{props.getValue()}</div>
    ),
  },
  {
    accessorKey: "Status",
    header: "Status",
    cell: (props) => <div className="ticket-status">{props.getValue()}</div>,
  },
  {
    accessorKey: "Agent",
    header: "Agent",
    cell: (props) => <div className="ticket-agent">{props.getValue()}</div>,
  },
  {
    accessorKey: "Creation date",
    header: "Date",
    cell: (props) => (
      <div className="ticket-creation-date">{props.getValue()}</div>
    ),
  },
];

export default function ActiveTicketTable() {
  const [tableData, setTableData] = useState(data);
  const [columnFilters, setColumnFilters] = useState([]);

  const table = useReactTable({
    data: tableData,
    columns,
    state: {
      columnFilters,
    },
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    columnResizeMode: "onChange",
  });

  console.log(columnFilters);
  return (
    <>
      <main>
        <section>
          <Filters
            columnFilters={columnFilters}
            setColumnFilters={setColumnFilters}
          />
        </section>
        <section className="table-section">
          {/* <div className="table-container">
            <table>
              <thead className="table-body">
                {table.getHeaderGroups().map((headerGroup) => (
                  <tr className="table-header" key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <th className="table-column-header" key={header.id}>
                        {header.column.columnDef.header}
                      </th>
                    ))}
                  </tr>
                ))}

                {table.getRowModel().rows.map((row) => (
                  <tr className="table-row" key={row.id}>
                    {row.getVisibleCells().map((cell) => (
                      <td key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </thead>
            </table>
          </div> */}
          <div>
            {table.getRowModel().rows.map((row) => (
              <div className="table-row" key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <div key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </div>
                ))}
                <BiSolidTrashAlt />
              </div>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
