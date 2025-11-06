import { useState } from 'react';

import { Button, Input, Space, Typography } from 'antd';
import {
  PlusOutlined,
} from '@ant-design/icons';

import { useQuery } from '@tanstack/react-query';

import { fetchCafes } from '../../services/cafeService';
import { type CafeListItem } from '@cafe-app/shared-types';
import { CafeTable } from './CafeTable';

const { Title } = Typography;
const { Search } = Input;

export function CafePage() {
  const [locationFilter, setLocationFilter] = useState<string>('');

  const {
    data: cafes,
    isLoading,
  } = useQuery<CafeListItem[]>({
    queryKey: ['cafes', locationFilter],
    queryFn: () => fetchCafes({ location: locationFilter }),
  });

  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <Title level={2}>Cafes</Title>
      <Space style={{ width: '100%', justifyContent: 'space-between' }}>
        <Search
          placeholder="Filter by location"
          onSearch={(value) => { setLocationFilter(value) }}
          style={{ width: 300 }}
          allowClear
        />
        <Button type="primary" icon={<PlusOutlined />}>
          Add Cafe
        </Button>
      </Space>
      <CafeTable cafes={cafes ?? []} isLoading={isLoading} />
    </Space>
  )
}