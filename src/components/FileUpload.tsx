import React, { useState } from 'react';
import { ArrowLeft, Calendar } from 'lucide-react';

interface FileUploadProps {
  onBack: () => void;
}

interface UploadedFile {
  fileRef: string;
  entryDate: string;
  startPeriod: string;
  endPeriod: string;
  reviewedBy: string;
  fileName: string;
  status: 'uploaded' | 'pending' | 'sent';
}

const FileUpload: React.FC<FileUploadProps> = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState<'uploaded' | 'pending' | 'sent'>('uploaded');
  const [periodStartDate, setPeriodStartDate] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedReviewer, setSelectedReviewer] = useState('');
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([
    {
      fileRef: '10711',
      entryDate: 'Wednesday, August 13, 2025',
      startPeriod: '8/13/2024',
      endPeriod: '8/17/2024',
      reviewedBy: 'system12@fmdqgroup.com',
      fileName: '',
      status: 'uploaded'
    },
    {
      fileRef: '10708',
      entryDate: 'Tuesday, April 15, 2025',
      startPeriod: '1/1/1900',
      endPeriod: '1/5/1900',
      reviewedBy: 'system12@fmdqgroup.com',
      fileName: '',
      status: 'uploaded'
    },
    {
      fileRef: '10707',
      entryDate: 'Tuesday, April 15, 2025',
      startPeriod: '1/1/1900',
      endPeriod: '1/5/1900',
      reviewedBy: '',
      fileName: '',
      status: 'uploaded'
    },
    {
      fileRef: '10706',
      entryDate: 'Tuesday, April 15, 2025',
      startPeriod: '5/15/2025',
      endPeriod: '5/19/2025',
      reviewedBy: '',
      fileName: '',
      status: 'uploaded'
    },
    {
      fileRef: '10705',
      entryDate: 'Wednesday, January 22, 2025',
      startPeriod: '1/20/2025',
      endPeriod: '1/24/2025',
      reviewedBy: '',
      fileName: 'BondTradesUploadTemplate1.csv',
      status: 'uploaded'
    }
  ]);

  const tabs = [
    { id: 'uploaded' as const, label: 'Uploaded File(s)' },
    { id: 'pending' as const, label: 'Pending File(s)' },
    { id: 'sent' as const, label: 'Sent File(s)' }
  ];

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setSelectedFile(file || null);
  };

  const handleSubmit = () => {
    if (periodStartDate && selectedFile && selectedReviewer) {
      // Calculate end period (assuming 4 days after start)
      const startDate = new Date(periodStartDate);
      const endDate = new Date(startDate);
      endDate.setDate(startDate.getDate() + 4);
      
      const newFile: UploadedFile = {
        fileRef: (Math.floor(Math.random() * 10000) + 10000).toString(),
        entryDate: new Date().toLocaleDateString('en-US', { 
          weekday: 'long', 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric' 
        }),
        startPeriod: startDate.toLocaleDateString('en-US'),
        endPeriod: endDate.toLocaleDateString('en-US'),
        reviewedBy: selectedReviewer,
        fileName: selectedFile.name,
        status: 'uploaded'
      };

      setUploadedFiles([newFile, ...uploadedFiles]);
      
      // Reset form
      setPeriodStartDate('');
      setSelectedFile(null);
      setSelectedReviewer('');
      
      // Reset file input
      const fileInput = document.getElementById('file-upload') as HTMLInputElement;
      if (fileInput) fileInput.value = '';
    }
  };

  const handleSendForApproval = (fileRef: string) => {
    setUploadedFiles(files => 
      files.map(file => 
        file.fileRef === fileRef 
          ? { ...file, status: 'pending' as const }
          : file
      )
    );
  };

  const filteredFiles = uploadedFiles.filter(file => file.status === activeTab);

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
            <span>Back</span>
          </button>
        </div>
      </div>

      {/* Page Title */}
      <h1 className="text-2xl font-bold text-gray-900">File Upload</h1>

      {/* Upload Form */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="space-y-6">
          {/* Period Start Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Period Start Date (This should be Monday of the reporting week):
            </label>
            <div className="relative">
              <input
                type="date"
                value={periodStartDate}
                onChange={(e) => setPeriodStartDate(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                placeholder="dd/mm/yyyy"
              />
              <Calendar className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            </div>
          </div>

          {/* Upload File */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Upload File:
            </label>
            <input
              id="file-upload"
              type="file"
              onChange={handleFileChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              accept=".csv,.xlsx,.xls"
            />
            {!selectedFile && (
              <p className="text-sm text-gray-500 mt-1">No file chosen</p>
            )}
          </div>

          {/* Reviewer */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Reviewer:
            </label>
            <select
              value={selectedReviewer}
              onChange={(e) => setSelectedReviewer(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Select Reviewer</option>
              <option value="system12@fmdqgroup.com">system12@fmdqgroup.com</option>
              <option value="reviewer1@fmdqgroup.com">reviewer1@fmdqgroup.com</option>
              <option value="reviewer2@fmdqgroup.com">reviewer2@fmdqgroup.com</option>
            </select>
          </div>

          {/* Submit Button */}
          <div>
            <button
              onClick={handleSubmit}
              disabled={!periodStartDate || !selectedFile || !selectedReviewer}
              className="bg-gray-800 hover:bg-gray-900 disabled:bg-gray-300 disabled:cursor-not-allowed text-white px-6 py-2 rounded-md font-medium transition-colors"
            >
              Submit
            </button>
          </div>
        </div>
      </div>

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

      {/* Files Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {activeTab === 'uploaded' && (
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Approval
                  </th>
                )}
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {activeTab === 'uploaded' ? 'Edit' : 'FileRef'}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Entry Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Start Period
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  End Period
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {activeTab === 'uploaded' ? 'Reviewed By' : 'File Name'}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {activeTab === 'uploaded' ? 'File Name' : 'Reviewer ID'}
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredFiles.map((file, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  {activeTab === 'uploaded' && (
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        onClick={() => handleSendForApproval(file.fileRef)}
                        className="text-blue-600 hover:text-blue-800 font-medium underline"
                      >
                        Send for Approval
                      </button>
                    </td>
                  )}
                  <td className="px-6 py-4 whitespace-nowrap">
                    {activeTab === 'uploaded' ? (
                      <button className="text-blue-600 hover:text-blue-800 font-medium underline">
                        Edit
                      </button>
                    ) : (
                      <span className="text-sm font-medium text-gray-900">{file.fileRef}</span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {file.entryDate}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {file.startPeriod}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {file.endPeriod}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {activeTab === 'uploaded' ? file.reviewedBy : file.fileName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {activeTab === 'uploaded' ? file.fileName : file.reviewedBy}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredFiles.length === 0 && (
          <div className="px-6 py-8 text-center text-gray-500">
            <p>No {activeTab} files found.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FileUpload;