'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Menu, Bell, CheckCircle, DollarSign, FileText, Plus, CreditCard } from 'lucide-react';
import Sidebar from '@/components/Sidebar';
import Table, { TableColumn } from '@/components/Table';

interface User {
  id: string;
  fullName: string;
  phone: string;
  city: string;
  isActive: boolean;
}

interface InvoiceApprovalRow {
  uuid: string;
  rgID: string;
  streetAddress: string;
  customerName: string;
  owing: number;
  dateInvoiced: string;
  amount: number;
  deliveryCharges: number;
  carbonTax: number;
  total: number;
  totalPaid: number;
  totalCredits: number;
  _actions?: string;
  _invoiceLink?: string;
  _approve?: string;
}

export default function AwaitingApprovalPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState<string>('-1');

  const [user] = useState<User>({
    id: '1',
    fullName: 'Guest User',
    phone: '',
    city: '',
    isActive: true,
  });

  const companies = [
    { id: '1', name: 'Brookfield Residential (Alberta) LP' },
    { id: '2', name: 'Anthem Properties' },
    { id: '3', name: 'Kanvi Homes' },
  ];

  const invoicesData: InvoiceApprovalRow[] = [
    {
      uuid: 'inv-001',
      rgID: 'rg-001',
      streetAddress: '2370 MUCKLEPLUM WAY',
      customerName: 'Brookfield Residential (Alberta) LP',
      owing: 245.5,
      dateInvoiced: '2025-01-15',
      amount: 450.0,
      deliveryCharges: 25.0,
      carbonTax: 12.5,
      total: 450.0,
      totalPaid: 204.5,
      totalCredits: 0,
      _actions: '',
      _invoiceLink: '',
      _approve: '',
    },
    {
      uuid: 'inv-002',
      rgID: 'rg-002',
      streetAddress: '2616 158 STREET',
      customerName: 'Anthem Properties',
      owing: 520.0,
      dateInvoiced: '2025-01-20',
      amount: 520.0,
      deliveryCharges: 0,
      carbonTax: 8.2,
      total: 520.0,
      totalPaid: 0,
      totalCredits: 0,
      _actions: '',
      _invoiceLink: '',
      _approve: '',
    },
  ];

  const truncateAddress = (addr: string, max = 20) =>
    addr.length > max ? `${addr.slice(0, max)}...` : addr;

  const columns: TableColumn<InvoiceApprovalRow>[] = [
    {
      key: 'streetAddress',
      title: 'Rental Agreement',
      render: (_, row) => (
        <div className="text-sm">
          <a href="#" className="text-blue-300 hover:text-blue-200 hover:underline">
            {truncateAddress(row.streetAddress)}
          </a>
          <br />
          <span className="text-white/80">
            Owing: <b>${row.owing.toFixed(2)}</b>
          </span>
          <br />
          <span className="text-white/70">{row.customerName}</span>
        </div>
      ),
    },
    {
      key: '_actions',
      title: 'Actions',
      render: () => (
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            className="px-3 py-1.5 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg text-sm font-medium transition-colors"
          >
            <DollarSign className="w-3.5 h-3.5 inline mr-1" />
            Payment
          </button>
          <button
            type="button"
            className="px-3 py-1.5 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg text-sm font-medium transition-colors"
          >
            <CreditCard className="w-3.5 h-3.5 inline mr-1" />
            Credit
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
      key: '_invoiceLink',
      title: 'Invoice',
      render: (_, row) => (
        <a
          href="#"
          className="inline-block px-3 py-1.5 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-sm font-medium transition-colors"
        >
          Invoice
        </a>
      ),
    },
    {
      key: 'amount',
      title: 'Invoice Total',
      render: (v) => `$ ${Number(v).toFixed(2)}`,
    },
    {
      key: 'deliveryCharges',
      title: 'Delivery',
      render: (v) => `$ ${Number(v).toFixed(2)}`,
    },
    {
      key: 'carbonTax',
      title: 'Carbon',
      render: (v) => `$ ${Number(v).toFixed(2)}`,
    },
    {
      key: 'total',
      title: 'Total',
      render: (v) => (
        <b className="text-white">$ {Number(v).toFixed(2)}</b>
      ),
    },
    {
      key: 'totalPaid',
      title: 'Payments',
      render: (v) => (v != null && v > 0 ? `$${Number(v).toFixed(2)}` : 'NONE'),
    },
    {
      key: 'totalCredits',
      title: 'Credits',
      render: (v) => (v != null && v > 0 ? `$${Number(v).toFixed(2)}` : 'NONE'),
    },
    {
      key: '_approve',
      title: 'Approve',
      render: (_, row) => (
        <button
          type="button"
          className="p-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
          title="Approve"
        >
          <CheckCircle className="w-4 h-4" />
        </button>
      ),
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
              className="mb-6"
            >
              <h2 className="text-2xl font-semibold text-white text-center mb-6">
                Invoices [{invoicesData.length}]
              </h2>

              {/* Company Filter */}
              <div className="flex justify-center mt-4">
                <select
                  id="companyName"
                  value={selectedCompany}
                  onChange={(e) => setSelectedCompany(e.target.value)}
                  className="p-2.5 bg-[#003a7a] border border-white/20 rounded-xl text-white w-full sm:w-64 focus:outline-none focus:ring-2 focus:ring-primary-400 [&>option]:bg-gray-800 [&>option]:text-white"
                >
                  <option value="-1">ALL COMPANIES</option>
                  {companies.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
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
                    data={invoicesData}
                    emptyMessage="No invoices awaiting approval"
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
