import DvbContainer from '@/features/dynamic-view-builder/dvb-container';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dynamic View Builder',
  description: 'Customize your workspace layout.',
};

export default function DvbPage() {
  return (
    <div className="h-[calc(100vh-64px)] w-full"> 
       {/* 64px accounts for header height if global layout is present, 
           or we might want a clean slate. 
           The root layout usually includes a header. 
           Let's verify layout.tsx to see if we need to hide the header 
           or just fit within it. 
       */}
      <DvbContainer />
    </div>
  );
}
