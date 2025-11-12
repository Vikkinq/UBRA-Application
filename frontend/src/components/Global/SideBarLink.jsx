export default function SidebarLink({ icon, label, open, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-3 px-4 py-3 text-sm font-medium text-[#FFF9E5] hover:bg-[#4A9782]/30 
        transition-all rounded-lg mx-2 w-full text-left`}
    >
      {/* Icon */}
      <span className="flex items-center justify-center w-6 h-6">{icon}</span>

      {/* Label */}
      <span
        className={`overflow-hidden whitespace-nowrap transition-all duration-300 ease-in-out 
          ${open ? "opacity-100 max-w-xs translate-x-0" : "opacity-0 max-w-0 -translate-x-3"}`}
      >
        {label}
      </span>
    </button>
  );
}
