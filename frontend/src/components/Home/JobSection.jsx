import JobLists from "./JobLists";

export default function JobSection({ jobDatas }) {
  return (
    <section>
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-2xl font-bold text-[#004030]">Job Applications</h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {jobDatas.map((job, i) => (
          <JobLists key={i} JobLists={job} />
        ))}
      </div>
    </section>
  );
}
