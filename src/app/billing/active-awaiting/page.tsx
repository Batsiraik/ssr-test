'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Menu, Bell, FileCheck, Eye, Fuel, MessageSquare, Check, X } from 'lucide-react';
import Sidebar from '@/components/Sidebar';
import Table, { TableColumn } from '@/components/Table';

interface User {
  id: string;
  fullName: string;
  phone: string;
  city: string;
  isActive: boolean;
}

interface ActiveAwaitingRow {
  id: string;
  customerName: string;
  streetAddress: string;
  siteName: string;
  personFirstName: string;
  personLastName: string;
  billingName: string;
  prePostBilling: string;
  deliveryDate: string;
  lastBilling: string;
  nextBilling: string;
  daysSinceInvoice: number | null;
  allReturned: boolean;
  notes: string;
  signedPdf: boolean;
  _actions?: string;
}

export default function ActiveAwaitingInvoicingPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [user] = useState<User>({
    id: '1',
    fullName: 'Guest User',
    phone: '',
    city: '',
    isActive: true,
  });

  const activeRentalsData: ActiveAwaitingRow[] = [
    {
      id: 'act-001',
      customerName: 'Brookfield Residential (Alberta) LP',
      streetAddress: '2370 MUCKLEPLUM WAY',
      siteName: 'THE ORCHARDS',
      personFirstName: 'Jake',
      personLastName: 'Poles',
      billingName: 'Monthly',
      prePostBilling: 'Pre',
      deliveryDate: '2025-01-15',
      lastBilling: '2025-01-20',
      nextBilling: '2025-02-20',
      daysSinceInvoice: 25,
      allReturned: false,
      notes: '',
      signedPdf: true,
      _actions: '',
    },
    {
      id: 'act-002',
      customerName: 'Anthem Properties',
      streetAddress: '2616 158 STREET',
      siteName: 'GLENRIDDING',
      personFirstName: 'Travis',
      personLastName: 'King',
      billingName: 'Weekly',
      prePostBilling: 'Post',
      deliveryDate: '2025-02-01',
      lastBilling: 'Never',
      nextBilling: '2025-02-08',
      daysSinceInvoice: null,
      allReturned: true,
      notes: '',
      signedPdf: false,
      _actions: '',
    },
  ];

  const columns: TableColumn<ActiveAwaitingRow>[] = [
    { key: 'customerName', title: 'Company' },
    {
      key: 'streetAddress',
      title: 'Address',
      render: (_, row) => (
        <a href="#" className="text-blue-300 hover:text-blue-200 hover:underline">
          {row.streetAddress}
        </a>
      ),
    },
    { key: 'siteName', title: 'Site' },
    {
      key: 'personFirstName',
      title: 'Person',
      render: (_, row) => `${row.personFirstName} ${row.personLastName}`,
    },
    { key: 'billingName', title: 'Type of Bill' },
    { key: 'prePostBilling', title: 'Pre/Post' },
    { key: 'deliveryDate', title: 'Date Delivered' },
    { key: 'lastBilling', title: 'Last Billing Date', render: (v) => v || 'Never' },
    { key: 'nextBilling', title: 'Next Billing Date' },
    {
      key: 'daysSinceInvoice',
      title: 'Days Since Last Invoice/Delivery',
      render: (v) => (v != null ? `${v} days` : 'N/A'),
    },
    {
      key: 'allReturned',
      title: 'All Returned',
      render: (v) => (
        <span className="flex justify-center">
          {v ? (
            <Check className="w-5 h-5 text-green-400 inline" />
          ) : (
            <X className="w-5 h-5 text-red-400 inline" />
          )}
        </span>
      ),
    },
    {
      key: 'notes',
      title: 'Notes',
      render: (v) => v || '—',
    },
    {
      key: '_actions',
      title: 'Actions',
      render: (_, row) => (
        <div className="flex flex-wrap gap-2">
          <a
            href="#"
            className="inline-flex items-center gap-1 px-2 py-1.5 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-sm font-medium transition-colors"
          >
            <Eye className="w-3.5 h-3.5" />
            View
          </a>
          <a
            href="#"
            className="inline-flex items-center gap-1 px-2 py-1.5 bg-gray-500 hover:bg-gray-600 text-white rounded-lg text-sm font-medium transition-colors"
          >
            <Fuel className="w-3.5 h-3.5" />
            Fuel
          </a>
          <button
            type="button"
            className="inline-flex items-center gap-1 px-2 py-1.5 bg-green-500 hover:bg-green-600 text-white rounded-lg text-sm font-medium transition-colors"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            Add Note
          </button>
        </div>
      ),
    },
  ];

  const getRowClassName = (row: ActiveAwaitingRow) =>
    !row.signedPdf ? 'bg-yellow-400/30' : '';

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
                <FileCheck className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                <h2 className="text-2xl font-semibold text-white">
                  Active Awaiting Invoicing [{activeRentalsData.length}]
                </h2>
              </div>

              <div className="p-3 bg-yellow-400 border border-black rounded-xl text-center font-semibold text-black mb-6">
                No Signed Rental Agreement
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
                    data={activeRentalsData}
                    emptyMessage="No active rentals awaiting invoicing"
                    pagination
                    pageSize={100}
                    getRowClassName={getRowClassName}
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
