import { useState } from 'react'
import type { Page } from '../types'
import { GitHubIcon, LogoMark } from './icons'
import { useResponsive } from '../hooks'

export function Navbar({
  onNavigate,
  currentPage,
}: {
  onNavigate: (page: Page) => void
  currentPage: Page
}) {
  const { isMobile } = useResponsive()
  const [menuOpen, setMenuOpen] = useState(false)

  const scrollTo = (id: string) => {
    setMenuOpen(false)
    if (currentPage.name !== 'home') {
      onNavigate({ name: 'home' })
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
      }, 100)
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const navItems = [
    { label: 'Search', action: () => { setMenuOpen(false); onNavigate({ name: 'home' }) } },
    { label: 'About', action: () => scrollTo('footer') },
    { label: 'How it Works', action: () => scrollTo('how-it-works') },
  ]

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        backgroundColor: 'rgba(8,12,20,0.88)',
      }}
    >
      <div
        style={{
          maxWidth: 1280,
          margin: '0 auto',
          padding: isMobile ? '0 16px' : '0 32px',
          height: 64,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {/* Logo */}
        <button
          onClick={() => onNavigate({ name: 'home' })}
          style={{ display: 'flex', alignItems: 'center', gap: 10, background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
        >
          <LogoMark size={34} />
          {!isMobile && (
            <div>
              <div style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: 16, color: '#e2e8f4', letterSpacing: '-0.02em', lineHeight: 1 }}>
                CineSearch{' '}
              </div>
              <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10, color: '#f5a000', letterSpacing: '0.08em', lineHeight: 1, marginTop: 2 }}>
                TF-IDF · Cosine Similarity
              </div>
            </div>
          )}
        </button>

        {/* Desktop nav + GitHub */}
        {!isMobile && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
            <nav style={{ display: 'flex', gap: 28 }}>
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href="#"
                  onClick={(e) => { e.preventDefault(); item.action() }}
                  style={{ fontFamily: 'Inter, sans-serif', fontSize: 14, fontWeight: 500, color: '#8892a4', textDecoration: 'none', transition: 'color 0.2s' }}
                  onMouseEnter={(e) => ((e.target as HTMLElement).style.color = '#e2e8f4')}
                  onMouseLeave={(e) => ((e.target as HTMLElement).style.color = '#8892a4')}
                >
                  {item.label}
                </a>
              ))}
            </nav>
            <a
              href="https://github.com/Erfan22R"
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '7px 16px', borderRadius: 8, border: '1px solid rgba(255,255,255,0.12)', color: '#c8d0e0', textDecoration: 'none', fontFamily: 'Inter, sans-serif', fontSize: 13, fontWeight: 500, transition: 'all 0.2s', backgroundColor: 'rgba(255,255,255,0.04)' }}
              onMouseEnter={(e) => { const el = e.currentTarget as HTMLElement; el.style.borderColor = 'rgba(255,255,255,0.22)'; el.style.backgroundColor = 'rgba(255,255,255,0.08)' }}
              onMouseLeave={(e) => { const el = e.currentTarget as HTMLElement; el.style.borderColor = 'rgba(255,255,255,0.12)'; el.style.backgroundColor = 'rgba(255,255,255,0.04)' }}
            >
              <GitHubIcon />
              <span>GitHub</span>
            </a>
          </div>
        )}

        {/* Mobile: GitHub icon + hamburger */}
        {isMobile && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: '#8892a4', textDecoration: 'none', display: 'flex', alignItems: 'center' }}
            >
              <GitHubIcon />
            </a>
            <button
              onClick={() => setMenuOpen((o) => !o)}
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#8892a4', padding: 4, display: 'flex', alignItems: 'center' }}
              aria-label="Toggle menu"
            >
              {menuOpen ? (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                  <path d="M18 6 6 18M6 6l12 12" />
                </svg>
              ) : (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                  <line x1="4" y1="8" x2="20" y2="8" />
                  <line x1="4" y1="16" x2="20" y2="16" />
                </svg>
              )}
            </button>
          </div>
        )}
      </div>

      {/* Mobile dropdown menu */}
      {isMobile && menuOpen && (
        <div
          style={{
            borderTop: '1px solid rgba(255,255,255,0.06)',
            backgroundColor: 'rgba(8,12,20,0.97)',
            padding: '16px',
            display: 'flex',
            flexDirection: 'column',
            gap: 4,
          }}
        >
          {navItems.map((item) => (
            <a
              key={item.label}
              href="#"
              onClick={(e) => { e.preventDefault(); item.action() }}
              style={{ fontFamily: 'Inter, sans-serif', fontSize: 15, fontWeight: 500, color: '#8892a4', textDecoration: 'none', padding: '12px 8px', borderRadius: 8, transition: 'all 0.15s', display: 'block' }}
              onMouseEnter={(e) => { const el = e.currentTarget as HTMLElement; el.style.color = '#e2e8f4'; el.style.backgroundColor = 'rgba(255,255,255,0.04)' }}
              onMouseLeave={(e) => { const el = e.currentTarget as HTMLElement; el.style.color = '#8892a4'; el.style.backgroundColor = 'transparent' }}
            >
              {item.label}
            </a>
          ))}
        </div>
      )}
    </header>
  )
}
