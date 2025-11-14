import { useState, useEffect } from "react";

import Sidebar from "../components/Global/SideBar";
import MobileNav from "../components/Global/MobileNav";
import { SearchIcon, FilterIcon } from "lucide-react";

import StatusCards from "../components/Home/StatusCards";
import JobSection from "../components/Home/JobSection";
import DashboardHeader from "../components/Home/Header";

import AddJobModal from "../components/Home/Modal/AddJobModal";
import UpdateJobModal from "../components/Home/Modal/UpdateJobModal";

export default function HomePage() {
  const [jobList, setJobList] = useState([]);
  const [stats, setStats] = useState([]);

  // Sidebar and Mobile
  const [openSideBar, setOpenSideBar] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);

  // Modals
  const [openModal, setOpenModal] = useState(false);
  const [updateModal, setUpdateModal] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);

  // Pagination Query
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const LIMIT = 30; // or 40

  const fetchJobs = async (page = 1) => {
    try {
      const res = await fetch(`/api/job/data?page=${page}`);
      const jobData = await res.json();

      if (page === 1) {
        setJobList(jobData.jobList); // replace
      } else {
        setJobList((prev) => [...prev, ...jobData.jobList]); // append
      }

      setHasMore(jobData.hasMore);
    } catch (err) {
      console.log("Failed to fetch Jobs", err);
    }
  };

  const fetchStatsData = async () => {
    try {
      const res = await fetch("/api/job/data/stats");
      const statsData = await res.json();
      setStats(statsData);
    } catch (err) {
      console.log("Failed to Fetch Status Data", err);
    }
  };

  const loadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchJobs(nextPage);
  };

  const handleOpenModal = (job) => {
    setSelectedJob(job);
    setUpdateModal(true);
  };

  const handleCloseModal = () => {
    setSelectedJob(null);
    setUpdateModal(false);
  };

  useEffect(() => {
    fetchJobs(1);
    fetchStatsData();
  }, []);

  return (
    <div className="flex min-h-screen bg-[#ffffff] text-[#1E293B]">
      {/* Sidebar */}
      <Sidebar
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
        openSideBar={openSideBar}
        setOpenSideBar={setOpenSideBar}
      />

      {/* Main */}
      <main
        className={`flex-1 overflow-y-auto px-8 py-6 transition-all duration-300 ${
          openSideBar ? "md:ml-64" : "md:ml-20"
        }`}
      >
        <DashboardHeader onAddClick={() => setOpenModal(true)} />
        <StatusCards statusData={stats} />
        <JobSection
          jobDatas={jobList}
          onUpdateClick={handleOpenModal}
          openSideBar={openSideBar}
          loadMore={loadMore}
          hasMore={hasMore}
        />

        {openModal && (
          <AddJobModal
            open={openModal}
            onClose={() => setOpenModal(false)}
            onJobAdded={() => fetchJobs(1)}
            statsUpdate={fetchStatsData}
          />
        )}

        {updateModal && (
          <UpdateJobModal
            jobDatas={selectedJob}
            onClose={handleCloseModal}
            onJobUpdate={() => fetchJobs(1)}
            onDelete={setJobList}
            statsUpdate={fetchStatsData}
          />
        )}
      </main>

      <MobileNav onMenuToggle={() => setMobileOpen(true)} onAddClick={() => setOpenModal(true)} />
    </div>
  );
}
