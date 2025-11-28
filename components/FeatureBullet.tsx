import React from 'react';
import { LucideIcon } from 'lucide-react';

interface FeatureBulletProps {
  icon: LucideIcon;
  text: string;
}

export const FeatureBullet: React.FC<FeatureBulletProps> = ({ icon: Icon, text }) => {
  return (
    <div className="flex items-center gap-3 group">
      <div className="flex-shrink-0 text-maldives-500 group-hover:text-maldives-600 transition-colors">
        <Icon className="w-5 h-5 stroke-[2.5px]" />
      </div>
      <span className="text-gray-600 font-medium group-hover:text-ocean-900 transition-colors">{text}</span>
    </div>
  );
};
