'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Menu, Bell, Package, ChevronUp, ChevronDown } from 'lucide-react';
import Sidebar from '@/components/Sidebar';
import Table, { TableColumn } from '@/components/Table';

interface User {
  id: string;
  fullName: string;
  phone: string;
  city: string;
  isActive: boolean;
}

interface BulkRow {
  uuid: string;
  name: string;
  pricePerMonth: number;
  _order?: number;
  _actions?: string;
}

export default function BulkAssetsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [bulks, setBulks] = useState<BulkRow[]>([
    { uuid: 'b1', name: 'Propane Tanks (40lb)', pricePerMonth: 25.0, _actions: '' },
    { uuid: 'b2', name: 'Propane Tanks (100lb)', pricePerMonth: 35.0, _actions: '' },
    { uuid: 'b3', name: 'Cylinders', pricePerMonth: 15.0, _actions: '' },
  ]);

  const [user] = useState<User>({
    id: '1',
    fullName: 'Guest User',
    phone: '',
    city: '',
    isActive: true,
  });

  const move = (direction: 'up' | 'down', bulkUuid: string) => {
    const idx = bulks.findIndex((b) => b.uuid === bulkUuid);
    if (idx < 0) return;
    if (direction === 'up' && idx === 0) return;
    if (direction === 'down' && idx === bulks.length - 1) return;
    const newBulks = [...bulks];
    const swapIdx = direction === 'up' ? idx - 1 : idx + 1;
    [newBulks[idx], newBulks[swapIdx]] = [newBulks[swapIdx], newBulks[idx]];
    setBulks(newBulks);
  };

  const columns: TableColumn<BulkRow>[] = [
    { key: 'name', title: 'Name', render: (v) => v || '—' },
    {
      key: 'pricePerMonth',
      title: 'Price Per Month',
      render: (v) => (v != null ? `$${Number(v).toFixed(2)}` : '—'),
    },
    {
      key: '_actions',
      title: 'Actions',
      render: (_, row, index) => {
        const canMoveUp = index > 0;
        const canMoveDown = index < bulks.length - 1;
        return (
          <div className="flex flex-col items-center gap-2">
            {canMoveUp && (
              <button
                type="button"
                onClick={() => move('up', row.uuid)}
                className="inline-flex items-center justify-center w-9 h-9 bg-gray-500 hover:bg-gray-600 text-white rounded-lg transition-colors"
                title="Move up"
              >
                <ChevronUp className="w-4 h-4" />
              </button>
            )}
            {canMoveDown && (
              <button
                type="button"
                onClick={() => move('down', row.uuid)}
                className="inline-flex items-center justify-center w-9 h-9 bg-gray-500 hover:bg-gray-600 text-white rounded-lg transition-colors"
                title="Move down"
              >
                <ChevronDown className="w-4 h-4" />
              </button>
            )}
          </div>
        );
      },
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
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-6"
            >
              <div className="flex items-center justify-center gap-3 mb-4">
                <Package className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                <h2 className="text-3xl font-bold text-white">Bulk Assets Order</h2>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-white/20">
                <div className="overflow-x-auto">
                  <Table
                    columns={columns}
                    data={bulks}
                    emptyMessage="No bulk assets"
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
