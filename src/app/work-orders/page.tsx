'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Menu, Bell, Wrench, Eye, FileText, UserPlus } from 'lucide-react';
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

interface WorkOrderRow {
  workOrderUuid: string;
  uuid: string;
  added: string;
  scheduledFor: string;
  typeName: string;
  makeName: string;
  modelName: string;
  serialNumber: string;
  username: string;
  customerName: string;
  personFirstName: string;
  personLastName: string;
  cellPhone: string;
  rgId: string;
  description: string;
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

export default function WorkOrdersPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [workOrders, setWorkOrders] = useState<WorkOrderRow[]>([
    {
      workOrderUuid: 'wo-a1',
      uuid: 'wo-a1',
      added: '2025-01-12',
      scheduledFor: '2025-01-18',
      typeName: 'Repair',
      makeName: 'Generac',
      modelName: 'Heater Pro 20',
      serialNumber: 'SN-1001',
      username: 'jdoe',
      customerName: 'Brookfield Residential (Alberta) LP',
      personFirstName: 'Jake',
      personLastName: 'Poles',
      cellPhone: '780-555-0100',
      rgId: 'ra-001',
      description: 'Heater not igniting; check gas line and igniter.',
      _actions: '',
    },
    {
      workOrderUuid: 'wo-a2',
      uuid: 'wo-a2',
      added: '2025-02-01',
      scheduledFor: '2025-02-05',
      typeName: 'Maintenance',
      makeName: '',
      modelName: '',
      serialNumber: '',
      username: '',
      customerName: 'Anthem Properties',
      personFirstName: 'Travis',
      personLastName: 'King',
      cellPhone: '780-555-0200',
      rgId: 'ra-002',
      description: 'Quarterly service on site equipment.',
      _actions: '',
    },
  ]);

  const [assignOpen, setAssignOpen] = useState(false);
  const [assignWorkOrderUuid, setAssignWorkOrderUuid] = useState('');
  const [assignToUuid, setAssignToUuid] = useState<string>('-1');

  const [user] = useState<User>({
    id: '1',
    fullName: 'Guest User',
    phone: '',
    city: '',
    isActive: true,
  });

  const columns: TableColumn<WorkOrderRow>[] = [
    { key: 'added', title: 'Created', render: (v) => v || '—' },
    { key: 'scheduledFor', title: 'Scheduled Date', render: (v) => v || '—' },
    {
      key: 'typeName',
      title: 'Type',
      render: (_, row) => (
        <div className="text-white/90">
          <span>{row.typeName}</span>
          {(row.makeName || row.modelName) && (
            <>
              <br />
              <span className="text-white/80">
                {[row.makeName, row.modelName].filter(Boolean).join(' ')}
              </span>
            </>
          )}
          {row.serialNumber && (
            <>
              <br />
              <span className="text-white/70">[{row.serialNumber}]</span>
            </>
          )}
        </div>
      ),
    },
    {
      key: 'username',
      title: 'Assigned To',
      render: (_, row) => (
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-white/90">
            {row.username ? capitalize(row.username) : 'Not Assigned'}
          </span>
          <button
            type="button"
            onClick={() => {
              setAssignWorkOrderUuid(row.workOrderUuid);
              setAssignToUuid('-1');
              setAssignOpen(true);
            }}
            className="inline-flex items-center gap-1 px-2 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-sm font-medium transition-colors"
          >
            <UserPlus className="w-3.5 h-3.5" />
            Assign
          </button>
        </div>
      ),
    },
    { key: 'customerName', title: 'Customer', render: (v) => v || '—' },
    {
      key: 'personFirstName',
      title: 'Person',
      render: (_, row) => (
        <div className="text-white/90">
          <span>
            {[row.personFirstName, row.personLastName].filter(Boolean).join(' ')}
          </span>
          {row.cellPhone && (
            <>
              <br />
              <a href={`tel:${row.cellPhone}`} className="text-blue-300 hover:underline">
                {row.cellPhone}
              </a>
            </>
          )}
        </div>
      ),
    },
    {
      key: 'rgId',
      title: 'Agreement',
      render: (_, row) => (
        <a
          href="#"
          className="inline-flex items-center gap-1 px-2 py-1 bg-green-500 hover:bg-green-600 text-white rounded-lg text-sm font-medium transition-colors"
        >
          <FileText className="w-3.5 h-3.5" />
          View Agreement
        </a>
      ),
    },
    { key: 'description', title: 'Description', render: (v) => v || '—' },
    {
      key: '_actions',
      title: 'Actions',
      render: (_, row) => (
        <a
          href="#"
          className="inline-flex items-center gap-1 px-2 py-1.5 bg-gray-500 hover:bg-gray-600 text-white rounded-lg text-sm font-medium transition-colors"
        >
          <Eye className="w-3.5 h-3.5" />
          View
        </a>
      ),
    },
  ];

  const handleAssign = (e: React.FormEvent) => {
    e.preventDefault();
    if (assignToUuid === '-1') return;
    const assignedUser = mockUsers.find((u) => u.uuid === assignToUuid);
    if (assignedUser) {
      setWorkOrders((prev) =>
        prev.map((wo) =>
          wo.workOrderUuid === assignWorkOrderUuid
            ? { ...wo, username: assignedUser.username }
            : wo
        )
      );
    }
    setAssignOpen(false);
    setAssignWorkOrderUuid('');
    setAssignToUuid('-1');
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
                <Wrench className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                <h2 className="text-2xl font-semibold text-white">Work Orders</h2>
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
                    data={workOrders}
                    emptyMessage="No work orders"
                    pagination
                    pageSize={25}
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Assign Work Order Modal */}
      {assignOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50 p-4">
          <div className="bg-[#0054a4] border border-white/20 rounded-2xl shadow-xl w-full max-w-md p-6">
            <h4 className="text-lg font-semibold text-white text-center mb-4">
              Assign Work Order
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
              <p className="text-white/90 text-center my-3 text-sm">
                Are you sure you want to do this?
              </p>
              <div className="flex justify-between gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setAssignOpen(false);
                    setAssignWorkOrderUuid('');
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
                  Assign
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
