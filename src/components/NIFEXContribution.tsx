import React, { useState } from 'react';
import { X } from 'lucide-react';

interface NIFEXContributionProps {
  bankName: string;
  contributionDate: string;
}

interface ContributionRecord {
  ref: string;
  contributionDateTime: string;
  contributor: string;
  midRate: string;
  inputter: string;
  authoriser: string;
  authorisedDateTime: string;
  status: 'contribution' | 'pending' | 'approved';
}

const NIFEXContribution: React.FC<NIFEXContributionProps> = ({
  bankName,
  contributionDate
}) => {
  const [activeTab, setActiveTab] = useState<'contribution' | 'pending' | 'approved'>('contribution');
  const [midRate, setMidRate] = useState('');
  const [selectedAuthoriser, setSelectedAuthoriser] = useState('');
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<ContributionRecord | null>(null);
  const [updateMidRate, setUpdateMidRate] = useState('');
  const [updateAuthoriser, setUpdateAuthoriser] = useState('');
  const [recordToSend, setRecordToSend] = useState<ContributionRecord | null>(null);

  const [contributionRecords, setContributionRecords] = useState<ContributionRecord[]>([
    {
      ref: '236598',
      contributionDateTime: '2024-10-02 9:35:15 AM',
      contributor: 'United Bank for Africa PLC',
      midRate: '361.50',
      inputter: 'ayobami.akinrele@ubagroup.com',
      authoriser: 'sunday.kehinde@ubagroup.com',
      authorisedDateTime: '2024-10-02 9:43:13 AM',
      status: 'contribution'
    }
  ]);

  const filteredData = contributionRecords.filter(item => item.status === activeTab);

  const tabs = [
    { id: 'contribution' as const, label: 'Contribution' },
    { id: 'pending' as const, label: 'Pending Approval' },
    { id: 'approved' as const, label: 'Approved & Sent' }
  ];

  const handleSubmit = () => {
    if (midRate && selectedAuthoriser) {
      const now = new Date();
      const dateTimeString = now.toLocaleDateString('en-US', { 
        month: 'numeric', 
        day: 'numeric', 
        year: 'numeric' 
      }) + ' ' + now.toLocaleTimeString('en-US', { 
        hour: 'numeric', 
        minute: '2-digit', 
        second: '2-digit',
        hour12: true 
      });

      const newRecord: ContributionRecord = {
        ref: (Math.floor(Math.random() * 100000) + 200000).toString(),
        contributionDateTime: dateTimeString,
        contributor: 'United Bank for Africa PLC',
        midRate: midRate,
        inputter: 'ayobami.akinrele@ubagroup.com',
        authoriser: selectedAuthoriser,
        authorisedDateTime: '',
        status: 'contribution'
      };

      setContributionRecords([...contributionRecords, newRecord]);
      setMidRate('');
      setSelectedAuthoriser('');
    }
  };

  const handleUpdateClick = (record: ContributionRecord) => {
    setSelectedRecord(record);
    setUpdateMidRate(record.midRate);
    setUpdateAuthoriser(record.authoriser);
    setShowUpdateModal(true);
  };

  const handleUpdateRecord = () => {
    if (selectedRecord && updateMidRate && updateAuthoriser) {
      setContributionRecords(records =>
        records.map(record =>
          record.ref === selectedRecord.ref
            ? { ...record, midRate: updateMidRate, authoriser: updateAuthoriser }
            : record
        )
      );
      setShowUpdateModal(false);
      setSelectedRecord(null);
      setUpdateMidRate('');
      setUpdateAuthoriser('');
    }
  };

  const handleSendForApproval = (record: ContributionRecord) => {
    setRecordToSend(record);
    setShowConfirmModal(true);
  };

  const handleConfirmSend = () => {
    if (recordToSend) {
      const now = new Date();
      const authorisedDateTime = now.toLocaleDateString('en-US', { 
        month: 'numeric', 
        day: 'numeric', 
        year: 'numeric' 
      }) + ' ' + now.toLocaleTimeString('en-US', { 
        hour: 'numeric', 
        minute: '2-digit', 
        second: '2-digit',
        hour12: true 
      });

      setContributionRecords(records =>
        records.map(record =>
          record.ref === recordToSend.ref
            ? { ...record, status: 'pending' as const, authorisedDateTime }
            : record
        )
      );
      setShowConfirmModal(false);
      setShowSuccessModal(true);
    }
  };

  const handleSuccessClose = () => {
    setShowSuccessModal(false);
    setRecordToSend(null);
    setActiveTab('pending');
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">NIFEX Contribution</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Contribution Date
            </label>
            <input
              type="date"
              value={contributionDate}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              readOnly
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Mid Rate
            </label>
            <input
              type="number"
              step="0.01"
              value={midRate}
              onChange={(e) => setMidRate(e.target.value)}
              placeholder="Enter Mid Rate"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Authoriser
            </label>
            <select
              value={selectedAuthoriser}
              onChange={(e) => setSelectedAuthoriser(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Select Authoriser</option>
              <option value="sunday.kehinde@ubagroup.com">sunday.kehinde@ubagroup.com</option>
              <option value="ayobami.akinrele@ubagroup.com">ayobami.akinrele@ubagroup.com</option>
            </select>
          </div>
        </div>

        <div className="flex justify-end mb-6">
          <button
            onClick={handleSubmit}
            disabled={!midRate || !selectedAuthoriser}
            className="bg-gray-800 hover:bg-gray-900 disabled:bg-gray-300 disabled:cursor-not-allowed text-white px-6 py-2 rounded-md font-medium transition-colors"
          >
            Submit
          </button>
        </div>
      </div>

      <div className="border-t border-gray-200 pt-6">
        <div className="flex space-x-1 mb-4">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                activeTab === tab.id
                  ? 'bg-gray-100 text-gray-900 border border-gray-300'
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {activeTab === 'contribution' && (
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Action
                  </th>
                )}
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {activeTab === 'contribution' ? 'Action' : 'Ref'}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contribution Date/Time
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contributor
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Mid Rate
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Inputter
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Authoriser
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Authorised Date/Time
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredData.map((item, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  {activeTab === 'contribution' && (
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleSendForApproval(item)}
                          className="text-blue-600 hover:text-blue-800 font-medium underline"
                        >
                          Send for Approval
                        </button>
                      </div>
                    </td>
                  )}
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    {activeTab === 'contribution' ? (
                      <button
                        onClick={() => handleUpdateClick(item)}
                        className="text-blue-600 hover:text-blue-800 font-medium underline"
                      >
                        Update
                      </button>
                    ) : (
                      <span className="font-medium text-gray-900">{item.ref}</span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {item.contributionDateTime}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600">
                    {item.contributor}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {item.midRate}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600">
                    {item.inputter}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600">
                    {item.authoriser}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {item.authorisedDateTime}
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

      {/* Update Modal */}
      {showUpdateModal && selectedRecord && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">Update Record</h2>
              <button
                onClick={() => setShowUpdateModal(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Contribution Date:
                </label>
                <div className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-md text-sm text-gray-900">
                  {selectedRecord.contributionDateTime.split(' ')[0]}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Contributor:
                </label>
                <div className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-md text-sm text-gray-900">
                  United Bank for Africa PLC
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Mid Rate:
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={updateMidRate}
                  onChange={(e) => setUpdateMidRate(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Authoriser:
                </label>
                <select
                  value={updateAuthoriser}
                  onChange={(e) => setUpdateAuthoriser(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select Authoriser</option>
                  <option value="sunday.kehinde@ubagroup.com">sunday.kehinde@ubagroup.com</option>
                  <option value="ayobami.akinrele@ubagroup.com">ayobami.akinrele@ubagroup.com</option>
                </select>
              </div>
              
              <div className="flex justify-end space-x-3 pt-4">
                <button
                  onClick={() => setShowUpdateModal(false)}
                  className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md font-medium transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleUpdateRecord}
                  disabled={!updateMidRate || !updateAuthoriser}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-md font-medium transition-colors"
                >
                  Update Record
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Confirmation Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
            <div className="p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Send for Approval</h2>
              <p className="text-gray-600 mb-6">
                Click OK to send your NIFEX Contribution for approval.
              </p>
              
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setShowConfirmModal(false)}
                  className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md font-medium transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirmSend}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md font-medium transition-colors"
                >
                  OK
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
            <div className="p-6">
              <h2 className="text-lg font-semibold text-green-600 mb-4">Success!</h2>
              <p className="text-gray-600 mb-6">
                Your NIFEX Contribution has been sent to the Authoriser.
              </p>
              
              <div className="flex justify-end">
                <button
                  onClick={handleSuccessClose}
                  className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md font-medium transition-colors"
                >
                  OK
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NIFEXContribution;