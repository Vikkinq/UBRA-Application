import { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";

import { X } from "lucide-react";
import { useFormHandler } from "../../utilities/formHandlers";

export default function AddJobModal({ onClose, onJobAdded }) {
  const navigate = useNavigate();
  const { formData, handleChange, resetForm } = useFormHandler({
    company: "",
    role: "",
    platform: "",
    status: "",
    priority: "",
    types: "",
    notes: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/job/data", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include", // ✅ sends cookies
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        console.error("❌ Failed:", data.message || "Unknown error");
        return;
      }

      console.log("✅ Success:", data);

      // Optionally reset form
      resetForm();

      // Redirect after success
      if (res.ok) {
        onClose(); // close modal
        onJobAdded(); // refresh list in HomePage
      }
    } catch (err) {
      console.error("Error:", err);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
      {/* Modal container */}
      <div className="bg-white w-full max-w-2xl mx-4 rounded-2xl shadow-lg p-6 animate-fade-in">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800">Add New Job</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 transition">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Row 1: Company + Role */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Company</label>
              <input
                name="company"
                value={formData.company}
                onChange={handleChange}
                type="text"
                placeholder="e.g. Google Philippines"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#4A9782] outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Role / Position</label>
              <input
                name="role"
                value={formData.role}
                onChange={handleChange}
                type="text"
                placeholder="e.g. Junior Software Developer"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#4A9782] outline-none"
              />
            </div>
          </div>

          {/* Row 2: Platform + Status */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Platform</label>
              <select
                name="platform"
                value={formData.platform}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-white focus:ring-2 focus:ring-[#4A9782] outline-none"
              >
                <option value="" disabled hidden>
                  -----
                </option>
                <option>Email</option>
                <option>JobStreet</option>
                <option>LinkedIn</option>
                <option>Referral</option>
                <option>Other</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-white focus:ring-2 focus:ring-[#4A9782] outline-none"
              >
                <option value="" disabled hidden>
                  -----
                </option>
                <option>Applied</option>
                <option>Interview Scheduled</option>
                <option>Offer Received</option>
                <option>Offer Accepted</option>
                <option>Rejected</option>
                <option>Withdrawn</option>
              </select>
            </div>
          </div>

          {/* Row 3: Priority + Type */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
              <select
                name="priority"
                value={formData.priority}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-white focus:ring-2 focus:ring-[#4A9782] outline-none"
              >
                <option value="" disabled hidden>
                  -----
                </option>
                <option>Top Choice</option>
                <option>Consider</option>
                <option>Neutral</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
              <select
                name="types"
                value={formData.types}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-white focus:ring-2 focus:ring-[#4A9782] outline-none"
              >
                <option value="" disabled hidden>
                  -----
                </option>
                <option>Tech Company</option>
                <option>Non Tech Company</option>
                <option>Government</option>
                <option>Other</option>
              </select>
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              rows="3"
              placeholder="Add some notes about this job..."
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#4A9782] outline-none resize-none"
            ></textarea>
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-[#004030] text-white hover:bg-[#00674f] transition shadow-md active:scale-95"
            >
              Add Job
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
