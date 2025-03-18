import React from "react";
import Navbar from "./Navbar"; // Adjust the path

const Layout = ({ children, role }) => {
    return (
        <>
            <Navbar role={role} />
            <main>{children}</main>
        </>
    );
};

export default Layout;
