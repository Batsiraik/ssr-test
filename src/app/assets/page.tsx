'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Menu,
  Bell,
  Package,
  Plus,
  Eye,
  MessageSquare,
  Trash2,
  FileText,
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

interface AssetNote {
  id: string;
  title: string;
  enteredOn: string;
}

interface AssetRow {
  id: number;
  uuid: string;
  rentalAG: string;
  companyId: string;
  typeName: string;
  makeName: string;
  modelName: string;
  statusName: string;
  genSerialNumber: string;
  heaterSerialNumber: string;
  costNew: string;
  dateAquired: string;
  dateNew: string;
  customerName: string;
  siteName: string;
  notes: AssetNote[];
  _actions?: string;
}

const assetTypes = [
  { id: '1', type: 'Heater' },
  { id: '2', type: 'Tank' },
  { id: '3', type: 'Generator' },
];

export default function AssetsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedType, setSelectedType] = useState<string>('-1');
  const [assets] = useState<AssetRow[]>([
    {
      id: 1,
      uuid: 'ast-001',
      rentalAG: 'RA-1001',
      companyId: '101',
      typeName: 'Heater',
      makeName: 'Generac',
      modelName: 'Heater Pro 20',
      statusName: 'Rented',
      genSerialNumber: '',
      heaterSerialNumber: 'HT-1001',
      costNew: '450.00',
      dateAquired: '2024-06-15',
      dateNew: '2024-06-15',
      customerName: 'Brookfield Residential (Alberta) LP',
      siteName: 'THE ORCHARDS',
      notes: [
        { id: 'n1', title: 'Annual service', enteredOn: '2025-01-10 09:00' },
      ],
      _actions: '',
    },
    {
      id: 2,
      uuid: 'ast-002',
      rentalAG: '—',
      companyId: '102',
      typeName: 'Generator',
      makeName: 'Honda',
      modelName: 'EU7000',
      statusName: 'Available',
      genSerialNumber: 'GEN-2001',
      heaterSerialNumber: '',
      costNew: '1200.00',
      dateAquired: '2024-03-01',
      dateNew: '2024-03-01',
      customerName: '—',
      siteName: '—',
      notes: [],
      _actions: '',
    },
  ]);

  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteRow, setDeleteRow] = useState<AssetRow | null>(null);
  const [addNoteOpen, setAddNoteOpen] = useState(false);
  const [addNoteRow, setAddNoteRow] = useState<AssetRow | null>(null);
  const [expandedNotesId, setExpandedNotesId] = useState<number | null>(null);

  const [user] = useState<User>({
    id: '1',
    fullName: 'Guest User',
    phone: '',
    city: '',
    isActive: true,
  });

  const columns: TableColumn<AssetRow>[] = [
    { key: 'id', title: 'ID', render: (v) => <span className="text-white/80">{v}</span> },
    { key: 'rentalAG', title: 'Rental Agreement', render: (v) => v || '—' },
    { key: 'companyId', title: 'Company ID', render: (v) => v || '—' },
    { key: 'typeName', title: 'Type', render: (v) => v || '—' },
    { key: 'makeName', title: 'Make', render: (v) => v || '—' },
    { key: 'modelName', title: 'Model', render: (v) => v || '—' },
    { key: 'statusName', title: 'Status', render: (v) => v || '—' },
    { key: 'genSerialNumber', title: 'Gen Serial #', render: (v) => v || '—' },
    { key: 'heaterSerialNumber', title: 'Heater Serial #', render: (v) => v || '—' },
    {
      key: 'costNew',
      title: 'Cost New',
      render: (v) => (v ? `$${v}` : '—'),
    },
    { key: 'dateAquired', title: 'Date Acquired', render: (v) => v || '—' },
    { key: 'dateNew', title: 'Date New', render: (v) => v || '—' },
    {
      key: 'customerName',
      title: 'Customer / Site',
      render: (_, row) => (
        <div className="text-white/90">
          <span>{row.customerName || '—'}</span>
          {row.siteName && <><br /><span className="text-white/80">{row.siteName}</span></>}
        </div>
      ),
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
                  View Notes
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
              '—'
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
            className="inline-flex items-center gap-1 px-2 py-1.5 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-sm font-medium transition-colors"
          >
            <Eye className="w-3.5 h-3.5" />
            View
          </Link>
          <button
            type="button"
            onClick={() => {
              setAddNoteRow(row);
              setAddNoteOpen(true);
            }}
            className="inline-flex items-center gap-1 px-2 py-1.5 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg text-sm font-medium transition-colors"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            Add Note
          </button>
          <button
            type="button"
            onClick={() => {
              setDeleteRow(row);
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

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    setSelectedType(val);
    if (val !== '-1') {
      // In a real app: router.push(`/assets/${val}`) or refetch
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
                <h2 className="text-3xl font-bold text-white">Assets</h2>
              </div>
            </motion.div>

            <div className="flex flex-wrap justify-between items-center gap-4 mb-6">
              <div>
                <label htmlFor="assetsSortCB" className="text-white font-semibold block mb-1">
                  Sort by:
                </label>
                <select
                  id="assetsSortCB"
                  name="assetsSortCB"
                  value={selectedType}
                  onChange={handleSortChange}
                  className={selectClass}
                >
                  <option value="-1">-- Select Type of Asset --</option>
                  {assetTypes.map((t) => (
                    <option key={t.id} value={t.id}>{t.type}</option>
                  ))}
                </select>
              </div>
              <Link
                href="/assets/create"
                className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg font-medium transition-colors"
              >
                <Plus className="w-4 h-4" />
                Add Asset
              </Link>
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
                    data={assets}
                    emptyMessage="No assets"
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
            <h4 className="text-xl font-semibold text-white">
              Delete {deleteRow.companyId} {deleteRow.typeName}?
            </h4>
            <p className="text-white/90 mt-2">Are you sure you want to delete this asset?</p>
            <div className="mt-4 flex gap-2">
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

      {/* Add Note Modal */}
      {addNoteOpen && addNoteRow && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50 p-4">
          <div className="bg-[#0054a4] border border-white/20 rounded-2xl shadow-xl w-full max-w-md p-6">
            <h4 className="text-xl font-semibold text-white mb-4">
              Add Note for {addNoteRow.makeName} {addNoteRow.modelName}
            </h4>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setAddNoteOpen(false);
                setAddNoteRow(null);
              }}
              className="space-y-3"
            >
              <input
                type="text"
                placeholder="Title"
                className="w-full p-2.5 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-primary-400"
              />
              <textarea
                placeholder="Details"
                rows={4}
                className="w-full p-2.5 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-primary-400 resize-y"
              />
              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setAddNoteOpen(false)}
                  className="bg-gray-500 hover:bg-gray-600 text-white px-3 py-1.5 rounded-xl font-medium transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1.5 rounded-xl font-medium transition-colors"
                >
                  Add Note
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
