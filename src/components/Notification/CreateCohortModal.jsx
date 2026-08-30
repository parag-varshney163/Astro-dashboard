import { motion, AnimatePresence } from "framer-motion";
import { X, Calendar } from "lucide-react";
/* eslint-disable no-unused-vars */
import React, { useState } from "react";

import CustomDropdown from "./CustomDropdown";
import colors from "../../constants/colors";


// import colors from "../../../constants/colors"; // Your colors file

const CreateCohortModal = ({ isOpen, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    startDate: "",
    endDate: "",
    activityLevel: "",
    spendingTier: "",
  });

  const handleSubmit = () => {
    onSave(formData); // Pass data back up
    onClose();
  };

  const inputClass =
    "w-full bg-[#303030] border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-yellow-500 transition-colors placeholder-gray-500";
  const labelClass = "block text-sm font-bold text-gray-300 mb-2";

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          className="w-full max-w-lg rounded-3xl border h-[85vh] overflow-y-auto no-scrollbar border-white/10  bg-[#222222] relative overflow-hidden shadow-2xl"
        >
          {/* Header */}
          <div className="p-6 border-b border-white/5 flex justify-between items-center">
            <div>
              <h2 className="text-lg font-bold text-white">
                Create New Cohort
              </h2>
              <p
                className="text-gray-400 text-xs mt-1"
                style={{ color: colors.accent }}
              >
                Define a custom user segment
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <X size={24} />
            </button>
          </div>

          {/* Body */}
          <div className="p-6 space-y-4">
            <div>
              <label className={labelClass}>Cohort Name</label>
              <input
                type="text"
                placeholder="e.g., Weekend Warriors"
                className={inputClass}
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
            </div>

            <div>
              <label className={labelClass}>Description</label>
              <textarea
                placeholder="Describe the cohort criteria..."
                className={`${inputClass} h-24 resize-none`}
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
              />
            </div>

            <div>
              <label className={labelClass}>Registration Date Range</label>
              <div className="flex gap-4">
                <div className="relative w-full">
                  <input
                    type="date"
                    className={`${inputClass} appearance-none`} // Hide default icon if needed
                    value={formData.startDate}
                    onChange={(e) =>
                      setFormData({ ...formData, startDate: e.target.value })
                    }
                  />
                  {/* Optional: Absolute positioned calendar icon if you want custom styling */}
                </div>
                <div className="relative w-full">
                  <input
                    type="date"
                    className={inputClass}
                    value={formData.endDate}
                    onChange={(e) =>
                      setFormData({ ...formData, endDate: e.target.value })
                    }
                  />
                </div>
              </div>
            </div>

            <div>
              <label className={labelClass}>Activity Level</label>
              <CustomDropdown
                options={[
                  "High (Daily)",
                  "Medium (Weekly)",
                  "Low (Monthly)",
                  "Dormant",
                ]}
                value={formData.activityLevel}
                onChange={(val) =>
                  setFormData({ ...formData, activityLevel: val })
                }
                placeholder="Select activity level"
              />
            </div>

            <div>
              <label className={labelClass}>Spending Tier</label>
              <CustomDropdown
                options={[
                  "Whale (>$500)",
                  "Dolphin ($100-$500)",
                  "Minnow (<$100)",
                  "Free User",
                ]}
                value={formData.spendingTier}
                onChange={(val) =>
                  setFormData({ ...formData, spendingTier: val })
                }
                placeholder="Select spending tier"
              />
            </div>
          </div>

          {/* Footer */}
          <div className="p-6 border-t border-white/5 flex justify-end gap-3 bg-[#222222]">
            <button
              onClick={onClose}
              className="px-6 py-2 rounded-xl border border-white/10 text-gray-300 font-bold hover:bg-white/5 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="px-6 py-2 rounded-xl bg-[#007ACC] text-white font-bold hover:bg-[#006BB3] transition-colors shadow-lg"
            >
              Create Cohort
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default CreateCohortModal;
