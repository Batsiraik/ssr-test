'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Menu,
  Bell,
  ClipboardList,
  Calendar,
  FileText,
  FileCheck,
  Camera,
  PenLine,
  Trash2,
  UserPlus,
  Eye,
} from 'lucide-react';
import Sidebar from '@/components/Sidebar';
import Table, { TableColumn } from '@/components/Table';

interface User {
  id: string;
  fullName: string;
  phone: string;
  city: string;
  isActive: boolean;
}

interface BoloRow {
  boloId: string;
  rentalAgreementId: string;
  streetAddress: string;
  siteName: string;
  customerName: string;
  personFirst: string;
  personLast: string;
  phone: string;
  boloDeliveryDate: string;
  assignedTo: string | null;
  seen: boolean;
  delivered: boolean;
  pdfFileName: string;
  unsignedFile: string;
  _actions?: string;
}

export default function BOLOsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const getToday = () => new Date().toISOString().split('T')[0];

  const [user] = useState<User>({
    id: '1',
    fullName: 'Guest User',
    phone: '',
    city: '',
    isActive: true,
  });

  const bolosData: BoloRow[] = [
    {
      boloId: 'bolo-001',
      rentalAgreementId: 'rg-001',
      streetAddress: '2370 MUCKLEPLUM WAY',
      siteName: 'THE ORCHARDS',
      customerName: 'Brookfield Residential (Alberta) LP',
      personFirst: 'Jake',
      personLast: 'Poles',
      phone: '780-699-0316',
      boloDeliveryDate: getToday(),
      assignedTo: 'John D.',
      seen: true,
      delivered: false,
      pdfFileName: '#',
      unsignedFile: '#',
      _actions: '',
    },
    {
      boloId: 'bolo-002',
      rentalAgreementId: 'rg-002',
      streetAddress: '2616 158 STREET',
      siteName: 'GLENRIDDING',
      customerName: 'Anthem Properties',
      personFirst: 'Travis',
      personLast: 'King',
      phone: '587-930-0848',
      boloDeliveryDate: '2025-02-20',
      assignedTo: null,
      seen: false,
      delivered: true,
      pdfFileName: '#',
      unsignedFile: '#',
      _actions: '',
    },
  ];

  const columns: TableColumn<BoloRow>[] = [
    {
      key: 'streetAddress',
      title: 'Address',
      render: (_, row) => (
        <a
          href="#"
          className="block py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-center text-sm font-medium"
        >
          {row.streetAddress}
        </a>
      ),
    },
    { key: 'siteName', title: 'Location' },
    {
      key: 'customerName',
      title: 'Company/Person',
      render: (_, row) => (
        <div className="text-sm">
          <span className="block text-white/90">{row.customerName}</span>
          <span className="block text-white/80">
            {row.personFirst} {row.personLast}
          </span>
          <a href={`tel:${row.phone}`} className="text-blue-300 hover:text-blue-200">
            {row.phone}
          </a>
        </div>
      ),
    },
    {
      key: 'boloDeliveryDate',
      title: 'Scheduled Delivery Date',
      render: (v, row) => {
        const isToday = v === getToday();
        return (
          <span className={isToday ? 'text-red-400 font-bold' : ''}>
            {v || '—'}
          </span>
        );
      },
    },
    {
      key: 'assignedTo',
      title: 'Assigned',
      render: (v, row) => (
        <div
          className={`inline-flex items-center gap-2 px-2 py-1 rounded ${
            row.seen ? 'bg-green-500/30' : 'bg-red-500/30'
          }`}
        >
          <span>{v || 'Not Assigned'}</span>
          <button
            type="button"
            className="p-1 rounded hover:bg-white/20 transition-colors"
            title={v ? 'Reassign' : 'Assign'}
          >
            <UserPlus className="w-3.5 h-3.5" />
          </button>
        </div>
      ),
    },
    {
      key: '_actions',
      title: 'Action',
      render: (_, row) => (
        <div className="flex flex-wrap gap-1.5">
          <button
            type="button"
            className="p-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors"
            title="View All"
          >
            <Eye className="w-4 h-4" />
          </button>
          <button
            type="button"
            className="p-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors"
            title="Change date for delivery"
          >
            <Calendar className="w-4 h-4" />
          </button>
          <button
            type="button"
            className="p-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors"
            title="Add Note"
          >
            <FileText className="w-4 h-4" />
          </button>
          <a
            href={row.pdfFileName}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors inline-flex"
            title="View Rental Agreement PDF"
          >
            <FileCheck className="w-4 h-4" />
          </a>
          <a
            href={row.unsignedFile}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors inline-flex"
            title="View Bolo"
          >
            <ClipboardList className="w-4 h-4" />
          </a>
          <button
            type="button"
            className="p-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors"
            title="Upload picture of asset setup"
          >
            <Camera className="w-4 h-4" />
          </button>
          {!row.delivered && (
            <>
              <button
                type="button"
                className="p-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors"
                title="Advance to Delivered Status"
              >
                <PenLine className="w-4 h-4" />
              </button>
              <button
                type="button"
                className="p-2 bg-red-500/50 hover:bg-red-500/70 rounded-lg transition-colors"
                title="Cancel Delivery"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </>
          )}
        </div>
      ),
    },
  ];

  const getRowClassName = (row: BoloRow) =>
    row.delivered ? 'bg-blue-400/20' : '';

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
                <ClipboardList className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                <h2 className="text-2xl font-semibold text-white">BOLOs</h2>
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
                    data={bolosData}
                    emptyMessage="No BOLOs found"
                    pagination
                    pageSize={50}
                    getRowClassName={getRowClassName}
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
