import Header from './components/Header'
import JobForm from './components/JobForm'
import JobList from './components/JobList'
import ApplyForm from './components/ApplyForm'

function App() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Header />

      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-6">
          <section className="lg:col-span-2 space-y-4">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-slate-900">Open roles</h2>
                <a href="/test" className="text-sm text-slate-500 hover:text-slate-700">Check backend</a>
              </div>
              <JobList />
            </div>
          </section>

          <aside className="space-y-6">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-slate-900 mb-3">Post a job</h3>
              <JobForm onCreated={() => {}} />
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-slate-900 mb-3">Apply to a job</h3>
              <ApplyForm />
            </div>
          </aside>
        </div>
      </main>

      <style>{`
        .input { @apply w-full px-3 py-2 rounded-md border border-slate-200 bg-white text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500; }
      `}</style>
    </div>
  )
}

export default App
