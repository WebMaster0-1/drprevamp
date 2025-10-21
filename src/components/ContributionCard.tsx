import React from 'react';
import { TrendingUp, CheckCircle } from 'lucide-react';

interface ContributionCardProps {
  id: string;
  title: string;
  subtitle: string;
  isActive: boolean;
  isCompleted?: boolean;
  onClick: (id: string) => void;
}

const ContributionCard: React.FC<ContributionCardProps> = ({
  id,
  title,
  subtitle,
  isActive,
  isCompleted,
  onClick
}) => {
  return (
    <div
      onClick={() => onClick(id)}
      className={`p-6 rounded-lg border-2 cursor-pointer transition-all duration-200 hover:shadow-md ${
        isActive
          ? 'border-blue-500 bg-blue-50 shadow-md'
          : 'border-gray-200 bg-white hover:border-gray-300'
      }`}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-3">
          <div className={`p-2 rounded-lg ${
            isActive ? 'bg-blue-500' : 'bg-gray-100'
          }`}>
            <TrendingUp className={`w-5 h-5 ${
              isActive ? 'text-white' : 'text-gray-600'
            }`} />
          </div>
          <div>
            <h3 className={`font-semibold text-lg ${
              isActive ? 'text-blue-900' : 'text-gray-900'
            }`}>
              {title}
            </h3>
            <p className={`text-sm ${
              isActive ? 'text-blue-700' : 'text-gray-600'
            }`}>
              {subtitle}
            </p>
          </div>
        </div>
        {isCompleted && (
          <CheckCircle className="w-5 h-5 text-green-500" />
        )}
      </div>
    </div>
  );
};

export default ContributionCard;