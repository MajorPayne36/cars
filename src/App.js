import { Layout, Menu } from 'antd';
import CarsTable from './components/CarsTable';
import CustomSider from './components/CustomSider';

const { Header, Content, Footer } = Layout;
export let carsData;



const App = () => {
  return (
    <Layout>
      <Header className="header">
        <div className="logo" />
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
          <Menu.Item key="1">nav 1</Menu.Item>
          <Menu.Item key="2">nav 2</Menu.Item>
          <Menu.Item key="3">nav 3</Menu.Item>
        </Menu>
      </Header>
      <Content style={{ padding: '0 50px' }}>
        <Layout className="site-layout-background" style={{ padding: '24px 0' }}>
          
          <CustomSider />

          <Content style={{ padding: '0 24px', minHeight: 280 }}>

            <CarsTable carsData/>

          </Content>
        </Layout>
      </Content>
      <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
    </Layout>
  )
}

export default App;