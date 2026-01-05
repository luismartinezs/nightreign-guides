import React, { useContext, useState, DragEvent } from 'react';
import { 
  MosaicContext, 
  MosaicBranch, 
} from 'react-mosaic-component';
import { WidgetId } from './types';
import styles from './dvb.module.css';
import { cn } from '@/shared/utils/cn';

// Icons
import { 
  AiOutlineSplitCells, 
  AiOutlineClose, 
  AiOutlineExpand 
} from "react-icons/ai";

interface CustomMosaicWindowProps {
  id: WidgetId;
  path: MosaicBranch[];
  title: string;
  children: React.ReactNode;
  toolbarControls?: React.ReactNode[];
}

type DropPosition = 'top' | 'bottom' | 'left' | 'right' | 'center' | null;

export const CustomMosaicWindow: React.FC<CustomMosaicWindowProps> = ({ 
  id,
  path, 
  title, 
  children 
}) => {
  const context = useContext(MosaicContext);
  const [dropPosition, setDropPosition] = useState<DropPosition>(null);
  
  if (!context) {
    return <div className="text-red-500">Error: Missing MosaicContext</div>;
  }

  const { mosaicActions } = context;

  const handleSplit = () => {
    mosaicActions.replaceWith(path, {
      direction: 'row',
      first: id,
      second: 'new-widget'
    });
  };

  const handleRemove = () => {
    mosaicActions.remove(path);
  };

  const handleExpand = () => {
     mosaicActions.expand(path);
  };

  // --- Drag and Drop Logic ---

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (!e.currentTarget) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const width = rect.width;
    const height = rect.height;

    // Logic to determine zone:
    // Define explicit zones based on diagonal divisions or percentage
    // Simple approach: percentage thresholds
    
    // Normalize coordinates (0 to 1)
    const relX = x / width;
    const relY = y / height;

    let newPos: DropPosition = 'center';

    // Check if we are near edges
    // Threshold for edge detection (e.g., 25%)
    const THRESHOLD = 0.25;

    if (relY < THRESHOLD) {
        newPos = 'top';
    } else if (relY > (1 - THRESHOLD)) {
        newPos = 'bottom';
    } else if (relX < THRESHOLD) {
        newPos = 'left';
    } else if (relX > (1 - THRESHOLD)) {
        newPos = 'right';
    } else {
        newPos = 'center'; // Middle area, maybe replace?
    }
    
    // Optional: refinements for "closest edge" logic if center is too big
    // But specific edge zones are safer for "split" intent.
    
    if (dropPosition !== newPos) {
      setDropPosition(newPos);
    }
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    // Only clear if we actually left the container, not just entered a child
    if (e.currentTarget.contains(e.relatedTarget as Node)) return;
    setDropPosition(null);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDropPosition(null);

    const newWidgetId = e.dataTransfer.getData('text/plain');
    if (!newWidgetId) return;

    console.log(`[CustomMosaicWindow] Dropped ${newWidgetId} on ${id} at ${dropPosition}`);

    if (dropPosition === 'center') {
      // Replace content? Or maybe split horizontal default?
      // Let's assume Center = Replace content for now? Or just ignore?
      // Requirements say "nested them", so split is primary.
      // Let's default center to "replace current widget"
      // mosaicActions.replaceWith(path, newWidgetId);
      // Wait, let's play safe and treat center as "Right" split for now or ignore.
      // Or:
      console.log('Center drop - swapping widget');
      // To swap:
      mosaicActions.replaceWith(path, newWidgetId);
      return;
    }

    if (!dropPosition) return;

    // Construct new node based on direction
    // 'row' = Left/Right
    // 'column' = Top/Bottom
    
    let direction: 'row' | 'column' = 'row';
    let first: WidgetId = id;   // Existing
    let second: WidgetId = newWidgetId; // New
    
    if (dropPosition === 'left' || dropPosition === 'right') {
        direction = 'row';
    } else {
        direction = 'column';
    }

    // If 'left' or 'top', the NEW widget comes FIRST.
    // If 'right' or 'bottom', the NEW widget comes SECOND.
    
    if (dropPosition === 'left' || dropPosition === 'top') {
        first = newWidgetId;
        second = id;
    } else {
        first = id;
        second = newWidgetId;
    }

    mosaicActions.replaceWith(path, {
        direction,
        first,
        second,
        splitPercentage: 50 // Default split
    });
  };

  return (
    <div 
      className={cn("flex flex-col h-full w-full relative", styles.dvbMosaicWindow)}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
       {/* Visual Drop Overlay */}
       {dropPosition && (
         <div className={cn(
           styles.dropZone,
           dropPosition === 'top' && styles.dropZoneTop,
           dropPosition === 'bottom' && styles.dropZoneBottom,
           dropPosition === 'left' && styles.dropZoneLeft,
           dropPosition === 'right' && styles.dropZoneRight,
           dropPosition === 'center' && styles.dropZoneCenter,
           // Add absolute positioning utility classes if CSS modules fail or for clarity
           "absolute pointer-events-none bg-primary-500/20 border-2 border-primary-400 z-50 transition-all duration-75",
           dropPosition === 'top' && "inset-x-0 top-0 h-1/2",
           dropPosition === 'bottom' && "inset-x-0 bottom-0 h-1/2",
           dropPosition === 'left' && "inset-y-0 left-0 w-1/2",
           dropPosition === 'right' && "inset-y-0 right-0 w-1/2",
           dropPosition === 'center' && "inset-0"
         )} />
       )}

      {/* Header / Toolbar */}
      <div className={cn("flex items-center justify-between px-3 h-10 select-none", styles.dvbMosaicWindowToolbar)}>
        <span className={styles.dvbMosaicWindowTitle}>{title}</span>
        
        <div className="flex items-center gap-1">
          <button 
            onClick={handleSplit}
            className="p-1 hover:bg-slate-700 rounded text-slate-400 hover:text-white transition-colors"
            title="Split"
          >
            <AiOutlineSplitCells size={16} />
          </button>
           <button 
            onClick={handleExpand}
            className="p-1 hover:bg-slate-700 rounded text-slate-400 hover:text-white transition-colors"
            title="Expand"
          >
            <AiOutlineExpand size={16} />
          </button>
          <button 
            onClick={handleRemove}
            className="p-1 hover:bg-red-900/50 rounded text-slate-400 hover:text-red-400 transition-colors"
            title="Close"
          >
            <AiOutlineClose size={16} />
          </button>
        </div>
      </div>

      {/* Body */}
      <div className={cn("flex-1 overflow-hidden relative", styles.dvbMosaicWindowBody)}>
        {children}
      </div>
    </div>
  );
};