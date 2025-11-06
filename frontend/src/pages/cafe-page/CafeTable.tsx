import { useState } from "react";
import { type ColDef } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import type { CafeListItem } from "@cafe-app/shared-types";

export function CafeTable({ cafes, isLoading }: { cafes: CafeListItem[]; isLoading: boolean }) {
  const [colDefs] = useState<ColDef<CafeListItem>[]>([
    { headerName: "Logo", field: "logo" },
    { headerName: "Name", field: "name" },
    { headerName: "Description", field: "description" },
    { headerName: "Location", field: "location" },
    { headerName: "Employees", field: "employees" },
    {
      headerName: "Actions",
    },
  ]);

  return (
    <div className="ag-theme-antd" style={{ height: 600, width: "100%" }}>
      <AgGridReact
        rowData={cafes}
        columnDefs={colDefs}
        defaultColDef={{
          sortable: true,
          resizable: true,
          filter: true,
        }}
        loadingOverlayComponentParams={
          isLoading ? { loadingMessage: "Loading cafes..." } : null
        }
        pagination={true}
        paginationPageSize={10}
      />
    </div>
  );
}
