import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../Component/Navbar/Navbar';
import Footer from '../Component/Footer/Footer';

const Layout = () => {
    return (
        <div>
            <Navbar />
            <div style={{ minHeight: "80vh" }}>
                <Outlet />
            </div>
            <Footer />
        </div>
    );
};

export default Layout;
