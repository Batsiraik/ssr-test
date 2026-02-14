'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Menu, Bell, Package, Search, Eye, RefreshCw } from 'lucide-react';
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
  typeOfAsset: string;
  makeName: string;
  modelName: string;
  companyId: string;
  delivered: string;
  genSerialNumber: string;
  heaterSerialNumber: string;
  _hide?: string; // for empty first column
}

export default function SubbedAssetsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const [user] = useState<User>({
    id: '1',
    fullName: 'Guest User',
    phone: '',
    city: '',
    isActive: true,
  });

  // Mock: Subbed Assets
  const subbedAssetsData: SubbedAssetRow[] = [
    {
      uuid: 'ast-001',
      rentalAGid: 'rg-001',
      streetAddress: '2370 MUCKLEPLUM WAY',
      customerName: 'Brookfield Residential (Alberta) LP',
      typeOfAsset: '',
      makeName: 'Generac',
      modelName: 'Heater Pro 20',
      companyId: 'BH-101',
      delivered: '2025-01-15',
      genSerialNumber: 'GEN-8821',
      heaterSerialNumber: 'HTR-4402',
      _hide: '',
    },
    {
      uuid: 'ast-002',
      rentalAGid: 'rg-002',
      streetAddress: '2616 158 STREET',
      customerName: 'Anthem Properties',
      typeOfAsset: '',
      makeName: 'Duromax',
      modelName: 'Tank 100lb',
      companyId: 'AP-201',
      delivered: '2025-01-22',
      genSerialNumber: '',
      heaterSerialNumber: 'HTR-5513',
      _hide: '',
    },
    {
      uuid: 'ast-003',
      rentalAGid: 'rg-003',
      streetAddress: '6892 KNOX LOOP',
      customerName: 'Kanvi Homes',
      typeOfAsset: '',
      makeName: 'Generac',
      modelName: '80GAL Propane Tank',
      companyId: 'KH-301',
      delivered: '2025-02-01',
      genSerialNumber: 'GEN-9922',
      heaterSerialNumber: '',
      _hide: '',
    },
  ];

  const columns: TableColumn<SubbedAssetRow>[] = [
    {
      key: '_hide',
      title: '',
      render: () => '',
      headerClassName: 'w-0 max-w-0 overflow-hidden opacity-0',
    },
    {
      key: 'streetAddress',
      title: 'Address',
      render: (_, row) => (
        <a
          href="#"
          className="block py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-center text-sm"
        >
          {row.streetAddress}
        </a>
      ),
    },
    { key: 'customerName', title: 'Company' },
    { key: 'typeOfAsset', title: 'Type of Asset', render: (v) => v || '—' },
    { key: 'makeName', title: 'Make' },
    { key: 'modelName', title: 'Model' },
    { key: 'companyId', title: 'Identifier' },
    { key: 'delivered', title: 'Delivered' },
    {
      key: 'genSerialNumber',
      title: 'Generator Serial #',
      render: (v) => v || '—',
    },
    {
      key: 'heaterSerialNumber',
      title: 'Heater Serial #',
      render: (v) => v || '—',
    },
    {
      key: 'uuid',
      title: 'Actions',
      render: (_, row) => (
        <div className="flex gap-2">
          <a
            href="#"
            className="px-3 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg inline-flex items-center transition-colors"
            title="View"
          >
            <Eye className="w-4 h-4" />
          </a>
          <button
            type="button"
            className="px-3 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg inline-flex items-center transition-colors"
            title="Create Swap"
          >
            <RefreshCw className="w-4 h-4" />
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
              className="mb-6 sm:mb-8"
            >
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                <div className="flex items-center space-x-3">
                  <Package className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white">
                    Subbed Assets [{subbedAssetsData.length}]
                  </h2>
                </div>
                <div className="relative flex-1 sm:flex-initial sm:min-w-[250px]">
                  <input
                    type="text"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-4 py-2.5 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-primary-400 text-sm sm:text-base pr-12"
                  />
                  <button className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-primary-500 hover:bg-primary-600 rounded-lg transition-colors">
                    <Search className="w-4 h-4 text-white" />
                  </button>
                </div>
              </div>
              {/* Validation errors placeholder (empty for UI-only) */}
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
                    data={subbedAssetsData}
                    emptyMessage="No subbed assets found"
                    pagination
                    pageSize={25}
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
