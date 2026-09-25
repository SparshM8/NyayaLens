'use client';

import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ComparisonStudio from '@/components/ComparisonStudio';
import Link from 'next/link';
import { ArrowLeft, GitCompare } from 'lucide-react';

export default function ComparePage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#090d16] text-slate-100 selection:bg-blue-600 selection:text-white">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        <div className="flex items-center space-x-2 text-xs text-slate-400">
          <Link href="/" className="hover:text-blue-400 flex items-center space-x-1">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Document Analysis</span>
          </Link>
          <span>/</span>
          <span className="text-slate-200">Contract Comparison Studio</span>
        </div>

        <ComparisonStudio />
      </main>

      <Footer />
    </div>
  );
}
