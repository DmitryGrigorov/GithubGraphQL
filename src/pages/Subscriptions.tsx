import React, { useEffect, useState } from 'react';
import { useQuery, gql } from '@apollo/client';
import { Card, List, Typography, Space, Select, Alert, Tabs, Spin, Button } from 'antd';
import { GithubOutlined, StarOutlined, ForkOutlined, EyeOutlined, SyncOutlined } from '@ant-design/icons';

const { Title } = Typography;
const { Option } = Select;
const { TabPane } = Tabs;

// Query to get current user's repositories
const GET_USER_REPOS = gql`
  query GetUserRepos {
    viewer {
      login
      repositories(first: 100) {
        nodes {
          id
          name
          owner {
            login
          }
        }
      }
    }
  }
`;

interface Repository {
  id: string;
  name: string;
  owner: {
    login: string;
  };
}

interface RepositoryEvent {
  id: string;
  type: string;
  actor: {
    login: string;
    avatar_url: string;
  };
  repo: {
    name: string;
  };
  created_at: string;
  payload: any;
}

const Subscriptions: React.FC = () => {
  const [selectedRepo, setSelectedRepo] = useState<Repository | null>(null);
  const [events, setEvents] = useState<RepositoryEvent[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Get user's repositories
  const { data: reposData, loading: reposLoading } = useQuery(GET_USER_REPOS);

  const fetchEvents = async () => {
    if (!selectedRepo) return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `https://api.github.com/repos/${selectedRepo.owner.login}/${selectedRepo.name}/events`,
        {
          headers: {
            Authorization: `Bearer ${process.env.REACT_APP_GITHUB_TOKEN}`,
            Accept: 'application/vnd.github.v3+json',
          },
        }
      );

      if (!response.ok) {
        throw new Error(`GitHub API error: ${response.statusText}`);
      }

      const data = await response.json();
      setEvents(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (selectedRepo) {
      fetchEvents();
      // Set up polling every 30 seconds
      const interval = setInterval(fetchEvents, 30000);
      return () => clearInterval(interval);
    }
  }, [selectedRepo]);

  const handleRepoSelect = (value: string) => {
    const [owner, name] = value.split('/');
    setSelectedRepo({ id: '', name, owner: { login: owner } });
  };

  const getEventDescription = (event: RepositoryEvent) => {
    switch (event.type) {
      case 'PushEvent':
        return `Pushed ${event.payload.commits?.length || 0} commits`;
      case 'PullRequestEvent':
        return `Pull request ${event.payload.action}: ${event.payload.pull_request?.title}`;
      case 'IssuesEvent':
        return `Issue ${event.payload.action}: ${event.payload.issue?.title}`;
      case 'CreateEvent':
        return `Created ${event.payload.ref_type}: ${event.payload.ref}`;
      case 'DeleteEvent':
        return `Deleted ${event.payload.ref_type}: ${event.payload.ref}`;
      case 'ForkEvent':
        return 'Forked repository';
      case 'WatchEvent':
        return 'Starred repository';
      default:
        return event.type;
    }
  };

  if (reposLoading) return <Spin tip="Loading repositories..." />;

  return (
    <div style={{ padding: '24px' }}>
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <Title level={2}>
          <GithubOutlined /> GitHub Repository Events
        </Title>

        <Card>
          <Space direction="vertical" style={{ width: '100%' }}>
            <Space style={{ width: '100%', justifyContent: 'space-between' }}>
              <Select
                style={{ width: '80%' }}
                placeholder="Select a repository"
                onChange={handleRepoSelect}
                loading={reposLoading}
              >
                {reposData?.viewer.repositories.nodes.map((repo: Repository) => (
                  <Option key={repo.id} value={`${repo.owner.login}/${repo.name}`}>
                    {repo.owner.login}/{repo.name}
                  </Option>
                ))}
              </Select>
              <Button
                icon={<SyncOutlined />}
                onClick={fetchEvents}
                loading={loading}
                disabled={!selectedRepo}
              >
                Refresh
              </Button>
            </Space>

            {error && (
              <Alert
                message="Error"
                description={error}
                type="error"
                showIcon
              />
            )}

            <List
              loading={loading}
              dataSource={events}
              renderItem={(event) => (
                <List.Item>
                  <List.Item.Meta
                    avatar={
                      <img
                        src={event.actor.avatar_url}
                        alt={event.actor.login}
                        style={{ width: 40, height: 40, borderRadius: '50%' }}
                      />
                    }
                    title={`${event.actor.login} ${getEventDescription(event)}`}
                    description={`Repository: ${event.repo.name}`}
                  />
                  <div>{new Date(event.created_at).toLocaleString()}</div>
                </List.Item>
              )}
            />
          </Space>
        </Card>
      </Space>
    </div>
  );
};

export default Subscriptions; 