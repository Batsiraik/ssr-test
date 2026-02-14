'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // For now, allow direct access to dashboard
    // You can still manually navigate to /auth/login to see the login screens
    // No automatic redirect needed
  }, []);

  // Show homepage with option to go directly to dashboard
  return (
    <div className="min-h-screen bg-[#0054a4] flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="max-w-md w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white/10 backdrop-blur-lg rounded-3xl p-6 sm:p-8 shadow-2xl border border-white/20"
        >
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="mx-auto mb-4 flex items-center justify-center"
            >
              <img
                src="/logo.png"
                alt="Super Sonic Rentals"
                className="w-16 h-16 sm:w-20 sm:h-20"
              />
            </motion.div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-2">Super Sonic Rentals</h1>
            <p className="text-white/80 text-sm sm:text-base">Your rental management platform</p>
          </div>

          <div className="space-y-3 sm:space-y-4">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => router.push('/dashboard')}
              className="w-full bg-[#0054a4] text-white py-3 px-6 rounded-xl font-semibold hover:bg-[#004389] transition-all duration-200 text-sm sm:text-base border border-white/20"
            >
              Go to Dashboard
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => router.push('/auth/login')}
              className="w-full bg-white/20 text-white py-3 px-6 rounded-xl font-semibold hover:bg-white/30 transition-all duration-200 border border-white/30 text-sm sm:text-base"
            >
              View Login Screen
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
