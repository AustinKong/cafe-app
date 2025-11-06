/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { type CafeListItem, type CreateCafeDto } from "@cafe-app/shared-types";
import { Button, Flex, Form, Input, message, Popconfirm, Typography, Upload, type UploadFile, type UploadProps } from "antd";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createCafe, fetchCafeById, updateCafe } from "../../services/cafeService";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { UploadOutlined } from "@ant-design/icons";

const { Title } = Typography;

const ALLOWED_TYPES = ["image/jpeg", "image/png"];
const MAX_FILE_SIZE_MB = 2;

function normFile(e: unknown): UploadFile[] {
  if (Array.isArray(e)) return e;
  if (e && typeof e === "object" && "fileList" in e) {
    return (e as { fileList: UploadFile[] }).fileList;
  }
  return [];
}

function toFileListFromUrl(url: string | null | undefined): UploadFile[] {
  if (!url) return [];
  return [
    {
      uid: "existing-logo",
      name: url.split("/").pop() ?? "logo.jpg",
      status: "done",
      url,
    },
  ];
}

export function CafeFormPage() {
  const { id } = useParams();
  const isEdit = !!id;
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const qc = useQueryClient();

  const { data: cafe, isLoading } = useQuery<CafeListItem>({
    queryKey: ["cafes", id],
    queryFn: () => fetchCafeById(id ?? ""),
    enabled: isEdit,
  });

  const initialLogo = useMemo(() => toFileListFromUrl(cafe?.logo), [cafe?.logo]);

  useEffect(() => {
    if (cafe) {
      form.setFieldsValue({
        name: cafe.name,
        description: cafe.description,
        location: cafe.location,
        logo: initialLogo,
      });
      form.resetFields();
    } else if (!isEdit) {
      form.setFieldsValue({ logo: [] });
    }
  }, [cafe, isEdit, form, initialLogo]);

  const { mutate: saveCafe, isPending } = useMutation({
    mutationFn: (dto: CreateCafeDto & { logo?: File }) => {
      if (isEdit && id) return updateCafe(id, dto);
      return createCafe(dto);
    },
    onSuccess: async () => {
      await qc.invalidateQueries({ queryKey: ["cafes"] });
      if (id) await qc.invalidateQueries({ queryKey: ["cafes", id] });
      await navigate("/cafes");
    },
  });

  const handleFinish = (values: CreateCafeDto & { logo?: UploadFile[] }) => {
    const file = values.logo?.[0]?.originFileObj as File | undefined;

    if (file) {
      if (!ALLOWED_TYPES.includes(file.type)) {
        message.error("Only JPG/PNG files are allowed.");
        return;
      }
      if (file.size / 1024 / 1024 > MAX_FILE_SIZE_MB) {
        message.error(`Image must be smaller than ${String(MAX_FILE_SIZE_MB)}MB.`);
        return;
      }
    }

    saveCafe({ name: values.name, description: values.description, location: values.location, logo: file });
  };

  const uploadProps: UploadProps = {
    listType: "picture",
    multiple: false,
    maxCount: 1,
    accept: ALLOWED_TYPES.join(","),
    beforeUpload: (file) => {
      if (!ALLOWED_TYPES.includes(file.type)) {
        message.error("Only JPG/PNG files are allowed.");
        return Upload.LIST_IGNORE;
      }
      if (file.size / 1024 / 1024 > MAX_FILE_SIZE_MB) {
        message.error(`Image must be smaller than ${String(MAX_FILE_SIZE_MB)}MB.`);
        return Upload.LIST_IGNORE;
      }
      return false;
    },
  };

  const [cancelConfirmOpen, setCancelConfirmOpen] =  useState(false);

  const handleCancelClick = () => {
    if (form.isFieldsTouched()) {
      setCancelConfirmOpen(true);
    } else {
      void navigate("/cafes");
    }
  }

  return (
    <div style={{ maxWidth: 800, margin: "auto" }}>
      <Title level={2}>{isEdit ? "Edit Cafe" : "Add New Cafe"}</Title>

      <Form form={form} layout="vertical" onFinish={handleFinish} initialValues={{ ...cafe, logo: initialLogo }}>
        <Form.Item
          label="Name"
          name="name"
          rules={[
            { required: true, message: "Please enter the cafe name" },
            { min: 6, message: "Name must be at least 6 characters" },
            { max: 10, message: "Name cannot exceed 10 characters" },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Description"
          name="description"
          rules={[
            { required: true, message: "Please enter the cafe description" },
            { max: 100, message: "Description cannot exceed 100 characters" },
          ]}
        >
          <Input.TextArea rows={4} />
        </Form.Item>

        <Form.Item label="Location" name="location">
          <Input />
        </Form.Item>

        <Form.Item
          label="Logo"
          name="logo"
          valuePropName="fileList"
          getValueFromEvent={normFile}
          extra={`Accepted: JPG, PNG • Max ${String(MAX_FILE_SIZE_MB)}MB`}
        >
          <Upload {...uploadProps}>
            <Button icon={<UploadOutlined />}>Click to Upload</Button>
          </Upload>
        </Form.Item>

        <Flex style={{ justifyContent: "space-between" }}>
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={isPending} disabled={isLoading}>
              {isEdit ? "Update Cafe" : "Create Cafe"}
            </Button>
          </Form.Item>
          <Popconfirm
            title="Are you sure you want to cancel?"
            description="Unsaved changes will be lost."
            onConfirm={() => { void navigate("/cafes"); }}
            okText="Yes"
            cancelText="No"
            open={cancelConfirmOpen}
            onCancel={() => { setCancelConfirmOpen(false) }}
          >
            <Button onClick={handleCancelClick}>Cancel</Button>
          </Popconfirm>
        </Flex>
      </Form>
    </div>
  );
}
