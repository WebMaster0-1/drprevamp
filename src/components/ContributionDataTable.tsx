import React, { useState } from 'react';
import { Eye, ChevronRight } from 'lucide-react';

interface ContributionData {
  ref: string;
  tenor: string;
  bidRate: string;
  offerRate: string;
  inputter?: string;
  authoriser: string;
  inputDate: string;
  authorisedDate?: string;
  status: 'contribution' | 'pending' | 'sent';
}

const ContributionDataTable: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'contribution' | 'pending' | 'sent'>('contribution');

  const sampleData: ContributionData[] = [
    {
      ref: '123457',
      tenor: '1M',
      bidRate: '5.2000',
      offerRate: '5.7000',
      authoriser: 'john.doe@example.com',
      inputDate: '2024-10-02 11:30:00 AM',
      status: 'contribution'
    },
    {
      ref: '123458',
      tenor: '3M',
      bidRate: '5.4000',
      offerRate: '5.9000',
      inputter: 'jane.smith@example.com',
      authoriser: 'jane.smith@example.com',
      inputDate: '2024-10-02 10:15:00 AM',
      authorisedDate: '2024-10-02 11:00:00 AM',
      status: 'pending'
    },
    {
      ref: '123459',
      tenor: '6M',
      bidRate: '5.6000',
      offerRate: '6.1000',
      inputter: 'mike.wilson@example.com',
      authoriser: 'mike.wilson@example.com',
      inputDate: '2024-10-01 14:20:00 PM',
      authorisedDate: '2024-10-01 15:43:13 PM',
      status: 'sent'
    }
  ];

  const filteredData = sampleData.filter(item => item.status === activeTab);

  const tabs = [
    { id: 'contribution' as const, label: 'Contribution', count: sampleData.filter(d => d.status === 'contribution').length },
    { id: 'pending' as const, label: 'Pending Approval', count: sampleData.filter(d => d.status === 'pending').length },
    { id: 'sent' as const, label: 'Approved & Sent', count: sampleData.filter(d => d.status === 'sent').length }
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="px-6 py-4 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">NIBOR Contribution</h3>
        
        <div className="flex space-x-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                activeTab === tab.id
                  ? 'bg-blue-100 text-blue-700 border border-blue-200'
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
              }`}
            >
              {tab.label}
              {tab.count > 0 && (
                <span className={`ml-2 px-2 py-1 text-xs rounded-full ${
                  activeTab === tab.id
                    ? 'bg-blue-200 text-blue-800'
                    : 'bg-gray-200 text-gray-600'
                }`}>
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Ref
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Tenor
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Bid Rate
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Offer Rate
              </th>
              {(activeTab === 'pending' || activeTab === 'sent') && (
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Inputter
                </th>
              )}
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Authoriser
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Input Date
              </th>
              {(activeTab === 'pending' || activeTab === 'sent') && (
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Authorised Date
                </th>
              )}
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredData.map((item, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {item.ref}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {item.tenor}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {item.bidRate}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {item.offerRate}
                </td>
                {(activeTab === 'pending' || activeTab === 'sent') && (
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600">
                    {item.inputter}
                  </td>
                )}
                <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600">
                  {item.authoriser}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {item.inputDate}
                </td>
                {(activeTab === 'pending' || activeTab === 'sent') && (
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {item.authorisedDate}
                  </td>
                )}
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  <button className="text-blue-600 hover:text-blue-800 font-medium flex items-center space-x-1">
                    <Eye className="w-4 h-4" />
                    <span>View</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filteredData.length === 0 && (
        <div className="px-6 py-8 text-center text-gray-500">
          <p>No {activeTab} records found.</p>
        </div>
      )}
    </div>
  );
};

export default ContributionDataTable;