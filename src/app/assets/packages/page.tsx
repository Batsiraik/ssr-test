'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Menu, Bell, Package, Plus, Pencil, Trash2, X } from 'lucide-react';
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

interface PackageRow {
  packageId: string;
  name: string;
  _actions?: string;
}

export default function PackagesPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [packages, setPackages] = useState<PackageRow[]>([
    { packageId: 'pkg-001', name: 'Starter Heater Package', _actions: '' },
    { packageId: 'pkg-002', name: 'Full Site Package', _actions: '' },
    { packageId: 'pkg-003', name: 'Generator + Tank Bundle', _actions: '' },
  ]);

  const [createOpen, setCreateOpen] = useState(false);
  const [createName, setCreateName] = useState('');

  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deletePackage, setDeletePackage] = useState<PackageRow | null>(null);

  const [user] = useState<User>({
    id: '1',
    fullName: 'Guest User',
    phone: '',
    city: '',
    isActive: true,
  });

  const columns: TableColumn<PackageRow>[] = [
    { key: 'name', title: 'Name', render: (v) => v || '—' },
    {
      key: '_actions',
      title: 'Actions',
      render: (_, row) => (
        <div className="flex flex-wrap gap-2 justify-center">
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              // In real app: router.push(`/assets/packages/${row.packageId}`)
            }}
            className="inline-flex items-center justify-center w-9 h-9 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
            title="View / Edit"
          >
            <Pencil className="w-4 h-4" />
          </a>
          <button
            type="button"
            onClick={() => {
              setDeletePackage(row);
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

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!createName.trim()) return;
    setPackages((prev) => [
      ...prev,
      { packageId: `pkg-${Date.now()}`, name: createName.trim(), _actions: '' },
    ]);
    setCreateName('');
    setCreateOpen(false);
  };

  const handleDelete = (e: React.FormEvent) => {
    e.preventDefault();
    if (deletePackage) {
      setPackages((prev) => prev.filter((p) => p.packageId !== deletePackage.packageId));
      setDeleteOpen(false);
      setDeletePackage(null);
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
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-6"
            >
              <div className="flex items-center justify-center gap-3 mb-4">
                <Package className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                <h2 className="text-3xl font-bold text-white">Packages</h2>
              </div>
              <button
                type="button"
                onClick={() => setCreateOpen(true)}
                className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg font-medium transition-colors"
              >
                <Plus className="w-4 h-4" />
                Create Package
              </button>
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
                    data={packages}
                    emptyMessage="No packages"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Create Package Modal */}
      {createOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50 p-4">
          <div className="bg-[#0054a4] border border-white/20 rounded-2xl shadow-xl w-full max-w-md p-6 relative">
            <button
              type="button"
              onClick={() => setCreateOpen(false)}
              className="absolute top-4 right-4 text-white/80 hover:text-white p-1 rounded"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
            <h4 className="text-lg font-semibold text-white text-center mb-4">Create Package</h4>
            <form onSubmit={handleCreate}>
              <label className="block text-white font-semibold mb-2">Package Name:</label>
              <input
                type="text"
                value={createName}
                onChange={(e) => setCreateName(e.target.value)}
                className={inputClass}
                placeholder="Enter Package Name"
              />
              <div className="flex justify-between gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => setCreateOpen(false)}
                  className="bg-gray-500 hover:bg-gray-600 text-white px-3 py-1.5 rounded-lg font-medium transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1.5 rounded-lg font-medium transition-colors"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Package Modal */}
      {deleteOpen && deletePackage && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50 p-4">
          <div className="bg-[#0054a4] border border-white/20 rounded-2xl shadow-xl w-full max-w-md p-6 relative">
            <button
              type="button"
              onClick={() => setDeleteOpen(false)}
              className="absolute top-4 right-4 text-white/80 hover:text-white p-1 rounded"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
            <h4 className="text-lg font-semibold text-white text-center mb-4">Delete Package</h4>
            <p className="text-white/90 text-center">
              Are you sure you want to remove this{' '}
              <span className="font-semibold text-red-400">{deletePackage.name}</span>?
            </p>
            <form onSubmit={handleDelete}>
              <div className="flex justify-between gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => setDeleteOpen(false)}
                  className="bg-gray-500 hover:bg-gray-600 text-white px-3 py-1.5 rounded-lg font-medium transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 rounded-lg font-medium transition-colors"
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
