import React from 'react';
import { cn } from '@/shared/utils/cn';

interface MockWidgetProps {
  label: string;
  color?: string;
  content?: string;
}

export const MockWidget: React.FC<MockWidgetProps> = ({ label, color, content }) => {
  // Map old light colors to dark variants if they were passed, or default to dark
  const bgClass = color?.includes('bg-emerald-50') ? 'bg-emerald-950/30' :
                  color?.includes('bg-slate-50') ? 'bg-slate-900' :
                  color?.includes('bg-blue-50') ? 'bg-blue-950/30' :
                  color?.includes('bg-purple-50') ? 'bg-purple-950/30' :
                  'bg-slate-900';

  return (
    <div className={cn("flex flex-col h-full w-full p-4 overflow-auto", bgClass)}>
      <h3 className="font-bold text-lg mb-2 text-slate-100">{label}</h3>
      <p className="text-slate-400">{content || "This is a mock widget content area."}</p>
    </div>
  );
};