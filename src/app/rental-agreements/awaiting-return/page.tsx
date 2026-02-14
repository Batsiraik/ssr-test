'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Menu, Bell, RotateCcw, FileText, Upload, ArrowRight, Trash2 } from 'lucide-react';
import Sidebar from '@/components/Sidebar';
import Table, { TableColumn } from '@/components/Table';

interface User {
  id: string;
  fullName: string;
  phone: string;
  city: string;
  isActive: boolean;
}

interface AwaitingReturnRow {
  id: string;
  companyName: string;
  siteName: string;
  personName: string;
  deliveryDate: string;
  pdfFileName: string;
  _pdf?: string;
  _upload?: string;
  _advance?: string;
  _delete?: string;
}

export default function AwaitingReturnPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [user] = useState<User>({
    id: '1',
    fullName: 'Guest User',
    phone: '',
    city: '',
    isActive: true,
  });

  const awaitingReturnData: AwaitingReturnRow[] = [
    {
      id: 'rg-001',
      companyName: 'Brookfield Residential (Alberta) LP',
      siteName: 'THE ORCHARDS',
      personName: 'Jake Poles',
      deliveryDate: '2025-01-15',
      pdfFileName: '#',
      _pdf: '',
      _upload: '',
      _advance: '',
      _delete: '',
    },
    {
      id: 'rg-002',
      companyName: 'Anthem Properties',
      siteName: 'GLENRIDDING',
      personName: 'Travis King',
      deliveryDate: '2025-02-01',
      pdfFileName: '#',
      _pdf: '',
      _upload: '',
      _advance: '',
      _delete: '',
    },
  ];

  const columns: TableColumn<AwaitingReturnRow>[] = [
    {
      key: 'id',
      title: '',
      render: (v) => <span className="text-white/60 text-sm">{v}</span>,
    },
    { key: 'companyName', title: 'Company' },
    { key: 'siteName', title: 'Site' },
    { key: 'personName', title: 'Person' },
    { key: 'deliveryDate', title: 'Delivery Date' },
    {
      key: '_pdf',
      title: '',
      render: (_, row) => (
        <a
          href={row.pdfFileName}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex p-2 text-white/80 hover:text-white transition-colors"
          title="View Rental Agreement PDF"
        >
          <FileText className="w-5 h-5" />
        </a>
      ),
    },
    {
      key: '_upload',
      title: '',
      render: () => (
        <button
          type="button"
          className="p-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
          title="Upload Signed Rental Agreement PDF"
        >
          <Upload className="w-4 h-4" />
        </button>
      ),
    },
    {
      key: '_advance',
      title: '',
      render: () => (
        <button
          type="button"
          className="p-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
          title="Advance UNSigned Rental Agreement"
        >
          <ArrowRight className="w-4 h-4" />
        </button>
      ),
    },
    {
      key: '_delete',
      title: '',
      render: () => (
        <button
          type="button"
          className="p-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
          title="Delete"
        >
          <Trash2 className="w-4 h-4" />
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
              className="mb-6"
            >
              <div className="flex items-center gap-3 mb-6">
                <RotateCcw className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                <h2 className="text-2xl font-semibold text-white">Awaiting Return Delivery</h2>
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
                    data={awaitingReturnData}
                    emptyMessage="No awaiting return deliveries found"
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
