'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Menu, Bell, Fuel, MessageSquare, Trash2 } from 'lucide-react';
import Sidebar from '@/components/Sidebar';
import Table, { TableColumn } from '@/components/Table';

interface User {
  id: string;
  fullName: string;
  phone: string;
  city: string;
  isActive: boolean;
}

interface FuelAwaitingBillingRow {
  uuid: string;
  rentalAgreementUuid: string;
  streetAddress: string;
  customerName: string;
  siteName: string;
  personFirstName: string;
  personLastName: string;
  fuelTypeName: string;
  fuelOnly: boolean;
  date: string;
  totalL: number;
  fuelPrice: number;
  soldAt: number;
  carbonTotal: number;
  markup: number;
  profit: number;
  deliveryCharge: string;
  totalBill: number;
  notes: string;
}

export default function FuelToBillPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [user] = useState<User>({
    id: '1',
    fullName: 'Guest User',
    phone: '',
    city: '',
    isActive: true,
  });

  const fuelData: FuelAwaitingBillingRow[] = [
    {
      uuid: 'fuel-001',
      rentalAgreementUuid: 'rg-001',
      streetAddress: '2370 MUCKLEPLUM WAY',
      customerName: 'Brookfield Residential (Alberta) LP',
      siteName: 'THE ORCHARDS',
      personFirstName: 'Jake',
      personLastName: 'Poles',
      fuelTypeName: 'Propane',
      fuelOnly: false,
      date: '2025-02-01',
      totalL: 120,
      fuelPrice: 0.85,
      soldAt: 1.15,
      carbonTotal: 12.5,
      markup: 35,
      profit: 36.0,
      deliveryCharge: '$25.00',
      totalBill: 163.0,
      notes: '',
    },
    {
      uuid: 'fuel-002',
      rentalAgreementUuid: 'rg-002',
      streetAddress: '2616 158 STREET',
      customerName: 'Anthem Properties',
      siteName: 'GLENRIDDING',
      personFirstName: 'Travis',
      personLastName: 'King',
      fuelTypeName: 'Propane',
      fuelOnly: true,
      date: '2025-02-05',
      totalL: 80,
      fuelPrice: 0.82,
      soldAt: 1.12,
      carbonTotal: 8.2,
      markup: 37,
      profit: 24.0,
      deliveryCharge: 'N/A',
      totalBill: 113.6,
      notes: 'Rush delivery',
    },
  ];

  const formatDate = (d: string) => {
    const date = new Date(d);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const columns: TableColumn<FuelAwaitingBillingRow>[] = [
    {
      key: 'streetAddress',
      title: 'Rental Agreement',
      render: (_, row) => (
        <a href="#" className="text-blue-300 hover:text-blue-200 hover:underline">
          {row.streetAddress || 'N/A'}
        </a>
      ),
    },
    { key: 'customerName', title: 'Company', render: (v) => v || 'N/A' },
    { key: 'siteName', title: 'Site', render: (v) => v || 'N/A' },
    {
      key: 'personFirstName',
      title: 'Person',
      render: (_, row) =>
        row.personFirstName && row.personLastName
          ? `${row.personFirstName} ${row.personLastName}`
          : 'N/A',
    },
    { key: 'fuelTypeName', title: 'Fuel Type', render: (v) => v || 'N/A' },
    {
      key: 'fuelOnly',
      title: 'Fuel Only',
      render: (v) => (v ? 'Yes' : 'No'),
    },
    {
      key: 'date',
      title: 'Date',
      render: (v) => (v ? formatDate(v) : 'N/A'),
    },
    {
      key: 'totalL',
      title: 'Total Litres',
      render: (v) => (v != null && !Number.isNaN(v) ? `${Number(v).toLocaleString()} L` : '0 L'),
    },
    {
      key: 'fuelPrice',
      title: 'Price Bought',
      render: (v) => `$${v != null && !Number.isNaN(v) ? Number(v).toFixed(2) : '0.00'}`,
    },
    {
      key: 'soldAt',
      title: 'Price Sold',
      render: (v) => `$${v != null && !Number.isNaN(v) ? Number(v).toFixed(2) : '0.00'}`,
    },
    {
      key: 'carbonTotal',
      title: 'Carbon Tax',
      render: (v) => `$${v != null && !Number.isNaN(v) ? Number(v).toFixed(2) : '0.00'}`,
    },
    {
      key: 'markup',
      title: 'Markup',
      render: (v) => `${v != null ? v : 0}%`,
    },
    {
      key: 'profit',
      title: 'Profit',
      render: (v) => `$${v != null && !Number.isNaN(v) ? Number(v).toFixed(2) : '0.00'}`,
    },
    {
      key: 'deliveryCharge',
      title: 'Delivery Charge',
      render: (v) => v || 'N/A',
    },
    {
      key: 'totalBill',
      title: 'Bill For',
      render: (v) => `$${v != null && !Number.isNaN(v) ? Number(v).toFixed(2) : '0.00'}`,
    },
    {
      key: 'notes',
      title: 'Notes',
      render: (v) => v || '—',
    },
    {
      key: 'uuid',
      title: 'Actions',
      render: (_, row) => (
        <div className="flex gap-2">
          <button
            type="button"
            className="px-3 py-1.5 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-sm font-medium inline-flex items-center gap-1.5 transition-colors"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            Add Note
          </button>
          <button
            type="button"
            className="px-3 py-1.5 bg-red-500 hover:bg-red-600 text-white rounded-lg text-sm font-medium inline-flex items-center gap-1.5 transition-colors"
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
              className="mb-6"
            >
              <div className="flex items-center gap-3 mb-6">
                <Fuel className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                <h2 className="text-xl sm:text-2xl font-semibold text-white">
                  Fuel Awaiting Billing [{fuelData.length}]
                </h2>
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
                    data={fuelData}
                    emptyMessage="No fuel awaiting billing"
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
