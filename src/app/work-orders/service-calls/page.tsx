'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Menu,
  Bell,
  PhoneCall,
  Search,
  X,
  CheckCircle,
  Pencil,
  Trash2,
  RefreshCw,
} from 'lucide-react';
import Sidebar from '@/components/Sidebar';
import Table, { TableColumn } from '@/components/Table';

const selectClass =
  'w-full p-2.5 bg-[#003a7a] border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-primary-400 [&>option]:bg-gray-800 [&>option]:text-white';

interface User {
  id: string;
  fullName: string;
  phone: string;
  city: string;
  isActive: boolean;
}

interface ServiceCallRow {
  uuid: string;
  rgId: string;
  streetAddress: string;
  city: string;
  username: string;
  seen: number;
  date: string;
  reason: string;
  customerRequest: string;
  _actions?: string;
}

const mockUsers = [
  { uuid: 'u1', username: 'jdoe' },
  { uuid: 'u2', username: 'sking' },
  { uuid: 'u3', username: 'mchen' },
];

function capitalize(s: string): string {
  if (!s) return s;
  return s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();
}

export default function ServiceCallsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [serviceCalls, setServiceCalls] = useState<ServiceCallRow[]>([
    {
      uuid: 'sc-001',
      rgId: 'ra-001',
      streetAddress: '2370 MUCKLEPLUM WAY',
      city: 'Edmonton',
      username: 'jdoe',
      seen: 1,
      date: '2025-01-15',
      reason: 'Heater not working',
      customerRequest: 'Customer reported no heat at unit.',
      _actions: '',
    },
    {
      uuid: 'sc-002',
      rgId: 'ra-002',
      streetAddress: '2616 158 STREET',
      city: 'Edmonton',
      username: '',
      seen: 0,
      date: '2025-02-01',
      reason: 'Leak inspection',
      customerRequest: 'Site manager requested leak check.',
      _actions: '',
    },
  ]);

  const [assignOpen, setAssignOpen] = useState(false);
  const [assignScUuid, setAssignScUuid] = useState('');
  const [assignToUuid, setAssignToUuid] = useState<string>('-1');

  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteUuid, setDeleteUuid] = useState('');

  const [user] = useState<User>({
    id: '1',
    fullName: 'Guest User',
    phone: '',
    city: '',
    isActive: true,
  });

  const columns: TableColumn<ServiceCallRow>[] = [
    {
      key: 'streetAddress',
      title: 'Address',
      render: (_, row) => (
        <div className="text-white/90">
          <span>
            {row.streetAddress ? `${row.streetAddress}, ${row.city}` : row.city || '—'}
          </span>
          <br />
          <a
            href="#"
            className="inline-flex items-center gap-1 mt-1 px-2 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-sm font-medium transition-colors"
          >
            <Search className="w-3.5 h-3.5" />
            View
          </a>
        </div>
      ),
    },
    {
      key: 'username',
      title: 'Assigned To',
      render: (_, row) => (
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-white/90">
            {row.username ? capitalize(row.username) : '—'}
          </span>
          {row.seen === 0 ? (
            <X className="w-4 h-4 text-red-400" aria-hidden />
          ) : (
            <CheckCircle className="w-4 h-4 text-green-400" aria-hidden />
          )}
          <button
            type="button"
            onClick={() => {
              setAssignScUuid(row.uuid);
              setAssignToUuid('-1');
              setAssignOpen(true);
            }}
            className="inline-flex items-center gap-1 px-2 py-1 bg-gray-500 hover:bg-gray-600 text-white rounded-lg text-sm font-medium transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            Assign
          </button>
        </div>
      ),
    },
    { key: 'date', title: 'Date', render: (v) => v || '—' },
    {
      key: 'reason',
      title: 'Reason',
      render: (_, row) => (
        <div className="text-white/90">
          <span>{row.reason || '—'}</span>
          {row.customerRequest && (
            <>
              <br />
              <span className="text-white/80">{row.customerRequest}</span>
            </>
          )}
        </div>
      ),
    },
    {
      key: '_actions',
      title: 'Actions',
      render: (_, row) => (
        <div className="flex flex-wrap gap-2">
          <a
            href="#"
            className="inline-flex items-center gap-1 px-2 py-1.5 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg text-sm font-medium transition-colors"
          >
            <CheckCircle className="w-3.5 h-3.5" />
            Resolve
          </a>
          <a
            href="#"
            className="inline-flex items-center gap-1 px-2 py-1.5 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-sm font-medium transition-colors"
          >
            <Pencil className="w-3.5 h-3.5" />
            Edit
          </a>
          <button
            type="button"
            onClick={() => {
              setDeleteUuid(row.uuid);
              setDeleteOpen(true);
            }}
            className="inline-flex items-center gap-1 px-2 py-1.5 bg-red-500 hover:bg-red-600 text-white rounded-lg text-sm font-medium transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5" />
            Delete
          </button>
        </div>
      ),
    },
  ];

  const handleAssign = (e: React.FormEvent) => {
    e.preventDefault();
    if (assignToUuid === '-1') return;
    const assignedUser = mockUsers.find((u) => u.uuid === assignToUuid);
    if (assignedUser) {
      setServiceCalls((prev) =>
        prev.map((sc) =>
          sc.uuid === assignScUuid ? { ...sc, username: assignedUser.username, seen: 0 } : sc
        )
      );
    }
    setAssignOpen(false);
    setAssignScUuid('');
    setAssignToUuid('-1');
  };

  const handleDelete = (e: React.FormEvent) => {
    e.preventDefault();
    setServiceCalls((prev) => prev.filter((sc) => sc.uuid !== deleteUuid));
    setDeleteOpen(false);
    setDeleteUuid('');
  };

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
                <PhoneCall className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                <h2 className="text-xl font-semibold text-white">
                  Unresolved Service Calls [{serviceCalls.length}]
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
                    data={serviceCalls}
                    emptyMessage="No unresolved service calls"
                    pagination
                    pageSize={25}
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Assign Modal */}
      {assignOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50 p-4">
          <div className="bg-[#0054a4] border border-white/20 rounded-2xl shadow-xl w-full max-w-md p-6">
            <h4 className="text-lg font-semibold text-white text-center mb-4">
              Assign Service Call
            </h4>
            <form onSubmit={handleAssign}>
              <select
                value={assignToUuid}
                onChange={(e) => setAssignToUuid(e.target.value)}
                className={selectClass}
                required
              >
                <option value="-1">--SELECT ASSIGN TO--</option>
                {mockUsers.map((u) => (
                  <option key={u.uuid} value={u.uuid}>
                    {capitalize(u.username)}
                  </option>
                ))}
              </select>
              <div className="flex justify-between gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => {
                    setAssignOpen(false);
                    setAssignScUuid('');
                    setAssignToUuid('-1');
                  }}
                  className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-xl font-medium transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-xl font-medium transition-colors"
                >
                  Assign Service Call
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      {deleteOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50 p-4">
          <div className="bg-[#0054a4] border border-white/20 rounded-2xl shadow-xl w-full max-w-md p-6">
            <h4 className="text-lg font-semibold text-white mb-2">Delete Service Call</h4>
            <p className="text-white/90 text-sm mb-4">Are you sure you want to do this?</p>
            <form onSubmit={handleDelete}>
              <div className="flex justify-between gap-3">
                <button
                  type="button"
                  onClick={() => setDeleteOpen(false)}
                  className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-xl font-medium transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl font-medium transition-colors"
                >
                  Delete
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
