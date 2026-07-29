import { GitHubIcon, LogoMark } from './icons'
import { useResponsive } from '../hooks'

const TECH_STACK = [
  { name: 'Python 3.11', desc: 'Backend runtime' },
  { name: 'Flask', desc: 'REST API framework' },
  { name: 'SQLite', desc: 'Document store' },
  { name: 'Scikit-learn', desc: 'ML & IR toolkit' },
  { name: 'NLTK', desc: 'Text preprocessing' },
  { name: 'TF-IDF', desc: 'Term weighting' },
  { name: 'Cosine Similarity', desc: 'Ranking metric' },
  { name: 'React', desc: 'UI library' },
  { name: 'Vite', desc: 'Build tooling' },
]

export function Footer() {
  const { isMobile } = useResponsive()

  return (
    <footer id="footer" style={{ borderTop: '1px solid rgba(255,255,255,0.05)', padding: isMobile ? '48px 16px 32px' : '64px 32px 40px' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        {/* Top row */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 40, marginBottom: 52 }}>
          {/* Brand */}
          <div style={{ maxWidth: 340 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
              <LogoMark size={32} />
              <span style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: 16, color: '#e2e8f4', letterSpacing: '-0.02em' }}>
                CineSearch{' '}
              </span>
            </div>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 13.5, lineHeight: 1.75, color: '#4a5568', margin: 0 }}>
              An information retrieval system for movie discovery, powered by TF-IDF vectorization and cosine similarity. Built as a software engineering portfolio project.
            </p>
          </div>

          {/* Tech stack */}
          <div style={{ flexShrink: isMobile ? 0 : 1 }}>
            <p style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10, color: '#334155', letterSpacing: '0.1em', marginBottom: 16 }}>TECH STACK</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, maxWidth: 500 }}>
              {TECH_STACK.map((tech) => (
                <div
                  key={tech.name}
                  title={tech.desc}
                  style={{ padding: '6px 14px', borderRadius: 8, backgroundColor: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)', fontFamily: 'Inter, sans-serif', fontSize: 12, fontWeight: 500, color: '#64748b', cursor: 'default', transition: 'all 0.15s' }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLElement
                    el.style.color = '#e2e8f4'
                    el.style.borderColor = 'rgba(255,255,255,0.15)'
                    el.style.backgroundColor = 'rgba(255,255,255,0.08)'
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLElement
                    el.style.color = '#64748b'
                    el.style.borderColor = 'rgba(255,255,255,0.07)'
                    el.style.backgroundColor = 'rgba(255,255,255,0.04)'
                  }}
                >
                  {tech.name}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom row */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16, paddingTop: 24, borderTop: '1px solid rgba(255,255,255,0.04)' }}>
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: '#2d3a4d', margin: 0 }}>
            Designed & Developed by Erfan Ranjbar
          </p>
          <div style={{ display: 'flex', gap: 20, alignItems: 'center' }}>
            <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10, color: '#1e2b3d', letterSpacing: '0.06em' }}>IR · NLP · ML</span>
            <a
              href="https://github.com/Erfan22R"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: '#334155', textDecoration: 'none', transition: 'color 0.2s' }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = '#64748b')}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = '#334155')}
            >
              <GitHubIcon />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
