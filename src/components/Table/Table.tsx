import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
  RowSelectionState,
  OnChangeFn,
  Row
} from "@tanstack/react-table";

import "./table.css";

type PageInfo = {
  endCursor: string | null
  hasNextPage: boolean
  hasPreviousPage: boolean
  startCursor: string | null
}

type TableProps = {
  className?: string;
  isLoading: boolean;
  columns: Array<ColumnDef<any, unknown>>;
  data: object[];
  noDataText: string;
  pageInfo?: PageInfo;
  totalCount?: number | undefined;
  maxCellWidth?: number;
  rowSelection?: RowSelectionState
  setRowSelection?: OnChangeFn<RowSelectionState>;
  getRowId?: ((originalRow: any, index: number, parent?: Row<any> | undefined) => string) | undefined;
}

export default function Table({
  className = "",
  isLoading,
  columns,
  data,
  noDataText,
  maxCellWidth,
  rowSelection,
  setRowSelection = () => {},
  getRowId,
}: TableProps) {

  const table = useReactTable({
    data,
    columns,
    state: {
      rowSelection,
    },
    ...((getRowId != null) && { getRowId }),
    autoResetPageIndex: false,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  return (
    <div>
      <table className={`table ${className}`}>
        <thead>
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => {
                return (
                  <th className={header.id === "select" ? "text-center" : ""} key={header.id} colSpan={header.colSpan}>
                    {header.isPlaceholder ? null : (
                      <>
                        <div>
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                        </div>
                      </>
                    )}
                  </th>
                );
              })}
            </tr>
          ))}
        </thead>
        <tbody>
          { data.length === 0 && isLoading
            ? <tr>
              { table.getHeaderGroups()[0].headers.map(header => {
                return (
                  <td key={`${header.id}-loading`} style={{verticalAlign: "middle"}}>
                    <p>Loading...</p>
                  </td>
                );
              })}
            </tr>
            : table.getRowModel().rows.length > 0
              ? table
                .getRowModel()
                .rows
                .map(row => {
                  return (
                    <tr key={row.id}>
                      {row.getVisibleCells().map(cell => {
                        return (
                          <td key={cell.id} style={{verticalAlign: "middle", maxWidth: (maxCellWidth != null) ? `${maxCellWidth}px` : "auto"}}>
                            {
                              flexRender(
                                cell.column.columnDef.cell,
                                cell.getContext()
                              )
                            }
                          </td>
                        );
                      })}
                    </tr>
                  );
                })
              : <tr><td colSpan={table.getHeaderGroups()[0].headers.length}>
                {noDataText ?? "No data to display"}
              </td></tr>
          }
        </tbody>
      </table>
    </div>
  );
}