import React from 'react';
import { useQuery, gql } from '@apollo/client';
import { Card, Row, Col, Statistic, Typography, Avatar, List, Tag, Spin } from 'antd';
import {
  UserOutlined,
  StarOutlined,
  ForkOutlined,
  TeamOutlined,
  GlobalOutlined,
} from '@ant-design/icons';

const { Title, Text } = Typography;

interface Repository {
  name: string;
  description: string | null;
  url: string;
  stargazerCount: number;
  primaryLanguage?: {
    name: string;
    color: string;
  };
}

interface ProfileData {
  viewer: {
    login: string;
    name: string;
    avatarUrl: string;
    bio: string;
    location: string;
    websiteUrl: string;
    email: string;
    company: string;
    followers: {
      totalCount: number;
    };
    following: {
      totalCount: number;
    };
    repositories: {
      totalCount: number;
    };
    starredRepositories: {
      totalCount: number;
    };
    topRepositories: {
      nodes: Repository[];
    };
  };
}

const GET_PROFILE = gql`
  query GetProfile {
    viewer {
      login
      name
      avatarUrl
      bio
      location
      websiteUrl
      email
      company
      followers {
        totalCount
      }
      following {
        totalCount
      }
      repositories {
        totalCount
      }
      starredRepositories {
        totalCount
      }
      topRepositories(first: 5, orderBy: {field: STARGAZERS, direction: DESC}) {
        nodes {
          name
          description
          stargazerCount
          url
          primaryLanguage {
            name
            color
          }
        }
      }
    }
  }
`;

const Profile: React.FC = () => {
  const { loading, error, data } = useQuery<ProfileData>(GET_PROFILE);

  if (loading) return <Spin tip="Loading profile..." style={{ marginTop: 50 }} />;
  if (error) return <div>Error: {error.message}</div>;

  const { viewer } = data!;

  return (
    <div>
      <Row gutter={[24, 24]}>
        <Col span={8}>
          <Card>
            <div style={{ textAlign: 'center' }}>
              <Avatar
                size={120}
                src={viewer.avatarUrl}
                icon={<UserOutlined />}
              />
              <Title level={2} style={{ marginTop: 16 }}>{viewer.name || viewer.login}</Title>
              <Text type="secondary">@{viewer.login}</Text>
              {viewer.bio && <p style={{ marginTop: 16 }}>{viewer.bio}</p>}
              
              <List
                size="small"
                style={{ marginTop: 16, textAlign: 'left' }}
                dataSource={[
                  { icon: <GlobalOutlined />, text: viewer.location },
                  { icon: <TeamOutlined />, text: viewer.company },
                  { icon: <UserOutlined />, text: viewer.email },
                ].filter(item => item.text)}
                renderItem={item => (
                  <List.Item>
                    {item.icon} {item.text}
                  </List.Item>
                )}
              />
            </div>
          </Card>
        </Col>
        
        <Col span={16}>
          <Row gutter={[16, 16]}>
            <Col span={8}>
              <Card>
                <Statistic
                  title="Repositories"
                  value={viewer.repositories.totalCount}
                  prefix={<ForkOutlined />}
                />
              </Card>
            </Col>
            <Col span={8}>
              <Card>
                <Statistic
                  title="Followers"
                  value={viewer.followers.totalCount}
                  prefix={<UserOutlined />}
                />
              </Card>
            </Col>
            <Col span={8}>
              <Card>
                <Statistic
                  title="Following"
                  value={viewer.following.totalCount}
                  prefix={<UserOutlined />}
                />
              </Card>
            </Col>
            <Col span={8}>
              <Card>
                <Statistic
                  title="Stars"
                  value={viewer.starredRepositories.totalCount}
                  prefix={<StarOutlined />}
                />
              </Card>
            </Col>
          </Row>

          <Card title="Top Repositories" style={{ marginTop: 16 }}>
            <List
              dataSource={viewer.topRepositories.nodes.filter(Boolean)}
              renderItem={(repo: Repository) => (
                <List.Item key={repo.url}>
                  <List.Item.Meta
                    title={<a href={repo.url} target="_blank" rel="noopener noreferrer">{repo.name}</a>}
                    description={repo.description}
                  />
                  <div>
                    {repo.primaryLanguage && (
                      <Tag color={repo.primaryLanguage.color}>
                        {repo.primaryLanguage.name}
                      </Tag>
                    )}
                    <Statistic
                      value={repo.stargazerCount}
                      prefix={<StarOutlined />}
                      style={{ display: 'inline-block', marginLeft: 16 }}
                    />
                  </div>
                </List.Item>
              )}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Profile; 