'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Menu, Bell, Receipt, Search } from 'lucide-react';
import Sidebar from '@/components/Sidebar';
import Table, { TableColumn } from '@/components/Table';

interface User {
  id: string;
  fullName: string;
  phone: string;
  city: string;
  isActive: boolean;
}

interface BillingRequiredRow {
  id: string;
  company: string;
  address: string;
  site: string;
  person: string;
  typeOfBill: string;
  dateDelivered: string;
  lastBillingDate: string;
  nextBillingDate: string;
  allReturned: string;
  notes: string;
  _empty?: string;
  _empty2?: string;
}

export default function BillingRequiredPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const [user] = useState<User>({
    id: '1',
    fullName: 'Guest User',
    phone: '',
    city: '',
    isActive: true,
  });

  // Mock: Billing Required
  const billingData: BillingRequiredRow[] = [
    {
      id: '1',
      company: 'Brookfield Residential (Alberta) LP',
      address: '2370 MUCKLEPLUM WAY',
      site: 'THE ORCHARDS',
      person: 'Jake Poles',
      typeOfBill: 'Monthly',
      dateDelivered: '2025-01-15',
      lastBillingDate: '2025-01-20',
      nextBillingDate: '2025-02-20',
      allReturned: 'No',
      notes: '',
      _empty: '',
      _empty2: '',
    },
    {
      id: '2',
      company: 'Anthem Properties',
      address: '2616 158 STREET',
      site: 'GLENRIDDING',
      person: 'Travis King',
      typeOfBill: 'Weekly',
      dateDelivered: '2025-02-01',
      lastBillingDate: '2025-02-05',
      nextBillingDate: '2025-02-12',
      allReturned: 'Yes',
      notes: 'Past due',
      _empty: '',
      _empty2: '',
    },
    {
      id: '3',
      company: 'Kanvi Homes',
      address: '6892 KNOX LOOP',
      site: 'EDMONTON',
      person: 'Phil Pare',
      typeOfBill: 'Monthly',
      dateDelivered: '2025-01-28',
      lastBillingDate: '2024-12-28',
      nextBillingDate: '2025-01-28',
      allReturned: 'No',
      notes: '',
      _empty: '',
      _empty2: '',
    },
  ];

  const columns: TableColumn<BillingRequiredRow>[] = [
    { key: '_empty', title: '', render: () => '', headerClassName: 'w-0 max-w-0 overflow-hidden opacity-0' },
    { key: 'company', title: 'Company' },
    { key: 'address', title: 'Address' },
    { key: 'site', title: 'Site' },
    { key: 'person', title: 'Person' },
    { key: 'typeOfBill', title: 'Type of Bill' },
    { key: 'dateDelivered', title: 'Date Delivered' },
    { key: 'lastBillingDate', title: 'Last Billing Date' },
    { key: 'nextBillingDate', title: 'Next Billing Date' },
    { key: 'allReturned', title: 'All Returned' },
    { key: 'notes', title: 'Notes', render: (v) => v || '—' },
    { key: '_empty2', title: '', render: () => '', headerClassName: 'w-0 max-w-0 overflow-hidden opacity-0' },
  ];

  useEffect(() => {
    const handleResize = () => setSidebarOpen(window.innerWidth >= 1024);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="h-screen bg-[#0054a4] flex overflow-hidden">
      <Sidebar
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen(!sidebarOpen)}
        user={{ fullName: user.fullName, email: user.phone ? `+263${user.phone}` : undefined }}
      />

      <div className="flex-1 flex flex-col h-screen overflow-hidden">
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
              <button className="p-2 rounded-lg hover:bg-white/10 transition-colors">
                <Bell className="w-5 h-5 text-white" />
              </button>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-6"
            >
              <div className="flex items-center gap-3 mb-6">
                <Receipt className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                <h2 className="text-2xl sm:text-3xl font-bold text-white">Billing Required</h2>
              </div>

              {/* Legend */}
              <div className="mb-4 overflow-x-auto rounded-xl border border-white/20">
                <table className="w-full border-collapse min-w-[200px]">
                  <thead>
                    <tr className="bg-white/10">
                      <th colSpan={2} className="p-3 text-left text-lg font-semibold text-white">
                        Legend
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-t border-white/10">
                      <td className="p-3 bg-red-400/80 text-red-950 font-semibold">Past Due</td>
                      <td className="p-3 bg-white/5" />
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Search */}
              <div className="flex flex-wrap items-center gap-2 mt-4 mb-6">
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 min-w-0 sm:w-64 px-4 py-2.5 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-primary-400"
                />
                <button
                  type="button"
                  className="px-4 py-2.5 bg-blue-500 hover:bg-blue-600 text-white rounded-xl font-medium transition-colors inline-flex items-center gap-2"
                >
                  <Search className="w-4 h-4" />
                  Search
                </button>
              </div>
            </motion.div>

            {/* Main table */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 sm:p-8 shadow-xl border border-white/20">
                <div className="overflow-x-auto min-w-0">
                  <Table
                    columns={columns}
                    data={billingData}
                    emptyMessage="No billing required"
                    pagination
                    pageSize={500}
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
