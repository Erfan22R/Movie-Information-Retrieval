import { useState, useEffect } from 'react'
import { useResponsive } from '../hooks'
import { getSystemStats, type SystemStats } from '../services/api'

function StatCard({
  label,
  value,
  unit,
  icon,
  color,
}: {
  label: string
  value: string
  unit: string
  icon: React.ReactNode
  color: string
}) {
  const [hovered, setHovered] = useState(false)
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        padding: '28px',
        borderRadius: 16,
        backgroundColor: '#0f1623',
        border: `1px solid ${hovered ? `${color}30` : 'rgba(255,255,255,0.06)'}`,
        transition: 'border-color 0.25s, box-shadow 0.25s',
        boxShadow: hovered ? `0 8px 32px rgba(0,0,0,0.4), 0 0 0 1px ${color}15` : '0 2px 12px rgba(0,0,0,0.2)',
        display: 'flex',
        flexDirection: 'column',
        gap: 20,
      }}
    >
      <div style={{ width: 44, height: 44, borderRadius: 12, backgroundColor: `${color}12`, border: `1px solid ${color}25`, display: 'flex', alignItems: 'center', justifyContent: 'center', color }}>
        {icon}
      </div>
      <div>
        <div style={{ fontFamily: 'Outfit, sans-serif', fontSize: 34, fontWeight: 800, color: hovered ? color : '#e2e8f4', lineHeight: 1, letterSpacing: '-0.03em', transition: 'color 0.25s', marginBottom: 6 }}>{value}</div>
        <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, fontWeight: 500, color: '#64748b' }}>{label}</div>
        <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10, color: '#2d3a4d', letterSpacing: '0.06em', marginTop: 2 }}>{unit.toUpperCase()}</div>
      </div>
    </div>
  )
}

export function StatsSection() {
  const { isMobile } = useResponsive()
  const [statsData, setStatsData] = useState<SystemStats | null>(null)

  useEffect(() => {
    getSystemStats()
      .then(setStatsData)
      .catch(console.error)
  }, [])
  const stats = [
    {
      label: 'Indexed Movies',
      value: statsData ? statsData.movies.toLocaleString() : '—',
      unit: 'SQLite Dataset',
      icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="2" y="3" width="20" height="14" rx="2" /><path d="M8 21h8M12 17v4" strokeLinecap="round" /></svg>,
      color: '#a78bfa',
    },
    {
      label: 'TF-IDF Features',
      value: statsData ? statsData.features.toLocaleString() : '—',
      unit: 'TF-IDF Matrix',
      icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" strokeLinecap="round" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" /></svg>,
      color: '#38bdf8',
    },
    {
      label: 'Search Time',
      value: statsData ? `~${statsData.search_time} ms` : '—',
      unit: 'Average Runtime',
      icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" strokeLinecap="round" /></svg>,
      color: '#22d3a8',
    },
    {
      label: 'Matching Results',
      value: statsData ? statsData.current_results.toString() : '—',
      unit: 'Current Query',
      icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12" strokeLinecap="round" strokeLinejoin="round" /></svg>,
      color: '#f5a000',
    },
  ]

  return (
    <section style={{ padding: isMobile ? '60px 16px' : '80px 32px', maxWidth: 1280, margin: '0 auto', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
      <div style={{ textAlign: 'center', marginBottom: 52 }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '4px 12px', borderRadius: 100, backgroundColor: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', marginBottom: 16 }}>
          <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10, color: '#64748b', letterSpacing: '0.1em' }}>SYSTEM STATISTICS</span>
        </div>
        <h2 style={{ fontFamily: 'Outfit, sans-serif', fontSize: isMobile ? 28 : 36, fontWeight: 800, color: '#e2e8f4', margin: '0 0 12px', letterSpacing: '-0.03em' }}>Engine at a Glance</h2>
        <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 15, color: '#4a5568', maxWidth: 480, margin: '0 auto', lineHeight: 1.65 }}>
          Real-time metrics from the TF-IDF retrieval engine powering your search.
        </p>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(auto-fit, minmax(220px, 1fr))', gap: isMobile ? 14 : 20 }}>
        {stats.map((s) => <StatCard key={s.label} {...s} />)}
      </div>
    </section>
  )
}
