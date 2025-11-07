import { useState, useRef } from 'react';
import { type ColDef } from 'ag-grid-community';
import { AgGridReact } from 'ag-grid-react';
import type { EmployeeListItem } from '@cafe-app/shared-types';
import { Link } from 'react-router-dom';
import { Button, Popconfirm } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';

export function EmployeeTable({
  employees,
  isLoading,
  deleteEmployee,
  cafeFilter,
}: {
  employees: EmployeeListItem[];
  isLoading: boolean;
  deleteEmployee: (id: string) => void;
  cafeFilter?: string;
}) {
  const gridRef = useRef<AgGridReact>(null);

  const onGridReady = (params: { api: { setFilterModel: (model: Record<string, unknown>) => void } }) => {
    if (cafeFilter) {
      // Preset cafe filter
      params.api.setFilterModel({
        cafe: {
          type: 'equals',
          filter: cafeFilter,
          filterType: 'text',
        },
      });
    }
  };
  const [colDefs] = useState<ColDef<EmployeeListItem>[]>([
    { headerName: 'ID', field: 'id' },
    { headerName: 'Name', field: 'name', flex: 1 },
    { headerName: 'Email', field: 'emailAddress', flex: 1 },
    { headerName: 'Phone', field: 'phoneNumber', flex: 1 },
    { headerName: 'Days Worked', field: 'daysWorked', flex: 1 },
    { headerName: 'Café', field: 'cafe', flex: 1 },
    {
      headerName: 'Actions',
      cellRenderer: (params: { data: { id: string } }) => {
        const id = params.data.id;
        return (
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <Link to={`/employees/${id}/edit`}>
              <Button type="text" icon={<EditOutlined />} size="small" />
            </Link>
            <Popconfirm
              title="Are you sure to delete this employee?"
              onConfirm={() => { deleteEmployee(id); }}
              okText="Yes"
              cancelText="No"
              placement="left"
            >
              <Button type="text" danger icon={<DeleteOutlined />} size="small" />
            </Popconfirm>
          </div>
        );
      },
      sortable: false,
      filter: false,
      width: 120,
    },
  ]);

  return (
    <div className="ag-theme-antd" style={{ height: 600, width: '100%' }}>
      <AgGridReact
        ref={gridRef}
        rowData={employees}
        columnDefs={colDefs}
        defaultColDef={{
          sortable: true,
          resizable: true,
          filter: true,
        }}
        onGridReady={onGridReady}
        overlayLoadingTemplate={'<span class="ag-overlay-loading-center">Loading employees...</span>'}
        loading={isLoading}
        pagination={false}
      />
    </div>
  );
}
