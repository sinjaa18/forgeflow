import { useEffect, useState } from "react";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import API_URL from "../config/api";

function Pipeline() {
  document.title = "Pipeline | ForgeFlow";
  const [leads, setLeads] = useState([]);

  const token = localStorage.getItem("token");

  const statuses = [
    "New",
    "Contacted",
    "Negotiation",
    "Proposal",
    "Won",
    "Lost",
  ];

  const fetchLeads = async () => {
    try {
      const res = await fetch(`${API_URL}/leads`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      setLeads(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  const updateStatus = async (id, status) => {
    try {
      await fetch(`${API_URL}/leads/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status }),
      });

      fetchLeads();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1">
        <Navbar />

        <div className="p-6">
          <h1 className="text-4xl font-bold mb-6">Sales Pipeline</h1>

          <div className="flex gap-4 overflow-x-auto pb-4">
            {statuses.map((status) => (
              <div
                key={status}
                className="bg-slate-900 rounded-xl p-4 min-h-[500px] min-w-[280px]"
              >
                <h2 className="text-xl font-bold mb-4 sticky top-0 bg-slate-900 py-2">
                  {status}
                </h2>

                <div className="space-y-4">
                  {leads.filter((lead) => lead.status === status).length ===
                    0 && (
                    <div className="bg-slate-800 p-4 rounded-lg text-slate-500 text-sm text-center">
                      No leads
                    </div>
                  )}

                  {leads
                    .filter((lead) => lead.status === status)
                    .map((lead) => (
                      <div
                        key={lead._id}
                        className="bg-slate-800 p-4 rounded-lg w-full hover:scale-[1.02] transition"
                      >
                        <h3 className="font-bold text-lg">{lead.company}</h3>

                        <p className="text-slate-400 text-sm mt-2">
                          {lead.contactPerson}
                        </p>

                        <p className="text-blue-400 mt-2">${lead.dealValue}</p>

                        <select
                          value={lead.status}
                          onChange={(e) =>
                            updateStatus(lead._id, e.target.value)
                          }
                          className="w-full mt-4 p-2 rounded bg-slate-700 outline-none"
                        >
                          {statuses.map((item) => (
                            <option key={item}>{item}</option>
                          ))}
                        </select>
                      </div>
                    ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Pipeline;
