import { useState, useEffect } from "react";
import axios from "axios";
import { HomeIcon, BriefcaseIcon, BarChartIcon, SettingsIcon, LogOutIcon, MenuIcon, XIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Sidebar({ openSideBar, setOpenSideBar }) {
  const navigate = useNavigate();
  const [open, setOpen] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const res = await axios.get("/api/auth/current", { withCredentials: true });
        setUser(res.data.user);
      } catch (err) {
        console.error("Error fetching user:", err.response?.data || err.message);
      }
    };
    fetchCurrentUser();
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post("/api/auth/logout", {}, { withCredentials: true });
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      navigate("/login");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <>
      {/* 🖥️ Desktop Sidebar */}
      <aside
        className={`hidden md:flex fixed top-0 left-0 flex-col bg-[#004030] text-white transition-all duration-300 h-screen
  ${openSideBar ? "w-64" : "w-20"} z-40`}
      >
        {/* Header / Logo */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#4A9782]/40">
          <div
            className={`flex items-center transition-all duration-300 ${
              openSideBar ? "opacity-100 scale-100" : "opacity-0 scale-0 w-0"
            }`}
          >
            <h1 className="font-bold text-xl tracking-wide text-[#DCD0A8] whitespace-nowrap">UBRA</h1>
          </div>

          <button
            onClick={() => setOpenSideBar(!openSideBar)}
            className="p-2 hover:bg-[#00674f] rounded-lg transition ml-auto"
          >
            <MenuIcon className="w-6 h-6 text-[#DCD0A8]" />
          </button>
        </div>

        {/* Profile */}
        <div className="flex items-center gap-3 px-5 py-4 border-b border-[#4A9782]/40">
          <img
            src={user?.picture || "https://cdn-icons-png.flaticon.com/512/149/149071.png"}
            alt="Profile"
            className="w-10 h-10 rounded-full object-cover border border-[#4A9782]"
          />
          <div className={`flex flex-col transition-all duration-300 ${!openSideBar && "opacity-0 scale-0"}`}>
            <span className="font-semibold text-sm text-[#FFF9E5]">{user?.name || "Loading..."}</span>
            <span className="text-xs text-gray-400">{user?.email || "Fetching user..."}</span>
          </div>
        </div>

        {/* Links */}
        <nav className="flex-1 mt-6 space-y-2">
          <SidebarLink open={openSideBar} icon={<HomeIcon />} label="Dashboard" />
          <SidebarLink open={openSideBar} icon={<BriefcaseIcon />} label="My Jobs" />
          <SidebarLink open={openSideBar} icon={<BarChartIcon />} label="Statistics" />
          <SidebarLink open={openSideBar} icon={<SettingsIcon />} label="Settings" />
        </nav>

        {/* Footer */}
        <div className="px-5 py-4 border-t border-[#4A9782]/40">
          <SidebarLink open={openSideBar} icon={<LogOutIcon />} label="Logout" onClick={handleLogout} />
        </div>
      </aside>

      {/* 📱 Mobile Sidebar Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-black/50 transition-opacity md:hidden ${
          mobileOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setMobileOpen(false)}
      />

      <aside
        className={`fixed top-0 left-0 z-50 h-full bg-[#004030] text-white transform transition-transform md:hidden
        ${mobileOpen ? "translate-x-0" : "-translate-x-full"} w-64`}
      >
        {/* Mobile Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#4A9782]/40">
          <h1 className="font-bold text-xl tracking-wide text-[#DCD0A8]">UBRA</h1>
          <button onClick={() => setMobileOpen(false)} className="p-2 hover:bg-[#00674f] rounded-lg transition">
            <XIcon className="w-6 h-6 text-[#DCD0A8]" />
          </button>
        </div>

        {/* Profile */}
        <div className="flex items-center gap-3 px-5 py-4 border-b border-[#4A9782]/40">
          <img
            src={user?.picture || "https://cdn-icons-png.flaticon.com/512/149/149071.png"}
            alt="Profile"
            className="w-10 h-10 rounded-full object-cover border border-[#4A9782]"
          />
          <div className="flex flex-col">
            <span className="font-semibold text-sm text-[#FFF9E5]">{user?.name || "Loading..."}</span>
            <span className="text-xs text-gray-400">{user?.email || "Fetching user..."}</span>
          </div>
        </div>

        {/* Links */}
        <nav className="flex-1 mt-6 space-y-2">
          <SidebarLink open={true} icon={<HomeIcon />} label="Dashboard" />
          <SidebarLink open={true} icon={<BriefcaseIcon />} label="My Jobs" />
          <SidebarLink open={true} icon={<BarChartIcon />} label="Statistics" />
          <SidebarLink open={true} icon={<SettingsIcon />} label="Settings" />
        </nav>

        {/* Footer */}
        <div className="px-5 py-4 border-t border-[#4A9782]/40">
          <SidebarLink open={true} icon={<LogOutIcon />} label="Logout" onClick={handleLogout} />
        </div>
      </aside>
    </>
  );
}

function SidebarLink({ icon, label, open, onClick }) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-3 px-5 py-3 text-sm font-medium text-[#FFF9E5] hover:bg-[#4A9782]/30 transition rounded-lg mx-2 w-full text-left"
    >
      <span className="w-5 h-5">{icon}</span>
      <span
        className={`whitespace-nowrap transition-all duration-300 ${
          open ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-5"
        }`}
      >
        {label}
      </span>
    </button>
  );
}
