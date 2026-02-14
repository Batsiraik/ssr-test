'use client';

import { ReactNode, useState, useMemo } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export interface TableColumn<T = any> {
  key: string;
  title: string;
  render?: (value: any, row: T, index: number) => ReactNode;
  className?: string;
  headerClassName?: string;
  sortable?: boolean;
}

interface TableProps<T = any> {
  columns: TableColumn<T>[];
  data: T[];
  emptyMessage?: string;
  className?: string;
  onRowClick?: (row: T, index: number) => void;
  loading?: boolean;
  // Pagination props
  pagination?: boolean;
  pageSize?: number;
  page?: number;
  onPageChange?: (page: number) => void;
  onPageSizeChange?: (pageSize: number) => void;
  totalItems?: number; // For server-side pagination
  getRowClassName?: (row: T, index: number) => string;
}

export default function Table<T extends Record<string, any>>({
  columns,
  data,
  emptyMessage = 'No data available',
  className = '',
  onRowClick,
  loading = false,
  pagination = false,
  pageSize: controlledPageSize,
  page: controlledPage,
  onPageChange,
  onPageSizeChange,
  totalItems,
  getRowClassName,
}: TableProps<T>) {
  // Internal pagination state (if not controlled)
  const [internalPage, setInternalPage] = useState(1);
  const [internalPageSize, setInternalPageSize] = useState(10);

  // Use controlled or internal state
  const currentPage = controlledPage ?? internalPage;
  const currentPageSize = controlledPageSize ?? internalPageSize;
  const total = totalItems ?? data.length;

  // Calculate paginated data
  const paginatedData = useMemo(() => {
    if (!pagination) return data;
    
    const startIndex = (currentPage - 1) * currentPageSize;
    const endIndex = startIndex + currentPageSize;
    return data.slice(startIndex, endIndex);
  }, [data, pagination, currentPage, currentPageSize]);

  // Calculate total pages
  const totalPages = Math.ceil(total / currentPageSize);

  // Handle page change
  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages) return;
    
    if (onPageChange) {
      onPageChange(newPage);
    } else {
      setInternalPage(newPage);
    }
  };

  // Handle page size change
  const handlePageSizeChange = (newPageSize: number) => {
    if (onPageSizeChange) {
      onPageSizeChange(newPageSize);
    } else {
      setInternalPageSize(newPageSize);
      setInternalPage(1); // Reset to first page
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-white/70">Loading...</div>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-white/70">{emptyMessage}</div>
      </div>
    );
  }

  const displayData = pagination ? paginatedData : data;

  return (
    <div className={className}>
      {/* Desktop Table View */}
      <div className="hidden lg:block overflow-x-auto rounded-lg">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-white/20 bg-white/5">
              {columns.map((column) => (
                <th
                  key={column.key}
                  className={`
                    px-4 py-3.5 text-left text-sm font-semibold text-white uppercase tracking-wider
                    ${column.headerClassName || ''}
                  `}
                >
                  {column.title}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {displayData.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                onClick={() => onRowClick?.(row, rowIndex)}
                className={`
                  border-b border-white/5 hover:bg-white/10 transition-colors
                  ${onRowClick ? 'cursor-pointer' : ''}
                  ${getRowClassName?.(row, rowIndex) ?? ''}
                `}
              >
                {columns.map((column) => {
                  const value = row[column.key];
                  const content = column.render
                    ? column.render(value, row, rowIndex)
                    : value ?? '—';

                  return (
                    <td
                      key={column.key}
                      className={`
                        px-4 py-3.5 text-sm text-white/80
                        ${column.className || ''}
                      `}
                    >
                      {content}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile/Tablet Card View */}
      <div className="lg:hidden space-y-4">
        {displayData.map((row, rowIndex) => (
          <div
            key={rowIndex}
            onClick={() => onRowClick?.(row, rowIndex)}
            className={`
              rounded-xl p-4 border border-white/20
              ${onRowClick ? 'cursor-pointer' : ''}
              transition-all duration-200
              ${getRowClassName?.(row, rowIndex) ?? ''}
            `}
          >
            {columns.map((column) => {
              const value = row[column.key];
              const content = column.render
                ? column.render(value, row, rowIndex)
                : value ?? '—';

              return (
                <div
                  key={column.key}
                  className="mb-2.5 last:mb-0 flex items-center justify-between"
                >
                  <span className="text-xs font-semibold text-white/60 uppercase tracking-wide">
                    {column.title}:
                  </span>
                  <span className={`
                    text-sm text-white/90 text-right flex-1 ml-2
                    ${column.className || ''}
                  `}>
                    {content}
                  </span>
                </div>
              );
            })}
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      {pagination && totalPages > 1 && (
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Page Size Selector */}
          <div className="flex items-center space-x-2">
            <span className="text-sm text-white/70">Show:</span>
            <select
              value={currentPageSize}
              onChange={(e) => handlePageSizeChange(Number(e.target.value))}
              className="px-3 py-1.5 bg-[#003a7a] border border-white/20 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-400 [&>option]:bg-gray-800 [&>option]:text-white"
            >
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
            </select>
            <span className="text-sm text-white/70">entries</span>
          </div>

          {/* Page Info */}
          <div className="text-sm text-white/70">
            Showing {((currentPage - 1) * currentPageSize) + 1} to {Math.min(currentPage * currentPageSize, total)} of {total} entries
          </div>

          {/* Page Navigation */}
          <div className="flex items-center space-x-2">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`
                p-2 rounded-lg border border-white/20 transition-colors
                ${currentPage === 1
                  ? 'opacity-50 cursor-not-allowed'
                  : 'hover:bg-white/10 cursor-pointer'
                }
              `}
            >
              <ChevronLeft className="w-4 h-4 text-white" />
            </button>

            {/* Page Numbers */}
            <div className="flex items-center space-x-1">
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                let pageNum: number;
                if (totalPages <= 5) {
                  pageNum = i + 1;
                } else if (currentPage <= 3) {
                  pageNum = i + 1;
                } else if (currentPage >= totalPages - 2) {
                  pageNum = totalPages - 4 + i;
                } else {
                  pageNum = currentPage - 2 + i;
                }

                return (
                  <button
                    key={pageNum}
                    onClick={() => handlePageChange(pageNum)}
                    className={`
                      min-w-[36px] px-3 py-1.5 rounded-lg text-sm font-medium transition-colors
                      ${currentPage === pageNum
                        ? 'bg-primary-500 text-white'
                        : 'text-white/70 hover:bg-white/10 border border-white/20'
                      }
                    `}
                  >
                    {pageNum}
                  </button>
                );
              })}
            </div>

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`
                p-2 rounded-lg border border-white/20 transition-colors
                ${currentPage === totalPages
                  ? 'opacity-50 cursor-not-allowed'
                  : 'hover:bg-white/10 cursor-pointer'
                }
              `}
            >
              <ChevronRight className="w-4 h-4 text-white" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

