'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Menu, Bell, History, Eye, MessageSquare, FileText, Upload } from 'lucide-react';
import Sidebar from '@/components/Sidebar';
import Table, { TableColumn } from '@/components/Table';

interface User {
  id: string;
  fullName: string;
  phone: string;
  city: string;
  isActive: boolean;
}

interface HistoricRentalRow {
  id: string;
  customerName: string;
  siteName: string;
  personFirstName: string;
  personLastName: string;
  billingName: string;
  prePostBilling: string;
  deliveryDate: string;
  returned: string;
  lastBilling: number;
  notes: string;
  pdfFileName: string;
  signedPdf: string | null;
  _actions?: string;
}

export default function BillingHistoricalPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [user] = useState<User>({
    id: '1',
    fullName: 'Guest User',
    phone: '',
    city: '',
    isActive: true,
  });

  const historicRentalsData: HistoricRentalRow[] = [
    {
      id: 'hist-001',
      customerName: 'Brookfield Residential (Alberta) LP',
      siteName: 'THE ORCHARDS',
      personFirstName: 'Jake',
      personLastName: 'Poles',
      billingName: 'Monthly',
      prePostBilling: 'Pre',
      deliveryDate: '2024-06-15',
      returned: '2025-01-10',
      lastBilling: 1704067200,
      notes: '',
      pdfFileName: '#',
      signedPdf: '#',
      _actions: '',
    },
    {
      id: 'hist-002',
      customerName: 'Anthem Properties',
      siteName: 'GLENRIDDING',
      personFirstName: 'Travis',
      personLastName: 'King',
      billingName: 'Weekly',
      prePostBilling: 'Post',
      deliveryDate: '2024-09-01',
      returned: '2025-01-28',
      lastBilling: 0,
      notes: 'Early return requested',
      pdfFileName: '#',
      signedPdf: null,
      _actions: '',
    },
  ];

  const formatDate = (d: string | number) => {
    if (typeof d === 'number' && d === 0) return 'Never';
    const date = typeof d === 'string' ? new Date(d) : new Date(d * 1000);
    return date.toLocaleDateString('en-CA');
  };

  const columns: TableColumn<HistoricRentalRow>[] = [
    { key: 'customerName', title: 'Company' },
    { key: 'siteName', title: 'Site' },
    {
      key: 'personFirstName',
      title: 'Person',
      render: (_, row) => `${row.personFirstName} ${row.personLastName}`,
    },
    { key: 'billingName', title: 'Type of Bill' },
    { key: 'prePostBilling', title: 'Pre/Post' },
    {
      key: 'deliveryDate',
      title: 'Date Delivered',
      render: (v) => formatDate(v),
    },
    {
      key: 'returned',
      title: 'Date All Returned',
      render: (v) => v || '—',
    },
    {
      key: 'lastBilling',
      title: 'Last Billing Date',
      render: (v) => (v === 0 ? 'Never' : formatDate(v)),
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
            className="inline-flex items-center gap-1 px-3 py-1.5 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-sm font-medium transition-colors"
          >
            <Eye className="w-3.5 h-3.5" />
            View
          </a>
          <button
            type="button"
            className="inline-flex items-center gap-1 px-3 py-1.5 bg-green-500 hover:bg-green-600 text-white rounded-lg text-sm font-medium transition-colors"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            Add Note
          </button>
          <a
            href={row.pdfFileName}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 px-3 py-1.5 bg-gray-500 hover:bg-gray-600 text-white rounded-lg text-sm font-medium transition-colors"
          >
            <FileText className="w-3.5 h-3.5" />
            PDF
          </a>
          {row.signedPdf ? (
            <a
              href={row.signedPdf}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 px-3 py-1.5 bg-gray-500 hover:bg-gray-600 text-white rounded-lg text-sm font-medium transition-colors"
            >
              Signed PDF
            </a>
          ) : (
            <button
              type="button"
              className="inline-flex items-center gap-1 px-3 py-1.5 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg text-sm font-medium transition-colors"
            >
              <Upload className="w-3.5 h-3.5" />
              Upload PDF
            </button>
          )}
        </div>
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
              className="mb-6"
            >
              <div className="flex items-center gap-3 mb-6">
                <History className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                <h2 className="text-2xl font-semibold text-white">Historic Rentals</h2>
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
                    data={historicRentalsData}
                    emptyMessage="No historic rentals found"
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
