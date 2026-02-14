'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Menu, Bell, FileText, ExternalLink } from 'lucide-react';
import Sidebar from '@/components/Sidebar';

interface User {
  id: string;
  fullName: string;
  phone: string;
  city: string;
  isActive: boolean;
}

export default function TimesheetSummaryPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const getTodayDate = () => new Date().toISOString().split('T')[0];
  const getMonthStart = () => {
    const d = new Date();
    d.setDate(1);
    return d.toISOString().split('T')[0];
  };
  const [startDate, setStartDate] = useState(getMonthStart());
  const [endDate, setEndDate] = useState(getTodayDate());
  const [pdfLinkVisible, setPdfLinkVisible] = useState(false);

  const [user] = useState<User>({
    id: '1',
    fullName: 'Guest User',
    phone: '',
    city: '',
    isActive: true,
  });

  const handleCreateSummary = () => {
    setPdfLinkVisible(true);
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
          <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <div className="flex items-center justify-center gap-3 mb-2">
                <FileText className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                <h1 className="text-3xl font-bold text-white">Create a Timesheet Summary</h1>
              </div>

              <h4 className="text-xl font-semibold text-white/90 mt-6">Start Date:</h4>
              <input
                type="date"
                id="date1"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-64 p-2.5 mt-2 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-primary-400 text-center"
              />

              <h4 className="text-xl font-semibold text-white/90 mt-4">End Date:</h4>
              <input
                type="date"
                id="date2"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-64 p-2.5 mt-2 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-primary-400 text-center"
              />

              <div className="mt-6">
                <button
                  type="button"
                  onClick={handleCreateSummary}
                  className="px-6 py-2.5 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition-colors"
                >
                  Create Summary
                </button>
              </div>

              <div className="mt-6">
                <a
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center gap-2 px-6 py-2.5 bg-green-500 hover:bg-green-600 text-white rounded-lg font-medium transition-colors ${
                    pdfLinkVisible ? '' : 'hidden'
                  }`}
                >
                  <ExternalLink className="w-4 h-4" />
                  Summary PDF
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
