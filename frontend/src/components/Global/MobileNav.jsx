import { HomeIcon, BarChartIcon, UserIcon, MenuIcon, PlusIcon, LogOutIcon } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

export default function MobileNav({ onAddClick }) {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

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
    <nav className="fixed bottom-0 left-0 w-full bg-white shadow-[0_-2px_8px_rgba(0,0,0,0.1)] flex justify-around items-center py-2 md:hidden z-50">
      {/* Home */}
      <button
        onClick={() => navigate("/")}
        className={`flex flex-col items-center text-xs ${isActive("/") ? "text-[#004030]" : "text-gray-500"}`}
      >
        <HomeIcon className="w-6 h-6" />
        <span>Home</span>
      </button>

      {/* Dashboard */}
      <button
        onClick={() => navigate("/dashboard")}
        className={`flex flex-col items-center text-xs ${isActive("/dashboard") ? "text-[#004030]" : "text-gray-500"}`}
      >
        <BarChartIcon className="w-6 h-6" />
        <span>Stats</span>
      </button>

      {/* Add Button */}
      <button
        onClick={onAddClick}
        className="relative -mt-8 bg-[#004030] w-14 h-14 flex items-center justify-center rounded-full text-white shadow-lg hover:bg-[#00674f] transition"
      >
        <PlusIcon className="w-8 h-8" />
      </button>

      {/* Profile */}
      <button
        onClick={() => navigate("/profile")}
        className={`flex flex-col items-center text-xs ${isActive("/profile") ? "text-[#004030]" : "text-gray-500"}`}
      >
        <UserIcon className="w-6 h-6" />
        <span>Profile</span>
      </button>

      {/* Logout Button (Mobile) */}
      <button
        onClick={handleLogout}
        className="flex flex-col items-center text-xs text-gray-500 hover:text-[#004030] transition"
      >
        <LogOutIcon className="w-6 h-6" />
        <span>Logout</span>
      </button>
    </nav>
  );
}
