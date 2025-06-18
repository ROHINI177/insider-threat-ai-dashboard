import React, { useEffect, useState } from "react";
import RiskChart from "./RiskChart";
import Login from "./Login";
import RiskAlert from "./RiskAlert";
import { LogOut } from "lucide-react";

function App() {
  const [logs, setLogs] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem("isAuthenticated") === "true"
  );

  useEffect(() => {
    if (!isAuthenticated) return;

    const fetchLogs = async () => {
      try {
        const res = await fetch("https://insider-threat-ai-dashboard.onrender.com/api/behavior");
        const data = await res.json(); // ✅ Fix: parse the JSON response

        const reversed = data.reverse();
        setLogs(reversed);

        const risky = reversed.filter(
          (log) => log.action === "delete" || log.file_size > 750
        );
        const lastThree = risky.slice(0, 3);
        setAlerts(lastThree);
      } catch (error) {
        console.error("❌ Fetch logs failed:", error);
      }
    };

    fetchLogs();
    const interval = setInterval(fetchLogs, 3000);
    return () => clearInterval(interval);
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return <Login onLogin={() => setIsAuthenticated(true)} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-white px-6 py-8 font-sans">
      {/* Risk Alerts */}
      {alerts.length > 0 && (
        <div className="mb-6 space-y-2">
          {alerts.map((log, idx) => (
            <RiskAlert key={idx} log={log} />
          ))}
        </div>
      )}

      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800 tracking-tight">
          🧠 Insider Threat Dashboard
        </h1>
        <button
          onClick={() => {
            localStorage.removeItem("isAuthenticated");
            setIsAuthenticated(false);
          }}
          className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition-shadow shadow-sm hover:shadow-md"
        >
          <LogOut className="w-4 h-4" />
          Logout
        </button>
      </div>

      {/* User Logs Table */}
      <div className="bg-white rounded-lg shadow p-4 overflow-x-auto mb-10">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">
          User Behavior Logs
        </h2>
        <table className="min-w-full text-sm border border-gray-200">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="py-2 px-4 border">User ID</th>
              <th className="py-2 px-4 border">Action</th>
              <th className="py-2 px-4 border">Timestamp</th>
              <th className="py-2 px-4 border">File Size</th>
              <th className="py-2 px-4 border">IP Address</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {logs.map((log, index) => (
              <tr
                key={index}
                className={`${
                  index % 2 === 0 ? "bg-white" : "bg-gray-50"
                } transition-all duration-150 hover:bg-blue-50`}
              >
                <td className="py-2 px-4 border font-medium">{log.user_id}</td>
                <td className="py-2 px-4 border">
                  <span
                    className={`inline-block px-2 py-1 rounded-full text-xs font-semibold ${
                      log.action === "delete"
                        ? "bg-red-100 text-red-700"
                        : log.action === "upload"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {log.action}
                  </span>
                </td>
                <td className="py-2 px-4 border text-gray-600">
                  {new Date(log.timestamp).toLocaleString("en-IN", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </td>
                <td className="py-2 px-4 border text-right tabular-nums">
                  {log.file_size} <span className="text-gray-400">KB</span>
                </td>
                <td className="py-2 px-4 border font-mono text-sm">
                  {log.ip_address}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Risk Chart */}
      <div className="bg-white rounded-lg shadow p-4">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">
          📊 User Risk Scores
        </h2>
        <RiskChart data={logs} />
      </div>
    </div>
  );
}

export default App;
