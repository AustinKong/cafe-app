import { Outlet, Link } from "react-router-dom";
import { Layout, Menu } from "antd";
const { Header, Content, Footer } = Layout;

export function AppLayout() {
  const menuItems = [
    {
      key: 'cafes',
      label: <Link to="/cafes">Cafes</Link>,
    },
    {
      key: 'employees',
      label: <Link to="/employees">Employees</Link>,
    },
  ];

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header>
        <Menu theme="dark" mode="horizontal" items={menuItems} />
      </Header>

      <Content style={{ padding: '24px' }}>
        <Outlet />
      </Content>

      <Footer style={{ textAlign: 'center' }}>
        Cafe Manager @2025 by HT
      </Footer>
    </Layout>
  )
}
