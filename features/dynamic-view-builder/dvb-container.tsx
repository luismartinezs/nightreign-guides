'use client';

import React, { useState, useEffect } from 'react';
import { 
  Mosaic, 
  MosaicNode, 
  MosaicZeroState, 
  updateTree 
} from 'react-mosaic-component';
import 'react-mosaic-component/react-mosaic-component.css';
import '@blueprintjs/core/lib/css/blueprint.css';
import '@blueprintjs/icons/lib/css/blueprint-icons.css';
import styles from './dvb.module.css'; // Import custom dark theme
import { WidgetId } from './types';
import { WIDGET_REGISTRY } from './widget-registry';
import { WidgetSelector } from './widget-selector';
import { saveLayout, loadLayout, getSavedLayouts, saveCurrentLayout, loadCurrentLayout } from './layout-persistence';
import { Button } from '@/shared/components/button';
import { cn } from '@/shared/utils/cn';
import { Heading } from '@/shared/components/Heading';
import { CustomMosaicWindow } from './custom-mosaic-window';

const NEW_WIDGET_ID = 'new-widget';

export default function DvbContainer() {
  const [layout, setLayout] = useState<MosaicNode<WidgetId> | null>(null);
  const [isClient, setIsClient] = useState(false);
  const [saveName, setSaveName] = useState('');
  const [savedLayouts, setSavedLayouts] = useState(getSavedLayouts());

  // Prevent hydration mismatch
  useEffect(() => {
    setIsClient(true);
    const current = loadCurrentLayout();
    if (current) {
      setLayout(current);
    }
  }, []);

  const handleChange = (newNode: MosaicNode<WidgetId> | null) => {
    setLayout(newNode);
    saveCurrentLayout(newNode);
  };

  const handleSave = () => {
    if (!saveName.trim()) return;
    saveLayout(saveName, layout);
    setSavedLayouts(getSavedLayouts());
    setSaveName('');
  };

  const handleLoad = (name: string) => {
    const loaded = loadLayout(name);
    if (loaded) {
      setLayout(loaded);
      saveCurrentLayout(loaded);
    }
  };
  
  const replaceNode = (path: any[], newId: WidgetId) => {
     if (!layout) return;
     const newLayout = updateTree(layout, [{ path, spec: { $set: newId } }]);
     handleChange(newLayout);
  };

  if (!isClient) return <div className="p-10 text-slate-400">Loading DVB...</div>;

  return (
    <div className={cn("flex flex-col h-full w-full bg-slate-950", styles.dvbMosaic)}>
      {/* Toolbar */}
      <div className="flex items-center gap-4 p-4 bg-slate-800 border-b border-slate-700">
        <Heading.H2 className="text-xl mb-0">Dynamic View Builder</Heading.H2>
        <div className="flex items-center gap-2 ml-auto">
           <input 
            type="text" 
            placeholder="Layout Name" 
            className="border border-slate-600 bg-slate-900 text-slate-100 p-2 rounded focus:outline-none focus:border-primary-500 placeholder-slate-500"
            value={saveName}
            onChange={(e) => setSaveName(e.target.value)}
           />
           <Button variant="primary" onClick={handleSave} disabled={!saveName}>Save</Button>
           
           <select 
             className="border border-slate-600 bg-slate-900 text-slate-100 p-2 rounded focus:outline-none focus:border-primary-500"
             onChange={(e) => {
                if (e.target.value) handleLoad(e.target.value);
             }}
             defaultValue=""
           >
             <option value="" disabled>Load Layout...</option>
             {savedLayouts.map(l => (
               <option key={l.name} value={l.name}>{l.name}</option>
             ))}
           </select>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar / Palette */}
        <div className="w-64 bg-slate-800 border-r border-slate-700 p-4 flex flex-col gap-2 overflow-y-auto">
          <h2 className="font-semibold mb-2 text-slate-200">Widgets</h2>
          <p className="text-sm text-slate-400 mb-4">Drag widgets onto the canvas.</p>
          
           {Object.values(WIDGET_REGISTRY).map(widget => (
            <div 
              key={widget.id}
              className="p-3 bg-slate-700 rounded cursor-move hover:bg-slate-600 border border-slate-600 text-slate-200 select-none shadow-sm"
              draggable
              onDragStart={(e) => {
                 console.log('[DVB] Drag Start:', widget.id);
                 e.dataTransfer.setData('text/plain', widget.id);
                 e.dataTransfer.effectAllowed = 'copy';
              }}
            >
              {widget.title}
            </div>
          ))}
          <div className="mt-4 text-xs text-slate-500">
            * Or click to add to active layout:
          </div>
          <div className="flex flex-col gap-2">
            {Object.values(WIDGET_REGISTRY).map(widget => (
               <Button 
                 key={widget.id + '-btn'} 
                 variant="muted" 
                 onClick={() => {
                   if (!layout) handleChange(widget.id);
                 }}
                 className="text-left justify-start py-1 px-2 text-slate-400 hover:text-slate-100 hover:bg-slate-700"
                 disabled={!!layout}
               >
                 Add {widget.title} (if empty)
               </Button>
            ))}
          </div>

        </div>

        {/* Main Mosaic Area */}
        <div 
          className="flex-1 relative bg-slate-950"
          onDragEnter={(e) => {
            e.preventDefault();
            console.log('[DVB] Drag Enter');
          }}
          onDragOver={(e) => {
             e.preventDefault(); // Essential to allow dropping
             e.dataTransfer.dropEffect = 'copy';
             // console.log('[DVB] Drag Over'); // Commented out to avoid spamming console
          }}
          onDrop={(e) => {
             e.preventDefault();
             const widgetId = e.dataTransfer.getData('text/plain');
             console.log('[DVB] Drop Detected. Widget ID:', widgetId);
             
             if (!widgetId) return;

             // Logic to handle the drop (Cause #1 fix attempt)
             if (!layout) {
               console.log('[DVB] Setting initial layout');
               handleChange(widgetId);
             } else {
               console.log('[DVB] TODO: Calculate drop position and split tree');
               // For now, we just log. The user asked for logs to determine the cause.
               // The cause is likely that this handler was missing entirely.
               // Once we confirm this log prints, we can implement the complex split logic.
               alert(`Dropped ${widgetId}! (Split logic to be implemented)`);
             }
          }}
        >
           <Mosaic<WidgetId>
            renderTile={(id, path) => (
              <CustomMosaicWindow
                id={id}
                path={path}
                title={id === NEW_WIDGET_ID ? 'Select Widget' : (WIDGET_REGISTRY[id]?.title || id)}
              >
                {id === NEW_WIDGET_ID ? (
                  <WidgetSelector onSelect={(newId) => replaceNode(path, newId)} />
                ) : (
                  WIDGET_REGISTRY[id]?.component || <div>Unknown Widget</div>
                )}
              </CustomMosaicWindow>
            )}
            value={layout}
            onChange={handleChange}
            zeroStateView={<MosaicZeroState createNode={() => NEW_WIDGET_ID} />}
            className="mosaic-blueprint-theme"
          />
        </div>
      </div>
    </div>
  );
}
