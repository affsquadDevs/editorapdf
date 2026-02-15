'use client';

import ToolsPanel from '../components/ToolsPanel';
import Header from '../components/Header';

export default function ToolsPage() {
  return (
    <main className="min-h-screen flex flex-col" role="main">
      <Header />
      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center p-6 ">
        <div className="max-w-5xl w-full">
          <ToolsPanel />
        </div>
      </div>
    </main>
  );
}
