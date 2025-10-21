import React, { useState } from 'react';
import Header from '../components/Header';
import NavigationTabs from '../components/NavigationTabs';
import FixingsSection from '../components/FixingsSection';
import TradeDataSection from '../components/TradeDataSection';

const UniversalInputterDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('fixings');

  const renderContent = () => {
    switch (activeTab) {
      case 'fixings':
        return <FixingsSection />;
      case 'trade-data':
        return <TradeDataSection />;
      case 'money-market':
        return (
          <div className="p-6">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Money Market</h2>
              <p className="text-gray-600">Money market analysis tools coming soon.</p>
            </div>
          </div>
        );
      default:
        return <FixingsSection />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <NavigationTabs activeTab={activeTab} onTabChange={setActiveTab} />
      <main className="min-h-screen">
        {renderContent()}
      </main>
    </div>
  );
};

export default UniversalInputterDashboard;
