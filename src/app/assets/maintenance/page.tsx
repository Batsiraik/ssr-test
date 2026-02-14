'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Menu,
  Bell,
  Wrench,
  Play,
  Save,
  ArrowLeft,
  Trash2,
} from 'lucide-react';
import Link from 'next/link';
import Sidebar from '@/components/Sidebar';
import Table, { TableColumn } from '@/components/Table';

const inputClass =
  'w-full p-2.5 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-primary-400';
const selectClass =
  'w-full p-2.5 bg-[#003a7a] border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-primary-400 [&>option]:bg-gray-800 [&>option]:text-white';

interface User {
  id: string;
  fullName: string;
  phone: string;
  city: string;
  isActive: boolean;
}

interface UsedPartRow {
  uuid: string;
  companyId: string;
  numParts: number;
  labour: string;
  labourDescrip: string;
  added: string;
  username: string;
  _actions?: string;
}

export default function MaintenancePage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [resolved, setResolved] = useState(0);
  const [resolutionNotes, setResolutionNotes] = useState('');
  const [usedParts, setUsedParts] = useState<UsedPartRow[]>([
    {
      uuid: 'up-001',
      companyId: 'SSR-101',
      numParts: 1,
      labour: '0.5',
      labourDescrip: 'Replaced igniter',
      added: '2025-01-15',
      username: 'jdoe',
      _actions: '',
    },
  ]);

  const [user] = useState<User>({
    id: '1',
    fullName: 'Guest User',
    phone: '',
    city: '',
    isActive: true,
  });

  const maintenance = {
    templateName: 'Annual Heater Service',
    makeName: 'Generac',
    modelName: 'Heater Pro 20',
    companyId: '101',
    date: '2025-01-15',
    assignedToUn: 'jdoe',
    taskCount: 5,
    assetHours: 1250,
  };

  const partsColumns: TableColumn<UsedPartRow>[] = [
    { key: '_index', title: '#', render: (_, __, i) => (i + 1).toString() },
    { key: 'companyId', title: 'Name', render: (v) => v || '—' },
    { key: 'numParts', title: 'Quantity', render: (v) => String(v ?? '—') },
    { key: 'labour', title: 'Time to Fix', render: (v) => v || '—' },
    { key: 'labourDescrip', title: 'Description', render: (v) => v || '—' },
    { key: 'added', title: 'Added', render: (v) => v || '—' },
    { key: 'username', title: 'User', render: (v) => v || '—' },
    {
      key: '_actions',
      title: 'Actions',
      render: (_, row) => (
        <button
          type="button"
          onClick={() => setUsedParts((prev) => prev.filter((p) => p.uuid !== row.uuid))}
          className="inline-flex items-center justify-center w-9 h-9 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
          title="Remove"
        >
          <Trash2 className="w-4 h-4" />
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
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-2xl font-bold text-white text-center mb-6">
                Maintenance Event – {maintenance.templateName}
              </h2>

              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 mb-6">
                <h3 className="text-xl font-semibold text-white mb-2">Asset Information</h3>
                <p className="text-white/90">
                  {maintenance.makeName} {maintenance.modelName} [{maintenance.companyId}]
                  <br />
                  Asset Hours: {maintenance.assetHours} hours
                </p>
                <p className="text-white/90 mt-2">
                  <strong>Date Scheduled:</strong> {maintenance.date}
                </p>
                <p className="text-white/90">
                  <strong>Assigned To:</strong> {maintenance.assignedToUn}
                </p>
                <p className="text-white/90">
                  <strong>Steps to Complete:</strong> {maintenance.taskCount}
                </p>
              </div>

              {resolved === 1 ? (
                <p className="text-xl font-semibold text-red-400 text-center mb-4">
                  The tasks were completed for this.
                </p>
              ) : (
                <button
                  type="button"
                  className="w-full bg-green-500 hover:bg-green-600 text-white px-4 py-3 rounded-xl text-lg font-medium transition-colors flex items-center justify-center gap-2 mb-6"
                >
                  <Play className="w-5 h-5" />
                  START MAINTENANCE
                </button>
              )}

              <h3 className="text-xl font-semibold text-white mb-2">Parts Used</h3>
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-4 border border-white/20 mb-6 overflow-x-auto">
                <Table
                  columns={partsColumns}
                  data={usedParts}
                  emptyMessage="No parts used"
                />
              </div>

              <h3 className="text-xl font-semibold text-white mb-2">Resolution Notes</h3>
              <textarea
                value={resolutionNotes}
                onChange={(e) => setResolutionNotes(e.target.value)}
                className={`${inputClass} min-h-[100px] mb-6`}
                placeholder="Resolution notes"
              />

              <h3 className="text-xl font-semibold text-white mb-2">
                Is this maintenance completely resolved?
              </h3>
              <select
                value={resolved}
                onChange={(e) => setResolved(Number(e.target.value))}
                className={`${selectClass} max-w-xs mb-6`}
              >
                <option value={1}>Yes</option>
                <option value={0}>No</option>
              </select>

              {resolved === 0 && (
                <div className="space-y-3">
                  <button
                    type="button"
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white px-4 py-3 rounded-xl text-lg font-medium transition-colors flex items-center justify-center gap-2"
                  >
                    <Save className="w-5 h-5" />
                    Save Maintenance Event
                  </button>
                  <Link
                    href="#"
                    className="w-full bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-3 rounded-xl text-lg font-medium transition-colors flex items-center justify-center gap-2"
                  >
                    <ArrowLeft className="w-5 h-5" />
                    Back
                  </Link>
                  <button
                    type="button"
                    className="w-full bg-red-500 hover:bg-red-600 text-white px-4 py-3 rounded-xl text-lg font-medium transition-colors flex items-center justify-center gap-2"
                  >
                    <Trash2 className="w-5 h-5" />
                    Delete Maintenance Event
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
