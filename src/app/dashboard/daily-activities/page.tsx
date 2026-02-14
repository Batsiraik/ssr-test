'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Menu, Bell, Calendar, Search, RefreshCw, Eye, ArrowRight, Check, X } from 'lucide-react';
import Sidebar from '@/components/Sidebar';
import Table, { TableColumn } from '@/components/Table';

interface User {
  id: string;
  fullName: string;
  phone: string;
  city: string;
  isActive: boolean;
}

// Daily Activities table data type
interface DailyActivityData {
  assignedTo: string;
  status: 'completed' | 'pending';
  dateCreated: string;
  task: string;
  customer: string;
  customerPhone: string;
  address: string;
  neighborhood: string;
}

export default function DailyActivitiesPage() {
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  // Get today's date in YYYY-MM-DD format
  const getTodayDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  const [selectedDate, setSelectedDate] = useState(getTodayDate());
  const [searchQuery, setSearchQuery] = useState('');

  // Mock user data (will be replaced with actual auth later)
  const [user] = useState<User>({
    id: '1',
    fullName: 'Guest User',
    phone: '',
    city: '',
    isActive: true
  });

  // Daily Activities table data
  const activitiesData: DailyActivityData[] = [
    {
      assignedTo: 'Raine',
      status: 'pending',
      dateCreated: '2025-12-15',
      task: 'Delivery',
      customer: 'Brookfield Residential (Alberta) LP',
      customerPhone: 'Jake Poles 7806990316',
      address: '2370 MUCKLEPLUM WAY HEAT',
      neighborhood: 'THE ORCHARDS',
    },
    {
      assignedTo: 'Raine',
      status: 'pending',
      dateCreated: '2025-12-15',
      task: 'Delivery',
      customer: 'Anthem Properties',
      customerPhone: 'Travis King 587-930-0848',
      address: '2616 158 STREET',
      neighborhood: 'GLENRIDDING',
    },
    {
      assignedTo: 'Musa',
      status: 'completed',
      dateCreated: '2025-12-15',
      task: 'Delivery',
      customer: 'Kanvi Homes',
      customerPhone: 'Phil Pare 7807006077',
      address: '6892 KNOX LOOP',
      neighborhood: '',
    },
    {
      assignedTo: 'Urijah',
      status: 'pending',
      dateCreated: '2025-12-15',
      task: 'Return',
      customer: 'Anthem Properties',
      customerPhone: 'Travis King 587-930-0848',
      address: '15831 27 AVENUE',
      neighborhood: 'GLENRIDDING',
    },
    {
      assignedTo: 'Musa',
      status: 'completed',
      dateCreated: '2025-12-15',
      task: 'Return',
      customer: "Matthew's Woolner",
      customerPhone: 'Matthew Woolner (780) 951-6341',
      address: '93 53319 RR 14',
      neighborhood: 'SPRUCE GROVE ACERAGE',
    },
  ];

  // Daily Activities table columns
  const activitiesColumns: TableColumn<DailyActivityData>[] = [
    {
      key: 'assignedTo',
      title: 'Assigned To',
      render: (value, row) => (
        <div className="flex items-center space-x-2">
          <div className="flex flex-col items-start space-y-1">
            <div className="flex items-center space-x-2">
              <div className={`
                w-5 h-5 rounded-full flex items-center justify-center
                ${row.status === 'completed' ? 'bg-green-500' : 'bg-red-500'}
              `}>
                {row.status === 'completed' ? (
                  <Check className="w-3 h-3 text-white" />
                ) : (
                  <X className="w-3 h-3 text-white" />
                )}
              </div>
              <span className="text-white/90 font-medium">{value}</span>
            </div>
            <button className="p-1 bg-primary-500 hover:bg-primary-600 rounded transition-colors">
              <RefreshCw className="w-3 h-3 text-white" />
            </button>
          </div>
        </div>
      ),
    },
    {
      key: 'dateCreated',
      title: 'Date Created',
    },
    {
      key: 'task',
      title: 'Task',
      render: (value) => (
        <button className="px-3 py-1.5 bg-primary-500 hover:bg-primary-600 rounded-lg text-white text-sm font-medium flex items-center space-x-1 transition-colors">
          <Eye className="w-3.5 h-3.5" />
          <span>{value}</span>
        </button>
      ),
    },
    {
      key: 'customer',
      title: 'Customer',
      render: (value, row) => (
        <div className="flex flex-col">
          <span className="text-white/90">{value}</span>
          <span className="text-white/60 text-xs">{row.customerPhone}</span>
        </div>
      ),
    },
    {
      key: 'address',
      title: 'Address',
    },
    {
      key: 'neighborhood',
      title: 'Neighborhood',
      render: (value) => value || '—',
    },
    {
      key: 'action',
      title: 'Action',
      render: () => (
        <button className="p-2 bg-green-500 hover:bg-green-600 rounded transition-colors">
          <ArrowRight className="w-4 h-4 text-white" />
        </button>
      ),
    },
  ];

  // Open sidebar by default on desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setSidebarOpen(true);
      } else {
        setSidebarOpen(false);
      }
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="h-screen bg-[#0054a4] flex overflow-hidden">
      {/* Sidebar */}
      <Sidebar 
        isOpen={sidebarOpen} 
        onToggle={() => setSidebarOpen(!sidebarOpen)}
        user={{
          fullName: user.fullName,
          email: user.phone ? `+263${user.phone}` : undefined
        }}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Header */}
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
              <div className="flex items-center space-x-2 sm:space-x-4">
                <button className="p-2 rounded-lg hover:bg-white/10 transition-colors">
                  <Bell className="w-5 h-5 text-white" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Page Content */}
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
                  <Calendar className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white">
                    Daily Activities
                  </h2>
                </div>
                
                {/* Date Picker and Search */}
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                  <div className="relative">
                    <input
                      type="date"
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      className="px-4 py-2.5 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent text-sm sm:text-base"
                    />
                  </div>
                  <div className="relative flex-1 sm:flex-initial sm:min-w-[250px]">
                    <input
                      type="text"
                      placeholder="Search..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full px-4 py-2.5 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent text-sm sm:text-base pr-12"
                    />
                    <button className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 bg-primary-500 hover:bg-primary-600 rounded-lg transition-colors">
                      <Search className="w-4 h-4 text-white" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Activities Table */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 sm:p-8 shadow-xl border border-white/20">
                <div className="overflow-x-auto">
                  <Table
                    columns={activitiesColumns}
                    data={activitiesData}
                    emptyMessage="No activities found"
                    pagination={true}
                    pageSize={50}
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

