'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Menu, Bell, Package, Search, RefreshCw } from 'lucide-react';
import Sidebar from '@/components/Sidebar';
import Table, { TableColumn } from '@/components/Table';

interface User {
  id: string;
  fullName: string;
  phone: string;
  city: string;
  isActive: boolean;
}

interface SubbedAssetRow {
  uuid: string;
  rentalAGid: string;
  streetAddress: string;
  customerName: string;
  makeName: string;
  modelName: string;
  companyId: string;
  delivered: string;
  genSerialNumber: string;
  heaterSerialNumber: string;
  _actions?: string;
}

export default function SubRentedPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [assets, setAssets] = useState<SubbedAssetRow[]>([
    {
      uuid: 'sub-001',
      rentalAGid: 'ra-001',
      streetAddress: '2370 MUCKLEPLUM WAY',
      customerName: 'Brookfield Residential (Alberta) LP',
      makeName: 'Generac',
      modelName: 'Heater Pro 20',
      companyId: '101',
      delivered: '2025-01-10',
      genSerialNumber: '',
      heaterSerialNumber: 'HT-1001',
      _actions: '',
    },
    {
      uuid: 'sub-002',
      rentalAGid: 'ra-002',
      streetAddress: '2616 158 STREET',
      customerName: 'Anthem Properties',
      makeName: 'Honda',
      modelName: 'EU7000',
      companyId: '102',
      delivered: '2025-02-01',
      genSerialNumber: 'GEN-2001',
      heaterSerialNumber: '',
      _actions: '',
    },
  ]);

  const [swapOpen, setSwapOpen] = useState(false);
  const [swapAssetUuid, setSwapAssetUuid] = useState('');

  const [user] = useState<User>({
    id: '1',
    fullName: 'Guest User',
    phone: '',
    city: '',
    isActive: true,
  });

  const columns: TableColumn<SubbedAssetRow>[] = [
    { key: 'uuid', title: '', render: (v) => <span className="text-white/70 text-sm">{v}</span> },
    {
      key: 'streetAddress',
      title: 'Address',
      render: (_, row) => (
        <a
          href="#"
          className="block py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-center text-sm font-medium transition-colors"
        >
          {row.streetAddress || '—'}
        </a>
      ),
    },
    { key: 'customerName', title: 'Company', render: (v) => v || '—' },
    { key: '_type', title: 'Type of Asset', render: () => '—' },
    { key: 'makeName', title: 'Make', render: (v) => v || '—' },
    { key: 'modelName', title: 'Model', render: (v) => v || '—' },
    { key: 'companyId', title: 'Identifier', render: (v) => v || '—' },
    { key: 'delivered', title: 'Delivered', render: (v) => v || '—' },
    { key: 'genSerialNumber', title: 'Generator Serial #', render: (v) => v || '—' },
    { key: 'heaterSerialNumber', title: 'Heater Serial #', render: (v) => v || '—' },
    {
      key: '_actions',
      title: 'Actions',
      render: (_, row) => (
        <div className="flex flex-wrap gap-2">
          <a
            href="#"
            className="inline-flex items-center justify-center w-9 h-9 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
            title="View agreement"
          >
            <Search className="w-4 h-4" />
          </a>
          <button
            type="button"
            onClick={() => {
              setSwapAssetUuid(row.uuid);
              setSwapOpen(true);
            }}
            className="inline-flex items-center justify-center w-9 h-9 bg-gray-500 hover:bg-gray-600 text-white rounded-lg transition-colors"
            title="Create swap"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      ),
    },
  ];

  const handleSubAsset = (e: React.FormEvent) => {
    e.preventDefault();
    setSwapOpen(false);
    setSwapAssetUuid('');
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
                <Package className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                <h2 className="text-2xl font-semibold text-white">
                  Subbed Assets [{assets.length}]
                </h2>
              </div>
              <div id="validation" className="text-red-400 text-sm min-h-[1.25rem]" />
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
                    data={assets}
                    emptyMessage="No subbed assets"
                    pagination
                    pageSize={25}
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Create Swap Modal */}
      {swapOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50 p-4">
          <div className="bg-[#0054a4] border border-white/20 rounded-2xl shadow-xl w-full max-w-md p-6 relative">
            <button
              type="button"
              onClick={() => {
                setSwapOpen(false);
                setSwapAssetUuid('');
              }}
              className="absolute top-4 right-4 text-white/80 hover:text-white text-2xl leading-none"
              aria-label="Close"
            >
              &times;
            </button>
            <h4 className="text-xl font-semibold text-white mb-4 text-center">
              Create Swap for Subbed
            </h4>
            <div id="subModalBody" className="mt-2 text-white/80 text-sm min-h-[2rem]" />
            <p className="mt-4 text-white/90 text-sm">Are you sure you want to do this?</p>
            <form onSubmit={handleSubAsset}>
              <div className="mt-4 flex justify-between gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setSwapOpen(false);
                    setSwapAssetUuid('');
                  }}
                  className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-xl font-medium transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-xl font-medium transition-colors"
                >
                  Sub Asset
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
