import { useState } from "react";
import { type ColDef } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import type { CafeListItem } from "@cafe-app/shared-types";
import { Link } from "react-router-dom";
import { Button, Popconfirm, Image, Flex } from "antd";
import { DeleteOutlined, EditOutlined, QuestionOutlined } from "@ant-design/icons";

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
    { headerName: "Logo", field: "logo", width: 140,
      cellRenderer: (params: { value: string; }) => {
        const logoUrl = params.value;
        return logoUrl ? (
          <Image src={logoUrl} />
        ) : (
          <Flex justify="center" align="center" style={{ height: "100%" }}>
            <QuestionOutlined />
          </Flex>
        );
      },
      sortable: false,
      filter: false,
     },
    { headerName: "Name", field: "name" },
    {
      headerName: "Description",
      field: "description",
      flex: 1,
      minWidth: 200,
    },
    { headerName: "Location", field: "location" },
    { headerName: "Employees", field: "employees",
      cellRenderer: (params: { data: { name: string; }; value: number; }) => {
        const cafeName = params.data.name;
        const employeeCount = params.value;

        return (
          <Link to={`/employees?cafe=${cafeName}`}>
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
            <Link to={`/cafes/${cafeId}/edit`}>
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
              placement="left"
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
      },
      sortable: false,
      filter: false,
      width: 100
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
