'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Menu, Bell, Wrench, Pencil, Trash2, Plus } from 'lucide-react';
import Sidebar from '@/components/Sidebar';
import Table, { TableColumn } from '@/components/Table';

const selectClass =
  'w-full p-2.5 bg-[#003a7a] border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-primary-400 [&>option]:bg-gray-800 [&>option]:text-white';
const inputClass =
  'w-full p-2.5 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-primary-400';

interface User {
  id: string;
  fullName: string;
  phone: string;
  city: string;
  isActive: boolean;
}

interface WorkOrderTypeRow {
  uuid: string;
  type: string;
  assetBeforeAfter: string;
  _actions?: string;
}

function capitalize(s: string): string {
  if (!s) return s;
  return s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();
}

export default function WorkOrderTypesPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [types, setTypes] = useState<WorkOrderTypeRow[]>([
    { uuid: 't1', type: 'Repair', assetBeforeAfter: 'before', _actions: '' },
    { uuid: 't2', type: 'Maintenance', assetBeforeAfter: 'after', _actions: '' },
    { uuid: 't3', type: 'Inspection', assetBeforeAfter: 'before', _actions: '' },
    { uuid: 't4', type: 'Quote', assetBeforeAfter: 'after', _actions: '' },
  ]);

  const [createOpen, setCreateOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const [createName, setCreateName] = useState('');
  const [createBeforeAfter, setCreateBeforeAfter] = useState<string>('-1');

  const [editUuid, setEditUuid] = useState('');
  const [editName, setEditName] = useState('');
  const [editBeforeAfter, setEditBeforeAfter] = useState<string>('-1');

  const [deleteUuid, setDeleteUuid] = useState('');
  const [deleteName, setDeleteName] = useState('');

  const [user] = useState<User>({
    id: '1',
    fullName: 'Guest User',
    phone: '',
    city: '',
    isActive: true,
  });

  const columns: TableColumn<WorkOrderTypeRow>[] = [
    { key: 'type', title: 'Name', render: (v) => v || '—' },
    {
      key: 'assetBeforeAfter',
      title: 'Specify Assets Before or After',
      render: (v) => capitalize(v || ''),
    },
    {
      key: '_actions',
      title: 'Actions',
      render: (_, row) => (
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => {
              setEditUuid(row.uuid);
              setEditName(row.type);
              setEditBeforeAfter(row.assetBeforeAfter || '-1');
              setEditOpen(true);
            }}
            className="inline-flex items-center gap-1 px-2 py-1.5 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-sm font-medium transition-colors"
          >
            <Pencil className="w-3.5 h-3.5" />
            Edit
          </button>
          <button
            type="button"
            onClick={() => {
              setDeleteUuid(row.uuid);
              setDeleteName(row.type);
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

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!createName.trim() || createBeforeAfter === '-1') return;
    setTypes((prev) => [
      ...prev,
      {
        uuid: `t${Date.now()}`,
        type: createName.trim(),
        assetBeforeAfter: createBeforeAfter,
        _actions: '',
      },
    ]);
    setCreateName('');
    setCreateBeforeAfter('-1');
    setCreateOpen(false);
  };

  const handleEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editName.trim() || editBeforeAfter === '-1') return;
    setTypes((prev) =>
      prev.map((t) =>
        t.uuid === editUuid
          ? { ...t, type: editName.trim(), assetBeforeAfter: editBeforeAfter }
          : t
      )
    );
    setEditOpen(false);
  };

  const handleDelete = (e: React.FormEvent) => {
    e.preventDefault();
    setTypes((prev) => prev.filter((t) => t.uuid !== deleteUuid));
    setDeleteOpen(false);
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
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-6"
            >
              <div className="flex items-center justify-center gap-3 mb-4">
                <Wrench className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                <h2 className="text-2xl font-bold text-white">Work Order Types</h2>
              </div>
              <button
                type="button"
                onClick={() => setCreateOpen(true)}
                className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-xl font-medium transition-colors"
              >
                <Plus className="w-4 h-4" />
                Create Type
              </button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 sm:p-8 shadow-xl border border-white/20">
                <div className="overflow-x-auto">
                  <Table columns={columns} data={types} emptyMessage="No work order types" />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Create Modal */}
      {createOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50 p-4">
          <div className="bg-[#0054a4] border border-white/20 rounded-2xl shadow-xl w-full max-w-md p-6">
            <h4 className="text-lg font-semibold text-white text-center">ADD A WORK ORDER TYPE</h4>
            <form onSubmit={handleCreate} className="mt-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-white/90 mb-1">Type Name:</label>
                <input
                  type="text"
                  value={createName}
                  onChange={(e) => setCreateName(e.target.value)}
                  className={inputClass}
                  placeholder="Type name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-white/90 mb-1">
                  Specify Assets Before or After?
                </label>
                <select
                  value={createBeforeAfter}
                  onChange={(e) => setCreateBeforeAfter(e.target.value)}
                  className={selectClass}
                >
                  <option value="-1">--- SELECT BEFORE OR AFTER ---</option>
                  <option value="before">Before</option>
                  <option value="after">After</option>
                </select>
              </div>
              <div className="flex justify-between gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setCreateOpen(false)}
                  className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-xl font-medium transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-xl font-medium transition-colors"
                >
                  Create Work Order Type
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {editOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50 p-4">
          <div className="bg-[#0054a4] border border-white/20 rounded-2xl shadow-xl w-full max-w-md p-6">
            <h4 className="text-lg font-semibold text-white text-center">EDIT WORK ORDER TYPE</h4>
            <form onSubmit={handleEdit} className="mt-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-white/90 mb-1">Type Name:</label>
                <input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className={inputClass}
                  placeholder="Type name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-white/90 mb-1">
                  Specify Assets Before or After?
                </label>
                <select
                  value={editBeforeAfter}
                  onChange={(e) => setEditBeforeAfter(e.target.value)}
                  className={selectClass}
                >
                  <option value="-1">--- SELECT BEFORE OR AFTER ---</option>
                  <option value="before">Before</option>
                  <option value="after">After</option>
                </select>
              </div>
              <div className="flex justify-between gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setEditOpen(false)}
                  className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-xl font-medium transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-xl font-medium transition-colors"
                >
                  Save Work Order Type
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
            <h4 className="text-lg font-semibold text-white text-center">
              DELETE WORK ORDER TYPE
            </h4>
            <form onSubmit={handleDelete} className="mt-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-white/90 mb-1">Type Name:</label>
                <input
                  type="text"
                  value={deleteName}
                  readOnly
                  className="w-full p-2.5 bg-white/5 border border-white/20 rounded-xl text-white/80 cursor-not-allowed"
                />
              </div>
              <div className="flex justify-between gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setDeleteOpen(false)}
                  className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-xl font-medium transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl font-medium transition-colors"
                >
                  DELETE Work Order Type
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
