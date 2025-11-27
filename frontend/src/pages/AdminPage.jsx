import { useState, useEffect } from "react";

export default function AdminPage() {
  const [userData, setUserData] = useState();

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
  return <div>Admin</div>;
}
