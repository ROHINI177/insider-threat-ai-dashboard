import React from "react";
import { AlertTriangle } from "lucide-react"; // Optional icon library

const RiskAlert = ({ log }) => {
  return (
    <div className="flex items-start gap-3 bg-red-50 border border-red-300 text-red-800 px-5 py-4 rounded-xl shadow-md transition-all duration-200">
      {/* Icon */}
      <div className="mt-1">
        <AlertTriangle className="w-6 h-6 text-red-600" />
      </div>

      {/* Alert Content */}
      <div>
        <p className="font-bold text-red-700 text-lg mb-1">Risk Alert!</p>
        <p className="text-sm leading-relaxed">
          User <span className="font-semibold">{log.user_id}</span> performed{" "}
          <span className="font-semibold">{log.action}</span> at{" "}
          <span className="font-medium">{new Date(log.timestamp).toLocaleString()}</span>{" "}
          with file size <span className="font-semibold">{log.file_size} KB</span>.
        </p>
      </div>
    </div>
  );
};

export default RiskAlert;

