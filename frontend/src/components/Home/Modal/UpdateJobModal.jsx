import { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";

import { X } from "lucide-react";
import { useFormHandler } from "../../../utilities/formHandlers";

export default function UpdateJobModal() {
  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-2xl mx-4 rounded-2xl shadow-lg p-6 animate-fade-in">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800">Update Job</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 transition">
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
