import { Link, useLocation } from "react-router-dom";

function Sidebar() {
  const location = useLocation();
  const menus = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Leads", path: "/leads" },
    { name: "Pipeline", path: "/pipeline" },
  ];
  return (
    <div className=" md:block w-[270px] bg-slate-900 h-screen p-5">
      <h1 className="text-3xl font-bold mb-10">ForgeFlow</h1>

      <div className="flex flex-col gap-3">
        {menus.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`p-3 rounded-lg ${
              location.pathname === item.path ? "bg-blue-600" : "bg-slate-800"
            }`}
          >
            {item.name}
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Sidebar;