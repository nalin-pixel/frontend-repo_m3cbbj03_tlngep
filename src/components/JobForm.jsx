import { useState } from 'react'

export default function JobForm({ onCreated }) {
  const [form, setForm] = useState({
    title: '',
    description: '',
    location: '',
    department: '',
    employment_type: 'Full-time',
    salary_min: '',
    salary_max: '',
    skills: ''
  })
  const [loading, setLoading] = useState(false)
  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((f) => ({ ...f, [name]: value }))
  }

  const submit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const payload = {
        ...form,
        salary_min: form.salary_min ? Number(form.salary_min) : null,
        salary_max: form.salary_max ? Number(form.salary_max) : null,
        skills: form.skills ? form.skills.split(',').map(s => s.trim()).filter(Boolean) : []
      }
      const res = await fetch(`${baseUrl}/api/jobs`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })
      if (!res.ok) throw new Error('Failed to create job')
      const data = await res.json()
      onCreated?.(data.id)
      setForm({ title: '', description: '', location: '', department: '', employment_type: 'Full-time', salary_min: '', salary_max: '', skills: '' })
    } catch (e) {
      alert(e.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={submit} className="space-y-3">
      <div className="grid sm:grid-cols-2 gap-3">
        <input className="input" name="title" placeholder="Job title" value={form.title} onChange={handleChange} required />
        <input className="input" name="department" placeholder="Department" value={form.department} onChange={handleChange} required />
        <input className="input" name="location" placeholder="Location" value={form.location} onChange={handleChange} required />
        <select className="input" name="employment_type" value={form.employment_type} onChange={handleChange}>
          <option>Full-time</option>
          <option>Part-time</option>
          <option>Contract</option>
          <option>Intern</option>
        </select>
        <input className="input" name="salary_min" placeholder="Salary min" value={form.salary_min} onChange={handleChange} />
        <input className="input" name="salary_max" placeholder="Salary max" value={form.salary_max} onChange={handleChange} />
      </div>
      <textarea className="input h-24" name="description" placeholder="Description" value={form.description} onChange={handleChange} required />
      <input className="input" name="skills" placeholder="Skills (comma separated)" value={form.skills} onChange={handleChange} />
      <div className="flex justify-end">
        <button disabled={loading} className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-60">{loading ? 'Saving...' : 'Post job'}</button>
      </div>
    </form>
  )
}
