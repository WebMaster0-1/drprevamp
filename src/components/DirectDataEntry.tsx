import React, { useState } from 'react';
import { ArrowLeft, Plus, Search, Calendar, X } from 'lucide-react';

const completedTradeData = [
  {
    tdRef: '5570600',
    tradeType: 'Inter-member Trades',
    market: 'Foreign Exchange',
    product: 'FX Spot (USD/NGN)',
    currency: 'USD Equivalent',
    broker: 'Nil',
    noOfTrades: 1,
    faceValue: 206636842.32,
    comments: ''
  },
  {
    tdRef: '5570609',
    tradeType: 'Inter-member Trades',
    market: 'Foreign Exchange',
    product: 'FX Spot Sales (NAFEM)',
    currency: 'USD Equivalent',
    broker: 'Nil',
    noOfTrades: 8,
    faceValue: 9207000.00,
    comments: ''
  },
  {
    tdRef: '5570610',
    tradeType: 'Inter-member Trades',
    market: 'Foreign Exchange',
    product: 'FX Spot Purchases (NAFEM)',
    currency: 'USD Equivalent',
    broker: 'Nil',
    noOfTrades: 4,
    faceValue: 719953.00,
    comments: ''
  },
  {
    tdRef: '5570623',
    tradeType: 'Inter-member Trades',
    market: 'Treasury Bills',
    product: 'NT.Bills',
    currency: 'Naira',
    broker: 'Nil',
    noOfTrades: 7,
    faceValue: 6040000000.00,
    comments: ''
  },
  {
    tdRef: '5570624',
    tradeType: 'Inter-member Trades',
    market: 'Bonds',
    product: 'FGN Bonds',
    currency: 'Naira',
    broker: 'Nil',
    noOfTrades: 36,
    faceValue: 20000000000.00,
    comments: ''
  },
  {
    tdRef: '5570636',
    tradeType: 'Inter-member Trades',
    market: 'REPO',
    product: 'Open Repo by T.Bills',
    currency: 'Naira',
    broker: 'Nil',
    noOfTrades: 39,
    faceValue: 1559700000000.00,
    comments: ''
  }
];

const submissionTradeData: TradeDataRow[] = [
  { action: '225330', tradeType: 'Inter-member Trades', market: 'Foreign Exchange', product: 'FX Spot (USD/NGN)', currency: 'USD Equivalent', broker: 'Nil', noOfTrades: 10, faceValue: 19999999, comments: '' },
  { action: '225331', tradeType: 'Inter-member Trades', market: 'Foreign Exchange', product: 'FX Spot (Other FCY/NGN - GBP/NGN; EUR/NGN;...)', currency: 'USD Equivalent', broker: 'Nil', noOfTrades: 0, faceValue: 0, comments: '' },
  { action: '225332', tradeType: 'Inter-member Trades', market: 'Foreign Exchange', product: 'FX Spot (Third Currencies- GBP/USD; USD/CNY; .)', currency: 'USD Equivalent', broker: 'Nil', noOfTrades: 0, faceValue: 0, comments: '' },
  { action: '225333', tradeType: 'Inter-member Trades', market: 'Foreign Exchange', product: 'FX Forwards', currency: 'USD Equivalent', broker: 'Nil', noOfTrades: 0, faceValue: 0, comments: '' },
  { action: '225334', tradeType: 'Inter-member Trades', market: 'Foreign Exchange', product: 'FX Swaps', currency: 'USD Equivalent', broker: 'Nil', noOfTrades: 0, faceValue: 0, comments: '' },
  { action: '225335', tradeType: 'Inter-member Trades', market: 'Foreign Exchange', product: 'FX Options', currency: 'USD Equivalent', broker: 'Nil', noOfTrades: 0, faceValue: 0, comments: '' },
  { action: '225336', tradeType: 'Inter-member Trades', market: 'Foreign Exchange', product: 'FX Futures', currency: 'USD Equivalent', broker: 'Nil', noOfTrades: 0, faceValue: 0, comments: '' },
  { action: '225337', tradeType: 'Inter-member Trades', market: 'Foreign Exchange', product: 'Cross Currency Interest Rate Swaps', currency: 'USD Equivalent', broker: 'Nil', noOfTrades: 0, faceValue: 0, comments: '' },
  { action: '225338', tradeType: 'Inter-member Trades', market: 'Foreign Exchange', product: 'Other FX Derivatives', currency: 'USD Equivalent', broker: 'Nil', noOfTrades: 0, faceValue: 0, comments: '' },
  { action: '225339', tradeType: 'Inter-member Trades', market: 'Foreign Exchange', product: 'FMDQ FX Spot Sales', currency: 'USD Equivalent', broker: 'Nil', noOfTrades: 0, faceValue: 0, comments: '' },
  { action: '225340', tradeType: 'Inter-member Trades', market: 'Foreign Exchange', product: 'FMDQ FX Spot Purchases', currency: 'USD Equivalent', broker: 'Nil', noOfTrades: 0, faceValue: 0, comments: '' },
  { action: '225341', tradeType: 'Inter-member Trades', market: 'Foreign Exchange', product: 'FMDQ FX Forwards Sales', currency: 'USD Equivalent', broker: 'Nil', noOfTrades: 0, faceValue: 0, comments: '' },
  { action: '225342', tradeType: 'Inter-member Trades', market: 'Foreign Exchange', product: 'FMDQ FX Forwards Purchases', currency: 'USD Equivalent', broker: 'Nil', noOfTrades: 0, faceValue: 0, comments: '' },
  { action: '225343', tradeType: 'Inter-member Trades', market: 'Money Market', product: 'Money Market (Unsecured Placement)', currency: 'Naira', broker: 'Nil', noOfTrades: 0, faceValue: 0, comments: '' },
  { action: '225344', tradeType: 'Inter-member Trades', market: 'Money Market', product: 'Money Market (Unsecured Taking)', currency: 'Naira', broker: 'Nil', noOfTrades: 0, faceValue: 0, comments: '' },
  { action: '225345', tradeType: 'Inter-member Trades', market: 'Money Market', product: 'Interest Rate Swaps', currency: 'Naira', broker: 'Nil', noOfTrades: 0, faceValue: 0, comments: '' },
  { action: '225346', tradeType: 'Inter-member Trades', market: 'Money Market', product: 'Other Money Market Derivatives', currency: 'Naira', broker: 'Nil', noOfTrades: 0, faceValue: 0, comments: '' },
  { action: '225347', tradeType: 'Inter-member Trades', market: 'Money Market', product: "Bankers' Acceptances", currency: 'Naira', broker: 'Nil', noOfTrades: 0, faceValue: 0, comments: '' },
  { action: '225348', tradeType: 'Inter-member Trades', market: 'Money Market', product: 'Commercial Papers', currency: 'Naira', broker: 'Nil', noOfTrades: 0, faceValue: 0, comments: '' },
  { action: '225349', tradeType: 'Inter-member Trades', market: 'Money Market', product: 'Money Market - FCY (Unsecured Placement)', currency: 'USD Equivalent', broker: 'Nil', noOfTrades: 0, faceValue: 0, comments: '' },
  { action: '225350', tradeType: 'Inter-member Trades', market: 'Money Market', product: 'Money Market - FCY (Unsecured Taking)', currency: 'USD Equivalent', broker: 'Nil', noOfTrades: 0, faceValue: 0, comments: '' },
  { action: '225351', tradeType: 'Inter-member Trades', market: 'Money Market', product: 'Money Market - FCY (Secured Placement)', currency: 'USD Equivalent', broker: 'Nil', noOfTrades: 0, faceValue: 0, comments: '' },
  { action: '225352', tradeType: 'Inter-member Trades', market: 'Money Market', product: 'Money Market - FCY (Secured Taking)', currency: 'USD Equivalent', broker: 'Nil', noOfTrades: 0, faceValue: 0, comments: '' },
  { action: '225353', tradeType: 'Inter-member Trades', market: 'Treasury Bills', product: 'NT.Bills', currency: 'Naira', broker: 'Nil', noOfTrades: 0, faceValue: 0, comments: '' },
  { action: '225354', tradeType: 'Inter-member Trades', market: 'Bonds', product: 'FGN Bonds', currency: 'Naira', broker: 'Nil', noOfTrades: 0, faceValue: 0, comments: '' },
  { action: '225355', tradeType: 'Inter-member Trades', market: 'Bonds', product: 'Agency Bonds', currency: 'Naira', broker: 'Nil', noOfTrades: 0, faceValue: 0, comments: '' },
  { action: '225356', tradeType: 'Inter-member Trades', market: 'Bonds', product: 'State Bonds', currency: 'Naira', broker: 'Nil', noOfTrades: 0, faceValue: 0, comments: '' },
  { action: '225357', tradeType: 'Inter-member Trades', market: 'Bonds', product: 'Corporate Bonds', currency: 'Naira', broker: 'Nil', noOfTrades: 0, faceValue: 0, comments: '' },
  { action: '225358', tradeType: 'Inter-member Trades', market: 'Bonds', product: 'Supranational Bonds', currency: 'Naira', broker: 'Nil', noOfTrades: 0, faceValue: 0, comments: '' },
  { action: '225359', tradeType: 'Inter-member Trades', market: 'Bonds', product: 'Eurobond - Corporates', currency: 'USD Equivalent', broker: 'Nil', noOfTrades: 0, faceValue: 0, comments: '' },
  { action: '225360', tradeType: 'Inter-member Trades', market: 'Bonds', product: 'Eurobond - FGN', currency: 'USD Equivalent', broker: 'Nil', noOfTrades: 0, faceValue: 0, comments: '' },
  { action: '225361', tradeType: 'Inter-member Trades', market: 'REPO', product: 'Term Repo by bonds', currency: 'Naira', broker: 'Nil', noOfTrades: 0, faceValue: 0, comments: '' }
];

interface DirectDataEntryProps {
  onBack: () => void;
}

interface WeekEndingData {
  date: string;
  status: 'submissions' | 'pending-approval' | 'awaiting' | 'completed';
}

interface TradeDataRow {
  action: string;
  tradeType: string;
  market: string;
  product: string;
  currency: string;
  broker: string;
  noOfTrades: number;
  faceValue: number;
  comments: string;
}

const DirectDataEntry: React.FC<DirectDataEntryProps> = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState<'submissions' | 'pending-approval' | 'awaiting' | 'completed'>('submissions');
  const [showModal, setShowModal] = useState(false);
  const [showApprovalModal, setShowApprovalModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedWeekEnding, setSelectedWeekEnding] = useState<string | null>(null);
  const [selectedApprover, setSelectedApprover] = useState('');
  const [tradeDataRows, setTradeDataRows] = useState<TradeDataRow[]>(submissionTradeData);
  const [weekEndingData, setWeekEndingData] = useState<WeekEndingData[]>([
    { date: '7/5/2024', status: 'completed' },
    { date: '6/28/2024', status: 'completed' },
    { date: '6/21/2024', status: 'completed' },
    { date: '6/14/2024', status: 'completed' },
    { date: '6/7/2024', status: 'completed' },
    { date: '5/31/2024', status: 'completed' }
  ]);

  const tabs = [
    { id: 'submissions' as const, label: 'Submission(s)' },
    { id: 'pending-approval' as const, label: 'Pending Approval' },
    { id: 'awaiting' as const, label: 'Awaiting FMDQ Upload' },
    { id: 'completed' as const, label: 'Completed' }
  ];

  const handleCreateTemplate = () => {
    if (selectedDate) {
      const newTemplate: WeekEndingData = {
        date: selectedDate,
        status: 'submissions'
      };
      setWeekEndingData([newTemplate, ...weekEndingData]);
      setShowModal(false);
      setSelectedDate('');
      setActiveTab('submissions');
    }
  };

  const handleWeekEndingClick = (date: string) => {
    if (activeTab === 'completed') {
      setSelectedWeekEnding(date);
    } else if (activeTab === 'submissions') {
      setSelectedWeekEnding(date);
    }
  };

  const handleBackToDateSelection = () => {
    setSelectedWeekEnding(null);
  };

  const handleSave = () => {
    setShowApprovalModal(true);
  };

  const handleSendForApproval = () => {
    if (selectedApprover) {
      setShowApprovalModal(false);
      setShowConfirmModal(true);
    }
  };

  const handleConfirmSend = () => {
    setShowConfirmModal(false);
    setShowSuccessModal(true);
    
    // Move the current week ending to pending approval
    if (selectedWeekEnding) {
      setWeekEndingData(data => 
        data.map(item => 
          item.date === selectedWeekEnding 
            ? { ...item, status: 'pending-approval' as const }
            : item
        )
      );
    }
  };

  const handleSuccessClose = () => {
    setShowSuccessModal(false);
    setSelectedApprover('');
    setSelectedWeekEnding(null);
    setActiveTab('pending-approval');
  };

  const updateTradeDataRow = (index: number, field: 'noOfTrades' | 'faceValue' | 'comments', value: string | number) => {
    const updatedRows = [...tradeDataRows];
    updatedRows[index] = { ...updatedRows[index], [field]: value };
    setTradeDataRows(updatedRows);
  };

  const filteredWeekEndingData = weekEndingData.filter(item => {
    const matchesTab = item.status === activeTab;
    const matchesSearch = item.date.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesTab && matchesSearch;
  });

  // If a week ending is selected and we're in completed tab, show the detailed view
  if (selectedWeekEnding && activeTab === 'completed') {
    return (
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={handleBackToDateSelection}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Date Selection</span>
            </button>
          </div>
        </div>

        <div className="space-y-4">
          <h1 className="text-2xl font-bold text-gray-900">Weekly Trade Data Pending Approval</h1>
          <div className="space-y-2">
            <p><span className="font-medium">Week Ending:</span> {selectedWeekEnding}</p>
            <p><span className="font-medium">Dealing Member:</span> <span className="text-blue-600">United Bank for Africa PLC</span></p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">TDRef</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">TradeType</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Market</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Currency</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Broker</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">NoofTrades</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">FaceValue</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Comments</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {completedTradeData.map((row, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{row.tdRef}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600">{row.tradeType}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600">{row.market}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{row.product}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600">{row.currency}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{row.broker}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{row.noOfTrades}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{row.faceValue.toLocaleString()}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{row.comments}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }

  // If a week ending is selected and we're in submissions tab, show the editable table
  if (selectedWeekEnding && activeTab === 'submissions') {
    return (
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={handleBackToDateSelection}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Date Selection</span>
            </button>
          </div>
          <button
            onClick={handleSave}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-medium transition-colors"
          >
            Save
          </button>
        </div>

        <div className="space-y-4">
          <h1 className="text-2xl font-bold text-gray-900">Edit Weekly Trade Data for: {selectedWeekEnding}</h1>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-blue-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Action</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Trade Type</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Market</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Product</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Currency</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Broker</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">No. of Trades</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Face Value</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Comments</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {tradeDataRows.map((row, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-4 py-2 whitespace-nowrap text-sm font-medium text-gray-900">{row.action}</td>
                    <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{row.tradeType}</td>
                    <td className="px-4 py-2 whitespace-nowrap text-sm text-blue-600">{row.market}</td>
                    <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{row.product}</td>
                    <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{row.currency}</td>
                    <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{row.broker}</td>
                    <td className="px-4 py-2 whitespace-nowrap">
                      <input
                        type="number"
                        value={row.noOfTrades}
                        onChange={(e) => updateTradeDataRow(index, 'noOfTrades', parseInt(e.target.value) || 0)}
                        className="w-20 px-2 py-1 border border-gray-300 rounded text-sm focus:ring-blue-500 focus:border-blue-500"
                      />
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap">
                      <input
                        type="number"
                        value={row.faceValue}
                        onChange={(e) => updateTradeDataRow(index, 'faceValue', parseFloat(e.target.value) || 0)}
                        className="w-24 px-2 py-1 border border-gray-300 rounded text-sm focus:ring-blue-500 focus:border-blue-500"
                      />
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap">
                      <input
                        type="text"
                        value={row.comments}
                        onChange={(e) => updateTradeDataRow(index, 'comments', e.target.value)}
                        className="w-32 px-2 py-1 border border-gray-300 rounded text-sm focus:ring-blue-500 focus:border-blue-500"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={onBack}
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Trade Data</span>
          </button>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-medium transition-colors flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>Create new template</span>
        </button>
      </div>

      {/* Page Title */}
      <h1 className="text-2xl font-bold text-gray-900">Direct Data Entry</h1>

      {/* Tabs */}
      <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg w-fit">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
              activeTab === tab.id
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Search Bar */}
      <div className="flex items-center space-x-4">
        <div className="relative flex-1 max-w-md">
          <input
            type="text"
            placeholder="Search for week ending date..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
        </div>
        <button className="bg-gray-800 hover:bg-gray-900 text-white px-6 py-2 rounded-md font-medium transition-colors">
          Search
        </button>
      </div>

      {/* Week Ending Dates */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Week Ending</h3>
        </div>
        <div className="p-6">
          <div className="space-y-2">
            {filteredWeekEndingData.map((item, index) => (
              <div
                key={index}
                onClick={() => handleWeekEndingClick(item.date)}
                className="p-3 border border-gray-200 rounded-md hover:bg-gray-50 cursor-pointer transition-colors"
              >
                <span className="text-gray-900">{item.date}</span>
              </div>
            ))}
          </div>
          {filteredWeekEndingData.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <p>No week ending dates found for {activeTab}.</p>
            </div>
          )}
        </div>
      </div>

      {/* Create Template Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">Create Trade Data Input Template</h2>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6">
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Week Ending Date:
                </label>
                <div className="relative">
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  />
                  <Calendar className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                </div>
              </div>
              
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md font-medium transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCreateTemplate}
                  disabled={!selectedDate}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-md font-medium transition-colors"
                >
                  Create
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Approval Modal */}
      {showApprovalModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">Send for Approval</h2>
              <button
                onClick={() => setShowApprovalModal(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6">
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Approver Name:
                </label>
                <select
                  value={selectedApprover}
                  onChange={(e) => setSelectedApprover(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select Approver</option>
                  <option value="john.doe@ubagroup.com">john.doe@ubagroup.com</option>
                  <option value="jane.smith@ubagroup.com">jane.smith@ubagroup.com</option>
                  <option value="mike.wilson@ubagroup.com">mike.wilson@ubagroup.com</option>
                </select>
              </div>
              
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setShowApprovalModal(false)}
                  className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md font-medium transition-colors"
                >
                  Edit (Back)
                </button>
                <button
                  onClick={handleSendForApproval}
                  disabled={!selectedApprover}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-md font-medium transition-colors"
                >
                  Send
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
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Confirm Submission</h2>
              <p className="text-gray-600 mb-6">
                Click OK to send your entries for approval.
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
                Your Trade Data entries have been sent to the authoriser.
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

export default DirectDataEntry;