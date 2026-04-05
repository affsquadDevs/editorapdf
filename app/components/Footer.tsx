import Link from 'next/link';
import Image from 'next/image';
import type { AppLocale } from '../../i18n/config';

export default function Footer({ locale = 'en' as AppLocale }: { locale?: AppLocale }) {
  // Load messages on the server; Footer doesn't need client context
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const messages = locale === 'uk' ? require('../../i18n/locales/uk.json') : require('../../i18n/locales/en.json');
  const t = (k: string) => (messages[k] as string) ?? k;
  const withLocale = (path: string) => `/${locale}${path}`;
  return (
    <footer className="mt-auto py-6 px-6 border-t border-surface-800/50" role="contentinfo">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Logo */}
        <div className="flex justify-center">
          <Link href={withLocale('/')} className="flex items-center hover:opacity-80 transition-opacity">
            <Image 
              src="/logo.svg" 
              alt="EditoraPDF Logo" 
              width={120} 
              height={40} 
              className="h-10 w-auto"
              priority
            />
          </Link>
        </div>

        {/* Disclaimer */}
        <div className="p-3 rounded-lg bg-surface-800/30 border border-surface-700/50">
          <p className="text-xs text-surface-400 leading-relaxed">
            <strong className="text-surface-300">{t('footer.disclaimer.title')}</strong> {t('footer.disclaimer.text')}{' '}
            <Link href={withLocale('/terms')} className="text-primary-400 hover:text-primary-300 underline">
              {t('footer.terms')}
            </Link>
            {' '}and{' '}
            <Link href={withLocale('/privacy-policy')} className="text-primary-400 hover:text-primary-300 underline">
              {t('footer.privacy')}
            </Link>.
          </p>
        </div>

        {/* Navigation Links */}
        <nav className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2" aria-label="Footer navigation">
          <Link href={withLocale('/')} className="text-sm text-surface-400 hover:text-primary-400 transition-colors">
            {t('footer.home')}
          </Link>
          <Link href={withLocale('/how-it-works')} className="text-sm font-semibold text-primary-400 hover:text-primary-300 transition-colors">
            {t('footer.how')}
          </Link>
          <Link href={withLocale('/about')} className="text-sm text-surface-400 hover:text-primary-400 transition-colors">
            {t('footer.about')}
          </Link>
          <Link href={withLocale('/privacy-policy')} className="text-sm text-surface-400 hover:text-primary-400 transition-colors">
            {t('footer.privacyLink')}
          </Link>
          <Link href={withLocale('/terms')} className="text-sm text-surface-400 hover:text-primary-400 transition-colors">
            {t('footer.termsLink')}
          </Link>
          <Link href={withLocale('/contact')} className="text-sm text-surface-400 hover:text-primary-400 transition-colors">
            {t('footer.contact')}
          </Link>
          <Link href={withLocale('/blog')} className="text-sm text-surface-400 hover:text-primary-400 transition-colors">
            {t('footer.blog')}
          </Link>
        </nav>

        {/* Social Media Links */}
        <div className="flex items-center justify-center gap-4">
          <a
            href="https://www.facebook.com/people/Editorapdf/61587362633003/"
            target="_blank"
            rel="noopener noreferrer nofollow"
            className="text-surface-400 hover:text-primary-400 transition-colors"
            aria-label="Follow us on Facebook"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
          </a>
          <a
            href="https://www.instagram.com/editora_pdf"
            target="_blank"
            rel="noopener noreferrer nofollow"
            className="text-surface-400 hover:text-primary-400 transition-colors"
            aria-label="Follow us on Instagram"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"/>
            </svg>
          </a>
          <a
            href="https://www.youtube.com/@EditoraPDF"
            target="_blank"
            rel="noopener noreferrer nofollow"
            className="text-surface-400 hover:text-primary-400 transition-colors"
            aria-label="Subscribe on YouTube"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
            </svg>
          </a>
          <a
            href="https://www.threads.com/@editora_pdf"
            target="_blank"
            rel="noopener noreferrer nofollow"
            className="text-surface-400 hover:text-primary-400 transition-colors"
            aria-label="Follow us on Threads"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12.186 24h-.007c-3.581-.024-6.334-1.205-8.184-3.509C2.35 18.44 1.5 15.586 1.472 12.01v-.017c.03-3.579.879-6.43 2.525-8.482C5.845 1.205 8.6.024 12.18 0h.014c2.746.02 5.043.725 6.826 2.098 1.677 1.29 2.858 3.13 3.509 5.467l-2.04.569c-1.104-3.96-3.898-5.984-8.304-6.015-2.91.022-5.11.936-6.54 2.717C4.307 6.504 3.616 8.914 3.589 12c.027 3.086.718 5.496 2.057 7.164 1.43 1.781 3.631 2.695 6.54 2.717 2.623-.02 4.358-.631 5.8-2.045 1.647-1.613 1.618-3.593 1.09-4.798-.31-.71-.873-1.3-1.634-1.75-.192 1.352-.622 2.446-1.284 3.272-.886 1.102-2.14 1.704-3.73 1.79-1.202.065-2.361-.218-3.259-.801-1.063-.689-1.685-1.74-1.752-2.964-.065-1.19.408-2.285 1.33-3.082.88-.76 2.119-1.207 3.583-1.291a13.853 13.853 0 013.02.142l-.126 1.974c-.94-.15-1.96-.185-2.935-.103-1.118.094-1.983.388-2.508.851-.473.418-.7.942-.664 1.521.033.563.331 1.035.859 1.368.549.347 1.293.479 2.093.372 1.031-.139 1.863-.567 2.476-1.275.576-.665.94-1.582 1.084-2.73l.09-.664c-1.205-.63-2.046-1.613-2.502-2.923-.414-1.189-.444-2.589-.088-4.162l1.967.381c-.272 1.145-.269 2.182.01 3.083.259.839.82 1.55 1.67 2.113.18-.194.358-.397.532-.61.827-1.008 1.487-2.415 1.96-4.19l1.973.426c-.52 1.957-1.273 3.612-2.24 4.917-.3.405-.624.791-.97 1.153.518.36.952.79 1.287 1.278.616.896 1.008 2.01 1.165 3.314.232 1.938-.006 3.98-1.928 5.96-1.72 1.766-3.977 2.633-6.85 2.653z"/>
            </svg>
          </a>
        </div>

        {/* Copyright */}
        <div className="text-center">
          <p className="text-sm text-surface-500">
            © 2026 EditoraPDF. {t('footer.copyright')}
          </p>
        </div>
      </div>
    </footer>
  );
}
