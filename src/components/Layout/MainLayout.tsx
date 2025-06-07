import React from 'react';
import { Link, useLocation, Outlet } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import {
  GithubOutlined,
  UserOutlined,
  BranchesOutlined,
  BookOutlined,
  StarOutlined,
  TeamOutlined,
  PlusOutlined,
} from '@ant-design/icons';

const { Header, Content, Sider } = Layout;

const MainLayout: React.FC = () => {
  const location = useLocation();

  const menuItems = [
    {
      key: '/',
      icon: <BookOutlined />,
      label: <Link to="/">Repositories</Link>,
    },
    {
      key: '/profile',
      icon: <UserOutlined />,
      label: <Link to="/profile">Profile</Link>,
    },
    {
      key: '/branches',
      icon: <BranchesOutlined />,
      label: <Link to="/branches">Branches</Link>,
    },
    {
      key: '/stars',
      icon: <StarOutlined />,
      label: <Link to="/stars">Starred</Link>,
    },
    {
      key: '/teams',
      icon: <TeamOutlined />,
      label: <Link to="/teams">Teams</Link>,
    },
    {
      key: '/mutations',
      icon: <BookOutlined />,
      label: <Link to="/mutations">GraphQL Mutations</Link>,
    },
    {
      key: '/create-repo',
      icon: <PlusOutlined />,
      label: <Link to="/create-repo">Создать репозиторий</Link>,
    },
  ];

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header style={{ display: 'flex', alignItems: 'center', background: '#fff', padding: '0 24px' }}>
        <GithubOutlined style={{ fontSize: '24px', marginRight: '16px' }} />
        <h1 style={{ margin: 0 }}>GitHub Client</h1>
      </Header>
      <Layout>
        <Sider width={200} style={{ background: '#fff' }}>
          <Menu
            mode="inline"
            selectedKeys={[location.pathname]}
            style={{ height: '100%', borderRight: 0 }}
            items={menuItems}
          />
        </Sider>
        <Layout style={{ padding: '24px' }}>
          <Content style={{ background: '#fff', padding: 24, margin: 0, minHeight: 280 }}>
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default MainLayout; 