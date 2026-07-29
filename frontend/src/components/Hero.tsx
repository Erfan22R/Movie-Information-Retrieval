import { useState, useRef } from 'react'
import { SearchIcon } from './icons'
import { useResponsive } from '../hooks'

export function HeroSection({ onSearch }: { onSearch: (query: string) => void }) {
  const [query, setQuery] = useState('')
  const [isSearching, setIsSearching] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const { isMobile } = useResponsive()

  const suggestions = [
    'mafia family',
    'psychological thriller',
    'time travel paradox',
    'prison escape',
    'courtroom drama',
  ]

  const handleSearch = () => {
    if (!query.trim()) return
    setIsSearching(true)
    setTimeout(() => {
      setIsSearching(false)
      onSearch(query)
    }, 500 + Math.random() * 300)
  }

  const handleSuggestion = (s: string) => {
    setQuery(s)
    setTimeout(() => {
      setIsSearching(true)
      setTimeout(() => {
        setIsSearching(false)
        onSearch(s)
      }, 500 + Math.random() * 300)
    }, 50)
  }

  return (
    <section
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: isMobile ? '100px 20px 60px' : '120px 32px 80px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Radial glow */}
      <div
        style={{
          position: 'absolute',
          top: '35%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 800,
          height: 500,
          background: 'radial-gradient(ellipse at center, rgba(245,160,0,0.08) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: '20%',
          right: '20%',
          height: 1,
          background: 'linear-gradient(90deg, transparent, rgba(245,160,0,0.4), transparent)',
        }}
      />

      {/* Badge */}
      <div
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 8,
          padding: '6px 14px',
          borderRadius: 100,
          border: '1px solid rgba(245,160,0,0.25)',
          backgroundColor: 'rgba(245,160,0,0.07)',
          marginBottom: 32,
        }}
      >
        <div style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: '#f5a000', boxShadow: '0 0 8px #f5a000' }} />
        <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 11, fontWeight: 500, color: '#f5a000', letterSpacing: '0.06em' }}>
          Information Retrieval Project
        </span>
      </div>

      {/* Headline */}
      <h1
        style={{
          fontFamily: 'Outfit, sans-serif',
          fontSize: 'clamp(32px, 6vw, 72px)',
          fontWeight: 800,
          color: '#e2e8f4',
          textAlign: 'center',
          lineHeight: 1.1,
          letterSpacing: '-0.03em',
          maxWidth: 800,
          margin: '0 0 20px',
        }}
      >
        Discover Movies with{' '}
        <span style={{ background: 'linear-gradient(135deg, #f5a000, #ff6b35)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
          Intelligent
        </span>{' '}
        Text Search
      </h1>

      {/* Sub-headline */}
      <p
        style={{
          fontFamily: 'Inter, sans-serif',
          fontSize: isMobile ? 16 : 18,
          fontWeight: 400,
          color: '#64748b',
          textAlign: 'center',
          maxWidth: 560,
          lineHeight: 1.65,
          margin: '0 0 52px',
          paddingLeft: '30px',
          paddingRight: '30px',
        }}
      >
        Discover movies by describing plots, genres, or themes instead of exact titles.
      </p>

      {/* Search bar */}
      <div style={{ width: '100%', maxWidth: 680, position: 'relative' }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            backgroundColor: '#0f1623',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: 14,
            padding: isMobile ? '6px 6px 6px 14px' : '6px 6px 6px 20px',
            gap: isMobile ? 8 : 12,
            transition: 'border-color 0.2s, box-shadow 0.2s',
          }}
          onFocusCapture={(e) => {
            const el = e.currentTarget as HTMLElement
            el.style.borderColor = 'rgba(245,160,0,0.5)'
            el.style.boxShadow = '0 0 0 4px rgba(245,160,0,0.08)'
          }}
          onBlurCapture={(e) => {
            const el = e.currentTarget as HTMLElement
            el.style.borderColor = 'rgba(255,255,255,0.1)'
            el.style.boxShadow = 'none'
          }}
        >
          <div style={{ color: '#4a5568', flexShrink: 0 }}>
            <SearchIcon />
          </div>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            placeholder={isMobile ? 'Describe a movie...' : 'Try: prison escape, psychological thriller, space...'}
            style={{
              flex: 1,
              background: 'transparent',
              border: 'none',
              outline: 'none',
              fontFamily: 'Inter, sans-serif',
              fontSize: isMobile ? 14 : 16,
              color: '#e2e8f4',
              padding: '10px 0',
              minWidth: 0,
            }}
            autoComplete="off"
            spellCheck={false}
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: '#4a5568', padding: 4, display: 'flex', alignItems: 'center' }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                <path d="M18 6 6 18M6 6l12 12" />
              </svg>
            </button>
          )}
          <button
            onClick={handleSearch}
            style={{
              flexShrink: 0,
              padding: isMobile ? '11px 14px' : '11px 24px',
              borderRadius: 9,
              border: 'none',
              cursor: 'pointer',
              background: 'linear-gradient(135deg, #f5a000, #e05c00)',
              color: '#ffffff',
              fontFamily: 'Inter, sans-serif',
              fontSize: 15,
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              opacity: isSearching ? 0.8 : 1,
              transition: 'opacity 0.2s',
            }}
          >
            {isSearching ? (
              <>
                <span style={{ width: 14, height: 14, border: '2px solid rgba(255,255,255,0.3)', borderTopColor: '#fff', borderRadius: '50%', display: 'inline-block', animation: 'spin 0.7s linear infinite' }} />
                {!isMobile && 'Searching…'}
              </>
            ) : (
              isMobile ? <SearchIcon size={16} /> : 'Search'
            )}
          </button>
        </div>
      </div>

      {/* Suggestions */}
      <div style={{ marginTop: 24, display: 'flex', flexWrap: 'wrap', gap: 8, justifyContent: 'center', maxWidth: isMobile ? '100%' : 680, padding: isMobile ? '0 4px' : 0 }}>
        <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: '#334155', alignSelf: 'center' }}>Try:</span>
        {suggestions.map((s) => (
          <button
            key={s}
            onClick={() => handleSuggestion(s)}
            style={{
              padding: '5px 12px',
              borderRadius: 100,
              border: '1px solid rgba(255,255,255,0.07)',
              backgroundColor: 'rgba(255,255,255,0.03)',
              color: '#64748b',
              fontFamily: 'Inter, sans-serif',
              fontSize: 12,
              cursor: 'pointer',
              transition: 'all 0.15s',
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLElement
              el.style.borderColor = 'rgba(245,160,0,0.3)'
              el.style.color = '#f5a000'
              el.style.backgroundColor = 'rgba(245,160,0,0.06)'
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLElement
              el.style.borderColor = 'rgba(255,255,255,0.07)'
              el.style.color = '#64748b'
              el.style.backgroundColor = 'rgba(255,255,255,0.03)'
            }}
          >
            {s}
          </button>
        ))}
      </div>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </section>
  )
}
