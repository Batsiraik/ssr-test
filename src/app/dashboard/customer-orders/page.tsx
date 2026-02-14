'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Menu, Bell, ShoppingCart, Search, Eye } from 'lucide-react';
import Sidebar from '@/components/Sidebar';
import Table, { TableColumn } from '@/components/Table';

interface User {
  id: string;
  fullName: string;
  phone: string;
  city: string;
  isActive: boolean;
}

interface CustomerOrderRow {
  uuid: string;
  companyName: string;
  firstName: string;
  lastName: string;
  deliveryDate: string;
  streetAddress: string;
  _empty?: string;
}

export default function CustomerOrdersPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const [user] = useState<User>({
    id: '1',
    fullName: 'Guest User',
    phone: '',
    city: '',
    isActive: true,
  });

  // Mock: Customer Orders
  const ordersData: CustomerOrderRow[] = [
    {
      uuid: 'ord-001',
      companyName: 'Brookfield Residential (Alberta) LP',
      firstName: 'Jake',
      lastName: 'Poles',
      deliveryDate: '2025-02-20',
      streetAddress: '2370 MUCKLEPLUM WAY',
      _empty: '',
    },
    {
      uuid: 'ord-002',
      companyName: 'Anthem Properties',
      firstName: 'Travis',
      lastName: 'King',
      deliveryDate: '2025-02-22',
      streetAddress: '2616 158 STREET',
      _empty: '',
    },
    {
      uuid: 'ord-003',
      companyName: 'Kanvi Homes',
      firstName: 'Phil',
      lastName: 'Pare',
      deliveryDate: '2025-02-25',
      streetAddress: '6892 KNOX LOOP',
      _empty: '',
    },
  ];

  const columns: TableColumn<CustomerOrderRow>[] = [
    {
      key: 'uuid',
      title: 'Type',
      render: (_, row) => (
        <a
          href="#"
          className="inline-flex py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-center text-sm items-center justify-center gap-2"
        >
          <Eye className="w-4 h-4" />
          Process Order
        </a>
      ),
    },
    { key: 'companyName', title: 'Company' },
    {
      key: 'firstName',
      title: 'Person',
      render: (_, row) => `${row.firstName} ${row.lastName}`,
    },
    { key: 'deliveryDate', title: 'Delivery Date' },
    { key: 'streetAddress', title: 'Address' },
    {
      key: '_empty',
      title: '',
      render: () => '',
      headerClassName: 'w-0 max-w-0 overflow-hidden opacity-0',
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
                  <ShoppingCart className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white">
                    Customer Orders [{ordersData.length}]
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
                    data={ordersData}
                    emptyMessage="No customer orders found"
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
