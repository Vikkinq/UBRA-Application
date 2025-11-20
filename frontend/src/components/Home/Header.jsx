import { SearchIcon, FilterIcon, PlusIcon } from "lucide-react";

import { useFormHandler } from "../../utilities/formHandlers";

export default function DashboardHeader({ username, onAddClick, handleSearch, openFilter }) {
  const { formData, handleChange, resetForm } = useFormHandler({
    search: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    try {
      handleSearch(formData.search);
    } catch (err) {
      console.log("Error");
    }
  };

  return (
    <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
      {/* Title */}
      <h1 className="text-2xl font-bold tracking-tight text-[#004030] text-center sm:text-left">
        Track your Applied Jobs Now!
      </h1>

      {/* Actions */}
      <div className="flex flex-wrap items-center justify-center sm:justify-end gap-3 w-full sm:w-auto">
        {/* Search */}
        <div className="relative flex-1 sm:flex-initial w-full sm:w-64">
          <SearchIcon className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" />
          <form onSubmit={handleSubmit}>
            <input
              name="search"
              value={formData.search}
              onChange={handleChange}
              type="text"
              placeholder="Search jobs..."
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#4A9782] focus:border-[#4A9782] outline-none bg-white text-gray-800 text-sm"
            />
          </form>
        </div>

        {/* /* Filter Button */}
        <button
          onClick={openFilter}
          className="flex items-center justify-center gap-2 bg-[#4A9782] text-white px-4 py-2 rounded-lg hover:bg-[#3c836e] transition shadow-sm active:scale-95"
        >
          <FilterIcon className="w-5 h-5" />
          <span className="hidden sm:inline font-medium">Filter</span>
        </button>

        {/* Add Job Button */}
        <button
          onClick={onAddClick}
          className="hidden md:flex items-center justify-center gap-2 bg-[#004030] text-white px-4 py-2 rounded-lg hover:bg-[#00674f] transition shadow-md active:scale-95"
        >
          <PlusIcon className="w-5 h-5" />
          <span className="font-medium">Add Job</span>
        </button>
      </div>
    </header>
  );
}
