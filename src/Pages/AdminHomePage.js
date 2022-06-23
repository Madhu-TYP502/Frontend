import { AppstoreOutlined,ShopOutlined,TeamOutlined,UserOutlined,} from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import React from 'react';
import { Tabs } from 'antd';
import UsersView from '../Components/layout/UsersView'
import BranchesView from '../Components/layout/BranchesView';
import DeleteUserModal from '../Components/modal/DeleteUserModal';

const { TabPane } = Tabs;
const { Header, Content, Footer, Sider } = Layout;
const items = [
  UserOutlined,
  AppstoreOutlined,
  TeamOutlined,
  ShopOutlined,
].map((icon, index) => ({
  key: String(index + 1),
  icon: React.createElement(icon),
  label: `nav ${index + 1}`,
}));




const menuClick = (e) =>
{
   console.log("MENU SELECTED",e);
}

const AdminHomePage = () => {
  return (
    <Layout hasSider>
    <Sider
      style={{
        overflow: 'auto',
        height: '100vh',
        position: 'fixed',
        left: 0,
        top: 0,
        bottom: 0,
      }}
    >
      <div className="logo" />
      <Menu theme="dark" mode="inline" defaultSelectedKeys={['4']} items={items} onClick={menuClick}/>
    </Sider>
    <Layout
      className="site-layout"
      style={{
        marginLeft: 200,
      }}
    >
      <Header
        className="site-layout-background"
        style={{
          padding: 0,
          background: 'white',
          height:'65px'
        }}
      >
        <Tabs defaultActiveKey="1"
          centered size='large'
          tabBarGutter={'350px'}
          tabPosition='top'
          color='white'
          style={{
            paddingTop:'10px'
          }}>
          <TabPane tab="Users" key="1">
          <UsersView/>
          </TabPane>
          <TabPane tab="Branches" key="2">
          <BranchesView/>
          </TabPane>
          <TabPane tab="Batches" key="3">
            Batches
          </TabPane>
        </Tabs>
      </Header>
      <Content
        style={{
          margin: '24px 16px 0',
          overflow: 'initial',
        }}
      >
        <div
          className="site-layout-background"
          style={{
            padding: 24,
            textAlign: 'center',
          }}
        >
        </div>
      </Content>
      <Footer
        style={{
          textAlign: 'center',
        }}
      >
        Thinkle ©2022 Created by TYSS
      </Footer>
    </Layout>
  </Layout>
  )
}

export default AdminHomePage;