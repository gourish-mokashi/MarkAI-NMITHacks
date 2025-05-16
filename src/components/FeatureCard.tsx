import React from 'react';
import { BoxIcon } from 'lucide-react';
interface FeatureCardProps {
  icon: BoxIcon;
  title: string;
  description: string;
}
export function FeatureCard({
  icon: Icon,
  title,
  description
}: FeatureCardProps) {
  return <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
      <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
        <Icon className="h-6 w-6 text-blue-600" />
      </div>
      <h3 className="font-semibold text-lg mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>;
}