'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Menu, Bell, FileText, Package, DollarSign, StickyNote } from 'lucide-react';
import Sidebar from '@/components/Sidebar';
import Link from 'next/link';

const selectClass =
  'w-full p-2.5 bg-[#003a7a] border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-primary-400 [&>option]:bg-gray-800 [&>option]:text-white';
const inputClass =
  'w-full p-2.5 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-primary-400';

interface User {
  id: string;
  fullName: string;
  phone: string;
  city: string;
  isActive: boolean;
}

export default function CreateRentalAgreementPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [serviceOnly, setServiceOnly] = useState(false);
  const [serviceCallOnly, setServiceCallOnly] = useState(false);
  const [customerId, setCustomerId] = useState<string>('-1');
  const [streetAddress, setStreetAddress] = useState('');
  const [city, setCity] = useState('Edmonton');
  const [postalCode, setPostalCode] = useState('');
  const [deliveryDate, setDeliveryDate] = useState('');
  const [billingType, setBillingType] = useState('3');
  const [noteToEmployee, setNoteToEmployee] = useState('');

  const [user] = useState<User>({
    id: '1',
    fullName: 'Guest User',
    phone: '',
    city: '',
    isActive: true,
  });

  const customers = [
    { id: '1', name: 'Brookfield Residential (Alberta) LP' },
    { id: '2', name: 'Anthem Properties' },
    { id: '3', name: 'Kanvi Homes' },
  ];

  const sites = [
    { id: '1', name: 'THE ORCHARDS' },
    { id: '2', name: 'GLENRIDDING' },
    { id: '3', name: 'EDMONTON' },
  ];

  const provinces = [
    { id: '1', provinceName: 'Alberta' },
    { id: '2', provinceName: 'British Columbia' },
    { id: '3', provinceName: 'Ontario' },
  ];

  const chargeNames = [
    { id: '1', chargeName: 'Delivery', defaultPrice: '25.00' },
    { id: '2', chargeName: 'Setup', defaultPrice: '50.00' },
  ];

  const personDisabled = customerId === '-1';

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
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-2xl font-semibold text-white text-center mb-6"
            >
              Create a Rental Agreement
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 }}
              className="space-y-6"
            >
              {/* Toggles */}
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3">
                    <span className="text-white font-semibold">3rd Party Service:</span>
                    <label className="group relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={serviceOnly}
                        onChange={(e) => setServiceOnly(e.target.checked)}
                        className="sr-only"
                      />
                      <div className="relative w-11 h-6 rounded-full bg-white/20 border border-white/20 group-has-[:checked]:bg-blue-500 transition-colors">
                        <span className="absolute left-1 top-0.5 w-5 h-5 bg-white rounded-full transition-transform group-has-[:checked]:translate-x-5" />
                      </div>
                    </label>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-white font-semibold">Service Call/Work Order:</span>
                    <label className="group relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={serviceCallOnly}
                        onChange={(e) => setServiceCallOnly(e.target.checked)}
                        className="sr-only"
                      />
                      <div className="relative w-11 h-6 rounded-full bg-white/20 border border-white/20 group-has-[:checked]:bg-blue-500 transition-colors">
                        <span className="absolute left-1 top-0.5 w-5 h-5 bg-white rounded-full transition-transform group-has-[:checked]:translate-x-5" />
                      </div>
                    </label>
                  </div>
                </div>
              </div>

              {/* Rental Details */}
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <FileText className="w-5 h-5" /> Rental Details
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label htmlFor="customerCB" className="block text-sm font-medium text-white/80 mb-1">Customer</label>
                    <select
                      id="customerCB"
                      value={customerId}
                      onChange={(e) => setCustomerId(e.target.value)}
                      className={selectClass}
                    >
                      <option value="-1">--- SELECT CUSTOMER ---</option>
                      {customers.map((c) => (
                        <option key={c.id} value={c.id}>{c.name}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="personCB" className="block text-sm font-medium text-white/80 mb-1">Ordered By</label>
                    <select
                      id="personCB"
                      className={selectClass}
                      disabled={personDisabled}
                    >
                      <option value="-1">{personDisabled ? '--- SELECT CUSTOMER FIRST ---' : '--- SELECT PERSON ---'}</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="siteCB" className="block text-sm font-medium text-white/80 mb-1">Site</label>
                    <select id="siteCB" className={selectClass}>
                      <option value="-1">--- SELECT SITE ---</option>
                      {sites.map((s) => (
                        <option key={s.id} value={s.id}>{s.name}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Address Information */}
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
                <h3 className="text-lg font-semibold text-white mb-4">Address Information</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="streetInput" className="block text-sm font-medium text-white/80 mb-1">Street Address</label>
                    <input
                      type="text"
                      id="streetInput"
                      value={streetAddress}
                      onChange={(e) => setStreetAddress(e.target.value)}
                      className={inputClass}
                      placeholder="Street address"
                    />
                  </div>
                  <div>
                    <label htmlFor="cityInput" className="block text-sm font-medium text-white/80 mb-1">City</label>
                    <input
                      type="text"
                      id="cityInput"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label htmlFor="provinceInput" className="block text-sm font-medium text-white/80 mb-1">Province</label>
                    <select id="provinceInput" className={selectClass}>
                      {provinces.map((p) => (
                        <option key={p.id} value={p.id}>{p.provinceName}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="postalInput" className="block text-sm font-medium text-white/80 mb-1">Postal Code</label>
                    <input
                      type="text"
                      id="postalInput"
                      value={postalCode}
                      onChange={(e) => setPostalCode(e.target.value)}
                      className={inputClass}
                      placeholder="Postal code"
                    />
                  </div>
                </div>
              </div>

              {/* Add Assets */}
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <Package className="w-5 h-5" /> Add Assets
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                  <select id="typesCB" className={selectClass} disabled>
                    <option value="-1">--- Select Company First ---</option>
                  </select>
                  <select id="makesCB" className={selectClass} disabled>
                    <option value="-1">--- Select Type First ---</option>
                  </select>
                  <select id="modelsCB" className={selectClass} disabled>
                    <option value="-1">--- Select Make First ---</option>
                  </select>
                  <select id="assetsCB" className={selectClass} disabled>
                    <option value="-1">--- Select Model First ---</option>
                  </select>
                </div>
                <button type="button" className="mt-4 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-xl font-medium transition-colors">
                  Add Asset
                </button>
              </div>

              {/* Bulk Assets */}
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
                <h3 className="text-lg font-semibold text-white mb-4">Add Bulk Assets</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <select id="bulkAssetsCB" className={selectClass}>
                    <option value="-1">-- SELECT COMPANY FIRST --</option>
                  </select>
                  <input type="number" step="0.01" defaultValue="0.00" className={inputClass} />
                  <input type="number" defaultValue="1" className={inputClass} />
                </div>
                <button type="button" className="mt-4 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-xl font-medium transition-colors">
                  Add Bulk Asset
                </button>
              </div>

              {/* Flat Rate Assets */}
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
                <h3 className="text-lg font-semibold text-white mb-4">Flat Rate Assets</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <select id="flatRateCB" className={selectClass}>
                    <option value="-1">--- SELECT COMPANY FIRST ---</option>
                  </select>
                  <input type="number" defaultValue="1" className={inputClass} />
                </div>
                <button type="button" className="mt-4 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-xl font-medium transition-colors">
                  Add Flat Rate Asset
                </button>
              </div>

              {/* Billing Information */}
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <DollarSign className="w-5 h-5" /> Billing Information
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="deliveryDate" className="block text-sm font-medium text-white/80 mb-1">Scheduled Date</label>
                    <input
                      type="date"
                      id="deliveryDate"
                      value={deliveryDate}
                      onChange={(e) => setDeliveryDate(e.target.value)}
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label htmlFor="billingType" className="block text-sm font-medium text-white/80 mb-1">Billing Type</label>
                    <select
                      id="billingType"
                      value={billingType}
                      onChange={(e) => setBillingType(e.target.value)}
                      className={selectClass}
                    >
                      <option value="3">Month</option>
                      <option value="2">Week</option>
                      <option value="1">Day</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Additional Charges */}
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
                <h3 className="text-lg font-semibold text-white mb-4">Additional Charges</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <select id="chargesDD" className={selectClass}>
                    <option value="-1">-- SELECT CHARGE --</option>
                    {chargeNames.map((c) => (
                      <option key={c.id} value={c.id}>{c.chargeName} (${c.defaultPrice})</option>
                    ))}
                    <option value="-2">-- OTHER --</option>
                  </select>
                  <input type="number" defaultValue="0.00" step="0.01" className={inputClass} />
                </div>
                <button type="button" className="mt-4 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-xl font-medium transition-colors">
                  Add Charge
                </button>
              </div>

              {/* Note for Employee */}
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <StickyNote className="w-5 h-5" /> Note for Employee
                </h3>
                <textarea
                  id="noteToEmployee"
                  value={noteToEmployee}
                  onChange={(e) => setNoteToEmployee(e.target.value)}
                  className={`${inputClass} min-h-[100px]`}
                  placeholder="Write a note..."
                />
              </div>

              {/* Submit & Cancel */}
              <div className="flex justify-between mt-8">
                <Link
                  href="/dashboard"
                  className="px-6 py-2.5 bg-red-500 hover:bg-red-600 text-white rounded-xl font-medium transition-colors"
                >
                  Cancel
                </Link>
                <button
                  type="button"
                  disabled
                  className="px-6 py-2.5 bg-green-500 text-white rounded-xl font-medium opacity-60 cursor-not-allowed"
                >
                  Create Rental Agreement
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
