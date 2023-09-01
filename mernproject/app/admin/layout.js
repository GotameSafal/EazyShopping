import AdminNavbar from "@components/admin/AdminNavbar";
import AdminSidebar from "@components/admin/AdminSidebar";
import React from "react";

const Layout = ({ children }) => {
  return (
    <div className="flex">
      <AdminSidebar />
      <div className="w-full">
        <AdminNavbar />
        {children}
      </div>
    </div>
  );
};

export default Layout;
