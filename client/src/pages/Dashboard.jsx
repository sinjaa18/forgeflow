import Sidebar from "../components/Sidebar"
import Navbar from "../components/Navbar"

function Dashboard(){
 return (
   <div className="flex">
     <Sidebar />
     <div className="flex-1">
       <Navbar />
       <div className="p-6">
         <h1 className="text-4xl font-bold mb-6">Dashboard</h1>

         <div className="grid grid-cols-4 gap-5">
           <div className="bg-slate-800 p-5 rounded-xl">
             <h2 className="text-slate-400">Total Leads</h2>

             <p className="text-3xl font-bold mt-3">124</p>
           </div>

           <div className="bg-slate-800 p-5 rounded-xl">
             <h2 className="text-slate-400">Revenue</h2>

             <p className="text-3xl font-bold mt-3">$42K</p>
           </div>

           <div className="bg-slate-800 p-5 rounded-xl">
             <h2 className="text-slate-400">Won Deals</h2>

             <p className="text-3xl font-bold mt-3">18</p>
           </div>

           <div className="bg-slate-800 p-5 rounded-xl">
             <h2 className="text-slate-400">Followups</h2>

             <p className="text-3xl font-bold mt-3">9</p>
           </div>
         </div>
       </div>
     </div>
   </div>
 );
}

export default Dashboard