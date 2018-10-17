import React from 'react';
import { Layout } from 'antd';

const { Header, Footer, Sider, Content } = Layout;

export default class HelloWorld extends React.Component {
  render() {
    const { children } = this.props;
    return (
      <Layout>
        <Sider width={256} style={{ minHeight: '100vh', color: 'white' }}>
          Silder
        </Sider>
        <Layout>
          <Header style={{ background: '#fff', textAlign: 'center', padding: 0 }}>
            header
          </Header>
          <Content style={{ margin: '24px 16px 0' }}>
            <div style={{ padding: 24, background: 'red', minHeight: 360 }}>
              {children}
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            WX Design ©2018 Created by WX
          </Footer>
        </Layout>
      </Layout>
    );
  }
}
