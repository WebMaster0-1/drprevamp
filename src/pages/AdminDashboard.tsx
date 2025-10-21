import React from 'react';
import Header from '../components/Header';
import {
  TrendingUp,
  Users,
  FileText,
  Database,
  Edit,
  Award,
  Upload,
  Shield,
  DollarSign,
  RefreshCw,
  FileSpreadsheet,
  BarChart3,
  Calendar,
  Globe,
  PieChart,
  Search,
  Settings
} from 'lucide-react';

interface DashboardCard {
  title: string;
  icon: React.ReactNode;
}

const AdminDashboard: React.FC = () => {
  const dashboardItems: DashboardCard[] = [
    { title: 'Last Traded Prices', icon: <TrendingUp className="w-12 h-12" /> },
    { title: 'Manage User & Member', icon: <Users className="w-12 h-12" /> },
    { title: 'Fees Administration', icon: <FileSpreadsheet className="w-12 h-12" /> },
    { title: 'View NIBOR Contributions', icon: <Database className="w-12 h-12" /> },
    { title: 'NIBOR List', icon: <FileText className="w-12 h-12" /> },
    { title: 'NIBOR Setup', icon: <Settings className="w-12 h-12" /> },
    { title: 'View NITTY Contributions', icon: <Database className="w-12 h-12" /> },
    { title: 'NITTY List', icon: <FileText className="w-12 h-12" /> },
    { title: 'NITTY Setup', icon: <Settings className="w-12 h-12" /> },
    { title: 'Edit Trade Data', icon: <Edit className="w-12 h-12" /> },
    { title: 'Ranking', icon: <Award className="w-12 h-12" /> },
    { title: 'Upload Data', icon: <Upload className="w-12 h-12" /> },
    { title: 'Setup Securities', icon: <Shield className="w-12 h-12" /> },
    { title: 'Upload Direct Data Entry', icon: <Upload className="w-12 h-12" /> },
    { title: 'Surveillance', icon: <Search className="w-12 h-12" /> },
    { title: 'Update Other Trades', icon: <Edit className="w-12 h-12" /> },
    { title: 'Daily Prices', icon: <BarChart3 className="w-12 h-12" /> },
    { title: 'Update Fee Collected', icon: <DollarSign className="w-12 h-12" /> },
    { title: 'Weekly FX Conversion Rates', icon: <RefreshCw className="w-12 h-12" /> },
    { title: 'Non-Sovereign Securities Settlement via CSCS', icon: <FileText className="w-12 h-12" /> },
    { title: 'Approve NAFEM Trade Data', icon: <FileSpreadsheet className="w-12 h-12" /> },
    { title: 'View NAFEM Trade Data', icon: <Database className="w-12 h-12" /> },
    { title: 'View NAFEX Contributions', icon: <Database className="w-12 h-12" /> },
    { title: 'NAFEX LIST', icon: <FileText className="w-12 h-12" /> },
    { title: 'View NIFEX Contributions', icon: <Database className="w-12 h-12" /> },
    { title: 'NIFEX List', icon: <FileText className="w-12 h-12" /> },
    { title: 'Upload FIOR', icon: <Upload className="w-12 h-12" /> },
    { title: 'Upload BLOT', icon: <Upload className="w-12 h-12" /> },
    { title: 'View Turnover Report', icon: <BarChart3 className="w-12 h-12" /> },
    { title: 'Mutual Funds', icon: <PieChart className="w-12 h-12" /> },
    { title: 'Public Holidays', icon: <Calendar className="w-12 h-12" /> },
    { title: 'Money Market', icon: <DollarSign className="w-12 h-12" /> },
    { title: 'Short Dated Forwards', icon: <FileText className="w-12 h-12" /> },
    { title: 'Trade Data Reconciliation', icon: <Users className="w-12 h-12" /> },
    { title: 'Weekly CBN s4 Refund', icon: <Globe className="w-12 h-12" /> },
    { title: 'Non-Sovereign Securities Trades', icon: <FileSpreadsheet className="w-12 h-12" /> },
    { title: 'Report Generation', icon: <BarChart3 className="w-12 h-12" /> },
    { title: 'Member-Client Bonds Trade Data', icon: <Upload className="w-12 h-12" /> },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Admin Dashboard
          </h1>
          <p className="text-gray-600">
            FMDQ View & Authorisation
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {dashboardItems.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow cursor-pointer group"
            >
              <div className="flex flex-col items-center text-center space-y-3">
                <div className="text-gray-700 group-hover:text-yellow-600 transition-colors">
                  {item.icon}
                </div>
                <h3 className="text-sm font-medium text-gray-900 leading-tight">
                  {item.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
