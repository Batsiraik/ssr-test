'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowLeft, User, Phone, MapPin, Settings as SettingsIcon } from 'lucide-react';
import toast from 'react-hot-toast';

interface User {
  id: string;
  fullName: string;
  phone: string;
  city: string;
  isActive: boolean;
}

export default function SettingsPage() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem('batsie_token');
    
    if (!token) {
      router.push('/auth/login');
      return;
    }

    // Load user data from localStorage
    loadUserData();
  }, [router]);

  const loadUserData = async () => {
    try {
      const userData = localStorage.getItem('batsie_user');
      if (userData) {
        const parsedUser = JSON.parse(userData);
        setUser(parsedUser);
      }
    } catch (error) {
      console.error('Error loading user data:', error);
      router.push('/auth/login');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('batsie_token');
    localStorage.removeItem('batsie_user');
    toast.success('Logged out successfully');
    router.push('/auth/login');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0054a4] flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-[#0054a4]">
      {/* Header */}
      <div className="bg-white/10 backdrop-blur-lg border-b border-white/20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-3 sm:py-4">
            <div className="flex items-center">
              <button
                onClick={() => router.back()}
                className="mr-2 sm:mr-4 p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
              >
                <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </button>
              <h1 className="text-xl sm:text-2xl font-bold text-white">Settings</h1>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Account Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white/10 backdrop-blur-lg rounded-3xl p-4 sm:p-6 shadow-2xl border border-white/20 mb-6 sm:mb-8"
        >
          <div className="flex items-center space-x-2 sm:space-x-3 mb-4 sm:mb-6">
            <div className="p-2 bg-primary-500/20 rounded-xl">
              <SettingsIcon className="w-5 h-5 sm:w-6 sm:h-6 text-primary-400" />
            </div>
            <h2 className="text-lg sm:text-xl font-bold text-white">Account Information</h2>
          </div>
          
          <div className="space-y-4 sm:space-y-6">
            <div className="flex items-center space-x-3 sm:space-x-4">
              <div className="p-2 sm:p-3 bg-white/10 rounded-xl">
                <User className="w-5 h-5 sm:w-6 sm:h-6 text-white/70" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white/70 text-xs sm:text-sm">Full Name</p>
                <p className="text-white font-semibold text-base sm:text-lg truncate">{user.fullName}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3 sm:space-x-4">
              <div className="p-2 sm:p-3 bg-white/10 rounded-xl">
                <Phone className="w-5 h-5 sm:w-6 sm:h-6 text-white/70" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white/70 text-xs sm:text-sm">Phone Number</p>
                <p className="text-white font-semibold text-base sm:text-lg">+263{user.phone}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3 sm:space-x-4">
              <div className="p-2 sm:p-3 bg-white/10 rounded-xl">
                <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-white/70" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white/70 text-xs sm:text-sm">City</p>
                <p className="text-white font-semibold text-base sm:text-lg">{user.city}</p>
              </div>
            </div>
            
            <div className="pt-4 sm:pt-6 border-t border-white/20">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center space-x-2 sm:space-x-3">
                  <div className="w-2 h-2 sm:w-3 sm:h-3 bg-green-400 rounded-full"></div>
                  <span className="text-green-400 font-medium text-sm sm:text-base">Account Verified</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="bg-red-500/20 text-red-400 px-4 py-2 rounded-xl font-semibold hover:bg-red-500/30 transition-colors text-sm sm:text-base w-full sm:w-auto"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Coming Soon Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white/10 backdrop-blur-lg rounded-3xl p-4 sm:p-6 shadow-2xl border border-white/20"
        >
          <div className="text-center">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-primary-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <SettingsIcon className="w-6 h-6 sm:w-8 sm:h-8 text-primary-400" />
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-white mb-2">More Settings Coming Soon</h3>
            <p className="text-white/70 text-sm sm:text-base">
              Advanced settings, address management, and payment methods will be available in future updates.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}