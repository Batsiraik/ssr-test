'use client';

import { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard,
  Clock,
  Receipt,
  FileText,
  Wrench,
  Package,
  Users,
  Settings,
  ChevronDown,
  ChevronRight,
  Menu,
  X,
  LogOut,
  Search,
  ChevronRight as ChevronRightIcon
} from 'lucide-react';

interface MenuItem {
  title: string;
  icon: React.ReactNode;
  path?: string;
  submenu?: { title: string; path: string }[];
}

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
  user?: {
    fullName: string;
    email?: string;
    avatar?: string;
  };
}

export default function Sidebar({ isOpen, onToggle, user }: SidebarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [expandedMenus, setExpandedMenus] = useState<Record<string, boolean>>({});
  const [searchQuery, setSearchQuery] = useState('');

  const menuItems: MenuItem[] = [
    {
      title: 'Dashboard',
      icon: <LayoutDashboard className="w-5 h-5" />,
      submenu: [
        { title: 'Daily Cash', path: '/dashboard/daily-cash' },
        { title: 'Daily Activities', path: '/dashboard/daily-activities' },
        { title: 'Fuel Deliveries', path: '/dashboard/fuel-deliveries' },
        { title: 'LP Deliveries', path: '/dashboard/lp-deliveries' },
        { title: 'Subbed Assets', path: '/dashboard/subbed-assets' },
        { title: 'Customer Orders', path: '/dashboard/customer-orders' },
        { title: 'Customer Requests', path: '/dashboard/customer-requests' },
      ],
    },
    {
      title: 'Time Sheets',
      icon: <Clock className="w-5 h-5" />,
      submenu: [
        { title: 'Timesheets', path: '/timesheets' },
        { title: 'Time Sheet Summary', path: '/timesheets/summary' },
      ],
    },
    {
      title: 'Billing',
      icon: <Receipt className="w-5 h-5" />,
      submenu: [
        { title: 'Billing Required', path: '/billing/required' },
        { title: 'Bill Fuel', path: '/billing/bill-fuel' },
        { title: 'Awaiting Payment', path: '/billing/awaiting-payment' },
        { title: 'Awaiting Approval', path: '/billing/awaiting-approval' },
        { title: 'Historical Look Up', path: '/billing/historical' },
        { title: 'Active Awaiting Invoicing', path: '/billing/active-awaiting' },
        { title: 'Fuel To Be Billed', path: '/billing/fuel-to-bill' },
      ],
    },
    {
      title: 'Rental Agreement',
      icon: <FileText className="w-5 h-5" />,
      submenu: [
        { title: 'Create', path: '/rental-agreements/create' },
        { title: 'Active Rental Agreements', path: '/rental-agreements/active' },
        { title: 'Signed Awaiting Delivery', path: '/rental-agreements/signed-awaiting' },
        { title: 'Awaiting Return Delivery Unsigned', path: '/rental-agreements/awaiting-return' },
        { title: 'Historical Look Up', path: '/rental-agreements/historical' },
        { title: 'MOBILE VIEW', path: '/rental-agreements/mobile' },
        { title: 'BOLOs', path: '/rental-agreements/bolos' },
        { title: 'BOLIs', path: '/rental-agreements/bolis' },
        { title: 'Required Assets', path: '/rental-agreements/required-assets' },
      ],
    },
    {
      title: 'Work Orders/Quotes',
      icon: <Wrench className="w-5 h-5" />,
      submenu: [
        { title: 'Create Work Order/Quote', path: '/work-orders/create' },
        { title: 'Ready For Work', path: '/work-orders/ready' },
        { title: 'Waiting For P/O', path: '/work-orders/waiting-po' },
        { title: 'Waiting For Approval', path: '/work-orders/waiting-approval' },
        { title: 'Work Order Types', path: '/work-orders/types' },
        { title: 'Stolen/Missing', path: '/work-orders/stolen-missing' },
        { title: 'Work Orders', path: '/work-orders' },
        { title: 'Service Calls', path: '/work-orders/service-calls' },
        { title: 'Sub Rented Assets', path: '/work-orders/sub-rented' },
        { title: 'Automated Actions', path: '/work-orders/automated' },
      ],
    },
    {
      title: 'Assets',
      icon: <Package className="w-5 h-5" />,
      submenu: [
        { title: 'Assets', path: '/assets' },
        { title: 'Bulk Assets', path: '/assets/bulk' },
        { title: 'Charges', path: '/assets/charges' },
        { title: 'Packages', path: '/assets/packages' },
        { title: 'Flat Rate Assets', path: '/assets/flat-rate' },
        { title: 'Required Assets', path: '/assets/required' },
        { title: 'Parts', path: '/assets/parts' },
        { title: 'Write Offs', path: '/assets/write-offs' },
        { title: 'Makes', path: '/assets/makes' },
        { title: 'Models', path: '/assets/models' },
        { title: 'Asset Types', path: '/assets/types' },
        { title: 'Inspection Reports', path: '/assets/inspections' },
        { title: 'Maintenance', path: '/assets/maintenance' },
        { title: 'Missing/Stolen Reasons', path: '/assets/missing-stolen-reasons' },
      ],
    },
    {
      title: 'Customers',
      icon: <Users className="w-5 h-5" />,
      submenu: [
        { title: 'Companies', path: '/customers/companies' },
        { title: 'People', path: '/customers/people' },
        { title: 'Link Users to Company', path: '/customers/link-users' },
        { title: 'Sites', path: '/customers/sites' },
        { title: 'Suppliers', path: '/customers/suppliers' },
        { title: 'Asset Summary', path: '/customers/asset-summary' },
      ],
    },
    {
      title: 'Admin',
      icon: <Settings className="w-5 h-5" />,
      submenu: [
        { title: 'Admin', path: '/admin' },
        { title: 'Logout', path: '/logout' },
      ],
    },
  ];

  const toggleMenu = (title: string) => {
    setExpandedMenus((prev) => ({
      ...prev,
      [title]: !prev[title],
    }));
  };

  const handleLogout = () => {
    localStorage.removeItem('batsie_token');
    localStorage.removeItem('batsie_user');
    router.push('/auth/login');
  };

  const handleSubmenuClick = (path: string) => {
    if (path === '/logout') {
      handleLogout();
    } else {
      router.push(path);
    }
    // Close sidebar on mobile after navigation
    if (window.innerWidth < 1024) {
      onToggle();
    }
  };

  return (
    <>
      {/* Mobile Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/60 z-40 lg:hidden"
            onClick={onToggle}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{
          x: isOpen ? 0 : '-100%',
        }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className={`
          fixed lg:static
          top-0 left-0
          h-screen
          w-64 sm:w-72
          border-r border-white/10
          z-50
          flex flex-col
          overflow-hidden
          bg-[#0054a4] lg:bg-transparent
        `}
      >
        {/* Header */}
        <div className="px-4 sm:px-6 py-5 border-b border-white/10 flex items-center justify-between shrink-0">
          <div className="flex items-center space-x-3">
            <img
              src="/logo.png"
              alt="Super Sonic Rentals"
              className="w-10 h-10"
            />
            <h2 className="text-white font-bold text-lg hidden sm:block">
              Super Sonic Rentals
            </h2>
          </div>
          <button
            onClick={onToggle}
            className="lg:hidden p-2 rounded-lg hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5 text-white" />
          </button>
        </div>

        {/* Search Bar */}
        <div className="px-4 sm:px-6 py-4 border-b border-white/10 shrink-0">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/50" />
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-white/10 border border-white/10 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500/50 text-sm"
            />
          </div>
        </div>

        {/* Menu Items */}
        <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1 sidebar-scroll">
          {menuItems.map((item) => (
            <div key={item.title} className="mb-1">
              <button
                onClick={() => item.submenu && toggleMenu(item.title)}
                className={`
                  w-full flex items-center justify-between
                  px-4 py-3 rounded-lg
                  transition-all duration-200
                  group
                  ${
                    pathname?.startsWith(item.path || '')
                      ? 'text-white'
                      : 'text-white/70 hover:text-white'
                  }
                `}
              >
                <div className="flex items-center space-x-3">
                  <div className={`
                    ${pathname?.startsWith(item.path || '') 
                      ? 'text-white' 
                      : 'text-white/70 group-hover:text-white'
                    } transition-colors
                  `}>
                    {item.icon}
                  </div>
                  <span className="font-medium" style={{ fontSize: '1rem', lineHeight: '2.25rem' }}>{item.title}</span>
                </div>
                {item.submenu && (
                  <motion.div
                    animate={{
                      rotate: expandedMenus[item.title] ? 90 : 0,
                    }}
                    transition={{ duration: 0.2 }}
                    className="text-white/50 group-hover:text-white/70"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </motion.div>
                )}
              </button>

              {/* Submenu */}
              <AnimatePresence>
                {item.submenu && expandedMenus[item.title] && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden mt-1"
                  >
                    <div className="ml-2 pl-4 border-l-2 border-white/10 space-y-0.5">
                      {item.submenu.map((subItem) => (
                        <button
                          key={subItem.path}
                          onClick={() => handleSubmenuClick(subItem.path)}
                          className={`
                            w-full text-left px-4 py-2.5 rounded-lg
                            transition-all duration-200
                            text-sm
                            ${
                              pathname === subItem.path
                                ? 'text-white font-medium'
                                : 'text-white/60 hover:text-white/90'
                            }
                          `}
                        >
                          {subItem.title}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </nav>

        {/* User Profile Section */}
        {user && (
          <div className="border-t border-white/10 px-4 sm:px-6 py-4 shrink-0">
            <div className="flex items-center space-x-3 group cursor-pointer hover:bg-white/5 rounded-lg p-2 -mx-2 transition-colors">
              <div className="w-10 h-10 rounded-full bg-[#0054a4] flex items-center justify-center text-white font-semibold text-sm shrink-0">
                {user.avatar ? (
                  <img
                    src={user.avatar}
                    alt={user.fullName}
                    className="w-full h-full rounded-full object-cover"
                  />
                ) : (
                  <span>{user.fullName.charAt(0).toUpperCase()}</span>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white font-medium text-sm truncate">
                  {user.fullName}
                </p>
                {user.email && (
                  <p className="text-white/60 text-xs truncate">
                    {user.email}
                  </p>
                )}
              </div>
              <ChevronRightIcon className="w-4 h-4 text-white/50 group-hover:text-white/70 transition-colors shrink-0" />
            </div>
          </div>
        )}
      </motion.aside>
    </>
  );
}

