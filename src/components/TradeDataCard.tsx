import React from 'react';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface TradeDataCardProps {
  id: string;
  title: string;
  icon: LucideIcon;
  onClick: (id: string) => void;
}

const TradeDataCard: React.FC<TradeDataCardProps> = ({
  id,
  title,
  icon: Icon,
  onClick
}) => {
  return (
    <div
      onClick={() => onClick(id)}
      className="bg-white rounded-lg border border-gray-200 p-8 cursor-pointer transition-all duration-200 hover:shadow-md hover:border-gray-300 group"
    >
      <div className="flex flex-col items-center text-center space-y-4">
        <div className="p-4 rounded-full bg-gray-50 group-hover:bg-blue-50 transition-colors">
          <Icon className="w-8 h-8 text-gray-600 group-hover:text-blue-600 transition-colors" />
        </div>
        <h3 className="font-medium text-gray-900 text-sm leading-tight">
          {title}
        </h3>
      </div>
    </div>
  );
};

export default TradeDataCard;