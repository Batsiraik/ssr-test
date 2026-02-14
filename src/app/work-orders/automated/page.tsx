'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Menu, Bell, Zap, X } from 'lucide-react';
import Sidebar from '@/components/Sidebar';
import Table, { TableColumn } from '@/components/Table';

interface User {
  id: string;
  fullName: string;
  phone: string;
  city: string;
  isActive: boolean;
}

interface AutoRow {
  uuid: string;
  dateTime: string;
  action: string;
  txt: string;
  subject: string;
  body: string;
  recipients: string;
  _actions?: string;
}

export default function AutomatedActionsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [autos] = useState<AutoRow[]>([
    {
      uuid: 'auto-001',
      dateTime: '2025-01-15 09:30',
      action: 'Work order created',
      txt: 'Work order WO-101 created for site.',
      subject: 'Work Order Created – RA-001',
      body: 'A new work order has been created for rental agreement RA-001. Please review and assign.',
      recipients: 'jdoe@example.com, manager@example.com',
      _actions: '',
    },
    {
      uuid: 'auto-002',
      dateTime: '2025-02-01 14:00',
      action: 'Billing reminder',
      txt: 'Billing due in 7 days.',
      subject: 'Billing Reminder – Brookfield',
      body: 'Friendly reminder: billing for Brookfield Residential is due in 7 days. Please ensure the invoice is sent.',
      recipients: 'billing@example.com',
      _actions: '',
    },
  ]);

  const [detailOpen, setDetailOpen] = useState(false);
  const [detailAuto, setDetailAuto] = useState<AutoRow | null>(null);

  const [user] = useState<User>({
    id: '1',
    fullName: 'Guest User',
    phone: '',
    city: '',
    isActive: true,
  });

  const showAutoSingle = (auto: AutoRow) => {
    setDetailAuto(auto);
    setDetailOpen(true);
  };

  const columns: TableColumn<AutoRow>[] = [
    { key: 'dateTime', title: 'Date/Time', render: (v) => v || '—' },
    { key: 'action', title: 'Action', render: (v) => v || '—' },
    { key: 'txt', title: 'Text', render: (v) => v || '—' },
    {
      key: 'subject',
      title: 'Subject',
      render: (_, row) => (
        <button
          type="button"
          onClick={() => showAutoSingle(row)}
          className="text-blue-300 hover:text-blue-200 hover:underline text-left"
        >
          {row.subject || '—'}
        </button>
      ),
    },
    { key: 'recipients', title: 'Recipients', render: (v) => v || '—' },
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
                <Zap className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                <h2 className="text-xl font-semibold text-white">Automated Actions</h2>
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
                    data={autos}
                    emptyMessage="No automated actions"
                    pagination
                    pageSize={25}
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Detail Modal */}
      {detailOpen && detailAuto && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50 p-4">
          <div className="bg-[#0054a4] border border-white/20 rounded-2xl shadow-xl w-full max-w-md p-6 relative">
            <div className="flex justify-between items-center mb-4">
              <h4 className="text-lg font-semibold text-white">Automated Function</h4>
              <button
                type="button"
                onClick={() => setDetailOpen(false)}
                className="p-1 text-white/80 hover:text-white rounded transition-colors"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-3 text-sm">
              <p>
                <strong className="text-white/90">Request Type:</strong>{' '}
                <span className="text-white/80">{detailAuto.action}</span>
              </p>
              <p>
                <strong className="text-white/90">Date:</strong>{' '}
                <span className="text-white/80">{detailAuto.dateTime}</span>
              </p>
              <p>
                <strong className="text-white/90">Subject:</strong>{' '}
                <span className="text-white/80">{detailAuto.subject}</span>
              </p>
              <p>
                <strong className="text-white/90">Body:</strong>{' '}
                <span className="text-white/80 block mt-1">{detailAuto.body}</span>
              </p>
            </div>
            <div className="mt-4">
              <button
                type="button"
                onClick={() => setDetailOpen(false)}
                className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1.5 rounded-xl font-medium transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
