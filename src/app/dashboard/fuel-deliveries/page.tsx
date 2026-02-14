'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Menu, Bell, Fuel, Search, Pencil, Pause, Play, Wrench } from 'lucide-react';
import Sidebar from '@/components/Sidebar';
import Table, { TableColumn } from '@/components/Table';

interface User {
  id: string;
  fullName: string;
  phone: string;
  city: string;
  isActive: boolean;
}

// Fuel Deliveries (main + paused) row type
interface FuelDeliveryRow {
  id: string;
  rentalAgreement: { streetAddress: string; siteName: string; returnBookedToday?: boolean };
  dateCreated: string;
  lastFuel: string;
  customer: { customerName: string; personName: string; phone: string };
  fuelDeliveries: string[];
  assets: { modelName: string; companyId: string; serviceStr?: string; isOverdue?: boolean }[];
  notes: { description: string; urgency: 1 | 2 | 3 }[];
}

// Fuel Delivered with Equipment row type
interface FuelWithEquipmentRow {
  id: string;
  rentalAgreement: string;
  date: string;
  totalFuelL: number;
}

export default function FuelDeliveriesPage() {
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

  // Mock: Fuel Deliveries (active)
  const fuelDeliveriesData: FuelDeliveryRow[] = [
    {
      id: '1',
      rentalAgreement: { streetAddress: '2370 MUCKLEPLUM WAY', siteName: 'THE ORCHARDS', returnBookedToday: true },
      dateCreated: '2025-01-10',
      lastFuel: '2025-02-01',
      customer: { customerName: 'Brookfield Residential (Alberta) LP', personName: 'Jake Poles', phone: '7806990316' },
      fuelDeliveries: ['[BH-101] 120 L', '** Propane 40 L'],
      assets: [
        { modelName: 'Heater Pro 20', companyId: 'BH-101', serviceStr: 'Next: 2025-03-15', isOverdue: false },
        { modelName: 'Tank 100lb', companyId: 'BH-102', serviceStr: 'Next: 2025-02-10', isOverdue: true },
      ],
      notes: [
        { description: 'Customer requested early delivery', urgency: 1 },
        { description: 'Gate code changed - confirm before delivery', urgency: 2 },
      ],
    },
    {
      id: '2',
      rentalAgreement: { streetAddress: '2616 158 STREET', siteName: 'GLENRIDDING' },
      dateCreated: '2025-01-05',
      lastFuel: '2025-01-28',
      customer: { customerName: 'Anthem Properties', personName: 'Travis King', phone: '587-930-0848' },
      fuelDeliveries: ['[AP-201] 80 L'],
      assets: [{ modelName: 'Heater Pro 20', companyId: 'AP-201', serviceStr: 'Next: 2025-03-01', isOverdue: false }],
      notes: [],
    },
    {
      id: '3',
      rentalAgreement: { streetAddress: '6892 KNOX LOOP', siteName: 'EDMONTON' },
      dateCreated: '2025-01-12',
      lastFuel: '',
      customer: { customerName: 'Kanvi Homes', personName: 'Phil Pare', phone: '7807006077' },
      fuelDeliveries: [],
      assets: [{ modelName: 'Tank 100lb', companyId: 'KH-301' }],
      notes: [{ description: 'Urgent: site access only before 8am', urgency: 3 }],
    },
  ];

  // Mock: Fuel Delivered with Equipment
  const fuelWithEquipmentData: FuelWithEquipmentRow[] = [
    { id: '1', rentalAgreement: '2370 MUCKLEPLUM WAY THE ORCHARDS', date: '2025-02-01', totalFuelL: 160 },
    { id: '2', rentalAgreement: '2616 158 STREET GLENRIDDING', date: '2025-01-28', totalFuelL: 80 },
  ];

  // Mock: Paused Fuel Deliveries (same structure as main)
  const pausedFuelDeliveriesData: FuelDeliveryRow[] = [
    {
      id: 'p1',
      rentalAgreement: { streetAddress: '93 53319 RR 14', siteName: 'SPRUCE GROVE ACREAGE' },
      dateCreated: '2024-12-01',
      lastFuel: '2025-01-15',
      customer: { customerName: "Matthew's Woolner", personName: 'Matthew Woolner', phone: '(780) 951-6341' },
      fuelDeliveries: ['[MW-401] 60 L'],
      assets: [{ modelName: 'Heater Pro 20', companyId: 'MW-401' }],
      notes: [],
    },
  ];

  const totalFuelForDay = 240; // mock total litres

  // Columns for main Fuel Deliveries table
  const fuelDeliveriesColumns: TableColumn<FuelDeliveryRow>[] = [
    {
      key: 'id',
      title: '',
      render: () => (
        <div className="flex flex-col items-center gap-2">
          <button
            type="button"
            className="p-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors"
            title="Add fuel"
          >
            <Fuel className="w-4 h-4" />
          </button>
          <button
            type="button"
            className="p-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
            title="Add note"
          >
            <Pencil className="w-4 h-4" />
          </button>
          <button
            type="button"
            className="p-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg transition-colors"
            title="Pause"
          >
            <Pause className="w-4 h-4" />
          </button>
        </div>
      ),
    },
    {
      key: 'rentalAgreement',
      title: 'Rental Agreement',
      render: (_, row) => (
        <div>
          <a
            href="#"
            className="block py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-center text-sm"
          >
            {row.rentalAgreement.streetAddress}
            <br />
            {row.rentalAgreement.siteName}
          </a>
          {row.rentalAgreement.returnBookedToday && (
            <div className="mt-2 p-2 bg-black text-yellow-400 font-bold text-center rounded-lg text-xs">
              Return booked for today
            </div>
          )}
        </div>
      ),
    },
    {
      key: 'dateCreated',
      title: 'Date Created',
    },
    {
      key: 'lastFuel',
      title: 'Last Fuel',
      render: (v) => v || '—',
    },
    {
      key: 'customer',
      title: 'Customer',
      render: (_, row) => (
        <div className="text-sm">
          <span className="block text-white/90">{row.customer.customerName}</span>
          <span className="block text-white/70">{row.customer.personName}</span>
          <a href={`tel:${row.customer.phone}`} className="text-blue-300 hover:text-blue-200">
            {row.customer.phone}
          </a>
        </div>
      ),
    },
    {
      key: 'fuelDeliveries',
      title: 'Fuel Deliveries',
      render: (_, row) => (
        <div className="text-sm space-y-0.5">
          {row.fuelDeliveries.length > 0
            ? row.fuelDeliveries.map((line, i) => (
                <span key={i} className="block">
                  {line.includes('**') ? (
                    <span>
                      ** <span className="font-medium">{line.replace('** ', '')}</span></span>
                    ) : (
                      <span className="font-medium">{line}</span>
                    )}
                </span>
              ))
            : '—'}
        </div>
      ),
    },
    {
      key: 'assets',
      title: 'Assets',
      render: (_, row) => (
        <div className="text-sm space-y-1">
          {row.assets.map((asset, i) => (
            <div key={i}>
              {asset.serviceStr ? (
                <button
                  type="button"
                  className={`p-2 text-white rounded-lg text-left text-xs ${
                    asset.isOverdue ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'
                  }`}
                >
                  {asset.modelName} [{asset.companyId}] <Wrench className="w-3 h-3 inline ml-0.5" />
                  <br />
                  {asset.serviceStr}
                </button>
              ) : (
                <span className="text-white/90">
                  {asset.modelName} [{asset.companyId}]
                </span>
              )}
            </div>
          ))}
        </div>
      ),
    },
    {
      key: 'notes',
      title: 'Notes',
      render: (_, row) => (
        <div className="text-sm space-y-1">
          {row.notes.length > 0
            ? row.notes.map((note, i) => (
                <span
                  key={i}
                  className={`block p-2 rounded-md ${
                    note.urgency === 3 ? 'bg-red-300/30' : note.urgency === 2 ? 'bg-yellow-200/30' : ''
                  }`}
                >
                  {note.description}
                </span>
              ))
            : '—'}
        </div>
      ),
    },
  ];

  // Columns for Fuel Delivered with Equipment
  const fuelWithEquipmentColumns: TableColumn<FuelWithEquipmentRow>[] = [
    { key: 'rentalAgreement', title: 'Rental Agreement' },
    { key: 'date', title: 'Date' },
    { key: 'id', title: '', render: () => '' },
    { key: 'id', title: '', render: () => '' },
  ];
  // Fix: use unique keys. Use one column for empty and one for total.
  const fuelWithEquipmentColumnsFixed: TableColumn<FuelWithEquipmentRow>[] = [
    {
      key: 'rentalAgreement',
      title: 'Rental Agreement',
      render: (v) => (
        <a
          href="#"
          className="block py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-center text-sm"
        >
          {v}
        </a>
      ),
    },
    { key: 'date', title: 'Date' },
    { key: 'empty1', title: '', render: () => '—' },
    { key: 'empty2', title: '', render: () => '—' },
    {
      key: 'totalFuelL',
      title: 'Total Fuel (L)',
      render: (v) => <span className="font-semibold">{v} L</span>,
    },
    { key: 'empty3', title: '', render: () => '—' },
    { key: 'empty4', title: '', render: () => '—' },
  ];

  // Paused table: same columns but Show button instead of Pause
  const pausedColumns: TableColumn<FuelDeliveryRow>[] = [
    {
      key: 'id',
      title: '',
      render: () => (
        <div className="flex flex-col items-center gap-2">
          <button
            type="button"
            className="p-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors"
            title="Add fuel"
          >
            <Fuel className="w-4 h-4" />
          </button>
          <button
            type="button"
            className="p-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
            title="Add note"
          >
            <Pencil className="w-4 h-4" />
          </button>
          <button
            type="button"
            className="p-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg transition-colors"
            title="Show"
          >
            <Play className="w-4 h-4" />
          </button>
        </div>
      ),
    },
    ...fuelDeliveriesColumns.slice(1),
  ];

  // Add empty keys to FuelWithEquipmentRow for the empty columns
  const fuelWithEquipmentDataWithBlanks = fuelWithEquipmentData.map((r) => ({
    ...r,
    empty1: '',
    empty2: '',
    empty3: '',
    empty4: '',
  }));

  useEffect(() => {
    const handleResize = () => {
      setSidebarOpen(window.innerWidth >= 1024);
    };
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
            {/* Page Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-6 sm:mb-8"
            >
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                <div className="flex items-center space-x-3">
                  <Fuel className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white">
                    Fuel Deliveries [{fuelDeliveriesData.length}]
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

            {/* Table 1: Fuel Deliveries */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mb-8"
            >
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 sm:p-8 shadow-xl border border-white/20">
                <div className="overflow-x-auto">
                  <Table
                    columns={fuelDeliveriesColumns}
                    data={fuelDeliveriesData}
                    emptyMessage="No fuel deliveries found"
                    pagination
                    pageSize={25}
                  />
                </div>
              </div>
            </motion.div>

            {/* Section: Fuel Delivered with Equipment */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="mb-8"
            >
              <h3 className="text-xl sm:text-2xl font-semibold text-white mb-4">
                Fuel Delivered with Equipment
              </h3>
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 sm:p-8 shadow-xl border border-white/20">
                <div className="overflow-x-auto">
                  <Table
                    columns={fuelWithEquipmentColumnsFixed}
                    data={fuelWithEquipmentDataWithBlanks}
                    emptyMessage="No fuel delivered with equipment"
                  />
                </div>
              </div>
            </motion.div>

            {/* Section: Paused Fuel Deliveries */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-8"
            >
              <h3 className="text-xl sm:text-2xl font-semibold text-white mb-4">
                Paused Fuel Deliveries
              </h3>
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 sm:p-8 shadow-xl border border-white/20">
                <div className="overflow-x-auto">
                  <Table
                    columns={pausedColumns}
                    data={pausedFuelDeliveriesData}
                    emptyMessage="No paused fuel deliveries"
                    pagination
                    pageSize={25}
                  />
                </div>
              </div>
            </motion.div>

            {/* Total Fuel for the Day */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
            >
              <p className="text-xl font-semibold text-white">
                Total Fuel For the Day: {totalFuelForDay} litres
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
