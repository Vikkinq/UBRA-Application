import { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";

import { X } from "lucide-react";
import { useFormHandler } from "../../../utilities/formHandlers";

export default function UpdateJobModal({ jobDatas, onClose, onJobUpdate }) {
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

  const handleSubmit = async (evt) => {
    evt.preventDefault();

    try {
      const res = await fetch(`/api/job/${job._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      refreshJobs(); // refetch data
      onClose(); // close modal
    } catch (err) {
      console.error("Error:", err);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-2xl mx-4 rounded-2xl shadow-lg p-6 animate-fade-in">
        {/* Header */}
        <div className="flex justify-between items-center mb-6 border-b pb-3">
          <h2 className="text-xl font-semibold text-gray-800">
            Update Job — <span className="text-[#004030]">{jobDatas.company}</span>
          </h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 transition">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Role */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
            <input
              type="text"
              name="role"
              value={formData.role || ""}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#004030] focus:border-[#004030] outline-none"
              placeholder="e.g. Junior Developer"
            />
          </div>

          {/* Platform */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Platform</label>
            <select
              name="platform"
              value={formData.platform || ""}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-white focus:ring-2 focus:ring-[#004030] focus:border-[#004030] outline-none"
            >
              <option value="">Select a platform...</option>
              <option value="Email">Email</option>
              <option value="JobStreet">JobStreet</option>
              <option value="LinkedIn">LinkedIn</option>
              <option value="Referral">Referral</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Status */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <select
              name="status"
              value={formData.status || ""}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-white focus:ring-2 focus:ring-[#004030] focus:border-[#004030] outline-none"
            >
              <option value="">Select status...</option>
              <option value="Applied">Applied</option>
              <option value="Interview Scheduled">Interview Scheduled</option>
              <option value="Offer Received">Offer Received</option>
              <option value="Offer Accepted">Offer Accepted</option>
              <option value="Rejected">Rejected</option>
              <option value="Withdrawn">Withdrawn</option>
            </select>
          </div>

          {/* Priority */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
            <select
              name="priority"
              value={formData.priority || ""}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-white focus:ring-2 focus:ring-[#004030] focus:border-[#004030] outline-none"
            >
              <option value="">Select priority...</option>
              <option value="Top Choice">Top Choice</option>
              <option value="Consider">Consider</option>
              <option value="Neutral">Neutral</option>
            </select>
          </div>

          {/* Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
            <select
              name="types"
              value={formData.types || ""}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-white focus:ring-2 focus:ring-[#004030] focus:border-[#004030] outline-none"
            >
              <option value="">Select company type...</option>
              <option value="Tech Company">Tech Company</option>
              <option value="Non Tech Company">Non Tech Company</option>
              <option value="Government">Government</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Notes */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
            <textarea
              name="notes"
              value={formData.notes || ""}
              onChange={handleChange}
              rows={4}
              placeholder="Add notes about your application..."
              className="w-full border border-gray-300 rounded-lg px-3 py-2 resize-none focus:ring-2 focus:ring-[#004030] focus:border-[#004030] outline-none"
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3 pt-4 border-t">
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
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
