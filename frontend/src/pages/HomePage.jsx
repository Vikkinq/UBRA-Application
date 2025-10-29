import { useState, useEffect } from "react";

import Sidebar from "../components/Global/SideBar";
import MobileNav from "../components/Global/MobileNav";
import { SearchIcon, FilterIcon } from "lucide-react";

import StatusCards from "../components/Home/StatusCards";
import JobSection from "../components/Home/JobSection";

export default function HomePage() {
  const [jobList, setJobList] = useState([]);
  const [mobileOpen, setMobileOpen] = useState(false);

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
        {/* Header */}
        <header className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold tracking-tight">UBRA Job Tracker</h1>
          <div className="flex items-center gap-3">
            <div className="relative">
              <input
                type="text"
                placeholder="Search jobs..."
                className="pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#4A9782] focus:border-[#4A9782] outline-none bg-white"
              />
              <SearchIcon className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" />
            </div>
            <button className="flex items-center gap-2 bg-[#4A9782] text-white px-4 py-2 rounded-lg hover:bg-[#3c836e] transition hover:cursor-pointer">
              <FilterIcon className="w-5 h-5" />
              <span className="hidden sm:inline font-medium">Filter</span>
            </button>
          </div>
        </header>

        {/* Status Cards */}
        <StatusCards />

        {/* Job Cards Grid */}
        <JobSection jobDatas={jobList} />
      </main>
      <MobileNav onMenuToggle={() => setMobileOpen(true)} />
    </div>
  );
}
