import { useEffect, useState } from 'react'

export default function ApplyForm() {
  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
  const [jobs, setJobs] = useState([])
  const [form, setForm] = useState({ job_id: '', candidate_name: '', candidate_email: '', resume_url: '', cover_letter: '' })
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const load = async () => {
      const res = await fetch(`${baseUrl}/api/jobs`)
      const data = await res.json()
      setJobs(data)
      if (data[0]) setForm(f => ({ ...f, job_id: data[0].id }))
    }
    load()
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm(f => ({ ...f, [name]: value }))
  }

  const submit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await fetch(`${baseUrl}/api/applications`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form })
      })
      if (!res.ok) throw new Error('Failed to submit application')
      setForm({ job_id: jobs[0]?.id || '', candidate_name: '', candidate_email: '', resume_url: '', cover_letter: '' })
      alert('Application submitted!')
    } catch (e) {
      alert(e.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={submit} className="space-y-3">
      <select name="job_id" value={form.job_id} onChange={handleChange} className="input" required>
        {jobs.map(j => <option key={j.id} value={j.id}>{j.title}</option>)}
      </select>
      <div className="grid sm:grid-cols-2 gap-3">
        <input className="input" name="candidate_name" placeholder="Your name" value={form.candidate_name} onChange={handleChange} required />
        <input className="input" name="candidate_email" placeholder="Your email" type="email" value={form.candidate_email} onChange={handleChange} required />
      </div>
      <input className="input" name="resume_url" placeholder="Resume URL (optional)" value={form.resume_url} onChange={handleChange} />
      <textarea className="input h-24" name="cover_letter" placeholder="Cover letter (optional)" value={form.cover_letter} onChange={handleChange} />
      <div className="flex justify-end">
        <button disabled={loading} className="px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 disabled:opacity-60">{loading ? 'Submitting...' : 'Apply'}</button>
      </div>
    </form>
  )
}
