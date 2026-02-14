'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Menu, Bell, Type, Plus, Search, MessageSquare, Trash2, FileText } from 'lucide-react';
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

interface AssetTypeNote {
  id: string;
  title: string;
  enteredOn: string;
}

interface AssetTypeRow {
  id: number;
  type: string;
  hour24: number;
  hour10: number;
  deliveryCharge: number;
  flatRate: number;
  inspect: boolean;
  notes: AssetTypeNote[];
  _actions?: string;
}

export default function AssetTypesPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [types, setTypes] = useState<AssetTypeRow[]>([
    {
      id: 1,
      type: 'Heater',
      hour24: 65,
      hour10: 45,
      deliveryCharge: 25,
      flatRate: 0,
      inspect: true,
      notes: [
        { id: 'n1', title: 'Annual inspection required', enteredOn: '2025-01-10 09:00' },
      ],
      _actions: '',
    },
    {
      id: 2,
      type: 'Generator',
      hour24: 120,
      hour10: 85,
      deliveryCharge: 35,
      flatRate: 0,
      inspect: true,
      notes: [],
      _actions: '',
    },
    {
      id: 3,
      type: 'Tank',
      hour24: 0,
      hour10: 0,
      deliveryCharge: 20,
      flatRate: 35,
      inspect: false,
      notes: [],
      _actions: '',
    },
  ]);

  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteRow, setDeleteRow] = useState<AssetTypeRow | null>(null);
  const [expandedNotesId, setExpandedNotesId] = useState<number | null>(null);

  const [user] = useState<User>({
    id: '1',
    fullName: 'Guest User',
    phone: '',
    city: '',
    isActive: true,
  });

  const formatPrice = (n: number) => `$${Number(n).toFixed(2)}`;

  const columns: TableColumn<AssetTypeRow>[] = [
    { key: 'id', title: 'ID', render: (v) => <span className="text-white/80">{v}</span> },
    { key: 'type', title: 'Type', render: (v) => v || '—' },
    {
      key: 'hour24',
      title: '24-Hour',
      render: (v) => formatPrice(v ?? 0),
    },
    {
      key: 'hour10',
      title: '10-Hour',
      render: (v) => formatPrice(v ?? 0),
    },
    {
      key: 'deliveryCharge',
      title: 'Delivery Charge',
      render: (v) => formatPrice(v ?? 0),
    },
    {
      key: 'flatRate',
      title: 'Flat Rate',
      render: (v) => formatPrice(v ?? 0),
    },
    {
      key: 'inspect',
      title: 'Inspect',
      render: (v) => (v ? 'Yes' : 'No'),
    },
    {
      key: 'notes',
      title: 'Notes',
      render: (_, row) => {
        const hasNotes = row.notes && row.notes.length > 0;
        const isExpanded = expandedNotesId === row.id;
        return (
          <div>
            {hasNotes ? (
              <>
                <button
                  type="button"
                  onClick={() => setExpandedNotesId(isExpanded ? null : row.id)}
                  className="inline-flex items-center gap-1 px-2 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-sm font-medium transition-colors"
                >
                  <FileText className="w-3.5 h-3.5" />
                  Expand Notes
                </button>
                {isExpanded && (
                  <div className="mt-2 p-2 bg-white/10 border border-white/20 rounded-lg space-y-1">
                    {row.notes.map((note) => (
                      <div key={note.id} className="text-white/80 text-sm">
                        <p>{note.title} – {note.enteredOn}</p>
                        <a href="#" className="text-blue-300 hover:underline text-xs">View</a>
                      </div>
                    ))}
                  </div>
                )}
              </>
            ) : (
              'No Notes'
            )}
          </div>
        );
      },
    },
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
                <Type className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                <h2 className="text-3xl font-bold text-white">Asset Types</h2>
              </div>
              <Link
                href="/assets/types/create"
                className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg font-medium transition-colors"
              >
                <Plus className="w-4 h-4" />
                Add Asset Type
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
                    data={types}
                    emptyMessage="No asset types"
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
              Delete {deleteRow.type}?
            </h4>
            <p className="text-white/90 mt-2 text-center">
              Are you sure you want to delete this asset type?
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
                  setTypes((prev) => prev.filter((t) => t.id !== deleteRow.id));
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
