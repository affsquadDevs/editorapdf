'use client';

import { useParams, useRouter } from 'next/navigation';
import { allTools } from '../../../components/ToolsPanel';
import ToolView from '../../../components/ToolView';
import Header from '../../../components/Header';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useAppTranslations } from '../../../i18n/TranslationProvider';

export default function LocalizedToolPage() {
  const params = useParams();
  const router = useRouter();
  const { locale, t } = useAppTranslations();
  const toolId = (params?.toolId as string) || '';

  const tool = allTools.find(tl => tl.id === toolId);

  if (!tool) {
    return (
      <main className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center p-6">
          <div className="text-center max-w-2xl">
            <h1 className="text-2xl md:text-3xl font-semibold text-white mb-3">{t('tools.notFound') === 'tools.notFound' ? 'Tool Not Found' : t('tools.notFound')}</h1>
            <p className="text-lg text-surface-400 mb-8">
              {t('tools.notFoundDesc') === 'tools.notFoundDesc' ? "The PDF tool you're looking for doesn't exist." : t('tools.notFoundDesc')}
            </p>
            <Link href={`/${locale}/tools`} className="btn-primary btn-lg">
              <ArrowLeft size={20} strokeWidth={2} />
              {t('tools.back') === 'tools.back' ? 'Back to All Tools' : t('tools.back')}
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

