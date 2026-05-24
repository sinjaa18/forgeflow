import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

function Dashboard() {
  const [stats, setStats] = useState({
    totalLeads: 0,
    wonDeals: 0,
    lostDeals: 0,
    revenue: 0,
  });

  const [activities, setActivities] = useState([]);

  const token = localStorage.getItem("token");

  const fetchStats = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/leads/stats", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      setStats(data);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchActivities = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/activity", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      setActivities(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchStats();
    fetchActivities();
  }, []);

  const chartData = [
    {
      name: "Won",
      value: stats.wonDeals,
    },
    {
      name: "Lost",
      value: stats.lostDeals,
    },
  ];

  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1">
        <Navbar />

        <div className="p-6">
          <h1 className="text-4xl font-bold mb-6">Dashboard</h1>

          <div className="grid grid-cols-4 gap-5">
            <div className="bg-slate-800 p-5 rounded-xl hover:scale-[1.02] transition">
              <h2 className="text-slate-400">Total Leads</h2>

              <p className="text-3xl font-bold mt-3">{stats.totalLeads}</p>
            </div>

            <div className="bg-slate-800 p-5 rounded-xl hover:scale-[1.02] transition">
              <h2 className="text-slate-400">Revenue</h2>

              <p className="text-3xl font-bold mt-3">${stats.revenue}</p>
            </div>

            <div className="bg-slate-800 p-5 rounded-xl hover:scale-[1.02] transition">
              <h2 className="text-slate-400">Won Deals</h2>

              <p className="text-3xl font-bold mt-3">{stats.wonDeals}</p>
            </div>

            <div className="bg-slate-800 p-5 rounded-xl hover:scale-[1.02] transition">
              <h2 className="text-slate-400">Lost Deals</h2>

              <p className="text-3xl font-bold mt-3">{stats.lostDeals}</p>
            </div>
          </div>

          <div className="bg-slate-800 rounded-xl p-6 mt-8">
            <h2 className="text-2xl font-bold mb-6">Recent Activity</h2>

            <div className="space-y-4">
              {activities.map((activity) => (
                <div
                  key={activity._id}
                  className="border-b border-slate-700 pb-4"
                >
                  <p className="font-semibold">{activity.user?.name}</p>

                  <p className="text-slate-400 mt-1">{activity.action}</p>

                  <p className="text-blue-400 mt-1">{activity.company}</p>

                  <p className="text-xs text-slate-500 mt-2">
                    {new Date(activity.createdAt).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-slate-800 rounded-xl p-6 mt-8">
            <h2 className="text-2xl font-bold mb-6">Sales Overview</h2>

            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <XAxis dataKey="name" />

                  <YAxis />

                  <Tooltip />

                  <Bar dataKey="value" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
