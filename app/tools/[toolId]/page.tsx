'use client';

import { useParams, useRouter } from 'next/navigation';
import { allTools } from '../../components/ToolsPanel';
import ToolView from '../../components/ToolView';
import Header from '../../components/Header';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useAppTranslations } from '../../i18n/TranslationProvider';

export default function ToolPage() {
  const params = useParams();
  const router = useRouter();
  const { locale } = useAppTranslations();
  const toolId = (params?.toolId as string) || '';

  const tool = allTools.find(t => t.id === toolId);

  if (!tool) {
    return (
      <main className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center p-6">
          <div className="text-center max-w-2xl">
            <h1 className="text-2xl md:text-3xl font-semibold text-white mb-3">Інструмент не знайдено</h1>
            <p className="text-lg text-surface-400 mb-8">
              PDF-інструмент, який ви шукаєте, не існує.
            </p>
            <Link href={`/${locale}/tools`} className="btn-primary btn-lg">
              <ArrowLeft size={20} strokeWidth={2} />
              Назад до всіх інструментів
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-1 flex items-center justify-center px-6 pt-6 pb-6">
        <ToolView 
          tool={tool} 
          onBack={() => router.push(`/${locale}/tools`)} 
        />
      </div>
    </main>
  );
}
