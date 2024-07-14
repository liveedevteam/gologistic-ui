// components/Layout.js

import React from 'react';
import TopNavbar from './TopNavbar';
import Sidebar from './Sidebar';
import { useRouter } from 'next/router';

const Layout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();

  const toggleSidebar = () => {
    const wrapper = document.getElementById('wrapper');
    wrapper?.classList.toggle('toggled');
  };

  return (
    <div className="d-flex" id="wrapper">
      {/* Sidebar */}
      <Sidebar toggleSidebar={toggleSidebar} />
      {/* Page Content */}
      <div id="page-content-wrapper">
        <TopNavbar toggleSidebar={toggleSidebar} />
        <div className='m-3'></div>
        <div className='container'>
          {router.pathname !== '/dashboard' && (<i className="bi bi-arrow-left" onClick={() => {
            router.back();
          }}></i>)}
        </div>
        <div className='m-3'></div>
        <div className="container-fluid">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;
