'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Menu, Bell, Wrench, Package } from 'lucide-react';
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

const workOrderTypes = [
  { id: '1', type: 'Repair' },
  { id: '2', type: 'Maintenance' },
  { id: '3', type: 'Inspection' },
  { id: '4', type: 'Quote' },
];

const customers = [
  { id: '1', name: 'Brookfield Residential (Alberta) LP' },
  { id: '2', name: 'Anthem Properties' },
  { id: '3', name: 'Kanvi Homes' },
];

const personsByCustomer: Record<string, { id: string; name: string }[]> = {
  '1': [
    { id: 'p1', name: 'Jake Poles' },
    { id: 'p2', name: 'Sarah Chen' },
  ],
  '2': [
    { id: 'p3', name: 'Mike Roberts' },
    { id: 'p4', name: 'Amy Lee' },
  ],
  '3': [
    { id: 'p5', name: 'David Kim' },
  ],
};

const sites = [
  { id: '1', name: 'THE ORCHARDS' },
  { id: '2', name: 'GLENRIDDING' },
  { id: '3', name: 'EDMONTON' },
];

const assetTypes = [
  { id: '1', type: 'Heater' },
  { id: '2', type: 'Tank' },
  { id: '3', type: 'Generator' },
];

const makesByType: Record<string, { id: string; name: string }[]> = {
  '1': [
    { id: 'm1', name: 'Generac' },
    { id: 'm2', name: 'Duromax' },
  ],
  '2': [
    { id: 'm3', name: 'Manchester' },
    { id: 'm4', name: 'Worthington' },
  ],
  '3': [
    { id: 'm5', name: 'Honda' },
    { id: 'm6', name: 'Briggs & Stratton' },
  ],
};

const modelsByMake: Record<string, { id: string; name: string }[]> = {
  m1: [{ id: 'mo1', name: 'Heater Pro 20' }, { id: 'mo2', name: 'Heater Pro 30' }],
  m2: [{ id: 'mo3', name: 'Portable 15K' }],
  m3: [{ id: 'mo4', name: '100lb LP' }, { id: 'mo5', name: '120lb LP' }],
  m4: [{ id: 'mo6', name: '40lb Steel' }],
  m5: [{ id: 'mo7', name: 'EU7000' }, { id: 'mo8', name: 'EU3000' }],
  m6: [{ id: 'mo9', name: 'Q6500' }],
};

const assetsByModel: Record<string, { id: string; label: string }[]> = {
  mo1: [{ id: 'a1', label: 'Unit #101' }, { id: 'a2', label: 'Unit #102' }],
  mo2: [{ id: 'a3', label: 'Unit #201' }],
  mo3: [{ id: 'a4', label: 'Unit #301' }],
  mo4: [{ id: 'a5', label: 'Tank-100-01' }],
  mo5: [{ id: 'a6', label: 'Tank-120-01' }],
  mo6: [{ id: 'a7', label: 'Tank-40-01' }],
  mo7: [{ id: 'a8', label: 'Gen-EU7-01' }],
  mo8: [{ id: 'a9', label: 'Gen-EU3-01' }],
  mo9: [{ id: 'a10', label: 'Gen-Q65-01' }],
};

export default function CreateWorkOrderPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [typeId, setTypeId] = useState<string>('-1');
  const [serviceCall, setServiceCall] = useState(false);
  const [kms, setKms] = useState('');
  const [customerId, setCustomerId] = useState<string>('-1');
  const [personId, setPersonId] = useState<string>('-1');
  const [siteId, setSiteId] = useState<string>('-1');
  const [unitNum, setUnitNum] = useState('');
  const [sinNum, setSinNum] = useState('');
  const [assetTypeId, setAssetTypeId] = useState<string>('-1');
  const [makeId, setMakeId] = useState<string>('-1');
  const [modelId, setModelId] = useState<string>('-1');
  const [assetId, setAssetId] = useState<string>('-1');
  const [hours, setHours] = useState('');

  const [user] = useState<User>({
    id: '1',
    fullName: 'Guest User',
    phone: '',
    city: '',
    isActive: true,
  });

  const personDisabled = customerId === '-1';
  const persons = customerId !== '-1' ? personsByCustomer[customerId] ?? [] : [];
  const makeDisabled = assetTypeId === '-1';
  const makes = assetTypeId !== '-1' ? makesByType[assetTypeId] ?? [] : [];
  const modelDisabled = makeId === '-1';
  const models = makeId !== '-1' ? modelsByMake[makeId] ?? [] : [];
  const assetDisabled = modelId === '-1';
  const assets = modelId !== '-1' ? assetsByModel[modelId] ?? [] : [];

  useEffect(() => {
    setPersonId('-1');
  }, [customerId]);

  useEffect(() => {
    setMakeId('-1');
    setModelId('-1');
    setAssetId('-1');
  }, [assetTypeId]);

  useEffect(() => {
    setModelId('-1');
    setAssetId('-1');
  }, [makeId]);

  useEffect(() => {
    setAssetId('-1');
  }, [modelId]);

  useEffect(() => {
    const handleResize = () => setSidebarOpen(window.innerWidth >= 1024);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // UI only – no backend
  };

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
              className="text-2xl font-semibold text-white text-center mb-2"
            >
              Create Work Order
            </motion.h2>
            <div id="validation" className="text-red-400 text-center text-sm mb-4 min-h-[1.25rem]" />

            <motion.form
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 }}
              onSubmit={handleSubmit}
              className="space-y-6"
            >
              {/* Work Order Type */}
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
                <h4 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                  <Wrench className="w-5 h-5" /> Work Order Type
                </h4>
                <select
                  id="typeCB"
                  name="type"
                  value={typeId}
                  onChange={(e) => setTypeId(e.target.value)}
                  className={selectClass}
                >
                  <option value="-1">- Select Type of Work Order -</option>
                  {workOrderTypes.map((t) => (
                    <option key={t.id} value={t.id}>{t.type}</option>
                  ))}
                </select>
              </div>

              {/* Service Call */}
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
                <h4 className="text-lg font-semibold text-white mb-3">Service Call?</h4>
                <div className="flex flex-wrap items-center gap-3">
                  <label className="group relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      id="serviceCall"
                      checked={serviceCall}
                      onChange={(e) => setServiceCall(e.target.checked)}
                      className="sr-only"
                    />
                    <div className="relative w-11 h-6 rounded-full bg-white/20 border border-white/20 group-has-[:checked]:bg-blue-500 transition-colors">
                      <span className="absolute left-1 top-0.5 w-5 h-5 bg-white rounded-full transition-transform group-has-[:checked]:translate-x-5" />
                    </div>
                  </label>
                  <label htmlFor="serviceCall" className="text-white/90">Yes? Mileage (in Kms):</label>
                  <input
                    type="number"
                    name="kms"
                    value={kms}
                    onChange={(e) => setKms(e.target.value)}
                    className="w-24 p-2.5 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-primary-400"
                    placeholder="0"
                  />
                </div>
              </div>

              {/* Customer, Person, Site */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
                  <h4 className="text-lg font-semibold text-white mb-2">Company Name</h4>
                  <select
                    id="customerCB"
                    name="customerCB"
                    value={customerId}
                    onChange={(e) => setCustomerId(e.target.value)}
                    className={selectClass}
                  >
                    <option value="-1">--- SELECT COMPANY ---</option>
                    {customers.map((c) => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>
                <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
                  <h4 className="text-lg font-semibold text-white mb-2">Person Name</h4>
                  <select
                    id="personCB"
                    name="personCB"
                    value={personId}
                    onChange={(e) => setPersonId(e.target.value)}
                    className={selectClass}
                    disabled={personDisabled}
                  >
                    <option value="-1">
                      {personDisabled ? '--- SELECT COMPANY FIRST ---' : '--- SELECT PERSON ---'}
                    </option>
                    {persons.map((p) => (
                      <option key={p.id} value={p.id}>{p.name}</option>
                    ))}
                  </select>
                </div>
                <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
                  <h4 className="text-lg font-semibold text-white mb-2">Site Name</h4>
                  <select
                    id="siteCB"
                    name="siteCB"
                    value={siteId}
                    onChange={(e) => setSiteId(e.target.value)}
                    className={selectClass}
                  >
                    <option value="-1">--- SELECT SITE ---</option>
                    {sites.map((s) => (
                      <option key={s.id} value={s.id}>{s.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Unit #1 */}
              <fieldset className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
                <legend className="text-lg font-semibold text-white px-2">Unit #1</legend>
                <div className="space-y-3 mt-2">
                  <div>
                    <label htmlFor="unitNum" className="block text-sm font-medium text-white/80 mb-1">Unit #</label>
                    <input
                      type="text"
                      id="unitNum"
                      name="unitNum"
                      value={unitNum}
                      onChange={(e) => setUnitNum(e.target.value)}
                      className={inputClass}
                      placeholder="Unit number"
                    />
                  </div>
                  <div>
                    <label htmlFor="sinNum" className="block text-sm font-medium text-white/80 mb-1">SIN #</label>
                    <input
                      type="text"
                      id="sinNum"
                      name="sinNum"
                      value={sinNum}
                      onChange={(e) => setSinNum(e.target.value)}
                      className={inputClass}
                      placeholder="SIN number"
                    />
                  </div>
                </div>
              </fieldset>

              {/* Asset Details */}
              <fieldset className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
                <legend className="text-lg font-semibold text-white px-2 flex items-center gap-2">
                  <Package className="w-5 h-5" /> Asset Details
                </legend>
                <div className="space-y-3 mt-2">
                  <div>
                    <label htmlFor="typesCB" className="block text-sm font-medium text-white/80 mb-1">Type</label>
                    <select
                      id="typesCB"
                      name="typesCB"
                      value={assetTypeId}
                      onChange={(e) => setAssetTypeId(e.target.value)}
                      className={selectClass}
                    >
                      <option value="-1">--- SELECT TYPE ---</option>
                      {assetTypes.map((t) => (
                        <option key={t.id} value={t.id}>{t.type}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="makesCB" className="block text-sm font-medium text-white/80 mb-1">Make</label>
                    <select
                      id="makesCB"
                      name="makesCB"
                      value={makeId}
                      onChange={(e) => setMakeId(e.target.value)}
                      className={selectClass}
                      disabled={makeDisabled}
                    >
                      <option value="-1">
                        {makeDisabled ? '--- SELECT TYPE FIRST ---' : '--- SELECT MAKE ---'}
                      </option>
                      {makes.map((m) => (
                        <option key={m.id} value={m.id}>{m.name}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="modelsCB" className="block text-sm font-medium text-white/80 mb-1">Model</label>
                    <select
                      id="modelsCB"
                      name="modelsCB"
                      value={modelId}
                      onChange={(e) => setModelId(e.target.value)}
                      className={selectClass}
                      disabled={modelDisabled}
                    >
                      <option value="-1">
                        {modelDisabled ? '--- SELECT MAKE FIRST ---' : '--- SELECT MODEL ---'}
                      </option>
                      {models.map((m) => (
                        <option key={m.id} value={m.id}>{m.name}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="assetsCB" className="block text-sm font-medium text-white/80 mb-1">Assets</label>
                    <select
                      id="assetsCB"
                      name="assetsCB"
                      value={assetId}
                      onChange={(e) => setAssetId(e.target.value)}
                      className={selectClass}
                      disabled={assetDisabled}
                    >
                      <option value="-1">
                        {assetDisabled ? '--- SELECT MODEL FIRST ---' : '--- SELECT ASSET ---'}
                      </option>
                      {assets.map((a) => (
                        <option key={a.id} value={a.id}>{a.label}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="hours" className="block text-sm font-medium text-white/80 mb-1">Hours</label>
                    <input
                      type="text"
                      id="hours"
                      name="hours"
                      value={hours}
                      onChange={(e) => setHours(e.target.value)}
                      className={inputClass}
                      placeholder="Hours"
                    />
                  </div>
                </div>
              </fieldset>

              {/* Buttons */}
              <div className="flex flex-wrap justify-between gap-4">
                <button
                  type="submit"
                  className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-xl font-medium transition-colors"
                >
                  Create Work Order
                </button>
                <Link
                  href="/work-orders"
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl font-medium transition-colors inline-block"
                >
                  Back
                </Link>
              </div>
            </motion.form>
          </div>
        </div>
      </div>
    </div>
  );
}
