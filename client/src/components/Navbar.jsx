import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");

    navigate("/");
  };

  return (
    <div className="bg-slate-900 p-4 flex justify-between items-center">
      <h1 className="text-2xl font-semibold">Sales Operations Suite</h1>

      <button onClick={logout} className="bg-red-600 px-2 py-1 font-medium text-sl rounded">
        Logout
      </button>
    </div>
  );
}

export default Navbar;
