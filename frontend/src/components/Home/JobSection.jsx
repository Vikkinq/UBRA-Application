import JobLists from "./JobLists";

export default function JobSection({ jobDatas }) {
  return (
    <section>
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-lg font-semibold text-[#004030]">Job Applications</h2>

        <button
          id="AddButton"
          className="inline-flex items-center gap-2 bg-[#004030] text-[#FFF9E5] px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#4A9782] transition hover:cursor-pointer"
        >
          <i className="fa-solid fa-plus"></i>
          Add Job
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {jobDatas.map((job, i) => (
          <JobLists key={i} JobLists={job} />
        ))}
      </div>
    </section>
  );
}
