import { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";

import { X, Trash2 } from "lucide-react";
import { useFormHandler } from "../../../utilities/formHandlers";

import JobOptions from "../../../api/JobOptions.json";

export default function UpdateJobModal({ jobDatas, onClose, onJobUpdate, onDelete, statsUpdate }) {
  const navigate = useNavigate();
  const { formData, handleChange, resetForm, setFormData } = useFormHandler({
    company: "",
    role: "",
    platform: "",
    status: "",
    priority: "",
    types: "",
    notes: "",
  });

  useEffect(() => {
    if (jobDatas) {
      setFormData({
        company: jobDatas.company || "",
        role: jobDatas.role || "",
        platform: jobDatas.platform || "",
        status: jobDatas.status || "",
        priority: jobDatas.priority || "",
        types: jobDatas.types || "",
        notes: jobDatas.notes || "",
      });
    }
  }, [jobDatas, setFormData]);

  const handleSubmit = async (evt) => {
    evt.preventDefault();

    try {
      const res = await fetch(`/api/job/${jobDatas._id}/data`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (!res.ok) {
        console.error("❌ Failed:", data.message || "Unknown error");
        return;
      }

      console.log("✅ Success:", data);

      if (res.ok) {
        onJobUpdate();
        statsUpdate();
        onClose();
      }
    } catch (err) {
      console.error("Error:", err);
    }
  };

  const handleDelete = async () => {
    try {
      const res = await fetch(`/api/job/${jobDatas._id}/data/delete`, { method: "DELETE" });
      onDelete((prev) => prev.filter((t) => t._id !== jobDatas.id));
      const data = await res.json();

      if (!res.ok) {
        console.error("❌ Failed:", data.message || "Unknown error");
        return;
      }

      console.log("Successfully Deleted", data);

      if (res.ok) {
        onJobUpdate();
        onClose();
      }
    } catch (err) {
      console.error("Error", err);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-3">
      <div className="bg-white w-full max-w-xl rounded-2xl shadow-xl p-5 sm:p-6 border border-gray-100 animate-fade-in">
        {/* Header */}
        <div className="flex justify-between items-center mb-5 border-b pb-3">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
            <span className="text-[#004030]">{jobDatas.company}</span>
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-[#004030] transition p-2 rounded-full hover:bg-gray-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
            <input
              type="text"
              name="role"
              value={formData.role || ""}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-[#004030] focus:border-[#004030] outline-none"
              placeholder="e.g. Junior Developer"
            />
          </div>

          {/* Grid for Selects */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Platform</label>
              <select
                name="platform"
                value={formData.platform || ""}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white focus:ring-2 focus:ring-[#004030] focus:border-[#004030] outline-none"
              >
                <option value="">Select...</option>
                {JobOptions.PLATFORM.map((o, i) => (
                  <option key={i} value={o}>
                    {o}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <select
                name="status"
                value={formData.status || ""}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white focus:ring-2 focus:ring-[#004030] focus:border-[#004030] outline-none"
              >
                <option value="">Select...</option>
                {JobOptions.STATUS.map((o, i) => (
                  <option key={i} value={o}>
                    {o}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
              <select
                name="priority"
                value={formData.priority || ""}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white focus:ring-2 focus:ring-[#004030] focus:border-[#004030] outline-none"
              >
                <option value="">Select...</option>
                {JobOptions.PRIORITY.map((o, i) => (
                  <option key={i} value={o}>
                    {o}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
              <select
                name="types"
                value={formData.types || ""}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white focus:ring-2 focus:ring-[#004030] focus:border-[#004030] outline-none"
              >
                <option value="">Select...</option>
                {JobOptions.TYPES.map((o, i) => (
                  <option key={i} value={o}>
                    {o}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
            <textarea
              name="notes"
              value={formData.notes || ""}
              onChange={handleChange}
              rows={3}
              placeholder="Add notes about your application..."
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm resize-none focus:ring-2 focus:ring-[#004030] focus:border-[#004030] outline-none"
            />
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-3 pt-4">
            <button
              onClick={handleDelete}
              type="button"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-red-600 border border-red-300 hover:bg-red-50 transition active:scale-95 w-full sm:w-auto justify-center"
            >
              <Trash2 className="w-4 h-4" />
              Delete
            </button>

            <div className="flex gap-3 w-full sm:w-auto">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition w-full sm:w-auto"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded-lg bg-[#004030] text-white hover:bg-[#00674f] transition shadow-sm active:scale-95 w-full sm:w-auto"
              >
                Save Changes
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
