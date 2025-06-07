import React, { useState } from 'react';
import { useQuery, gql } from '@apollo/client';
import { List, Card, Typography, Input, Select, Space, Tag, Statistic, Row, Col, Spin } from 'antd';
import { StarOutlined, ForkOutlined, EyeOutlined } from '@ant-design/icons';

const { Title } = Typography;
const { Search } = Input;
const { Option } = Select;

interface Repository {
  id: string;
  name: string;
  description: string | null;
  url: string;
  updatedAt: string;
  stargazerCount: number;
  forkCount: number;
  watchers: {
    totalCount: number;
  };
  primaryLanguage?: {
    name: string;
    color: string;
  };
  isPrivate: boolean;
}

interface RepositoriesData {
  viewer: {
    login: string;
    repositories: {
      nodes: Repository[];
    };
  };
}

const GET_REPOS = gql`
  query GetViewerRepos($first: Int!, $orderBy: RepositoryOrder) {
    viewer {
      login
      repositories(first: $first, orderBy: $orderBy) {
        nodes {
          id
          name
          description
          url
          updatedAt
          stargazerCount
          forkCount
          watchers {
            totalCount
          }
          primaryLanguage {
            name
            color
          }
          isPrivate
        }
      }
    }
  }
`;

const Repositories: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('UPDATED_AT');
  const [sortDirection, setSortDirection] = useState('DESC');

  const { loading, error, data } = useQuery<RepositoriesData>(GET_REPOS, {
    variables: {
      first: 20,
      orderBy: {
        field: sortBy,
        direction: sortDirection,
      },
    },
  });

  if (loading) return <Spin tip="Loading repositories..." style={{ marginTop: 50 }} />;
  if (error) return <div>Error: {error.message}</div>;

  const filteredRepos = data!.viewer.repositories.nodes.filter((repo) =>
    repo.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <Row justify="space-between" align="middle" style={{ marginBottom: 24 }}>
        <Col>
          <Title level={2}>Repositories</Title>
        </Col>
        <Col>
          <Space>
            <Search
              placeholder="Search repositories"
              allowClear
              onSearch={setSearchTerm}
              style={{ width: 200 }}
            />
            <Select
              defaultValue="UPDATED_AT"
              style={{ width: 120 }}
              onChange={setSortBy}
            >
              <Option value="UPDATED_AT">Last updated</Option>
              <Option value="NAME">Name</Option>
              <Option value="STARGAZERS">Stars</Option>
            </Select>
            <Select
              defaultValue="DESC"
              style={{ width: 120 }}
              onChange={setSortDirection}
            >
              <Option value="DESC">Descending</Option>
              <Option value="ASC">Ascending</Option>
            </Select>
          </Space>
        </Col>
      </Row>

      <List
        grid={{ gutter: 16, column: 2 }}
        dataSource={filteredRepos}
        renderItem={(repo: Repository) => (
          <List.Item>
            <Card
              title={
                <a href={repo.url} target="_blank" rel="noopener noreferrer">
                  {repo.name}
                </a>
              }
              extra={repo.isPrivate ? <Tag color="red">Private</Tag> : <Tag color="green">Public</Tag>}
            >
              <p>{repo.description || 'No description'}</p>
              <Row gutter={16} style={{ marginTop: 16 }}>
                <Col span={8}>
                  <Statistic
                    title="Stars"
                    value={repo.stargazerCount}
                    prefix={<StarOutlined />}
                  />
                </Col>
                <Col span={8}>
                  <Statistic
                    title="Forks"
                    value={repo.forkCount}
                    prefix={<ForkOutlined />}
                  />
                </Col>
                <Col span={8}>
                  <Statistic
                    title="Watchers"
                    value={repo.watchers.totalCount}
                    prefix={<EyeOutlined />}
                  />
                </Col>
              </Row>
              {repo.primaryLanguage && (
                <Tag color={repo.primaryLanguage.color}>
                  {repo.primaryLanguage.name}
                </Tag>
              )}
              <p style={{ marginTop: 8 }}>
                <small>Last updated: {new Date(repo.updatedAt).toLocaleString()}</small>
              </p>
            </Card>
          </List.Item>
        )}
      />
    </div>
  );
};

export default Repositories; 