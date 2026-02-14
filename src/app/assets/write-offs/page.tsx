'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Menu, Bell, FileX, Eye, MessageSquare, Trash2 } from 'lucide-react';
import Sidebar from '@/components/Sidebar';
import Table, { TableColumn } from '@/components/Table';

interface User {
  id: string;
  fullName: string;
  phone: string;
  city: string;
  isActive: boolean;
}

interface WriteOffRow {
  id: number;
  uuid: string;
  rgId: string;
  streetAddress: string;
  companyId: string;
  typeName: string;
  makeName: string;
  modelName: string;
  quantity: number;
  genSerialNumber: string;
  heaterSerialNumber: string;
  costNew: string;
  dateAquired: string;
  dateNew: string;
  customerName: string;
  siteName: string;
  assetLink: string;
  _actions?: string;
}

export default function WriteOffsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [writeOffs, setWriteOffs] = useState<WriteOffRow[]>([
    {
      id: 1,
      uuid: 'wo-001',
      rgId: 'ra-001',
      streetAddress: '2370 MUCKLEPLUM WAY',
      companyId: 'SSR-101',
      typeName: 'Heater',
      makeName: 'Generac',
      modelName: 'Heater Pro 20',
      quantity: 1,
      genSerialNumber: '',
      heaterSerialNumber: 'HT-1001',
      costNew: '450.00',
      dateAquired: '2023-06-15',
      dateNew: '2023-06-15',
      customerName: 'Brookfield Residential (Alberta) LP',
      siteName: 'THE ORCHARDS',
      assetLink: '#',
      _actions: '',
    },
    {
      id: 2,
      uuid: 'wo-002',
      rgId: 'ra-002',
      streetAddress: '2616 158 STREET',
      companyId: 'SSR-102',
      typeName: 'Generator',
      makeName: 'Honda',
      modelName: 'EU7000',
      quantity: 1,
      genSerialNumber: 'GEN-2001',
      heaterSerialNumber: '',
      costNew: '1200.00',
      dateAquired: '2022-03-01',
      dateNew: '2022-03-01',
      customerName: 'Anthem Properties',
      siteName: 'GLENRIDDING',
      assetLink: '#',
      _actions: '',
    },
  ]);

  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteRow, setDeleteRow] = useState<WriteOffRow | null>(null);

  const [user] = useState<User>({
    id: '1',
    fullName: 'Guest User',
    phone: '',
    city: '',
    isActive: true,
  });

  const columns: TableColumn<WriteOffRow>[] = [
    { key: 'id', title: 'ID', render: (v) => <span className="text-white/80">{v}</span> },
    {
      key: 'streetAddress',
      title: 'Rental Agreement',
      render: (_, row) => (
        <a
          href="#"
          className="inline-flex items-center gap-1 px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-sm font-medium transition-colors"
        >
          {row.streetAddress || 'N/A'}
        </a>
      ),
    },
    {
      key: 'companyId',
      title: 'Company ID',
      render: (_, row) => (
        <a
          href={row.assetLink || '#'}
          className="inline-flex items-center gap-1 px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-sm font-medium transition-colors"
        >
          {row.companyId || 'N/A'}
        </a>
      ),
    },
    { key: 'typeName', title: 'Type', render: (v) => v || 'N/A' },
    { key: 'makeName', title: 'Make', render: (v) => v || 'N/A' },
    { key: 'modelName', title: 'Model', render: (v) => v || 'N/A' },
    { key: 'quantity', title: 'Quantity', render: (v) => String(v ?? 'N/A') },
    { key: 'genSerialNumber', title: 'Generator Serial #', render: (v) => v || 'N/A' },
    { key: 'heaterSerialNumber', title: 'Heater Serial #', render: (v) => v || 'N/A' },
    {
      key: 'costNew',
      title: 'Cost New',
      render: (v) => (v ? `$${v}` : 'N/A'),
    },
    { key: 'dateAquired', title: 'Date Acquired', render: (v) => v || 'N/A' },
    { key: 'dateNew', title: 'Date New', render: (v) => v || 'N/A' },
    {
      key: 'customerName',
      title: 'Customer / Site',
      render: (_, row) => (
        <div className="text-white/90">
          <span>{row.customerName || 'N/A'}</span>
          {row.siteName && <><br /><span className="text-white/80">{row.siteName}</span></>}
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
            className="inline-flex items-center gap-1 px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-sm font-medium transition-colors"
          >
            <Eye className="w-3.5 h-3.5" />
            View
          </a>
          <button
            type="button"
            className="inline-flex items-center gap-1 px-3 py-1 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg text-sm font-medium transition-colors"
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
            className="inline-flex items-center gap-1 px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded-lg text-sm font-medium transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5" />
            Delete
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
                <FileX className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                <h2 className="text-3xl font-bold text-white">Written Off Assets</h2>
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
                    data={writeOffs}
                    emptyMessage="No written off assets"
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
              Delete {deleteRow.companyId} {deleteRow.typeName} {deleteRow.makeName} {deleteRow.modelName}?
            </h4>
            <p className="text-white/90 mt-2 text-center">
              Are you sure you want to delete this asset?
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
                  setWriteOffs((prev) => prev.filter((r) => r.id !== deleteRow.id));
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
