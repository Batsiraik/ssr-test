'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Menu, Bell, MessageSquare, Search, Play } from 'lucide-react';
import Sidebar from '@/components/Sidebar';
import Table, { TableColumn } from '@/components/Table';

interface User {
  id: string;
  fullName: string;
  phone: string;
  city: string;
  isActive: boolean;
}

interface CustomerRequestRow {
  uuid: string;
  requestType: string;
  dateTime: string;
  requestedFor: string;
  rgUuid: string;
  streetAddress: string;
  firstNameRequested: string;
  lastNameRequested: string;
  customerName: string;
  requestPhone: string;
  requestText: string;
  _actions?: string;
}

function formatRequestType(type: string): string {
  if (type === 'addressMove') return 'Address Change';
  return type.charAt(0).toUpperCase() + type.slice(1);
}

export default function CustomerRequestsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const [user] = useState<User>({
    id: '1',
    fullName: 'Guest User',
    phone: '',
    city: '',
    isActive: true,
  });

  // Mock: Customer Requests
  const requestsData: CustomerRequestRow[] = [
    {
      uuid: 'req-001',
      requestType: 'addressMove',
      dateTime: '2025-02-10 09:30',
      requestedFor: '2025-02-15',
      rgUuid: 'rg-001',
      streetAddress: '2370 MUCKLEPLUM WAY',
      firstNameRequested: 'Jake',
      lastNameRequested: 'Poles',
      customerName: 'Brookfield Residential (Alberta) LP',
      requestPhone: '780-699-0316',
      requestText: 'Need to move equipment to new site by next week.',
      _actions: '',
    },
    {
      uuid: 'req-002',
      requestType: 'upgrade',
      dateTime: '2025-02-11 14:00',
      requestedFor: '2025-02-20',
      rgUuid: 'rg-002',
      streetAddress: '2616 158 STREET',
      firstNameRequested: 'Travis',
      lastNameRequested: 'King',
      customerName: 'Anthem Properties',
      requestPhone: '587-930-0848',
      requestText: 'Upgrade to larger tank package.',
      _actions: '',
    },
    {
      uuid: 'req-003',
      requestType: 'return',
      dateTime: '2025-02-12 11:15',
      requestedFor: '2025-02-18',
      rgUuid: 'rg-003',
      streetAddress: '6892 KNOX LOOP',
      firstNameRequested: 'Phil',
      lastNameRequested: 'Pare',
      customerName: 'Kanvi Homes',
      requestPhone: '780-700-6077',
      requestText: 'Project complete, schedule pickup.',
      _actions: '',
    },
  ];

  const columns: TableColumn<CustomerRequestRow>[] = [
    { key: 'uuid', title: 'UUID', render: (v) => <span className="text-white/70 text-xs font-mono">{v}</span> },
    {
      key: 'requestType',
      title: 'Type',
      render: (v) => formatRequestType(v),
    },
    { key: 'dateTime', title: 'Date Created' },
    { key: 'requestedFor', title: 'Requested Date' },
    {
      key: 'streetAddress',
      title: 'Address',
      render: (_, row) => (
        <a
          href="#"
          className="block py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-center text-sm"
        >
          {row.streetAddress}
        </a>
      ),
    },
    {
      key: 'customerName',
      title: 'Person/Company',
      render: (_, row) => (
        <div className="text-sm">
          <span className="block text-white/90">
            {row.firstNameRequested} {row.lastNameRequested}
          </span>
          <span className="block text-white/70">{row.customerName}</span>
        </div>
      ),
    },
    {
      key: 'requestPhone',
      title: 'Requested By',
      render: (_, row) => (
        <div className="text-sm">
          <span className="block text-white/90">
            {row.firstNameRequested} {row.lastNameRequested}
          </span>
          <span className="block text-white/70">{row.requestPhone}</span>
        </div>
      ),
    },
    {
      key: 'requestText',
      title: 'Notes',
      render: (v) => <span className="text-sm text-white/80">{v || '—'}</span>,
    },
    {
      key: '_actions',
      title: 'Actions',
      render: (_, row) => (
        <button
          type="button"
          className="px-3 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg text-sm font-medium inline-flex items-center gap-1.5 transition-colors"
        >
          <Play className="w-4 h-4" />
          Process
        </button>
      ),
    },
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
              className="mb-6 sm:mb-8"
            >
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                <div className="flex items-center space-x-3">
                  <MessageSquare className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white">
                    Customer Requests [{requestsData.length}]
                  </h2>
                </div>
                <div className="relative flex-1 sm:flex-initial sm:min-w-[250px]">
                  <input
                    type="text"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-4 py-2.5 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-primary-400 text-sm sm:text-base pr-12"
                  />
                  <button className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-primary-500 hover:bg-primary-600 rounded-lg transition-colors">
                    <Search className="w-4 h-4 text-white" />
                  </button>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 sm:p-8 shadow-xl border border-white/20">
                <div className="overflow-x-auto">
                  <Table
                    columns={columns}
                    data={requestsData}
                    emptyMessage="No customer requests found"
                    pagination
                    pageSize={25}
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
