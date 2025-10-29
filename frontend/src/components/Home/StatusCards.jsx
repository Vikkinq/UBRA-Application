import { Briefcase, Clock, Award, XCircle } from "lucide-react";

export default function StatusCards() {
  const stats = [
    {
      title: "Applied",
      count: 12,
      color: "#004030",
      icon: <Briefcase className="w-6 h-6 text-[#004030]" />,
      change: "+4.8%",
    },
    {
      title: "Pending Interview",
      count: 3,
      color: "#4A9782",
      icon: <Clock className="w-6 h-6 text-[#4A9782]" />,
      change: "+2.5%",
    },
    {
      title: "Job Offered",
      count: 2,
      color: "#DCD0A8",
      icon: <Award className="w-6 h-6 text-[#DCD0A8]" />,
      change: "+3.1%",
    },
    {
      title: "Rejected",
      count: 6,
      color: "#8B5D5D",
      icon: <XCircle className="w-6 h-6 text-[#8B5D5D]" />,
      change: "-1.8%",
    },
  ];

  return (
    <section className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-10">
      {stats.map((item, index) => (
        <div
          key={index}
          className="flex flex-col justify-between bg-white p-5 sm:p-6 rounded-2xl shadow-md hover:shadow-lg transition-all border border-gray-100"
        >
          {/* Top Row - Icon */}
          <div className="flex items-center justify-between">
            <div className="p-2 rounded-full bg-gray-50">{item.icon}</div>
            <span
              className={`text-xs font-semibold ${item.change.startsWith("+") ? "text-green-600" : "text-red-500"}`}
            >
              {item.change}
            </span>
          </div>

          {/* Bottom - Info */}
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
