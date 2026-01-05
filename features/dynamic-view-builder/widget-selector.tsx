import React from 'react';
import { WidgetId } from './types';
import { WIDGET_REGISTRY } from './widget-registry';
import { Button } from '@/shared/components/button';

interface WidgetSelectorProps {
  onSelect: (id: WidgetId) => void;
}

export const WidgetSelector: React.FC<WidgetSelectorProps> = ({ onSelect }) => {
  return (
    <div className="flex flex-col gap-2 p-4 h-full bg-slate-900 overflow-y-auto">
      <h3 className="font-semibold text-slate-200">Select a Widget</h3>
      <div className="grid grid-cols-1 gap-2">
        {Object.values(WIDGET_REGISTRY).map(widget => (
          <Button
            key={widget.id}
            variant="outline"
            className="justify-start text-left h-auto py-3 border-slate-700 hover:bg-slate-800 text-slate-300"
            onClick={() => onSelect(widget.id)}
          >
            <div className="flex flex-col items-start">
               <span className="font-bold text-primary-300">{widget.title}</span>
               {/* Extract a snippet from component content if possible, or just show ID */}
               <span className="text-xs font-normal text-slate-500 opacity-75">{widget.id}</span>
            </div>
          </Button>
        ))}
      </div>
    </div>
  );
};