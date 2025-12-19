import React from 'react';
// Ensure lucide-react is installed
import { 
  CreditCard, Wrench, Clock, FileText, 
  ChevronRight, Bell, Home, CheckCircle, 
  AlertCircle, ArrowUpRight 
} from 'lucide-react';

const Dashboard = () => {
  // MOCK DATA - Replace with your actual user context/data
  const tenantName = "re"; 
  const rentDue = 1850;
  const dueDate = "12 days";
  const leaseEnd = "Nov 2025";
  
  // Format Currency
  const formatINR = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-gray-50/50 p-6 md:p-8 font-sans text-gray-800">
      
      {/* --- WELCOME HERO SECTION --- */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-emerald-900 to-emerald-600 p-8 text-white shadow-lg mb-8">
        {/* Decorative Background Pattern */}
        <div className="absolute top-0 right-0 -mt-10 -mr-10 h-64 w-64 rounded-full bg-white opacity-5 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 -mb-10 -ml-10 h-64 w-64 rounded-full bg-emerald-400 opacity-10 blur-3xl"></div>

        <div className="relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Welcome back, {tenantName}!</h1>
              <p className="mt-2 text-emerald-100 max-w-xl text-sm md:text-base">
                Your home dashboard. Review your payments, lease details, and maintenance requests in one place.
              </p>
            </div>
            <div className="flex gap-3">
              <button className="bg-white text-emerald-900 hover:bg-emerald-50 px-5 py-2.5 rounded-lg font-semibold text-sm shadow-sm transition-all transform hover:-translate-y-0.5 flex items-center gap-2">
                <CreditCard size={18} />
                Pay Rent Now
              </button>
              <button className="bg-emerald-800/50 hover:bg-emerald-800/70 text-white border border-emerald-400/30 px-5 py-2.5 rounded-lg font-semibold text-sm backdrop-blur-sm transition-all flex items-center gap-2">
                <Wrench size={18} />
                Request Fix
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* --- QUICK STATS GRID --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        
        {/* Rent Card */}
        <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Rent Due</p>
              <h3 className="text-2xl font-bold text-gray-900 mt-1">{formatINR(rentDue)}</h3>
              <p className="text-xs text-orange-600 font-medium mt-2 flex items-center gap-1">
                <Clock size={12} /> Due in {dueDate}
              </p>
            </div>
            <div className="p-3 bg-emerald-50 text-emerald-600 rounded-lg">
              <CreditCard size={24} />
            </div>
          </div>
        </div>

        {/* Payment Status */}
        <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Payment Status</p>
              <h3 className="text-2xl font-bold text-gray-900 mt-1">Pending</h3>
              <p className="text-xs text-gray-400 mt-2">Action Required</p>
            </div>
            <div className="p-3 bg-orange-50 text-orange-600 rounded-lg">
              <AlertCircle size={24} />
            </div>
          </div>
        </div>

        {/* Lease Info */}
        <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Lease Ends</p>
              <h3 className="text-2xl font-bold text-gray-900 mt-1">{leaseEnd}</h3>
              <p className="text-xs text-emerald-600 font-medium mt-2">Active</p>
            </div>
            <div className="p-3 bg-blue-50 text-blue-600 rounded-lg">
              <FileText size={24} />
            </div>
          </div>
        </div>

        {/* Requests */}
        <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Open Requests</p>
              <h3 className="text-2xl font-bold text-gray-900 mt-1">0</h3>
              <p className="text-xs text-gray-400 mt-2">No active issues</p>
            </div>
            <div className="p-3 bg-purple-50 text-purple-600 rounded-lg">
              <CheckCircle size={24} />
            </div>
          </div>
        </div>
      </div>

      {/* --- SPLIT LAYOUT: Activity & Actions --- */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* RECENT ACTIVITY (Takes up 2/3 space) */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-gray-900">Recent Activity</h2>
            <button className="text-sm text-emerald-600 font-medium hover:text-emerald-700">View All</button>
          </div>

          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
            <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-gray-200 before:to-transparent">
              
              {/* Activity Item 1 */}
              <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-emerald-100 text-emerald-600 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                  <CheckCircle size={18} />
                </div>
                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl border border-gray-100 bg-gray-50 hover:bg-white hover:shadow-md transition-all">
                  <div className="flex items-center justify-between space-x-2 mb-1">
                    <div className="font-bold text-gray-900 text-sm">Rent payment processed</div>
                    <time className="font-caveat font-medium text-xs text-gray-400">Today, 9:41 AM</time>
                  </div>
                  <div className="text-slate-500 text-xs">Your payment of <strong>{formatINR(1850)}</strong> was successfully received.</div>
                </div>
              </div>

              {/* Activity Item 2 */}
              <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-orange-100 text-orange-600 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                  <Wrench size={18} />
                </div>
                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl border border-gray-100 bg-gray-50 hover:bg-white hover:shadow-md transition-all">
                  <div className="flex items-center justify-between space-x-2 mb-1">
                    <div className="font-bold text-gray-900 text-sm">Maintenance request updated</div>
                    <time className="font-caveat font-medium text-xs text-gray-400">Yesterday</time>
                  </div>
                  <div className="text-slate-500 text-xs">Request #204 status changed to <span className="text-orange-600 font-medium">In Progress</span>.</div>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* QUICK ACTIONS (Takes up 1/3 space) */}
        <div>
          <h2 className="text-lg font-bold text-gray-900 mb-6">Quick Actions</h2>
          <div className="grid gap-3">
            {[
              { label: "Make Payment", icon: CreditCard },
              { label: "Report Issue", icon: Wrench },
              { label: "View Lease Agreement", icon: FileText },
              { label: "Contact Property Manager", icon: Bell },
            ].map((action, i) => (
              <button key={i} className="flex items-center justify-between w-full p-4 bg-white border border-gray-100 rounded-xl shadow-sm hover:shadow-md hover:border-emerald-200 hover:bg-emerald-50/30 transition-all group">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gray-50 text-gray-500 rounded-lg group-hover:bg-emerald-100 group-hover:text-emerald-600 transition-colors">
                    <action.icon size={18} />
                  </div>
                  <span className="font-medium text-gray-700 group-hover:text-emerald-900 text-sm">{action.label}</span>
                </div>
                <ArrowUpRight size={16} className="text-gray-300 group-hover:text-emerald-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>
            ))}
          </div>

          {/* Promo / Banner Small */}
          <div className="mt-6 bg-gradient-to-br from-emerald-900 to-slate-900 rounded-xl p-5 text-white relative overflow-hidden">
             <div className="relative z-10">
                <h3 className="font-bold text-sm">Renew Early & Save</h3>
                <p className="text-xs text-gray-300 mt-1">Get 5% off your next month's rent when you renew your lease 3 months early.</p>
                <button className="mt-3 text-xs bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-lg border border-white/10 transition-colors">
                  Check Eligibility
                </button>
             </div>
             <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-emerald-500 rounded-full blur-2xl opacity-20"></div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;