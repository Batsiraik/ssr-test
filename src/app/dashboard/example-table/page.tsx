'use client';

import { useState } from 'react';
import Table, { TableColumn } from '@/components/Table';

// Example data types
interface ExampleData {
  id: string;
  name: string;
  email: string;
  status: string;
  date: string;
  amount: number;
}

export default function ExampleTablePage() {
  // Example data
  const [data] = useState<ExampleData[]>([
    {
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
      status: 'Active',
      date: '2024-01-15',
      amount: 1250.50,
    },
    {
      id: '2',
      name: 'Jane Smith',
      email: 'jane@example.com',
      status: 'Inactive',
      date: '2024-01-14',
      amount: 850.00,
    },
    {
      id: '3',
      name: 'Bob Johnson',
      email: 'bob@example.com',
      status: 'Active',
      date: '2024-01-13',
      amount: 2100.75,
    },
  ]);

  // Define columns
  const columns: TableColumn<ExampleData>[] = [
    {
      key: 'id',
      title: 'ID',
    },
    {
      key: 'name',
      title: 'Name',
    },
    {
      key: 'email',
      title: 'Email',
    },
    {
      key: 'status',
      title: 'Status',
      render: (value) => (
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium ${
            value === 'Active'
              ? 'bg-green-500/20 text-green-300'
              : 'bg-red-500/20 text-red-300'
          }`}
        >
          {value}
        </span>
      ),
    },
    {
      key: 'date',
      title: 'Date',
    },
    {
      key: 'amount',
      title: 'Amount',
      render: (value) => `$${value.toFixed(2)}`,
    },
  ];

  const handleRowClick = (row: ExampleData) => {
    console.log('Row clicked:', row);
  };

  return (
    <div className="min-h-screen bg-[#0054a4] p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl sm:text-3xl font-bold text-white mb-6">
          Example Table Page
        </h1>
        
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 sm:p-8 shadow-xl border border-white/20">
          <Table
            columns={columns}
            data={data}
            onRowClick={handleRowClick}
            emptyMessage="No records found"
          />
        </div>
      </div>
    </div>
  );
}

