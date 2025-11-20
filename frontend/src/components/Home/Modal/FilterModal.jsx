import { useNavigate } from "react-router-dom";
import { X } from "lucide-react";

export default function FilterModal({ onClose, onFilter }) {
  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-xl p-6 animate-fadeIn">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800">Filters</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            ✕
          </button>
        </div>

        {/* Body */}
        <div className="space-y-6">
          {/* Status */}
          <div>
            <label className="text-sm font-medium text-gray-700">Status</label>
            <select className="mt-1 w-full border rounded-lg p-2 outline-none focus:ring-2 focus:ring-green-600">
              <option>Any</option>
              <option>Applied</option>
              <option>Interview</option>
              <option>Rejected</option>
            </select>
          </div>

          {/* Priority */}
          <div>
            <label className="text-sm font-medium text-gray-700">Priority</label>
            <select className="mt-1 w-full border rounded-lg p-2 outline-none focus:ring-2 focus:ring-green-600">
              <option>Any</option>
              <option>Top Choice</option>
              <option>Medium</option>
              <option>Low</option>
            </select>
          </div>

          {/* Types */}
          <div>
            <label className="text-sm font-medium text-gray-700">Type</label>
            <select className="mt-1 w-full border rounded-lg p-2 outline-none focus:ring-2 focus:ring-green-600">
              <option>Any</option>
              <option>Tech Company</option>
              <option>BPO</option>
              <option>Startup</option>
            </select>
          </div>

          {/* Sort */}
          <div>
            <label className="text-sm font-medium text-gray-700">Sort By</label>
            <select className="mt-1 w-full border rounded-lg p-2 outline-none focus:ring-2 focus:ring-green-600">
              <option>Newest</option>
              <option>Oldest</option>
              <option>Priority</option>
              <option>Status</option>
            </select>
          </div>
        </div>

        {/* Footer Buttons */}
        <div className="flex justify-between mt-6">
          <button className="px-4 py-2 border rounded-lg text-gray-700 hover:bg-gray-100">Clear</button>
          <button className="px-4 py-2 bg-green-700 text-white rounded-lg hover:bg-green-800">Apply Filters</button>
        </div>
      </div>
    </div>
  );
}
