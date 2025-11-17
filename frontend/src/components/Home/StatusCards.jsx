import { Briefcase, Clock, Award, XCircle } from "lucide-react";

export default function StatusCards({ statusData = [] }) {
  // Define colors + icons for each status
  const statusMeta = {
    Applied: { color: "#004030", icon: <Briefcase className="w-6 h-6 text-[#004030]" /> },
    "Interview Scheduled": { color: "#4A9782", icon: <Clock className="w-6 h-6 text-[#4A9782]" /> },
    "Offer Received": { color: "#DCD0A8", icon: <Award className="w-6 h-6 text-[#DCD0A8]" /> },
    Rejected: { color: "#8B5D5D", icon: <XCircle className="w-6 h-6 text-[#8B5D5D]" /> },
  };

  // Only include statuses you want to display
  const allStatuses = ["Applied", "Interview Scheduled", "Offer Received", "Rejected"];

  const random = Math.floor(Math.random() * 50) + 1;

  // Merge backend data with predefined metadata
  const formattedData = allStatuses.map((status) => {
    const found = statusData.find((s) => s._id === status || s.title === status);
    const meta = statusMeta[status];
    const random = Math.floor(Math.random() * 5) + 1;
    return {
      title: status,
      count: found ? found.count : 0,
      color: meta.color,
      icon: meta.icon,
      change: `+${random}%`, // Optional placeholder
    };
  });

  return (
    <section className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-10">
      {formattedData.map((item, index) => (
        <div
          key={index}
          className="flex flex-col justify-between bg-white p-5 sm:p-6 rounded-2xl shadow-md hover:shadow-lg transition-all border border-gray-100"
        >
          {/* Top Row */}
          <div className="flex items-center justify-between">
            <div className="p-2 rounded-full bg-gray-50">{item.icon}</div>
            <span
              className={`text-xs font-semibold ${item.change.startsWith("+") ? "text-green-600" : "text-red-500"}`}
            >
              {item.change}
            </span>
          </div>

          {/* Bottom Info */}
          <div className="mt-3">
            <h2 className="text-3xl font-bold" style={{ color: item.color }}>
              {item.count}
            </h2>
            <p className="text-sm text-gray-500 mt-1">{item.title}</p>
          </div>
        </div>
      ))}
    </section>
  );
}
