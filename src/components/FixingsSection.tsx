import React, { useState } from 'react';
import ContributionCard from './ContributionCard';
import RateInputTable from './RateInputTable';
import ContributionDataTable from './ContributionDataTable';
import NAFEXContribution from './NAFEXContribution';
import NIFEXContribution from './NIFEXContribution';
import NITTYContribution from './NITTYContribution';
import { CheckCircle2 } from 'lucide-react';

const FixingsSection: React.FC = () => {
  const [activeContribution, setActiveContribution] = useState<string>('nibor');
  const [view, setView] = useState<'input' | 'data'>('input');

  const contributions = [
    {
      id: 'nibor',
      title: 'NIBOR Contribution',
      subtitle: 'Nigerian Interbank Offered Rate',
      isCompleted: true
    },
    {
      id: 'nitty',
      title: 'NITTY Contribution',
      subtitle: 'Nigerian Treasury Bills',
      isCompleted: false
    },
    {
      id: 'nafex',
      title: 'NAFEX Contribution',
      subtitle: 'Nigerian Foreign Exchange',
      isCompleted: false
    },
    {
      id: 'nifex',
      title: 'NIFEX Contribution',
      subtitle: 'Nigerian Interbank FX',
      isCompleted: false
    }
  ];

  const getContributionDetails = (id: string) => {
    const details = {
      nibor: { name: 'NIBOR', bank: 'United Bank for Africa PLC', date: '10/5/2024' },
      nitty: { name: 'NITTY', bank: 'First Bank of Nigeria PLC', date: '10/5/2024' },
      nafex: { name: 'NAFEX', bank: 'Zenith Bank PLC', date: '10/5/2024' },
      nifex: { name: 'NIFEX', bank: 'Access Bank PLC', date: '10/5/2024' }
    };
    return details[id as keyof typeof details];
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <CheckCircle2 className="w-8 h-8 text-green-500" />
          <h1 className="text-2xl font-bold text-gray-900">Fixings Management</h1>
        </div>
        
        <div className="flex space-x-2">
          <button
            onClick={() => setView('input')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              view === 'input'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Rate Input
          </button>
          <button
            onClick={() => setView('data')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              view === 'data'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Data View
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {contributions.map((contribution) => (
          <ContributionCard
            key={contribution.id}
            id={contribution.id}
            title={contribution.title}
            subtitle={contribution.subtitle}
            isActive={activeContribution === contribution.id}
            isCompleted={contribution.isCompleted}
            onClick={setActiveContribution}
          />
        ))}
      </div>

      <div className="mt-8">
        {view === 'input' ? (
          <>
            {activeContribution === 'nibor' && (
              <RateInputTable
                contributionType={getContributionDetails(activeContribution).name}
                bankName={getContributionDetails(activeContribution).bank}
                contributionDate={getContributionDetails(activeContribution).date}
              />
            )}
            {activeContribution === 'nitty' && (
              <NITTYContribution
                bankName={getContributionDetails(activeContribution).bank}
                contributionDate={getContributionDetails(activeContribution).date}
              />
            )}
            {activeContribution === 'nafex' && (
              <NAFEXContribution
                bankName={getContributionDetails(activeContribution).bank}
                contributionDate={getContributionDetails(activeContribution).date}
              />
            )}
            {activeContribution === 'nifex' && (
              <NIFEXContribution
                bankName={getContributionDetails(activeContribution).bank}
                contributionDate={getContributionDetails(activeContribution).date}
              />
            )}
          </>
        ) : (
          <ContributionDataTable />
        )}
      </div>
    </div>
  );
};

export default FixingsSection;