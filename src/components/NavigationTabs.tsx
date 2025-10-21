import React from 'react';

interface NavigationTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const NavigationTabs: React.FC<NavigationTabsProps> = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: 'fixings', label: 'Fixings' },
    { id: 'trade-data', label: 'Trade Data' },
    { id: 'money-market', label: 'Money Market' }
  ];

  return (
    <nav className="bg-gray-50 border-b border-gray-200">
      <div className="px-6">
        <div className="flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === tab.id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default NavigationTabs;