import { Briefcase, Users } from 'lucide-react'

export default function Header() {
  return (
    <header className="sticky top-0 z-10 backdrop-blur supports-[backdrop-filter]:bg-white/60 bg-white/80 border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-blue-600 flex items-center justify-center text-white shadow">
            <Briefcase size={20} />
          </div>
          <div>
            <h1 className="text-lg font-semibold text-slate-900 leading-none">HR Recruit</h1>
            <p className="text-xs text-slate-500">Simple hiring dashboard</p>
          </div>
        </div>
        <div className="hidden sm:flex items-center gap-2 text-slate-600 text-sm">
          <Users size={16} />
          <span>Manage jobs & applications</span>
        </div>
      </div>
    </header>
  )
}
