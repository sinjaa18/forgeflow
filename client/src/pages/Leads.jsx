import { useEffect, useState } from "react";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import API_URL from "../config/api";

function Leads() {
  document.title = "Leads | ForgeFlow";
  const [leads, setLeads] = useState([]);
  const [form, setForm] = useState({
    company: "",
    contactPerson: "",
    email: "",
    phone: "",
    dealValue: "",
    status: "New",
  });

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  const fetchLeads = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_URL}/leads`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      setLeads(data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await fetch(`${API_URL}/leads`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });

      setForm({
        company: "",
        contactPerson: "",
        email: "",
        phone: "",
        dealValue: "",
        status: "New",
      });

      fetchLeads();
    } catch (err) {
      console.log(err);
    }
  };
  const filteredLeads = leads.filter((lead) => {
    const matchesSearch = lead.company
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "All" || lead.status === statusFilter;

    return matchesSearch && matchesStatus;
  });
  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1">
        <Navbar />

        <div className="p-4 md:p-6">
          <div className="flex justify-center items-center mb-6">
            <h1 className="text-4xl font-bold">Leads</h1>
          </div>

          <form
            onSubmit={handleSubmit}
            className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-2 bg-slate-800 p-3 rounded-xl mb-7"
          >
            <input
              type="text"
              name="company"
              placeholder="Company"
              value={form.company}
              onChange={handleChange}
              className="p-3 rounded bg-slate-700 outline-none"
            />

            <input
              type="text"
              name="contactPerson"
              placeholder="Contact Person"
              value={form.contactPerson}
              onChange={handleChange}
              className="p-3 rounded bg-slate-700 outline-none"
            />

            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              className="p-3 rounded bg-slate-700 outline-none"
            />

            <input
              type="text"
              name="phone"
              placeholder="Phone"
              value={form.phone}
              onChange={handleChange}
              className="p-3 rounded bg-slate-700 outline-none"
            />

            <input
              type="number"
              name="dealValue"
              placeholder="Deal Value"
              value={form.dealValue}
              onChange={handleChange}
              className="p-3 rounded bg-slate-700 outline-none"
            />

            <select
              name="status"
              value={form.status}
              onChange={handleChange}
              className="p-3 rounded bg-slate-700 outline-none"
            >
              <option>New</option>
              <option>Contacted</option>
              <option>Negotiation</option>
              <option>Proposal</option>
              <option>Won</option>
              <option>Lost</option>
            </select>

            <button className="bg-blue-600 hover:bg-blue-700 transition p-3 rounded lg:col-span-3 md:col-span-2 col-span-1">
              Add Lead
            </button>
          </form>

          <div className="bg-slate-800 rounded-xl overflow-x-auto">
            <div className="flex gap mb-2">
              <input
                type="text"
                placeholder="Search company..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="flex-1 m-1 p-3 rounded bg-slate-900 border border-gray-400 outline-none"
              />

              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="p-3 m-1 rounded border border-gray-400 md:w-[15%] w-full bg-slate-900"
              >
                <option>All</option>
                <option>New</option>
                <option>Contacted</option>
                <option>Negotiation</option>
                <option>Proposal</option>
                <option>Won</option>
                <option>Lost</option>
              </select>
            </div>
            <table className="w-full">
              <thead className="bg-slate-900">
                <tr>
                  <th className="p-4 text-left">Company</th>
                  <th className="p-4 text-left">Contact</th>
                  <th className="p-4 text-left">Status</th>
                  <th className="p-4 text-left">Deal Value</th>
                </tr>
              </thead>

              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="4" className="p-6 text-center">
                      Loading...
                    </td>
                  </tr>
                ) : (
                  filteredLeads.map((lead) => (
                    <tr key={lead._id} className="border-t border-slate-700">
                      <td className="p-4">{lead.company}</td>
                      <td className="p-4">{lead.contactPerson}</td>
                      <td className="p-4">{lead.status}</td>
                      <td className="p-4">${lead.dealValue}</td>
                    </tr>
                  ))
                )}
                {filteredLeads.length === 0 && (
                  <tr>
                    <td colSpan="4" className="p-6 text-center text-slate-400">
                      No leads found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Leads;
