'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Menu, Bell, CreditCard, DollarSign, FileText, Plus } from 'lucide-react';
import Sidebar from '@/components/Sidebar';
import Table, { TableColumn } from '@/components/Table';

interface User {
  id: string;
  fullName: string;
  phone: string;
  city: string;
  isActive: boolean;
}

interface InvoiceRow {
  uuid: string;
  rgID: string;
  streetAddress: string;
  customerName: string;
  amount: number;
  dateInvoiced: string;
  ssrInvoiceNumber: string;
  total: number;
  deliveryCharges: string;
  carbonTax: string;
  paymentsAmount: number;
  creditsAmount: number;
  poNumber: string;
}

export default function AwaitingPaymentPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState<string>('-1');
  const [lessThirty, setLessThirty] = useState('0.00');
  const [thirtySixty, setThirtySixty] = useState('0.00');
  const [sixtyNinety, setSixtyNinety] = useState('0.00');
  const [ninetyGreater, setNinetyGreater] = useState('0.00');

  const [user] = useState<User>({
    id: '1',
    fullName: 'Guest User',
    phone: '',
    city: '',
    isActive: true,
  });

  // Mock companies for dropdown
  const companies = [
    { id: '1', name: 'Brookfield Residential (Alberta) LP' },
    { id: '2', name: 'Anthem Properties' },
    { id: '3', name: 'Kanvi Homes' },
  ];

  // Mock invoices
  const invoicesData: InvoiceRow[] = [
    {
      uuid: 'inv-001',
      rgID: 'rg-001',
      streetAddress: '2370 MUCKLEPLUM WAY',
      customerName: 'Brookfield Residential (Alberta) LP',
      amount: 245.5,
      dateInvoiced: '2025-01-15',
      ssrInvoiceNumber: '1001',
      total: 450.0,
      deliveryCharges: '25.00',
      carbonTax: '12.50',
      paymentsAmount: 204.5,
      creditsAmount: 0,
      poNumber: 'PO-2025-001',
    },
    {
      uuid: 'inv-002',
      rgID: 'rg-002',
      streetAddress: '2616 158 STREET',
      customerName: 'Anthem Properties',
      amount: 520.0,
      dateInvoiced: '2025-01-20',
      ssrInvoiceNumber: '1002',
      total: 520.0,
      deliveryCharges: '0.00',
      carbonTax: '8.20',
      paymentsAmount: 0,
      creditsAmount: 0,
      poNumber: '',
    },
  ];

  const columns: TableColumn<InvoiceRow>[] = [
    {
      key: 'streetAddress',
      title: 'Rental Agreement',
      render: (_, row) => (
        <div>
          <a href="#" className="text-blue-300 hover:text-blue-200 hover:underline">
            {row.streetAddress}
          </a>
          <br />
          <span className="text-white/80">
            Owing: <b>${row.amount.toFixed(2)}</b>
          </span>
        </div>
      ),
    },
    { key: 'customerName', title: 'Company' },
    {
      key: 'uuid',
      title: 'Actions',
      render: (_, row) => (
        <div className="flex gap-2">
          <button
            type="button"
            className="px-3 py-1.5 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg text-sm font-medium transition-colors"
          >
            <DollarSign className="w-3.5 h-3.5 inline mr-1" />
            Payment
          </button>
          <button
            type="button"
            className="px-3 py-1.5 bg-green-500 hover:bg-green-600 text-white rounded-lg text-sm font-medium transition-colors"
          >
            <Plus className="w-3.5 h-3.5 inline mr-1" />
            Add P/O
          </button>
        </div>
      ),
    },
    { key: 'dateInvoiced', title: 'Date Created' },
    {
      key: 'ssrInvoiceNumber',
      title: 'Invoice',
      render: (_, row) => (
        <a href="#" className="text-blue-300 hover:text-blue-200 hover:underline">
          SSR-{row.ssrInvoiceNumber}
        </a>
      ),
    },
    {
      key: 'total',
      title: 'Total',
      render: (v) => `$${Number(v).toFixed(2)}`,
    },
    {
      key: 'deliveryCharges',
      title: 'Delivery',
      render: (v) => `$${v}`,
    },
    {
      key: 'carbonTax',
      title: 'Carbon',
      render: (v) => `$${v}`,
    },
    {
      key: 'paymentsAmount',
      title: 'Payments',
      render: (v) => `$${Number(v).toFixed(2)}`,
    },
    {
      key: 'creditsAmount',
      title: 'Credits',
      render: (v) => `$${Number(v).toFixed(2)}`,
    },
    { key: 'poNumber', title: 'P/O', render: (v) => v || '—' },
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
              className="mb-6"
            >
              <div className="flex items-center gap-3 mb-6">
                <CreditCard className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                <h2 className="text-2xl font-semibold text-white">Invoices [{invoicesData.length}]</h2>
              </div>

              {/* Company Selection */}
              <div className="mt-4 mb-6">
                <label htmlFor="companyName" className="block text-lg font-medium text-white/90 mb-2">
                  Select Company
                </label>
                <select
                  id="companyName"
                  value={selectedCompany}
                  onChange={(e) => setSelectedCompany(e.target.value)}
                  className="mt-2 p-2.5 bg-[#003a7a] border border-white/20 rounded-xl text-white w-full sm:w-64 focus:outline-none focus:ring-2 focus:ring-primary-400 [&>option]:bg-gray-800 [&>option]:text-white"
                >
                  <option value="-1">ALL COMPANIES</option>
                  {companies.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Past Due Summary Table */}
              <div className="overflow-x-auto rounded-xl border border-white/20 mb-6">
                <table className="w-full border-collapse min-w-[400px]">
                  <thead>
                    <tr className="bg-white/10">
                      <th className="p-3 text-left text-white font-semibold">&lt; 30 Days</th>
                      <th className="p-3 text-left text-white font-semibold">30-60 Days</th>
                      <th className="p-3 text-left text-white font-semibold">60-90 Days</th>
                      <th className="p-3 text-left text-white font-semibold">90+ Days</th>
                      <th className="p-3 text-left text-white font-semibold">Statement</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="text-center">
                      <td className="p-3 bg-white/5">
                        <span className="font-semibold text-white">$ </span>
                        <input
                          type="text"
                          value={lessThirty}
                          readOnly
                          className="w-20 text-center bg-transparent text-white border-0 p-0"
                        />
                      </td>
                      <td className="p-3 bg-green-500/30">
                        <span className="font-semibold text-white">$ </span>
                        <input
                          type="text"
                          value={thirtySixty}
                          readOnly
                          className="w-20 text-center bg-transparent text-white border-0 p-0"
                        />
                      </td>
                      <td className="p-3 bg-yellow-500/30">
                        <span className="font-semibold text-white">$ </span>
                        <input
                          type="text"
                          value={sixtyNinety}
                          readOnly
                          className="w-20 text-center bg-transparent text-white border-0 p-0"
                        />
                      </td>
                      <td className="p-3 bg-red-500/30">
                        <span className="font-semibold text-white">$ </span>
                        <input
                          type="text"
                          value={ninetyGreater}
                          readOnly
                          className="w-20 text-center bg-transparent text-white border-0 p-0"
                        />
                      </td>
                      <td className="p-3 bg-white/5">
                        {selectedCompany !== '-1' && (
                          <button
                            type="button"
                            className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition-colors inline-flex items-center gap-2"
                          >
                            <FileText className="w-4 h-4" />
                            Generate Statement
                          </button>
                        )}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </motion.div>

            {/* Invoices Table */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 sm:p-8 shadow-xl border border-white/20">
                <div className="overflow-x-auto">
                  <Table
                    columns={columns}
                    data={invoicesData}
                    emptyMessage="No invoices awaiting payment"
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
