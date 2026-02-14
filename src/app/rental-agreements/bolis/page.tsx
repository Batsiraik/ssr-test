'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Menu, Bell, ClipboardList, MessageSquare } from 'lucide-react';
import Sidebar from '@/components/Sidebar';
import Table, { TableColumn } from '@/components/Table';

interface User {
  id: string;
  fullName: string;
  phone: string;
  city: string;
  isActive: boolean;
}

interface BoliRow {
  boliUuid: string;
  rentalAgreementId: string;
  customerName: string;
  streetAddress: string;
  siteName: string;
  personFirstName: string;
  personLastName: string;
  dateEntered: string;
  scheduledReturn: string;
  assetsSummary: string;
  assignedTo: string | null;
  notesSummary: string;
  pdfFileName: string;
  _actions?: string;
}

export default function BOLIsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [user] = useState<User>({
    id: '1',
    fullName: 'Guest User',
    phone: '',
    city: '',
    isActive: true,
  });

  const bolisData: BoliRow[] = [
    {
      boliUuid: 'boli-001',
      rentalAgreementId: 'rg-001',
      customerName: 'Brookfield Residential (Alberta) LP',
      streetAddress: '2370 MUCKLEPLUM WAY',
      siteName: 'THE ORCHARDS',
      personFirstName: 'Jake',
      personLastName: 'Poles',
      dateEntered: '2025-01-20',
      scheduledReturn: '2025-02-15',
      assetsSummary: '2x Heater Pro 20, 1x Tank 100lb',
      assignedTo: 'John D.',
      notesSummary: '',
      pdfFileName: '#',
      _actions: '',
    },
    {
      boliUuid: 'boli-002',
      rentalAgreementId: 'rg-002',
      customerName: 'Anthem Properties',
      streetAddress: '2616 158 STREET',
      siteName: 'GLENRIDDING',
      personFirstName: 'Travis',
      personLastName: 'King',
      dateEntered: '2025-02-01',
      scheduledReturn: 'Not Scheduled',
      assetsSummary: '1x 80GAL Propane Tank',
      assignedTo: null,
      notesSummary: 'Customer requested early return',
      pdfFileName: '#',
      _actions: '',
    },
  ];

  const columns: TableColumn<BoliRow>[] = [
    {
      key: 'boliUuid',
      title: 'BOLI ID',
      render: (v) => <span className="text-white/70 text-xs font-mono">{v || 'N/A'}</span>,
    },
    { key: 'customerName', title: 'Company', render: (v) => v || 'N/A' },
    { key: 'streetAddress', title: 'Address', render: (v) => v || 'N/A' },
    { key: 'siteName', title: 'Site', render: (v) => v || 'N/A' },
    {
      key: 'personFirstName',
      title: 'Person',
      render: (_, row) =>
        `${row.personFirstName || ''} ${row.personLastName || ''}`.trim() || 'N/A',
    },
    { key: 'dateEntered', title: 'Date Removed', render: (v) => v || 'N/A' },
    {
      key: 'scheduledReturn',
      title: 'Scheduled for Return',
      render: (v) => v || 'Not Scheduled',
    },
    {
      key: 'assetsSummary',
      title: 'Assets',
      render: (v) => v || 'No Assets',
    },
    {
      key: 'assignedTo',
      title: 'Assigned To',
      render: (v, row) => (
        <div className="flex flex-wrap items-center gap-2">
          <span>{v || 'Not Assigned'}</span>
          <button
            type="button"
            className={`px-2 py-1 rounded text-sm font-medium transition-colors ${
              v
                ? 'bg-yellow-500 hover:bg-yellow-600 text-white'
                : 'bg-blue-500 hover:bg-blue-600 text-white'
            }`}
          >
            {v ? 'Reassign' : 'Assign'}
          </button>
        </div>
      ),
    },
    {
      key: 'notesSummary',
      title: 'Notes',
      render: (v) => v || 'No Notes',
    },
    {
      key: '_actions',
      title: 'Actions',
      render: (_, row) => (
        <div className="flex flex-wrap gap-2">
          <a
            href="#"
            className="inline-flex items-center gap-1 px-2 py-1.5 bg-green-500 hover:bg-green-600 text-white rounded-lg text-sm font-medium transition-colors"
          >
            Agreement
          </a>
          <button
            type="button"
            className="inline-flex items-center gap-1 px-2 py-1.5 bg-purple-500 hover:bg-purple-600 text-white rounded-lg text-sm font-medium transition-colors"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            Add Note
          </button>
          <a
            href={row.pdfFileName}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 px-2 py-1.5 bg-red-500 hover:bg-red-600 text-white rounded-lg text-sm font-medium transition-colors"
          >
            View PDF
          </a>
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
              className="text-center mb-6"
            >
              <div className="flex items-center justify-center gap-3 mb-4">
                <ClipboardList className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                <h2 className="text-xl sm:text-2xl font-bold text-white">
                  BOLIs Awaiting Return
                </h2>
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
                    data={bolisData}
                    emptyMessage="No BOLIs awaiting return found"
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
