import { Layout, Menu, Row, Col } from 'antd';
import CarsTable from './components/CarsTable';
import CustomSider from './components/CustomSider';

const { Header, Content, Footer } = Layout;

const App = () => {
  return (
    <Layout>
      <Header className="header" style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
        <div className="logo" />
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
          <Menu.Item key="1">nav 1</Menu.Item>
          <Menu.Item key="2">nav 2</Menu.Item>
          <Menu.Item key="3">nav 3</Menu.Item>
        </Menu>
      </Header>
      <Content>
        <Layout className="site-layout-background" style={{ padding: '60px 0' }}>
          <Row>
            <Col sm={3}>
              <Layout>
                <CustomSider />
              </Layout>
            </Col>

            <Col sm={21}>
              <Layout>
                <CarsTable />
              </Layout>
            </Col>
          </Row>


          {/* <Layout style={{ padding: '0 24px 24px' }}>

          </Layout> */}
        </Layout>
      </Content>
      <Footer style={{ textAlign: 'center' }}>Grigoryan Andranik ©2021 Created by React and Ant UED</Footer>
    </Layout>
  )
}

export default App;