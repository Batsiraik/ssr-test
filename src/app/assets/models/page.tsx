'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Menu, Bell, Layers, Plus, Search, MessageSquare, Trash2 } from 'lucide-react';
import Link from 'next/link';
import Sidebar from '@/components/Sidebar';
import Table, { TableColumn } from '@/components/Table';

interface User {
  id: string;
  fullName: string;
  phone: string;
  city: string;
  isActive: boolean;
}

interface ModelRow {
  id: number;
  makeName: string;
  modelType: string;
  name: string;
  price10hrDay: number;
  price10hrWeek: number;
  price10hrMonth: number;
  price24hrDay: number;
  price24hrWeek: number;
  price24hrMonth: number;
  notes: string;
  _actions?: string;
}

export default function ModelsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [models, setModels] = useState<ModelRow[]>([
    {
      id: 1,
      makeName: 'Generac',
      modelType: 'Heater',
      name: 'Heater Pro 20',
      price10hrDay: 45,
      price10hrWeek: 120,
      price10hrMonth: 350,
      price24hrDay: 65,
      price24hrWeek: 180,
      price24hrMonth: 500,
      notes: '',
      _actions: '',
    },
    {
      id: 2,
      makeName: 'Honda',
      modelType: 'Generator',
      name: 'EU7000',
      price10hrDay: 85,
      price10hrWeek: 220,
      price10hrMonth: 650,
      price24hrDay: 120,
      price24hrWeek: 320,
      price24hrMonth: 950,
      notes: 'Popular model',
      _actions: '',
    },
    {
      id: 3,
      makeName: 'Duromax',
      modelType: 'Heater',
      name: 'Portable 15K',
      price10hrDay: 35,
      price10hrWeek: 95,
      price10hrMonth: 280,
      price24hrDay: 50,
      price24hrWeek: 140,
      price24hrMonth: 400,
      notes: '',
      _actions: '',
    },
  ]);

  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteRow, setDeleteRow] = useState<ModelRow | null>(null);

  const [user] = useState<User>({
    id: '1',
    fullName: 'Guest User',
    phone: '',
    city: '',
    isActive: true,
  });

  const formatPrice = (n: number) => `$${Number(n).toFixed(2)}`;

  const columns: TableColumn<ModelRow>[] = [
    { key: 'id', title: 'ID', render: (v) => <span className="text-white/80">{v}</span> },
    { key: 'makeName', title: 'Make', render: (v) => v || '—' },
    { key: 'modelType', title: 'Type', render: (v) => v || '—' },
    { key: 'name', title: 'Model', render: (v) => v || '—' },
    {
      key: 'price10hrDay',
      title: '10hr Price (Day/Week/Month)',
      render: (_, row) => (
        <span className="text-white/90 text-sm">
          <b>{formatPrice(row.price10hrDay)}</b> / <b>{formatPrice(row.price10hrWeek)}</b> /{' '}
          <b>{formatPrice(row.price10hrMonth)}</b>
        </span>
      ),
    },
    {
      key: 'price24hrDay',
      title: '24hr Price (Day/Week/Month)',
      render: (_, row) => (
        <span className="text-white/90 text-sm">
          <b>{formatPrice(row.price24hrDay)}</b> / <b>{formatPrice(row.price24hrWeek)}</b> /{' '}
          <b>{formatPrice(row.price24hrMonth)}</b>
        </span>
      ),
    },
    { key: 'notes', title: 'Notes', render: (v) => v || 'No Notes' },
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
                <Layers className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                <h2 className="text-3xl font-bold text-white">Models</h2>
              </div>
              <Link
                href="/assets/models/create"
                className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg font-medium transition-colors"
              >
                <Plus className="w-4 h-4" />
                Add Model
              </Link>
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
                    data={models}
                    emptyMessage="No models"
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
            <p className="text-white/90 mt-2 text-center">
              Are you sure you want to delete this model?
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
                  setModels((prev) => prev.filter((m) => m.id !== deleteRow.id));
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
