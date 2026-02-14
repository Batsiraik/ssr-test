'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Menu, Bell, ClipboardCheck, ListTodo, Plus, X } from 'lucide-react';
import Link from 'next/link';
import Sidebar from '@/components/Sidebar';

const inputClass =
  'w-full p-2.5 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-primary-400';

interface User {
  id: string;
  fullName: string;
  phone: string;
  city: string;
  isActive: boolean;
}

export default function InspectionsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [addTaskOpen, setAddTaskOpen] = useState(false);
  const [taskName, setTaskName] = useState('');
  const [taskDesc, setTaskDesc] = useState('');

  const [user] = useState<User>({
    id: '1',
    fullName: 'Guest User',
    phone: '',
    city: '',
    isActive: true,
  });

  const handleSaveTask = (e: React.FormEvent) => {
    e.preventDefault();
    setTaskName('');
    setTaskDesc('');
    setAddTaskOpen(false);
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
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-8"
            >
              <div className="flex items-center justify-center gap-3 mb-6">
                <ClipboardCheck className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                <h2 className="text-3xl font-bold text-white">Inspection Reports</h2>
              </div>

              <div className="flex flex-wrap justify-center gap-4">
                <Link
                  href="/assets/inspections/tasks"
                  className="inline-flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md font-medium transition-colors"
                >
                  <ListTodo className="w-4 h-4" />
                  Inspection Tasks
                </Link>
                <button
                  type="button"
                  onClick={() => setAddTaskOpen(true)}
                  className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg shadow-md font-medium transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  Add Task
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Add Task Modal */}
      {addTaskOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50 p-4">
          <div className="bg-[#0054a4] border border-white/20 rounded-2xl shadow-xl w-full max-w-md p-6 relative">
            <div className="flex justify-between items-center mb-4">
              <h4 className="text-xl font-semibold text-white">Add Task to the Database</h4>
              <button
                type="button"
                onClick={() => setAddTaskOpen(false)}
                className="p-1 text-white/80 hover:text-white rounded transition-colors"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleSaveTask} className="space-y-4">
              <div>
                <label className="block text-white font-medium mb-1">Task Name:</label>
                <input
                  type="text"
                  value={taskName}
                  onChange={(e) => setTaskName(e.target.value)}
                  className={inputClass}
                  placeholder="Enter task name"
                />
              </div>
              <div>
                <label className="block text-white font-medium mb-1">Task Description:</label>
                <textarea
                  value={taskDesc}
                  onChange={(e) => setTaskDesc(e.target.value)}
                  className={`${inputClass} min-h-[100px] resize-y`}
                  placeholder="Enter task description"
                />
              </div>
              <div className="flex justify-end gap-2 mt-4">
                <button
                  type="button"
                  onClick={() => setAddTaskOpen(false)}
                  className="bg-gray-500 hover:bg-gray-600 text-white px-3 py-1.5 rounded-lg font-medium transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-green-500 hover:bg-green-600 text-white px-3 py-1.5 rounded-lg font-medium transition-colors"
                >
                  Save Task
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
