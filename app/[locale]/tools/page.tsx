import Header from '../../components/Header'
import ToolsPanel from '../../components/ToolsPanel'

export default function LocaleToolsPage() {
  return (
    <main className="min-h-screen flex flex-col" role="main">
      <Header />
      <div className="flex-1 flex items-center justify-center p-6 ">
        <div className="max-w-5xl w-full">
          <ToolsPanel />
        </div>
      </div>
    </main>
  )
}

