'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Menu, Bell, Clock, Plus, Sun, Pencil, LogOut, Trash2 } from 'lucide-react';
import Sidebar from '@/components/Sidebar';
import Table, { TableColumn } from '@/components/Table';

interface User {
  id: string;
  fullName: string;
  phone: string;
  city: string;
  isActive: boolean;
}

interface TimeChange {
  inOrOut: string;
  oldTime: string;
  newTime: string;
  reason: string;
}

interface TimesheetRow {
  uuid: string;
  username: string;
  dayOff: boolean;
  clockin: string;
  clockout: string;
  totalTime: string;
  takeLunch?: 'Yes' | 'No';
  stillClockedIn?: boolean;
  changes: TimeChange[];
}

export default function TimesheetPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const getTodayDate = () => new Date().toISOString().split('T')[0];
  const [selectedDate, setSelectedDate] = useState(getTodayDate());

  const [user] = useState<User>({
    id: '1',
    fullName: 'Guest User',
    phone: '',
    city: '',
    isActive: true,
  });

  // Mock: Clocked in this day
  const timesheetData: TimesheetRow[] = [
    {
      uuid: 'ts-001',
      username: 'Jake Poles',
      dayOff: false,
      clockin: '08:00',
      clockout: '16:30',
      totalTime: '8.50',
      takeLunch: 'Yes',
      stillClockedIn: false,
      changes: [
        { inOrOut: 'In', oldTime: '08:15', newTime: '08:00', reason: 'Traffic delay corrected' },
      ],
    },
    {
      uuid: 'ts-002',
      username: 'Travis King',
      dayOff: false,
      clockin: '07:30',
      clockout: '12:00 am',
      totalTime: '',
      stillClockedIn: true,
      changes: [],
    },
    {
      uuid: 'ts-003',
      username: 'Phil Pare',
      dayOff: true,
      clockin: 'Day Off',
      clockout: '',
      totalTime: '',
      changes: [],
    },
  ];

  const columns: TableColumn<TimesheetRow>[] = [
    { key: 'username', title: 'Person' },
    {
      key: 'clockin',
      title: 'Clocked In',
      render: (_, row) =>
        row.dayOff ? (
          'Day Off'
        ) : (
          <div className="flex items-center gap-2">
            <span>{row.clockin}</span>
            <button
              type="button"
              className="p-1.5 bg-amber-500 hover:bg-amber-600 text-white rounded transition-colors"
              title="Edit"
            >
              <Pencil className="w-3.5 h-3.5" />
            </button>
          </div>
        ),
    },
    {
      key: 'clockout',
      title: 'Clocked Out',
      render: (_, row) => {
        if (row.dayOff) return '—';
        if (row.stillClockedIn) {
          return (
            <button
              type="button"
              className="px-3 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-sm font-medium inline-flex items-center gap-1.5"
            >
              <LogOut className="w-4 h-4" />
              Clock Out
            </button>
          );
        }
        return (
          <div className="flex flex-col gap-0.5">
            <div className="flex items-center gap-2">
              <span>{row.clockout}</span>
              <button
                type="button"
                className="p-1.5 bg-amber-500 hover:bg-amber-600 text-white rounded transition-colors"
                title="Edit"
              >
                <Pencil className="w-3.5 h-3.5" />
              </button>
            </div>
            {row.takeLunch != null && (
              <span className="text-white/60 text-xs">Took Lunch: {row.takeLunch}</span>
            )}
          </div>
        );
      },
    },
    {
      key: 'totalTime',
      title: 'Total Time',
      render: (v) => (v ? `${v} hrs` : '—'),
    },
    {
      key: 'changes',
      title: 'Changes',
      render: (_, row) =>
        row.changes.length > 0 ? (
          <div className="text-xs space-y-2">
            {row.changes.map((c, i) => (
              <div key={i} className="text-white/80 border-b border-white/10 pb-1 last:border-0">
                <span className="text-blue-300 font-semibold">Clocked {c.inOrOut}</span>
                <br />
                <b>Old:</b> {c.oldTime} <br />
                <b>New:</b> {c.newTime} <br />
                <b>Reason:</b> {c.reason}
              </div>
            ))}
          </div>
        ) : (
          '—'
        ),
    },
    {
      key: 'uuid',
      title: 'Remove',
      render: (_, row) => (
        <button
          type="button"
          className="p-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
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
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
            {/* Page title and date */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-6"
            >
              <h1 className="text-3xl font-bold text-white">Timesheet</h1>
              <h3 className="text-xl font-semibold text-white/80 mt-4">Date:</h3>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-64 p-2.5 mt-2 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-primary-400 text-center"
              />
              <div className="mt-4 flex flex-wrap justify-center gap-2">
                <button
                  type="button"
                  className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium inline-flex items-center gap-2 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  ADD TIME
                </button>
                <button
                  type="button"
                  className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg font-medium inline-flex items-center gap-2 transition-colors"
                >
                  <Sun className="w-4 h-4" />
                  ADD DAY OFF
                </button>
              </div>
            </motion.div>

            {/* Clocked In This Day */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <h2 className="text-2xl font-semibold text-white mt-6 mb-4">Clocked In This Day</h2>
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 sm:p-8 shadow-xl border border-white/20">
                <div className="overflow-x-auto">
                  <Table
                    columns={columns}
                    data={timesheetData}
                    emptyMessage="No one clocked in this day"
                    pagination={false}
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
