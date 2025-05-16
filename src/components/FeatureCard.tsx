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
  return (
    <div className="bg-gray-100 p-6 rounded-2xl border border-gray-100 transition-shadow hover:shadow-[0_0_20px_4px_rgba(59,130,246,0.7)]">
      <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
        <Icon className="h-6 w-6 text-blue-600" />
      </div>
      <h3 className="font-semibold text-lg mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}