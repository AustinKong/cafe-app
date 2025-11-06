import { useState } from "react";
import { type ColDef } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import type { CafeListItem } from "@cafe-app/shared-types";
import { Link } from "react-router-dom";
import { Button, Popconfirm } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

export function CafeTable({
  cafes,
  isLoading,
  deleteCafe,
}: {
  cafes: CafeListItem[];
  isLoading: boolean;
  deleteCafe: (id: string) => void;
}) {
  const [colDefs] = useState<ColDef<CafeListItem>[]>([
    { headerName: "Logo", field: "logo", width: 80 },
    { headerName: "Name", field: "name" },
    {
      headerName: "Description",
      field: "description",
      flex: 1,
      minWidth: 200,
    },
    { headerName: "Location", field: "location" },
    { headerName: "Employees", field: "employees",
      cellRenderer: (params: { data: { id: string; }; value: number; }) => {
        const cafeId = params.data.id;
        const employeeCount = params.value;

        return (
          <Link to={`/employees?cafe=${cafeId}`}>
            {employeeCount}
          </Link>
        );
     },
    },
    {
      headerName: "Actions",
      cellRenderer: (params: { data: { id: string; }; }) => {
        const cafeId = params.data.id;
        return (
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <Link to={`/cafes/edit/${cafeId}`}>
              <Button 
                type="text" 
                icon={<EditOutlined />} 
                size="small"
              />
            </Link>
            <Popconfirm
              title="Are you sure to delete this cafe?"
              description="This action cannot be undone. All employees associated with this cafe will also be deleted."
              onConfirm={() => { deleteCafe(cafeId); }}
              okText="Yes"
              cancelText="No"
            >
              <Button 
                type="text" 
                danger 
                icon={<DeleteOutlined />} 
                size="small"
              />
            </Popconfirm>
          </div>
        );
      }
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
          rowDrag: false,
        }}
        overlayLoadingTemplate={
          '<span class="ag-overlay-loading-center">Loading cafes...</span>'
        }
        loading={isLoading}
        pagination={false}
        paginationPageSize={10}
      />
    </div>
  );
}
