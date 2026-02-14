'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowLeft, Lock } from 'lucide-react';
import toast from 'react-hot-toast';

export default function VerifyOTPPage() {
  const [otp, setOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch('/api/auth/verify-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          phone: localStorage.getItem('temp_phone') || '',
          code: otp 
        }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success('Account verified successfully!');
        localStorage.setItem('batsie_token', data.token);
        localStorage.setItem('batsie_user', JSON.stringify(data.user));
        localStorage.removeItem('temp_phone');
        router.push('/dashboard');
      } else {
        toast.error(data.error || 'OTP verification failed');
      }
    } catch (error) {
      console.error('OTP verification error:', error);
      toast.error('OTP verification failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0054a4] flex items-center justify-center p-4 sm:p-6">
      <div className="max-w-md w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white/10 backdrop-blur-lg rounded-3xl p-6 sm:p-8 shadow-2xl border border-white/20 relative"
        >
          {/* Header */}
          <div className="text-center mb-6 sm:mb-8">
            <button
              onClick={() => router.back()}
              className="absolute top-4 left-4 p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
            </button>
            
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
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">Verify OTP</h1>
            <p className="text-white/80 text-sm sm:text-base">Enter the 6-digit code sent to your phone</p>
          </div>

          {/* OTP Form */}
          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
            <div>
              <label className="block text-white/70 text-sm font-medium mb-2">
                OTP Code
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-white/50" />
                <input
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="123456"
                  maxLength={6}
                  className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent text-center text-xl sm:text-2xl tracking-widest"
                  required
                />
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#0054a4] text-white py-3 px-6 rounded-xl font-semibold hover:bg-[#004389] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base mt-6 border border-white/20"
            >
              {isLoading ? 'Verifying...' : 'Verify OTP'}
            </motion.button>
          </form>

          {/* Footer Links */}
          <div className="mt-6 sm:mt-8 text-center">
            <button
              onClick={() => router.push('/auth/resend-otp')}
              className="text-white/70 hover:text-white transition-colors text-xs sm:text-sm"
            >
              Didn't receive the code? Resend
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}