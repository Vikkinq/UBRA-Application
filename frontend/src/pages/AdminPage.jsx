import { useState, useEffect } from "react";

import UserTableSection from "../components/Admin/UserTableSection";
import Sidebar from "../components/Global/SideBar";

export default function AdminPage() {
  const [userData, setUserData] = useState([]);

  // Sidebar and Mobile
  const [openSideBar, setOpenSideBar] = useState(true);

  const fetchUsers = async () => {
    try {
      const res = await fetch("/api/admin/users");
      const data = await res.json();

      setUserData(data);
    } catch (err) {
      console.log("Failed to fetch Jobs", err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);
  return (
    // Contents
    <div className="flex min-h-screen bg-[#ffffff] text-[#1E293B]">
      {/* Sidebar */}
      <Sidebar openSideBar={openSideBar} setOpenSideBar={setOpenSideBar} />

      <UserTableSection userData={userData} />
    </div>
  );
}
