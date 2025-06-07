import React, { useState } from 'react';
import { useQuery, gql } from '@apollo/client';
import { Card, List, Typography, Select, Spin, Tag, Button, Space, Modal, message } from 'antd';
import { BranchesOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';

const { Title } = Typography;
const { Option } = Select;

interface Commit {
  message: string;
  committedDate: string;
  author: {
    name: string;
    email: string;
  };
}

interface Branch {
  id: string;
  name: string;
  target: Commit;
}

interface Repository {
  id: string;
  name: string;
  defaultBranchRef: {
    name: string;
  };
  refs: {
    nodes: Branch[];
  };
}

interface BranchesData {
  viewer: {
    repositories: {
      nodes: Repository[];
    };
  };
}

const GET_REPOS_AND_BRANCHES = gql`
  query GetReposAndBranches($first: Int!) {
    viewer {
      repositories(first: $first) {
        nodes {
          id
          name
          defaultBranchRef {
            name
          }
          refs(first: 100, refPrefix: "refs/heads/") {
            nodes {
              id
              name
              target {
                ... on Commit {
                  message
                  committedDate
                  author {
                    name
                    email
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

const Branches: React.FC = () => {
  const [selectedRepo, setSelectedRepo] = useState<string | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [newBranchName, setNewBranchName] = useState('');

  const { loading, error, data } = useQuery<BranchesData>(GET_REPOS_AND_BRANCHES, {
    variables: {
      first: 100,
    },
  });

  if (loading) return <Spin tip="Loading repositories and branches..." style={{ marginTop: 50 }} />;
  if (error) return <div>Error: {error.message}</div>;

  const repositories = data!.viewer.repositories.nodes;

  const selectedRepoData = selectedRepo
    ? repositories.find((repo) => repo.id === selectedRepo)
    : null;

  const handleCreateBranch = () => {
    // Here you would implement the actual branch creation logic
    message.success(`Branch ${newBranchName} created successfully!`);
    setIsModalVisible(false);
    setNewBranchName('');
  };

  return (
    <div>
      <Space direction="vertical" style={{ width: '100%' }}>
        <div style={{ marginBottom: 24 }}>
          <Title level={2}>Branch Management</Title>
          <Select
            style={{ width: 300 }}
            placeholder="Select a repository"
            onChange={setSelectedRepo}
            value={selectedRepo}
          >
            {repositories.map((repo) => (
              <Option key={repo.id} value={repo.id}>
                {repo.name}
              </Option>
            ))}
          </Select>
        </div>

        {selectedRepoData && (
          <Card
            title={
              <Space>
                <BranchesOutlined />
                Branches in {selectedRepoData.name}
              </Space>
            }
            extra={
              <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={() => setIsModalVisible(true)}
              >
                New Branch
              </Button>
            }
          >
            <List
              dataSource={selectedRepoData.refs.nodes}
              renderItem={(branch) => (
                <List.Item
                  actions={[
                    <Button
                      key="delete"
                      type="text"
                      danger
                      icon={<DeleteOutlined />}
                      onClick={() => message.warning('Delete branch functionality to be implemented')}
                    />,
                  ]}
                >
                  <List.Item.Meta
                    title={
                      <Space>
                        {branch.name}
                        {branch.name === selectedRepoData.defaultBranchRef.name && (
                          <Tag color="blue">Default</Tag>
                        )}
                      </Space>
                    }
                    description={
                      <div>
                        <div>Last commit: {branch.target.message}</div>
                        <div>
                          <small>
                            By {branch.target.author.name} on{' '}
                            {new Date(branch.target.committedDate).toLocaleString()}
                          </small>
                        </div>
                      </div>
                    }
                  />
                </List.Item>
              )}
            />
          </Card>
        )}
      </Space>

      <Modal
        title="Create New Branch"
        open={isModalVisible}
        onOk={handleCreateBranch}
        onCancel={() => {
          setIsModalVisible(false);
          setNewBranchName('');
        }}
      >
        <p>Create a new branch from the default branch ({selectedRepoData?.defaultBranchRef.name})</p>
        <input
          type="text"
          value={newBranchName}
          onChange={(e) => setNewBranchName(e.target.value)}
          placeholder="Enter branch name"
          style={{ width: '100%', padding: '8px' }}
        />
      </Modal>
    </div>
  );
};

export default Branches; 