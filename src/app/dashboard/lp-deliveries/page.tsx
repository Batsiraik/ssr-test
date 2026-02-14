'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Menu, Bell, Package, Search, Plus } from 'lucide-react';
import Sidebar from '@/components/Sidebar';
import Table, { TableColumn } from '@/components/Table';

interface User {
  id: string;
  fullName: string;
  phone: string;
  city: string;
  isActive: boolean;
}

// LP Deliveries row: loop 1 = normal delivery, loop 2 = JUST FUEL
interface LPDeliveryRow {
  id: string;
  rgId: string;
  streetAddress: string;
  // loop 1
  assetDelivered?: string;
  scheduledReturn?: string;
  customerName?: string;
  assetName?: string;
  quantity?: number;
  // loop 2
  isJustFuel?: boolean;
  fuelEndDate?: string;
}

export default function LPDeliveriesPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const getTodayDate = () => new Date().toISOString().split('T')[0];
  const [selectedDate, setSelectedDate] = useState(getTodayDate());
  const [searchQuery, setSearchQuery] = useState('');

  const [user] = useState<User>({
    id: '1',
    fullName: 'Guest User',
    phone: '',
    city: '',
    isActive: true,
  });

  // Mock: LP Deliveries (mix of normal + JUST FUEL rows)
  const lpDeliveriesData: LPDeliveryRow[] = [
    {
      id: '1',
      rgId: 'rg-001',
      streetAddress: '2370 MUCKLEPLUM WAY',
      assetDelivered: '2025-02-01',
      scheduledReturn: '2025-03-15',
      customerName: 'Brookfield Residential (Alberta) LP',
      assetName: '80GAL Propane Tank',
      quantity: 2,
    },
    {
      id: '2',
      rgId: 'rg-002',
      streetAddress: '2616 158 STREET',
      isJustFuel: true,
      fuelEndDate: '2025-04-01',
    },
    {
      id: '3',
      rgId: 'rg-003',
      streetAddress: '6892 KNOX LOOP',
      assetDelivered: '2025-01-28',
      scheduledReturn: '0000-00-00',
      customerName: 'Kanvi Homes',
      assetName: 'Tank 100lb',
      quantity: 1,
    },
    {
      id: '4',
      rgId: 'rg-004',
      streetAddress: '15831 27 AVENUE',
      isJustFuel: true,
      fuelEndDate: '0000-00-00',
    },
  ];

  const columns: TableColumn<LPDeliveryRow>[] = [
    {
      key: 'streetAddress',
      title: 'Rental Agreement',
      render: (_, row) => (
        <a
          href="#"
          className="block py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-center text-sm"
        >
          {row.streetAddress}
        </a>
      ),
    },
    {
      key: 'assetDelivered',
      title: 'Delivered',
      render: (_, row) =>
        row.isJustFuel ? (
          <span className="font-semibold text-white">JUST FUEL</span>
        ) : (
          row.assetDelivered ?? '—'
        ),
    },
    {
      key: 'scheduledReturn',
      title: 'Returning',
      render: (_, row) => {
        if (row.isJustFuel) {
          return row.fuelEndDate && row.fuelEndDate !== '0000-00-00' ? (
            <span className="text-white/90 font-semibold">Fuel to: {row.fuelEndDate}</span>
          ) : (
            '—'
          );
        }
        return row.scheduledReturn && row.scheduledReturn !== '0000-00-00' ? (
          <p className="text-red-400 font-semibold">{row.scheduledReturn}</p>
        ) : (
          '—'
        );
      },
    },
    {
      key: 'customerName',
      title: 'Customer',
      render: (v) => v ?? '—',
    },
    {
      key: 'id',
      title: 'Actions',
      render: () => '',
    },
    {
      key: 'assetName',
      title: 'Assets',
      render: (_, row) =>
        row.isJustFuel ? (
          <span className="font-semibold text-white">JUST FUEL</span>
        ) : row.assetName && row.quantity != null ? (
          `${row.assetName} x ${row.quantity}`
        ) : (
          '—'
        ),
    },
    {
      key: 'rgId',
      title: 'Actions',
      render: (_, row) => (
        <button
          type="button"
          className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg text-sm font-medium flex items-center gap-1.5 transition-colors"
        >
          Add Fuel <Plus className="w-4 h-4" />
        </button>
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
                    LP Deliveries
                  </h2>
                </div>
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="px-4 py-2.5 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-primary-400 text-sm sm:text-base"
                  />
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
                    data={lpDeliveriesData}
                    emptyMessage="No LP deliveries found"
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
