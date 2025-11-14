import JobLists from "./JobLists";

import UpdateJobModal from "./Modal/UpdateJobModal";

export default function JobSection({ jobDatas, onUpdateClick, openSideBar, hasMore, loadMore }) {
  return (
    <section>
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-2xl font-bold text-[#004030]">Job Applications</h2>
      </div>
      <div className={`grid grid-cols-1 sm:grid-cols-2 gap-4 ${openSideBar ? "lg:grid-cols-5" : "lg:grid-cols-6"}`}>
        {jobDatas.map((job, i) => (
          <JobLists key={i} JobLists={job} onClick={() => onUpdateClick(job)} />
        ))}
      </div>
      {hasMore && (
        <div className="p-4 flex justify-center mt-5">
          <button
            onClick={loadMore}
            className="bg-[#004030] hover:bg-green-800 text-white font-semibold py-2 px-4 rounded"
          >
            Load More
          </button>
        </div>
      )}
    </section>
  );
}
