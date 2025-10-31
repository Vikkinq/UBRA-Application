import { useState, useEffect } from "react";

import Sidebar from "../components/Global/SideBar";
import MobileNav from "../components/Global/MobileNav";
import { SearchIcon, FilterIcon } from "lucide-react";

import StatusCards from "../components/Home/StatusCards";
import JobSection from "../components/Home/JobSection";
import DashboardHeader from "../components/Home/Header";

import AddJobModal from "../components/Home/AddJobModal";

export default function HomePage() {
  const [jobList, setJobList] = useState([]);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    try {
      const fetchJobs = async () => {
        try {
          const res = await fetch("/api/job/data");
          const jobData = await res.json();
          setJobList(jobData);
        } catch (err) {
          console.log("Failed to fetch Jobs", err);
        }
      };
      fetchJobs();
    } catch (err) {
      console.log("An Error has Occured", err);
    }
  }, []);

  return (
    <div className="flex min-h-screen bg-[#ffffff] text-[#1E293B]">
      {/* Sidebar */}
      <Sidebar mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />

      {/* Main */}
      <main className="flex-1 overflow-y-auto px-8 py-6">
        <DashboardHeader onAddClick={() => setOpenModal(true)} />
        <StatusCards />
        <JobSection jobDatas={jobList} />

        {openModal && <AddJobModal open={openModal} onClose={() => setOpenModal(false)} />}
      </main>
      <MobileNav onMenuToggle={() => setMobileOpen(true)} onAddClick={() => setOpenModal(true)} />
    </div>
  );
}
