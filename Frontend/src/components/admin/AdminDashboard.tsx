import React from 'react';
import { 
  Wallet, Briefcase, ShoppingBag, Eye, 
  Search, Bell, MoreHorizontal, MapPin, 
  Bed, Bath, Square, TrendingUp, TrendingDown 
} from 'lucide-react';

// --- VISUAL CHART PLACEHOLDERS ---

const AnalyticsChart = () => (
  <div className="w-full h-64 relative mt-4">
    {/* Background Grid */}
    <div className="absolute inset-0 flex flex-col justify-between">
      {[...Array(5)].map((_, i) => <div key={i} className="w-full h-px bg-stone-100"></div>)}
    </div>
    {/* Chart Curve (Teal Theme) */}
    <svg viewBox="0 0 100 40" className="w-full h-full absolute bottom-0 z-10 drop-shadow-sm" preserveAspectRatio="none">
        <defs>
            <linearGradient id="tealGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0f766e" stopOpacity="0.4"/>
            <stop offset="100%" stopColor="#0f766e" stopOpacity="0"/>
            </linearGradient>
        </defs>
        <path d="M0,35 C10,35 20,20 30,25 C40,30 50,10 60,15 C70,20 80,5 90,10 C95,12 100,5 100,5 V40 H0 Z" fill="url(#tealGradient)" opacity="0.2" />
        <path d="M0,35 C10,35 20,20 30,25 C40,30 50,10 60,15 C70,20 80,5 90,10 C95,12 100,5 100,5" fill="none" stroke="#0f766e" strokeWidth="0.8" strokeLinecap="round" />
    </svg>
    {/* X Axis */}
    <div className="absolute bottom-[-20px] left-0 w-full flex justify-between text-xs text-stone-400 font-medium">
        <span>Dec</span><span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span><span>Jun</span>
    </div>
  </div>
);

const PopularUnitBar = ({ label, count, color, width }: any) => (
    <div className="mb-5 last:mb-0">
        <div className="flex justify-between text-sm mb-2">
            <span className="text-stone-600 font-medium">{label}</span>
            <span className="text-stone-900 font-bold">{count}</span>
        </div>
        <div className="w-full h-2.5 bg-stone-100 rounded-full overflow-hidden">
            <div className={`h-full rounded-full ${color}`} style={{ width: width }}></div>
        </div>
    </div>
);

// --- MAIN COMPONENT ---

const AdminDashboard: React.FC = () => {
  return (
    <div className="p-6 md:p-8 max-w-[1600px] mx-auto font-sans text-stone-900 fade-in">
        
        {/* Header Section */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
            <div>
                <h1 className="text-3xl font-bold text-stone-900 tracking-tight">Dashboard</h1>
                <p className="text-stone-500 text-sm mt-1 font-medium">Tuesday, 20 June 2024</p>
            </div>
            
            <div className="flex items-center gap-4 w-full md:w-auto">
                <div className="relative flex-1 md:flex-none">
                    <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-stone-400" />
                    <input type="text" placeholder="Search properties..." className="pl-10 pr-4 py-2.5 bg-white border border-stone-200 rounded-full text-sm w-full md:w-64 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all shadow-sm placeholder:text-stone-400" />
                </div>
                <button className="p-2.5 bg-white border border-stone-200 rounded-full hover:bg-stone-50 relative shadow-sm text-stone-600 transition-colors">
                    <Bell className="w-5 h-5" />
                    <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
                </button>
            </div>
        </header>

        {/* --- STATS ROW --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatCard 
                title="Total Income" 
                value="$84,884" 
                trend="+20.1%" 
                isPositive={true}
                color="bg-teal-50 text-teal-700" 
                icon={Wallet} 
            />
            <StatCard 
                title="Total Expenses" 
                value="$2,587" 
                trend="-4.3%" 
                isPositive={false}
                color="bg-orange-50 text-orange-700" 
                icon={Briefcase} 
            />
            <StatCard 
                title="Total Sold" 
                value="5,378" 
                trend="+12.5%" 
                isPositive={true}
                color="bg-blue-50 text-blue-700" 
                icon={ShoppingBag} 
            />
            <StatCard 
                title="Total Views" 
                value="84,903" 
                trend="+5.2%" 
                isPositive={true}
                color="bg-purple-50 text-purple-700" 
                icon={Eye} 
            />
        </div>

        {/* --- MAIN ANALYTICS GRID --- */}
        <div className="grid grid-cols-12 gap-8 mb-8">
            
            {/* LEFT: Quick Stats Chart */}
            <div className="col-span-12 lg:col-span-8 bg-white p-8 rounded-[2rem] border border-stone-100 shadow-sm">
                <div className="flex flex-wrap justify-between items-center mb-8 gap-4">
                    <div>
                        <h3 className="text-xl font-bold text-stone-900">Quick Stats</h3>
                        <div className="flex items-center mt-2 gap-3">
                            <span className="text-3xl font-bold text-stone-900">$84,884.48</span>
                            <span className="text-xs font-bold text-teal-700 bg-teal-50 px-2.5 py-1 rounded-full border border-teal-100">+28.7% vs last month</span>
                        </div>
                    </div>
                    <div className="flex bg-stone-50 p-1.5 rounded-xl border border-stone-100">
                        {['1M', '3M', '6M', '1Y'].map(period => (
                            <button key={period} className={`px-4 py-1.5 text-xs font-bold rounded-lg transition-all ${period === '1Y' ? 'bg-white text-stone-900 shadow-sm border border-stone-100' : 'text-stone-500 hover:text-stone-900 hover:bg-stone-200/50'}`}>
                                {period}
                            </button>
                        ))}
                    </div>
                </div>
                <AnalyticsChart />
            </div>

            {/* RIGHT: Popular Units */}
            <div className="col-span-12 lg:col-span-4 bg-white p-8 rounded-[2rem] border border-stone-100 shadow-sm flex flex-col justify-center">
                <div className="flex justify-between items-center mb-8">
                    <h3 className="text-xl font-bold text-stone-900">Popular Units</h3>
                    <button className="p-2 hover:bg-stone-50 rounded-full transition-colors">
                        <MoreHorizontal className="w-5 h-5 text-stone-400" />
                    </button>
                </div>
                <div className="mb-8">
                    <p className="text-sm text-stone-500 font-medium mb-1">Sold All Time</p>
                    <h4 className="text-4xl font-bold text-stone-900">8,395 <span className="text-base font-medium text-stone-400">Units</span></h4>
                </div>
                
                <div className="space-y-6">
                    <PopularUnitBar label="House" count="14,839" color="bg-teal-600" width="85%" />
                    <PopularUnitBar label="Apartment" count="6,738" color="bg-orange-500" width="45%" />
                    <PopularUnitBar label="Villa" count="8,377" color="bg-yellow-500" width="60%" />
                </div>
            </div>
        </div>

        {/* --- BOTTOM GRID --- */}
        <div className="grid grid-cols-12 gap-8">
            
            {/* LEFT: My Units (Properties Grid) */}
            <div className="col-span-12 lg:col-span-8">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-bold text-stone-900">My Units</h3>
                    <div className="flex gap-2">
                        <button className="px-4 py-2 bg-white border border-stone-200 rounded-lg text-sm font-medium text-stone-600 hover:bg-stone-50 hover:text-stone-900 transition-colors shadow-sm">Filter</button>
                    </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <PropertyCard 
                        image="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                        title="HouseCall Scheduler"
                        location="Stockton, New Hampshire"
                        price="$7,648"
                        beds={2} baths={1} sqft={1200}
                    />
                    <PropertyCard 
                        image="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                        title="Homewise Schedule"
                        location="Syracuse, Connecticut"
                        price="$5,240"
                        beds={3} baths={2} sqft={1600}
                    />
                </div>
            </div>

            {/* RIGHT: Building Condition */}
            <div className="col-span-12 lg:col-span-4 bg-white p-8 rounded-[2rem] border border-stone-100 shadow-sm">
                <div className="flex justify-between items-center mb-8">
                    <h3 className="text-xl font-bold text-stone-900">Building Condition</h3>
                    <button className="p-2 hover:bg-stone-50 rounded-full transition-colors">
                        <MoreHorizontal className="w-5 h-5 text-stone-400" />
                    </button>
                </div>
                
                <div className="space-y-6">
                    <PopularUnitBar label="Repair Progress" count="56" color="bg-teal-600" width="70%" />
                    <PopularUnitBar label="Awaiting Repair" count="48" color="bg-orange-600" width="60%" />
                    <PopularUnitBar label="On Request" count="32" color="bg-yellow-500" width="40%" />
                </div>

                <button className="w-full mt-10 py-3.5 bg-white border border-stone-200 rounded-xl text-sm font-bold text-stone-700 hover:bg-stone-50 hover:border-stone-300 transition-all shadow-sm">
                    View Maintenance Details
                </button>
            </div>
        </div>
    </div>
  );
};

// --- HELPER COMPONENTS ---

const StatCard = ({ title, value, trend, isPositive, color, icon: Icon }: any) => (
    <div className="bg-white p-6 rounded-[1.5rem] border border-stone-100 shadow-sm flex items-center justify-between hover:shadow-md transition-shadow group">
        <div>
            <p className="text-stone-500 text-xs font-semibold uppercase tracking-wider mb-2">{title}</p>
            <h3 className="text-2xl font-bold text-stone-900 mb-2">{value}</h3>
            <span className={`text-xs font-bold px-2 py-1 rounded-md flex items-center w-fit ${isPositive ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-600'}`}>
                {isPositive ? <TrendingUp className="w-3 h-3 mr-1" /> : <TrendingDown className="w-3 h-3 mr-1" />}
                {trend}
            </span>
        </div>
        <div className={`p-4 rounded-2xl ${color} group-hover:scale-110 transition-transform`}>
            <Icon className="w-6 h-6" />
        </div>
    </div>
);

const PropertyCard = ({ image, title, location, price, beds, baths, sqft }: any) => (
    <div className="bg-white p-4 rounded-[1.5rem] border border-stone-100 shadow-sm hover:shadow-lg transition-all cursor-pointer group">
        <div className="h-48 rounded-2xl overflow-hidden mb-4 relative">
            <img src={image} alt={title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
            <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm p-1.5 rounded-full shadow-sm">
                <MoreHorizontal className="w-4 h-4 text-stone-600" />
            </div>
            <div className="absolute bottom-3 left-3 bg-teal-600/90 backdrop-blur-sm px-3 py-1 rounded-lg">
                <p className="text-white font-bold text-sm">{price}<span className="text-teal-100/80 text-xs font-normal">/mo</span></p>
            </div>
        </div>
        <div className="px-1">
            <div className="flex justify-between items-start mb-2">
                <div>
                    <h4 className="font-bold text-stone-900 text-base">{title}</h4>
                    <p className="text-stone-500 text-xs flex items-center mt-1 font-medium"><MapPin className="w-3 h-3 mr-1" /> {location}</p>
                </div>
            </div>
            <div className="flex items-center gap-4 mt-4 text-stone-500 text-xs border-t border-stone-100 pt-4 font-medium">
                <span className="flex items-center"><Bed className="w-4 h-4 mr-1.5 text-stone-400" /> {beds} Beds</span>
                <span className="flex items-center"><Bath className="w-4 h-4 mr-1.5 text-stone-400" /> {baths} Baths</span>
                <span className="flex items-center"><Square className="w-4 h-4 mr-1.5 text-stone-400" /> {sqft} sqft</span>
            </div>
        </div>
    </div>
);

export default AdminDashboard;