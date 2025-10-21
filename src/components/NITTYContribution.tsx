import React, { useState } from 'react';
import { X } from 'lucide-react';

interface RateData {
  id: string;
  tenor: string;
  bidRate: string;
  offerRate: string;
}

interface ContributionRecord {
  ref: string;
  tenor: string;
  bidRate: string;
  offerRate: string;
  inputter: string;
  authoriser: string;
  inputDate: string;
  authorisedDate?: string;
  status: 'contribution' | 'pending' | 'approved';
  isUpdated?: boolean;
}

interface NITTYContributionProps {
  bankName: string;
  contributionDate: string;
}

const NITTYContribution: React.FC<NITTYContributionProps> = ({
  bankName,
  contributionDate
}) => {
  const [activeTab, setActiveTab] = useState<'contribution' | 'pending' | 'approved'>('contribution');
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<ContributionRecord | null>(null);
  const [updateBidRate, setUpdateBidRate] = useState('');
  const [updateOfferRate, setUpdateOfferRate] = useState('');
  const [recordToSend, setRecordToSend] = useState<ContributionRecord | null>(null);

  const [contributionRecords, setContributionRecords] = useState<ContributionRecord[]>([
    {
      ref: '123456',
      tenor: '91 Days',
      bidRate: '15.80',
      offerRate: '16.20',
      authoriser: 'deinma.iyagba@ubagroup.com',
      inputDate: '2025-06-02 08:39:41 AM',
      status: 'contribution'
    },
    {
      ref: '123457',
      tenor: '182 Days',
      bidRate: '16.50',
      offerRate: '16.85',
      authoriser: 'patrica.obazee@ubagroup.com',
      inputDate: '2025-10-02 11:39:41 AM',
      status: 'contribution'
    },
    {
      ref: '123458',
      tenor: '364 Days',
      bidRate: '17.20',
      offerRate: '17.60',
      authoriser: 'chuka.nwachukwu@ubagroup.com',
      inputDate: '2025-11-02 09:39:41 AM',
      status: 'contribution'
    }
  ]);

  const tabs = [
    { id: 'contribution' as const, label: 'Contribution' },
    { id: 'pending' as const, label: 'Pending Approval' },
    { id: 'approved' as const, label: 'Approved & Sent' }
  ];

  const handleUpdateClick = (record: ContributionRecord) => {
    setSelectedRecord(record);
    setUpdateBidRate(record.bidRate);
    setUpdateOfferRate(record.offerRate);
    setShowUpdateModal(true);
  };

  const handleUpdateRecord = () => {
    if (selectedRecord && updateBidRate && updateOfferRate) {
      setContributionRecords(records =>
        records.map(record =>
          record.ref === selectedRecord.ref
            ? { ...record, bidRate: updateBidRate, offerRate: updateOfferRate }
            : record
        )
      );
      setShowUpdateModal(false);
      setSelectedRecord(null);
      setUpdateBidRate('');
      setUpdateOfferRate('');
    }
  };

  const handleSendForApproval = (record: ContributionRecord) => {
    setRecordToSend(record);
    setShowConfirmModal(true);
  };

  const handleConfirmSend = () => {
    if (recordToSend) {
      setContributionRecords(records =>
        records.map(record =>
          record.ref === recordToSend.ref
            ? { ...record, status: 'pending' as const }
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

  const filteredData = contributionRecords.filter(item => item.status === activeTab);

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-2">NITTY Contribution</h2>
        <div className="flex items-center space-x-4 text-sm text-gray-600 border-l-4 border-blue-500 pl-4 py-2 bg-blue-50 rounded">
          <span className="font-medium text-blue-700">{bankName}</span>
          <span>•</span>
          <span>Contribution Date: {contributionDate}</span>
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
                  <>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      ACTION
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      ACTION
                    </th>
                  </>
                )}
                {activeTab !== 'contribution' && (
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    REF
                  </th>
                )}
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  TENOR
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  BID RATE
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  OFFER RATE
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  AUTHORISER
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  INPUT DATE
                </th>
                {(activeTab === 'pending' || activeTab === 'approved') && (
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    AUTHORISED DATE
                  </th>
                )}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredData.map((item, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  {activeTab === 'contribution' && (
                    <>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <button
                          onClick={() => handleSendForApproval(item)}
                          className="text-blue-600 hover:text-blue-800 font-medium underline"
                        >
                          Send for Approval
                        </button>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <button
                          onClick={() => handleUpdateClick(item)}
                          className="text-blue-600 hover:text-blue-800 font-medium underline"
                        >
                          Update
                        </button>
                      </td>
                    </>
                  )}
                  {activeTab !== 'contribution' && (
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {item.ref}
                    </td>
                  )}
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {item.tenor}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {item.bidRate}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {item.offerRate}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600">
                    {item.authoriser}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {item.inputDate}
                  </td>
                  {(activeTab === 'pending' || activeTab === 'approved') && (
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {item.authorisedDate}
                    </td>
                  )}
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
                  {contributionDate}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Contributor:
                </label>
                <div className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-md text-sm text-gray-900">
                  {bankName}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tenor:
                </label>
                <div className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-md text-sm text-gray-900">
                  {selectedRecord.tenor}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Bid Rate:
                </label>
                <input
                  type="text"
                  value={updateBidRate}
                  onChange={(e) => setUpdateBidRate(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Offer Rate:
                </label>
                <input
                  type="text"
                  value={updateOfferRate}
                  onChange={(e) => setUpdateOfferRate(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
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
                  disabled={!updateBidRate || !updateOfferRate}
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
                Click OK to send your NITTY Contribution for approval.
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
                Your NITTY Contribution has been sent to the Authoriser.
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

export default NITTYContribution;