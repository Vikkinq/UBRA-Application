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
  const [openSideBar, setOpenSideBar] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [updateModal, setUpdateModal] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);

  const fetchJobs = async () => {
    try {
      const res = await fetch("/api/job/data");
      const jobData = await res.json();
      setJobList(jobData);
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

  const handleOpenModal = (job) => {
    setSelectedJob(job);
    setUpdateModal(true);
  };

  const handleCloseModal = () => {
    setSelectedJob(null);
    setUpdateModal(false);
  };

  useEffect(() => {
    fetchJobs();
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
        <JobSection jobDatas={jobList} onUpdateClick={handleOpenModal} openSideBar={openSideBar} />

        {openModal && (
          <AddJobModal
            open={openModal}
            onClose={() => setOpenModal(false)}
            onJobAdded={fetchJobs}
            statsUpdate={fetchStatsData}
          />
        )}

        {updateModal && (
          <UpdateJobModal
            jobDatas={selectedJob}
            onClose={handleCloseModal}
            onJobUpdate={fetchJobs}
            onDelete={setJobList}
            statsUpdate={fetchStatsData}
          />
        )}
      </main>

      <MobileNav onMenuToggle={() => setMobileOpen(true)} onAddClick={() => setOpenModal(true)} />
    </div>
  );
}
