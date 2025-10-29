import { useState } from "react";
import { HomeIcon, BriefcaseIcon, BarChartIcon, SettingsIcon, LogOutIcon, MenuIcon } from "lucide-react";

export default function Sidebar() {
  const [open, setOpen] = useState(true);

  return (
    <aside
      className={`${open ? "w-64" : "w-20"} h-screen bg-[#1B3C53] text-white flex flex-col transition-all duration-300`}
    >
      {/* Header / Logo */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-[#4A9782]/40">
        <h1
          className={`font-bold text-xl tracking-wide transition-all duration-300 ${
            !open && "opacity-0 translate-x-10"
          }`}
        >
          UBRA
        </h1>
        <button onClick={() => setOpen(!open)}>
          <MenuIcon className="w-6 h-6 text-[#DCD0A8]" />
        </button>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 mt-6 space-y-2">
        <SidebarLink open={open} icon={<HomeIcon />} label="Dashboard" />
        <SidebarLink open={open} icon={<BriefcaseIcon />} label="My Jobs" />
        <SidebarLink open={open} icon={<BarChartIcon />} label="Statistics" />
        <SidebarLink open={open} icon={<SettingsIcon />} label="Settings" />
      </nav>

      {/* Footer / Logout */}
      <div className="px-5 py-4 border-t border-[#4A9782]/40">
        <SidebarLink open={open} icon={<LogOutIcon />} label="Logout" />
      </div>
    </aside>
  );
}

function SidebarLink({ icon, label, open }) {
  return (
    <a
      href="#"
      className="flex items-center gap-3 px-5 py-3 text-sm font-medium text-[#FFF9E5] hover:bg-[#4A9782]/30 transition rounded-lg mx-2"
    >
      <span className="w-5 h-5">{icon}</span>
      <span className={`whitespace-nowrap transition-all duration-300 ${!open && "opacity-0 translate-x-10"}`}>
        {label}
      </span>
    </a>
  );
}
