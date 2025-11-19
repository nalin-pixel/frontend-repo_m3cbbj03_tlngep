import { useEffect, useState } from 'react'
import { MapPin, Building2, Clock } from 'lucide-react'

export default function JobList() {
  const [jobs, setJobs] = useState([])
  const [loading, setLoading] = useState(true)
  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

  const load = async () => {
    setLoading(true)
    try {
      const res = await fetch(`${baseUrl}/api/jobs`)
      const data = await res.json()
      setJobs(data)
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { load() }, [])

  if (loading) return <p className="text-slate-500">Loading jobs...</p>

  return (
    <div className="grid md:grid-cols-2 gap-4">
      {jobs.map(job => (
        <div key={job.id} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h3 className="text-lg font-semibold text-slate-900">{job.title}</h3>
              <p className="text-sm text-slate-600 mt-1 line-clamp-2">{job.description}</p>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-3 gap-2 text-sm text-slate-600">
            <div className="flex items-center gap-1"><Building2 size={16}/> {job.department}</div>
            <div className="flex items-center gap-1"><MapPin size={16}/> {job.location}</div>
            <div className="flex items-center gap-1"><Clock size={16}/> {job.employment_type}</div>
          </div>

          {job.skills && job.skills.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-2">
              {job.skills.map((s, i) => (
                <span key={i} className="px-2 py-1 text-xs rounded-full bg-slate-100 text-slate-700 border border-slate-200">{s}</span>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
