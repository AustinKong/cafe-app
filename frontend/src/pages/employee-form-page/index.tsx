/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Button, DatePicker, Form, Input, Popconfirm, Radio, Select, Space, Spin, Typography } from 'antd';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { fetchCafes } from '../../services/cafeService';
import { createEmployee, fetchEmployeeById, updateEmployee } from '../../services/employeeService';
import { type CafeListItem, type CreateEmployeeDto, type Employee } from '@cafe-app/shared-types';
import dayjs from 'dayjs';

const { Title } = Typography;

export function EmployeeFormPage() {
  const { id } = useParams();
  const isEdit = !!id;
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const qc = useQueryClient();

  const { data: cafes, isLoading: cafesIsLoading } = useQuery<CafeListItem[]>({
    queryKey: ["cafes"],
    queryFn: () => fetchCafes({}),
  });

  const { data: employee, isLoading: employeeIsLoading } = useQuery<Employee>({
    queryKey: ['employees', id],
    queryFn: async () => fetchEmployeeById(id ?? ''),
    enabled: isEdit,
  });

  useEffect(() => {
    if (employee) {
      form.setFieldsValue({
        id: employee.id,
        name: employee.name,
        emailAddress: employee.emailAddress,
        phoneNumber: employee.phoneNumber,
        gender: employee.gender,
        cafeId: employee.cafeId,
        startDate: dayjs(employee.startDate),
      });
      form.resetFields();
    }
  }, [employee, form]);

  const { mutate: saveEmployee, isPending } = useMutation({
    mutationFn: (dto: CreateEmployeeDto) => {
      if (isEdit && id) return updateEmployee(id, dto);
      return createEmployee(dto);
    },
    onSuccess: async () => {
      await qc.invalidateQueries({ queryKey: ['employees'] });
      if (id) await qc.invalidateQueries({ queryKey: ['employees', id] });
      void navigate('/employees');
    },
  });

  const handleFinish = (values: CreateEmployeeDto) => {
    saveEmployee(values);
  };

  const [cancelConfirmOpen, setCancelConfirmOpen] = useState(false);

  const handleCancelClick = () => {
    if (form.isFieldsTouched()) {
      setCancelConfirmOpen(true);
    } else {
      void navigate('/employees');
    }
  };

  if (cafesIsLoading || employeeIsLoading) {
    return <Spin />;
  }

  return (
    <div style={{ maxWidth: 800, margin: "auto" }}>
      <Title level={2}>{isEdit ? "Edit Employee" : "Add New Employee"}</Title>

      <Form
        form={form}
        layout="vertical"
        onFinish={handleFinish}
        initialValues={{...employee, startDate: dayjs(employee?.startDate)}}
      >
        <Form.Item
          label="Name"
          name="name"
          rules={[
            { required: true, message: "Please enter the name" },
            { min: 6, message: "Name must be at least 6 characters" },
            { max: 10, message: "Name cannot exceed 10 characters" },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Email"
          name="emailAddress"
          rules={[
            { required: true, message: "Please enter an email" },
            { type: "email", message: "Please enter a valid email" },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Phone Number"
          name="phoneNumber"
          rules={[
            { required: true, message: "Please enter a phone number" },
            {
              pattern: /^[89]\d{7}$/,
              message: "Please enter a valid Singapore phone number",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Gender"
          name="gender"
          rules={[{ required: true, message: "Please select a gender" }]}
        >
          <Radio.Group>
            <Radio value="Male">Male</Radio>
            <Radio value="Female">Female</Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item
          label="Assigned Café"
          name="cafeId"
          rules={[{ required: true, message: "Please select a cafe" }]}
        >
          <Select
            options={(cafes ?? []).map((c) => ({ label: c.name, value: c.id }))}
          />
        </Form.Item>

        <Form.Item
          label="Start Date"
          name="startDate"
          rules={[{ required: true, message: "Please select a start date" }]}
        >
          <DatePicker />
        </Form.Item>

        <Space style={{ justifyContent: "space-between", width: "100%" }}>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={isPending}
            >
              {isEdit ? "Update Employee" : "Create Employee"}
            </Button>
          </Form.Item>

          <Popconfirm
            title="Are you sure you want to cancel?"
            description="Unsaved changes will be lost."
            onConfirm={() => {
              void navigate("/employees");
            }}
            okText="Yes"
            cancelText="No"
            open={cancelConfirmOpen}
            onCancel={() => {
              setCancelConfirmOpen(false);
            }}
          >
            <Button onClick={handleCancelClick}>Cancel</Button>
          </Popconfirm>
        </Space>
      </Form>
    </div>
  );
}

export default EmployeeFormPage;
