import Link from 'next/link'

export default function Custom404() {
  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="text-center max-w-2xl">
        <div className="mb-8">
          <div className="inline-flex items-center justify-center w-32 h-32 rounded-full bg-gradient-to-br from-primary-500/20 to-accent-500/20 border border-primary-500/30">
            <span className="text-4xl font-bold text-primary-400">404</span>
          </div>
        </div>

        <h1 className="text-2xl md:text-3xl font-semibold text-white mb-3">Page Not Found</h1>
        <p className="text-lg text-surface-400 mb-8">
          Sorry, the page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/" className="btn-primary btn-lg">
            Go Home
          </Link>
          <Link href="/contact" className="btn-secondary btn-lg">
            Contact support
          </Link>
        </div>
      </div>
    </div>
  )
}

