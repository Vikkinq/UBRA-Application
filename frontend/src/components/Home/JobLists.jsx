export default function JobLists({ JobLists }) {
  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition border border-gray-100 p-4 flex flex-col justify-between">
      {/* Header */}
      <div>
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="text-sm font-semibold text-[#004030] leading-tight">{JobLists.company}</h3>
            <p className="text-xs text-gray-500">{JobLists.role}</p>
          </div>
          <div
            className={`w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-semibold text-white shadow`}
            style={{
              backgroundColor:
                JobLists.status === "Applied"
                  ? "#4A9782"
                  : JobLists.status === "Pending Interview"
                  ? "#DCD0A8"
                  : JobLists.status === "Job Offered"
                  ? "#88C273"
                  : JobLists.status === "Rejected"
                  ? "#D86A6A"
                  : "#a7a7a7",
            }}
          >
            {JobLists.company[0]}
          </div>
        </div>

        {/* Status Badge */}
        <p
          className={`inline-block text-[11px] font-medium px-2.5 py-0.5 rounded-full mb-2 ${
            JobLists.status === "Applied"
              ? "bg-[#4A9782]/15 text-[#004030]"
              : JobLists.status === "Pending Interview"
              ? "bg-[#DCD0A8]/40 text-[#004030]"
              : JobLists.status === "Job Offered"
              ? "bg-green-100 text-green-800"
              : JobLists.status === "Rejected"
              ? "bg-red-100 text-red-700"
              : "bg-gray-100 text-gray-700"
          }`}
        >
          {JobLists.status}
        </p>

        {/* Info Section */}
        <div className="space-y-0.5 text-xs text-gray-600">
          <div className="flex justify-between">
            <span className="text-gray-400 font-medium">Platform:</span>
            <span>{JobLists.platform}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400 font-medium">Priority:</span>
            <span>{JobLists.priority}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400 font-medium">Type:</span>
            <span>{JobLists.types}</span>
          </div>
        </div>
      </div>

      {/* Footer / Notes */}
      <div className="bg-[#4A9782]/10 rounded-md p-2 mt-3">
        <p className="text-[11px] text-[#004030] italic">“{JobLists.notes}”</p>
      </div>
    </div>
  );
}
