'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Menu,
  Bell,
  Package,
  Plus,
  Search,
  MessageSquare,
  Trash2,
} from 'lucide-react';
import Link from 'next/link';
import Sidebar from '@/components/Sidebar';
import Table, { TableColumn } from '@/components/Table';

const selectClass =
  'rounded-xl border border-white/20 p-2.5 bg-[#003a7a] text-white focus:outline-none focus:ring-2 focus:ring-primary-400 [&>option]:bg-gray-800 [&>option]:text-white';

interface User {
  id: string;
  fullName: string;
  phone: string;
  city: string;
  isActive: boolean;
}

interface PartRow {
  id: string;
  companyId: string;
  typeName: string;
  makeName: string;
  modelName: string;
  description: string;
  manuPartNumber: string;
  costNew: string;
  sellNew: string;
  inventoryCount: number;
  threshold: number;
  _actions?: string;
}

const partTypes = [
  { id: '1', type: 'Igniter' },
  { id: '2', type: 'Valve' },
  { id: '3', type: 'Filter' },
  { id: '4', type: 'Gasket' },
];

export default function PartsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedType, setSelectedType] = useState<string>('-1');
  const [partMarkUp, setPartMarkUp] = useState('15');
  const [parts, setParts] = useState<PartRow[]>([
    {
      id: 'pt-001',
      companyId: 'SSR-101',
      typeName: 'Igniter',
      makeName: 'Generac',
      modelName: 'Hot Surface',
      description: 'Hot surface igniter',
      manuPartNumber: 'GEN-IGN-001',
      costNew: '45.00',
      sellNew: '52.00',
      inventoryCount: 12,
      threshold: 5,
      _actions: '',
    },
    {
      id: 'pt-002',
      companyId: 'SSR-102',
      typeName: 'Valve',
      makeName: 'Generic',
      modelName: 'Gas Valve 24V',
      description: 'Gas valve 24V',
      manuPartNumber: 'GV-24-001',
      costNew: '89.00',
      sellNew: '102.00',
      inventoryCount: 3,
      threshold: 5,
      _actions: '',
    },
  ]);

  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteRow, setDeleteRow] = useState<PartRow | null>(null);

  const [user] = useState<User>({
    id: '1',
    fullName: 'Guest User',
    phone: '',
    city: '',
    isActive: true,
  });

  const columns: TableColumn<PartRow>[] = [
    { key: 'companyId', title: 'ID', render: (v) => <span className="text-white/80">{v}</span> },
    { key: 'typeName', title: 'Type', render: (v) => v || '—' },
    { key: 'makeName', title: 'Make', render: (v) => v || '—' },
    { key: 'modelName', title: 'Model', render: (v) => v || '—' },
    { key: 'description', title: 'Description', render: (v) => v || '—' },
    { key: 'manuPartNumber', title: 'Manufacturer Part #', render: (v) => v || '—' },
    {
      key: 'costNew',
      title: 'Cost New',
      render: (v) => (v ? `$${v}` : '—'),
    },
    {
      key: 'sellNew',
      title: 'Sell New',
      render: (v) => (v ? `$${v}` : '—'),
    },
    { key: 'inventoryCount', title: 'Inventory Count', render: (v) => String(v ?? '—') },
    { key: 'threshold', title: 'Threshold', render: (v) => String(v ?? '—') },
    {
      key: '_actions',
      title: 'Actions',
      render: (_, row) => (
        <div className="flex flex-wrap gap-2">
          <Link
            href="#"
            className="inline-flex items-center justify-center w-9 h-9 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
            title="View"
          >
            <Search className="w-4 h-4" />
          </Link>
          <button
            type="button"
            className="inline-flex items-center justify-center w-9 h-9 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg transition-colors"
            title="Add Note"
          >
            <MessageSquare className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => {
              setDeleteRow(row);
              setDeleteOpen(true);
            }}
            className="inline-flex items-center justify-center w-9 h-9 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
            title="Delete"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      ),
    },
  ];

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    setSelectedType(val);
    if (val !== '-1') {
      // In real app: router.push(`/assets/parts/${val}`)
    }
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
                <Package className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                <h2 className="text-3xl font-bold text-white">Parts Inventory</h2>
              </div>
            </motion.div>

            <div className="flex flex-wrap justify-between items-center gap-4 mb-6">
              <div>
                <label htmlFor="partsSortCB" className="text-white font-semibold block mb-1">
                  Sort by:
                </label>
                <select
                  id="partsSortCB"
                  name="partsSortCB"
                  value={selectedType}
                  onChange={handleSortChange}
                  className={selectClass}
                >
                  <option value="-1">-- Select Type of Part --</option>
                  {partTypes.map((t) => (
                    <option key={t.id} value={t.id}>{t.type}</option>
                  ))}
                </select>
              </div>
              <Link
                href="/assets/parts/create"
                className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg font-medium transition-colors"
              >
                <Plus className="w-4 h-4" />
                Add Part
              </Link>
            </div>

            <div className="text-center mb-6">
              <span className="text-white font-semibold mr-2">Part Markup:</span>
              <input
                id="partMarkUpInp"
                type="number"
                step={1}
                min={0}
                max={100}
                value={partMarkUp}
                onChange={(e) => setPartMarkUp(e.target.value)}
                onBlur={() => {
                  // In real app: updateMarkUp() API call
                }}
                className="w-16 p-2 text-center bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-primary-400"
              />
              <span className="text-white ml-1">%</span>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 sm:p-8 shadow-xl border border-white/20">
                <div className="overflow-x-auto">
                  <Table
                    columns={columns}
                    data={parts}
                    emptyMessage="No parts"
                    pagination
                    pageSize={25}
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Delete Modal */}
      {deleteOpen && deleteRow && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50 p-4">
          <div className="bg-[#0054a4] border border-white/20 rounded-2xl shadow-xl w-full max-w-md p-6">
            <h4 className="text-lg font-semibold text-white text-center">
              Delete {deleteRow.companyId} {deleteRow.description} [{deleteRow.manuPartNumber}]?
            </h4>
            <p className="text-white/90 mt-2 text-center">
              Are you sure you want to delete this part?
            </p>
            <div className="mt-4 flex justify-between gap-3">
              <button
                type="button"
                onClick={() => setDeleteOpen(false)}
                className="bg-gray-500 hover:bg-gray-600 text-white px-3 py-1.5 rounded-xl font-medium transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  setParts((prev) => prev.filter((p) => p.id !== deleteRow.id));
                  setDeleteOpen(false);
                  setDeleteRow(null);
                }}
                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 rounded-xl font-medium transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
