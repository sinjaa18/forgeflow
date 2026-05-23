import { useEffect, useState } from "react";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

function Leads() {
  const [leads, setLeads] = useState([]);

  const [form, setForm] = useState({
    company: "",
    contactPerson: "",
    email: "",
    phone: "",
    dealValue: "",
    status: "New",
  });

  const token = localStorage.getItem("token");

  const fetchLeads = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/leads", {
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

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await fetch("http://localhost:5000/api/leads", {
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

  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1">
        <Navbar />

        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-4xl font-bold">Leads</h1>
          </div>

          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-3 gap-4 bg-slate-800 p-5 rounded-xl mb-8"
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

            <button className="bg-blue-600 p-3 rounded col-span-3">
              Add Lead
            </button>
          </form>

          <div className="bg-slate-800 rounded-xl overflow-hidden">
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
                {leads.map((lead) => (
                  <tr key={lead._id} className="border-t border-slate-700">
                    <td className="p-4">{lead.company}</td>

                    <td className="p-4">{lead.contactPerson}</td>

                    <td className="p-4">{lead.status}</td>

                    <td className="p-4">${lead.dealValue}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Leads;
