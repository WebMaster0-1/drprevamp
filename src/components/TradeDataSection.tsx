import React, { useState } from 'react';
import TradeDataCard from './TradeDataCard';
import DirectDataEntry from './DirectDataEntry';
import FileUpload from './FileUpload';
import { 
  Upload, 
  FileText, 
  DollarSign, 
  TrendingUp, 
  Eye, 
  AlertTriangle,
  CreditCard,
  BarChart3,
  FileUp
} from 'lucide-react';

const TradeDataSection: React.FC = () => {
  const [activeModule, setActiveModule] = useState<string | null>(null);

  const modules = [
    {
      id: 'file-upload',
      title: 'File Upload',
      icon: Upload
    },
    {
      id: 'direct-data-entry',
      title: 'Direct Data Entry',
      icon: FileText
    },
    {
      id: 'weekly-fx-conversion',
      title: 'Weekly FX Conversion Rates',
      icon: DollarSign
    },
    {
      id: 'nafem-fx-submission',
      title: 'NAFEM FX Trade Data Submission',
      icon: TrendingUp
    },
    {
      id: 'view-nafem-data',
      title: 'View NAFEM Trade Data',
      icon: Eye
    },
    {
      id: 'unsettled-fixed-income',
      title: 'Unsettled Fixed Income Trades',
      icon: AlertTriangle
    },
    {
      id: 'weekly-cbn-refund',
      title: 'Input Weekly CBN S4 Refund',
      icon: CreditCard
    },
    {
      id: 'non-sovereign-securities',
      title: 'Non-Sovereign Securities Trade Data',
      icon: BarChart3
    },
    {
      id: 'member-client-bonds',
      title: 'Member-Client Bonds Trade Data',
      icon: FileUp
    }
  ];

  const handleModuleClick = (moduleId: string) => {
    setActiveModule(moduleId);
  };

  const handleBackToModules = () => {
    setActiveModule(null);
  };
  const renderModuleContent = () => {
    if (!activeModule) return null;

    const module = modules.find(m => m.id === activeModule);
    
    // Handle Direct Data Entry specifically
    if (activeModule === 'direct-data-entry') {
      return <DirectDataEntry onBack={handleBackToModules} />;
    }
    
    // Handle File Upload specifically
    if (activeModule === 'file-upload') {
      return <FileUpload onBack={handleBackToModules} />;
    }
    
    return (
      <div className="mt-8 bg-white rounded-lg shadow-sm border border-gray-200 p-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">{module?.title}</h2>
          <button
            onClick={handleBackToModules}
            className="text-gray-500 hover:text-gray-700 text-sm font-medium"
          >
            ← Back to Modules
          </button>
        </div>
        
        <div className="text-center py-12">
          <div className="mb-4">
            {module && <module.icon className="w-16 h-16 text-gray-400 mx-auto" />}
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">{module?.title}</h3>
          <p className="text-gray-600 mb-6">
            This module is currently under development. Full functionality will be available soon.
          </p>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 max-w-md mx-auto">
            <p className="text-blue-700 text-sm">
              For assistance with {module?.title.toLowerCase()}, please contact the FMDQ support team.
            </p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Trade Data</h1>
      </div>

      {!activeModule && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {modules.map((module) => (
            <TradeDataCard
              key={module.id}
              id={module.id}
              title={module.title}
              icon={module.icon}
              onClick={handleModuleClick}
            />
          ))}
        </div>
      )}

      {renderModuleContent()}
    </div>
  );
};

export default TradeDataSection;