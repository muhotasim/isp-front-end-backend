import React, { useEffect, useState } from 'react';
import { Navigate, useNavigate, useLocation } from 'react-router-dom';
import { ChevronsLeft,ChevronsRight,LogOut } from 'react-feather';
import {  Layout, Menu } from 'antd';
import menuList from '../utils/menus.constants';
import { toast } from 'react-toastify';
const {  Header, Sider, Content} = Layout;
const ProtectedRoute = ({ children }) => {
    const [collapsed, setCollapsed] = useState(false);
    const navigate = useNavigate()
    const routeLocation = useLocation();
    if (!localStorage.getItem('token')) {
        return <Navigate to="/login" replace />;
    }


    return (  <Layout>
        <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo" style={{minHeight: '40px', marginBottom: '40px'}}/>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['1']}
          selectedKeys={[routeLocation.pathname]}
          items={menuList}
        />
      </Sider>
        <Layout className="site-layout">
          <Header
            className="site-layout-background"
            style={{
              padding: 0,
            }}
          >
            <span className='trigger' style={{ marginLeft: '15px'}} onClick={() => setCollapsed(!collapsed)}>{collapsed ? <ChevronsRight/> : <ChevronsLeft/>}</span>
            <span className='user' onClick={()=>{
              try{
                navigate('/login');
                localStorage.removeItem('token')
                localStorage.removeItem('user')
                window.location.reload()
              }catch(e){
                toast.error(e.toString(), { position: "top-right", theme: "dark" });
              }
            }}> <LogOut size={16}/></span>
          </Header>
          <Content
            className="site-layout-background"
            style={{
              margin: '24px 16px',
              padding: 24,
              minHeight: '100vh',
            }}
          >
            {children}
          </Content>
        </Layout>
      </Layout>);
};
export default ProtectedRoute;