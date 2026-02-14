'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Menu, Bell, AlertCircle, Plus, Pencil, Trash2, X } from 'lucide-react';
import Link from 'next/link';
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

interface ReasonRow {
  uuid: string;
  name: string;
  description: string;
  added: string;
  addedBy: string;
  order_by: number;
  active: boolean;
  _actions?: string;
}

export default function MissingStolenReasonsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [reasons, setReasons] = useState<ReasonRow[]>([
    {
      uuid: 'msr-001',
      name: 'Stolen from site',
      description: 'Asset reported stolen from job site',
      added: '2024-01-10',
      addedBy: 'admin',
      order_by: 1,
      active: true,
      _actions: '',
    },
    {
      uuid: 'msr-002',
      name: 'Missing at pickup',
      description: 'Asset not found during scheduled pickup',
      added: '2024-01-10',
      addedBy: 'admin',
      order_by: 2,
      active: true,
      _actions: '',
    },
    {
      uuid: 'msr-003',
      name: 'Stays on-site',
      description: 'Asset remains at customer site per agreement',
      added: '2024-02-01',
      addedBy: 'admin',
      order_by: 3,
      active: false,
      _actions: '',
    },
  ]);

  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteRow, setDeleteRow] = useState<ReasonRow | null>(null);
  const [editOpen, setEditOpen] = useState(false);
  const [editRow, setEditRow] = useState<ReasonRow | null>(null);
  const [editName, setEditName] = useState('');
  const [editDesc, setEditDesc] = useState('');
  const [editOrder, setEditOrder] = useState(0);

  const [user] = useState<User>({
    id: '1',
    fullName: 'Guest User',
    phone: '',
    city: '',
    isActive: true,
  });

  const columns: TableColumn<ReasonRow>[] = [
    { key: 'uuid', title: 'ID', render: (v) => <span className="text-white/80 text-sm">{v}</span> },
    { key: 'name', title: 'Name', render: (v) => v || '—' },
    { key: 'description', title: 'Description', render: (v) => v || '—' },
    { key: 'added', title: 'Added', render: (v) => v || '—' },
    { key: 'addedBy', title: 'Added By', render: (v) => v || '—' },
    { key: 'order_by', title: 'Order', render: (v) => String(v ?? '—') },
    {
      key: 'active',
      title: 'Active',
      render: (v) =>
        v ? (
          <span className="text-green-400 font-semibold">Active</span>
        ) : (
          <span className="text-red-400 font-semibold">Inactive</span>
        ),
    },
    {
      key: '_actions',
      title: 'Actions',
      render: (_, row) => (
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => {
              setEditRow(row);
              setEditName(row.name);
              setEditDesc(row.description);
              setEditOrder(row.order_by);
              setEditOpen(true);
            }}
            className="inline-flex items-center justify-center w-9 h-9 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
            title="Edit"
          >
            <Pencil className="w-4 h-4" />
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

  const handleEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editRow) return;
    setReasons((prev) =>
      prev.map((r) =>
        r.uuid === editRow.uuid
          ? { ...r, name: editName, description: editDesc, order_by: editOrder }
          : r
      )
    );
    setEditOpen(false);
    setEditRow(null);
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
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-6"
            >
              <div className="flex items-center justify-center gap-3 mb-4">
                <AlertCircle className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                <h2 className="text-2xl font-bold text-white">
                  Missing/Stolen/Stays On-Site Reasons
                </h2>
              </div>
              <div className="flex justify-center">
                <Link
                  href="/assets/missing-stolen-reasons/create"
                  className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg font-medium transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  Add New Reason
                </Link>
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
                    data={reasons}
                    emptyMessage="No reasons"
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
              Delete {deleteRow.name}?
            </h4>
            <p className="text-white/90 mt-2 text-center">Are you sure you want to delete this?</p>
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
                  setReasons((prev) => prev.filter((r) => r.uuid !== deleteRow.uuid));
                  setDeleteOpen(false);
                  setDeleteRow(null);
                }}
                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 rounded-xl font-medium transition-colors inline-flex items-center gap-1"
              >
                <Trash2 className="w-4 h-4" />
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {editOpen && editRow && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50 p-4">
          <div className="bg-[#0054a4] border border-white/20 rounded-2xl shadow-xl w-full max-w-md p-6 relative">
            <div className="flex justify-between items-center mb-4">
              <h4 className="text-lg font-semibold text-white">Edit {editRow.name}</h4>
              <button
                type="button"
                onClick={() => setEditOpen(false)}
                className="p-1 text-white/80 hover:text-white rounded"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleEdit} className="space-y-4">
              <div>
                <label className="block text-white font-semibold mb-1">Name:</label>
                <input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className={inputClass}
                />
              </div>
              <div>
                <label className="block text-white font-semibold mb-1">Description:</label>
                <textarea
                  value={editDesc}
                  onChange={(e) => setEditDesc(e.target.value)}
                  className={`${inputClass} min-h-[80px] resize-y`}
                />
              </div>
              <div>
                <label className="block text-white font-semibold mb-1">Order:</label>
                <input
                  type="number"
                  value={editOrder}
                  onChange={(e) => setEditOrder(Number(e.target.value))}
                  className={inputClass}
                />
              </div>
              <div className="flex justify-between gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setEditOpen(false)}
                  className="bg-gray-500 hover:bg-gray-600 text-white px-3 py-1.5 rounded-xl font-medium transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1.5 rounded-xl font-medium transition-colors inline-flex items-center gap-1"
                >
                  <Pencil className="w-4 h-4" />
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
