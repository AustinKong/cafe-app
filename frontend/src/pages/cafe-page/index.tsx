import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

import { Button, Input, Space, Typography } from 'antd';
import {
  PlusOutlined,
  SearchOutlined,
} from '@ant-design/icons';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { deleteCafe as deleteCafeSvc, fetchCafes } from '../../services/cafeService';
import { type CafeListItem } from '@cafe-app/shared-types';
import { CafeTable } from './CafeTable';

const { Title } = Typography;

export function CafePage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const locationParam = searchParams.get('location') ?? '';
  const queryClient = useQueryClient();
  
  const [inputValue, setInputValue] = useState<string>(locationParam);

  const handleSearch = (value: string) => {
    if (value.trim()) {
      setSearchParams({ location: value.trim() });
    } else {
      setSearchParams({});
    }
  };

  useEffect(() => {
    setInputValue(locationParam);
  }, [locationParam]);

  const {
    data: cafes,
    isLoading,
  } = useQuery<CafeListItem[]>({
    queryKey: ['cafes', locationParam],
    queryFn: () => fetchCafes({ location: locationParam }),
  });

  const {
    mutate: deleteCafe,
    isPending: isDeleting,
  } = useMutation({
    mutationFn: deleteCafeSvc,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['cafes'] });
    },
  })

  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <Title level={2}>Cafes</Title>
      <Space style={{ width: '100%', justifyContent: 'space-between' }}>
        <Space.Compact style={{ width: 300 }}>
          <Input
            placeholder="Filter by location"
            value={inputValue}
            onChange={(e) => { setInputValue(e.target.value); }}
            onPressEnter={() => {
              handleSearch(inputValue);
            }}
            allowClear
          />
          <Button
            type="primary"
            icon={<SearchOutlined />}
            onClick={() => {
              handleSearch(inputValue);
            }}
          >
            Search
          </Button>
        </Space.Compact>
        <Button type="primary" icon={<PlusOutlined />}>
          Add Cafe
        </Button>
      </Space>
      <CafeTable cafes={cafes ?? []} isLoading={isLoading || isDeleting} deleteCafe={deleteCafe} />
    </Space>
  )
}