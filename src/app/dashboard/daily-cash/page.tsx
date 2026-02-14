'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Menu, Bell, Calculator, TrendingUp, Fuel } from 'lucide-react';
import Sidebar from '@/components/Sidebar';
import Table, { TableColumn } from '@/components/Table';

interface User {
  id: string;
  fullName: string;
  phone: string;
  city: string;
  isActive: boolean;
}

// Totals table data type
interface TotalsData {
  deliveries: string;
  fuelSold: string;
  fuelProfit: string;
  assets: string;
  bulks: string;
  flats: string;
  packages: string;
  total: string;
  totalCosts: string;
  totalProfit: string;
}

// Fuel on the Day table data type
interface FuelData {
  agreement: string;
  totalL: string;
  type: string;
  cost: string;
  markup: string;
  profit: string;
  billFor: string;
}

export default function DailyCashPage() {
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  // Get today's date in YYYY-MM-DD format
  const getTodayDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  const [selectedDate, setSelectedDate] = useState(getTodayDate());
  const [searchQuery, setSearchQuery] = useState('');

  // Mock user data (will be replaced with actual auth later)
  const [user] = useState<User>({
    id: '1',
    fullName: 'Guest User',
    phone: '',
    city: '',
    isActive: true
  });

  // Totals table data
  const totalsData: TotalsData[] = [
    {
      deliveries: '$ 0 [0]',
      fuelSold: '$ 0 [0]',
      fuelProfit: '$ 0',
      assets: '$ 0 [0]',
      bulks: '$ 0 [0]',
      flats: '$ 0 [0]',
      packages: '$ 0 [0]',
      total: '$ 0',
      totalCosts: '$ 0',
      totalProfit: '$ 0',
    },
  ];

  // Totals table columns
  const totalsColumns: TableColumn<TotalsData>[] = [
    {
      key: 'deliveries',
      title: 'Deliveries',
    },
    {
      key: 'fuelSold',
      title: 'Fuel Sold',
    },
    {
      key: 'fuelProfit',
      title: 'Fuel Profit',
    },
    {
      key: 'assets',
      title: 'Assets',
    },
    {
      key: 'bulks',
      title: 'Bulks',
    },
    {
      key: 'flats',
      title: 'Flats',
    },
    {
      key: 'packages',
      title: 'Packages',
    },
    {
      key: 'total',
      title: 'Total',
      className: 'font-semibold',
    },
    {
      key: 'totalCosts',
      title: 'Total Costs',
    },
    {
      key: 'totalProfit',
      title: 'Total Profit',
      className: 'font-semibold text-green-300',
    },
  ];

  // Fuel on the Day table data
  const fuelData: FuelData[] = [
    {
      agreement: 'N/A',
      totalL: '0 L',
      type: 'N/A',
      cost: '$ 0.00',
      markup: '0%',
      profit: '$ 0.00',
      billFor: '$ 0.00',
    },
    {
      agreement: 'N/A',
      totalL: '0 L',
      type: 'N/A',
      cost: '$ 0.00',
      markup: '0%',
      profit: '$ 0.00',
      billFor: '$ 0.00',
    },
    {
      agreement: 'N/A',
      totalL: '0 L',
      type: 'N/A',
      cost: '$ 0.00',
      markup: '0%',
      profit: '$ 0.00',
      billFor: '$ 0.00',
    },
  ];

  // Fuel on the Day table columns
  const fuelColumns: TableColumn<FuelData>[] = [
    {
      key: 'agreement',
      title: 'Agreement',
    },
    {
      key: 'totalL',
      title: 'Total L',
    },
    {
      key: 'type',
      title: 'Type',
    },
    {
      key: 'cost',
      title: 'Cost',
    },
    {
      key: 'markup',
      title: 'Markup',
    },
    {
      key: 'profit',
      title: 'Profit',
      render: (value) => (
        <span className="text-green-300 font-medium">{value}</span>
      ),
    },
    {
      key: 'billFor',
      title: 'Bill For',
    },
  ];

  // Open sidebar by default on desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setSidebarOpen(true);
      } else {
        setSidebarOpen(false);
      }
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="h-screen bg-[#0054a4] flex overflow-hidden">
      {/* Sidebar */}
      <Sidebar 
        isOpen={sidebarOpen} 
        onToggle={() => setSidebarOpen(!sidebarOpen)}
        user={{
          fullName: user.fullName,
          email: user.phone ? `+263${user.phone}` : undefined
        }}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Header */}
        <div className="border-b border-white/10 sticky top-0 z-30 shrink-0 bg-[#0054a4]">
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-4 sm:py-5">
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setSidebarOpen(!sidebarOpen)}
                  className="lg:hidden p-2 rounded-lg hover:bg-white/10 transition-colors"
                >
                  <Menu className="w-5 h-5 text-white" />
                </button>
                <div className="flex items-center space-x-3">
                  <img
                    src="/logo.png"
                    alt="Super Sonic Rentals"
                    className="w-8 h-8 sm:w-10 sm:h-10 hidden sm:block"
                  />
                  <h1 className="text-xl sm:text-2xl font-bold text-white">Super Sonic Rentals</h1>
                </div>
              </div>
              <div className="flex items-center space-x-2 sm:space-x-4">
                <button className="p-2 rounded-lg hover:bg-white/10 transition-colors">
                  <Bell className="w-5 h-5 text-white" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Page Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
            {/* Page Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-6 sm:mb-8"
            >
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                <div className="flex items-center space-x-3">
                  <Calculator className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white">
                    Daily Cash Summary
                  </h2>
                </div>
                
                {/* Date Picker and Search */}
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                  <div className="relative">
                    <input
                      type="date"
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      className="px-4 py-2.5 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent text-sm sm:text-base"
                    />
                  </div>
                  <div className="relative flex-1 sm:flex-initial sm:min-w-[250px]">
                    <input
                      type="text"
                      placeholder="Search..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full px-4 py-2.5 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent text-sm sm:text-base pr-12"
                    />
                    <button className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 bg-primary-500 hover:bg-primary-600 rounded-lg transition-colors">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Totals Table */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mb-6 sm:mb-8"
            >
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 sm:p-8 shadow-xl border border-white/20">
                <div className="flex items-center space-x-3 mb-6">
                  <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  <h3 className="text-xl sm:text-2xl font-bold text-white">Totals</h3>
                </div>
                <div className="overflow-x-auto">
                  <Table
                    columns={totalsColumns}
                    data={totalsData}
                    emptyMessage="No totals data available"
                  />
                </div>
              </div>
            </motion.div>

            {/* Fuel on the Day Table */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 sm:p-8 shadow-xl border border-white/20">
                <div className="flex items-center space-x-3 mb-6">
                  <Fuel className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  <h3 className="text-xl sm:text-2xl font-bold text-white">Fuel on the Day</h3>
                </div>
                <div className="overflow-x-auto">
                  <Table
                    columns={fuelColumns}
                    data={fuelData}
                    emptyMessage="No fuel data available"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

