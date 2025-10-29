export default function StatusCards({ statusData }) {
  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5 mb-10 hover:cursor-pointer">
      {[
        { title: "Applied", count: 12, color: "#004030" },
        { title: "Pending Interview", count: 3, color: "#4A9782" },
        { title: "Job Offered", count: 2, color: "#DCD0A8" },
        { title: "Rejected", count: 6, color: "#8B5D5D" },
        { title: "Withdrawn", count: 1, color: "#a7a7a7" },
      ].map((item, index) => (
        <div
          key={index}
          className="bg-white p-5 rounded-2xl shadow hover:shadow-lg transition border border-gray-100"
          style={{ borderTop: `4px solid ${item.color}` }}
        >
          <p className="text-sm text-gray-600">{item.title}</p>
          <h2 className="text-3xl font-bold mt-2" style={{ color: item.color }}>
            {item.count}
          </h2>
        </div>
      ))}
    </section>
  );
}
