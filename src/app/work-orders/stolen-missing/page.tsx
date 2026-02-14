'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Menu, Bell, AlertTriangle, CheckCircle, Trash2 } from 'lucide-react';
import Sidebar from '@/components/Sidebar';
import Table, { TableColumn } from '@/components/Table';

const inputClass =
  'w-full p-2.5 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-primary-400';

interface User {
  id: string;
  fullName: string;
  phone: string;
  city: string;
  isActive: boolean;
}

interface StolenMissingRow {
  uuid: string;
  makeName: string;
  modelName: string;
  companyId: string;
  bulkName: string | null;
  assetType: string;
  rgId: string;
  streetAddress: string;
  city: string;
  customerName: string;
  dateSoldStolen: string;
  soldOrStolen: string;
  _actions?: string;
}

function capitalizeWords(s: string): string {
  return s
    .split(' ')
    .map((w) => (w ? w.charAt(0).toUpperCase() + w.slice(1).toLowerCase() : w))
    .join(' ');
}

export default function StolenMissingPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [items, setItems] = useState<StolenMissingRow[]>([
    {
      uuid: 'sm-001',
      makeName: 'Generac',
      modelName: 'Heater Pro 20',
      companyId: '101',
      bulkName: null,
      assetType: 'heater',
      rgId: 'ra-001',
      streetAddress: '2370 MUCKLEPLUM WAY',
      city: 'Edmonton',
      customerName: 'Brookfield Residential (Alberta) LP',
      dateSoldStolen: '2025-01-10',
      soldOrStolen: 'Reported stolen from site',
      _actions: '',
    },
    {
      uuid: 'sm-002',
      makeName: '',
      modelName: '',
      companyId: '',
      bulkName: 'Propane Tanks (Bulk)',
      assetType: 'bulk',
      rgId: 'ra-002',
      streetAddress: '2616 158 STREET',
      city: 'Edmonton',
      customerName: 'Anthem Properties',
      dateSoldStolen: '2025-02-01',
      soldOrStolen: 'Missing at pickup',
      _actions: '',
    },
  ]);

  const [resolveOpen, setResolveOpen] = useState(false);
  const [resolveUuid, setResolveUuid] = useState('');
  const [resolveText, setResolveText] = useState('');

  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteUuid, setDeleteUuid] = useState('');

  const [user] = useState<User>({
    id: '1',
    fullName: 'Guest User',
    phone: '',
    city: '',
    isActive: true,
  });

  const getAssetLabel = (row: StolenMissingRow) => {
    if (row.makeName && row.modelName && row.companyId) {
      return `${row.makeName} ${row.modelName} [${row.companyId}]`;
    }
    return row.bulkName || 'N/A';
  };

  const columns: TableColumn<StolenMissingRow>[] = [
    {
      key: 'makeName',
      title: 'Asset',
      render: (_, row) => <span className="text-white/90">{getAssetLabel(row)}</span>,
    },
    {
      key: 'assetType',
      title: 'Type',
      render: (v) => capitalizeWords(v || ''),
    },
    {
      key: 'streetAddress',
      title: 'Last Agreement',
      render: (_, row) => (
        <a
          href="#"
          className="text-blue-300 hover:text-blue-200 hover:underline"
        >
          {row.streetAddress ? `${row.streetAddress}, ${row.city}` : 'N/A'}
        </a>
      ),
    },
    { key: 'customerName', title: 'Customer Name', render: (v) => v || 'N/A' },
    { key: 'dateSoldStolen', title: 'Date Marked/Lost Stolen', render: (v) => v || '—' },
    { key: 'soldOrStolen', title: 'Note', render: (v) => v || '—' },
    { key: '_siteSupe', title: 'Site Supe', render: () => '—' },
    {
      key: '_actions',
      title: 'Actions',
      render: (_, row) => (
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => {
              setResolveUuid(row.uuid);
              setResolveText('');
              setResolveOpen(true);
            }}
            className="inline-flex items-center gap-1 px-2 py-1.5 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg text-sm font-medium transition-colors"
          >
            <CheckCircle className="w-3.5 h-3.5" />
            Resolve
          </button>
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

  const handleResolve = (e: React.FormEvent) => {
    e.preventDefault();
    setItems((prev) => prev.filter((i) => i.uuid !== resolveUuid));
    setResolveOpen(false);
    setResolveUuid('');
    setResolveText('');
  };

  const handleDelete = (e: React.FormEvent) => {
    e.preventDefault();
    setItems((prev) => prev.filter((i) => i.uuid !== deleteUuid));
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
                <AlertTriangle className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                <h2 className="text-2xl font-bold text-white">
                  Stolen or Missing Assets [{items.length}]
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
                    data={items}
                    emptyMessage="No stolen or missing assets"
                    pagination
                    pageSize={25}
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Resolve Modal */}
      {resolveOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50 p-4">
          <div className="bg-[#0054a4] border border-white/20 rounded-2xl shadow-xl w-full max-w-md p-6">
            <h4 className="text-lg font-bold text-white mb-2">Resolve Stolen/Missing</h4>
            <p className="text-white/90 text-sm mb-3">How was this resolved?</p>
            <form onSubmit={handleResolve}>
              <textarea
                value={resolveText}
                onChange={(e) => setResolveText(e.target.value)}
                className={`${inputClass} min-h-[100px]`}
                placeholder="Resolution"
              />
              <div className="flex justify-end gap-2 mt-4">
                <button
                  type="button"
                  onClick={() => setResolveOpen(false)}
                  className="bg-gray-500 hover:bg-gray-600 text-white px-3 py-1.5 rounded-xl font-medium transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-green-500 hover:bg-green-600 text-white px-3 py-1.5 rounded-xl font-medium transition-colors"
                >
                  Mark Resolved
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
            <h4 className="text-lg font-bold text-white mb-2">Delete Service Call</h4>
            <p className="text-white/90 text-sm mb-4">Are you sure you want to do this?</p>
            <form onSubmit={handleDelete}>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setDeleteOpen(false)}
                  className="bg-gray-500 hover:bg-gray-600 text-white px-3 py-1.5 rounded-xl font-medium transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 rounded-xl font-medium transition-colors"
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
