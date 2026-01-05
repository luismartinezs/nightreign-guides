'use client';

import React, { useState, useEffect, useRef } from 'react';
import { 
  Mosaic, 
  MosaicNode, 
  MosaicZeroState, 
  updateTree, 
  createRemoveUpdate, 
  MosaicBranch, 
  MosaicDirection 
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
import { AiOutlineFullscreen, AiOutlineFullscreenExit } from "react-icons/ai";

const NEW_WIDGET_ID = 'new-widget';

export default function DvbContainer() {
  const [layout, setLayout] = useState<MosaicNode<WidgetId> | null>(null);
  const [isClient, setIsClient] = useState(false);
  const [saveName, setSaveName] = useState('');
  const [savedLayouts, setSavedLayouts] = useState(getSavedLayouts());
  const mosaicWrapperRef = useRef<HTMLDivElement>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Prevent hydration mismatch
  useEffect(() => {
    setIsClient(true);
    const current = loadCurrentLayout();
    if (current) {
      setLayout(current);
    }
  }, []);

  // Handle Fullscreen Toggle
  const toggleFullscreen = () => {
    if (!mosaicWrapperRef.current) return;

    if (!document.fullscreenElement) {
      mosaicWrapperRef.current.requestFullscreen().then(() => {
        setIsFullscreen(true);
      }).catch(err => {
        console.error(`Error attempting to enable fullscreen: ${err.message}`);
      });
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  // Keyboard Listener for 'F'
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if typing in an input
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }
      
      if (e.key === 'f' || e.key === 'F') {
        toggleFullscreen();
      }
    };

    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('fullscreenchange', handleFullscreenChange);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
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
           <Button 
             variant="outline" 
             onClick={toggleFullscreen} 
             title="Toggle Fullscreen (F)"
             className="flex items-center gap-2 border-slate-600 text-slate-300 hover:text-white hover:bg-slate-700"
           >
             <span>Fullscreen</span>
             <span className="hidden sm:inline-block border border-slate-500 rounded px-1.5 py-0.5 text-xs font-mono text-slate-400">F</span>
           </Button>
           
           <div className="h-6 w-px bg-slate-600 mx-2" />
           
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
          <div className="mt-4 text-xs text-slate-500 italic">
            * Drag and drop a widget header to reposition it.
          </div>
        </div>

        {/* Main Mosaic Area */}
        <div 
          ref={mosaicWrapperRef}
          className="flex-1 relative bg-slate-950"
          onDragEnter={(e) => {
            e.preventDefault();
          }}
          onDragOver={(e) => {
             e.preventDefault(); // Essential to allow dropping
             e.dataTransfer.dropEffect = 'copy';
          }}
          onDrop={(e) => {
             e.preventDefault();
             const widgetId = e.dataTransfer.getData('text/plain');
             
             if (!widgetId) return;

             // Logic to handle the drop (Cause #1 fix attempt)
             if (!layout) {
               handleChange(widgetId);
             }
          }}
        >
           <Mosaic<WidgetId>
            renderTile={(id, path) => (
              <CustomMosaicWindow
                id={id}
                path={path}
                title={id === NEW_WIDGET_ID ? 'Select Widget' : (WIDGET_REGISTRY[id]?.title || id)}
                onMoveNode={(sourcePath, targetPath, position, widgetId) => {
                    if (!layout) return;
                    
                    const targetId = id; 
                    let direction: MosaicDirection = 'row';
                    let first: MosaicNode<WidgetId> = targetId; 
                    let second: MosaicNode<WidgetId> = widgetId;
                    
                    if (position === 'left' || position === 'right') direction = 'row';
                    else direction = 'column';
                    
                    if (position === 'left' || position === 'top') {
                        first = widgetId;
                        second = targetId;
                    } else {
                        first = targetId;
                        second = widgetId;
                    }
                    
                    const newNode = { direction, first, second, splitPercentage: 50 };
                    let tempLayout = updateTree(layout, [{ path: targetPath, spec: { $set: newNode } }]);
                    const removeUpdates = createRemoveUpdate(tempLayout, sourcePath);
                    const finalLayout = updateTree(tempLayout, [removeUpdates]);
                    handleChange(finalLayout);
                }}
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
            zeroStateView={
              <div className="flex flex-col items-center justify-center h-full w-full bg-slate-950 text-slate-400 p-8 border-2 border-dashed border-slate-800 m-4 rounded-xl">
                <p className="mb-4 text-lg">Your workspace is empty.</p>
                <p className="text-sm mb-6">Drag a widget from the left or click below to start.</p>
                <Button 
                  variant="nightreign" 
                  onClick={() => handleChange(NEW_WIDGET_ID)}
                >
                  Create First View
                </Button>
              </div>
            }
            className="mosaic-blueprint-theme"
          />
        </div>
      </div>
    </div>
  );
}
