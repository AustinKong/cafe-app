import { Space, Typography, Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { fetchEmployees, deleteEmployee as deleteEmployeeSvc } from '../../services/employeeService';
import type { EmployeeListItem } from '@cafe-app/shared-types';
import { EmployeeTable } from './EmployeeTable';

const { Title } = Typography;

export function EmployeePage() {
  const queryClient = useQueryClient();

  const { data: employees, isLoading } = useQuery<EmployeeListItem[]>({
    queryKey: ['employees'],
    queryFn: () => fetchEmployees({}),
  });

  const { mutate: deleteEmployee, isPending: isDeleting } = useMutation({
    mutationFn: deleteEmployeeSvc,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['employees'] });
    },
  });

  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <Title level={2}>Employees</Title>
      <Space style={{ width: '100%', justifyContent: 'flex-end' }}>
        <Link to="/employees/new">
          <Button type="primary" icon={<PlusOutlined />}>Add New Employee</Button>
        </Link>
      </Space>
      <EmployeeTable employees={employees ?? []} isLoading={isLoading || isDeleting} deleteEmployee={deleteEmployee} />
    </Space>
  );
}

export default EmployeePage;
