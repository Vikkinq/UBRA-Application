import JobLists from "./JobLists";

export default function JobSection({ jobDatas }) {
  return (
    <section>
      <h2 className="text-lg font-semibold mb-3">Job Applications</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {jobDatas.map((job, i) => (
          <JobLists key={i} JobLists={job} />
        ))}
      </div>
    </section>
  );
}
