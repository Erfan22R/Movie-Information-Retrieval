import { useState, useEffect } from 'react'
import type { Movie } from '../types'
import type { Page } from '../types'
import { SearchIcon } from './icons'
import { MovieCard } from './MovieCard'
import { searchMovies } from '../services/api'
import { useResponsive } from '../hooks'

export function SearchResultsPage({
  initialQuery,
  onViewDetails,
  onNavigate,
}: {
  initialQuery: string
  onViewDetails: (movie: Movie) => void
  onNavigate: (page: Page) => void
}) {
  const [query, setQuery] = useState(initialQuery)
  const [liveQuery, setLiveQuery] = useState(initialQuery)
  const [results, setResults] = useState<Movie[]>([])
  const [searchTime, setSearchTime] = useState(0)
  const [isSearching, setIsSearching] = useState(false)
  const [visibleCount, setVisibleCount] = useState(6)
  const { isMobile } = useResponsive()

  const runSearch = async (q: string) => {
    if (!q.trim()) return
  
    setIsSearching(true)
    const start = performance.now()
  
    try {
      const response = await searchMovies(q)
  
      const converted: Movie[] = response.results.map((m, index) => ({
        id: m.id || index + 1,
        title: m.title,
        year: Number(m.year) || 2024,
        genre: m.genre ? m.genre.split(',').map((g) => g.trim()) : [],
        plot: m.plot || '',
        similarity: m.score,
        poster: m.poster || 'https://placehold.co/400x600/0f172a/e2e8f0?text=No+Poster',
      
        director: m.director || 'Unknown',
        writer: m.writer || 'Unknown',
        cast: m.actors ? m.actors.split(',').map((a) => a.trim()) : [],
      
        runtime: m.runtime || 'N/A',
        country: m.country || 'Unknown',
        language: m.language || 'Unknown',
      
        rating: Number(m.rating) || Math.round(m.score * 100) / 10,
        matchedKeywords: [],
      }))
  
      setResults(converted)
      setSearchTime(performance.now() - start)
      setVisibleCount(6)
    } catch (error) {
      console.error('Search failed:', error)
      setResults([])
    } finally {
      setIsSearching(false)
    }
  }

  useEffect(() => {
    runSearch(initialQuery)
  }, [initialQuery])

  const handleSearch = () => {
    setQuery(liveQuery)
    runSearch(liveQuery)
  }

  const visibleResults = results.slice(0, visibleCount)
  const hasMore = visibleCount < results.length

  return (
    <div style={{ paddingTop: 64 }}>
      {/* Search bar header */}
      <div
        style={{
          backgroundColor: '#0a0e18',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
          padding: isMobile ? '16px' : '24px 32px',
        }}
      >
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              backgroundColor: '#0f1623',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: 12,
              padding: isMobile ? '6px 6px 6px 14px' : '6px 6px 6px 20px',
              gap: 12,
              maxWidth: 720,
              transition: 'border-color 0.2s',
            }}
            onFocusCapture={(e) => ((e.currentTarget as HTMLElement).style.borderColor = 'rgba(245,160,0,0.5)')}
            onBlurCapture={(e) => ((e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.1)')}
          >
            <div style={{ color: '#4a5568', flexShrink: 0 }}><SearchIcon /></div>
            <input
              type="text"
              value={liveQuery}
              onChange={(e) => setLiveQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              style={{ flex: 1, background: 'transparent', border: 'none', outline: 'none', fontFamily: 'Inter, sans-serif', fontSize: isMobile ? 14 : 15, color: '#e2e8f4', padding: '10px 0', minWidth: 0 }}
            />
            <button
              onClick={handleSearch}
              style={{
                flexShrink: 0,
                padding: isMobile ? '9px 14px' : '9px 22px',
                borderRadius: 8,
                border: 'none',
                cursor: 'pointer',
                background: 'linear-gradient(135deg, #f5a000, #e05c00)',
                color: '#fff',
                fontFamily: 'Inter, sans-serif',
                fontSize: 14,
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                gap: 7,
              }}
            >
              {isSearching ? (
                <span style={{ width: 13, height: 13, border: '2px solid rgba(255,255,255,0.3)', borderTopColor: '#fff', borderRadius: '50%', display: 'inline-block', animation: 'spin 0.7s linear infinite' }} />
              ) : <SearchIcon size={14} />}
              {!isMobile && 'Search'}
            </button>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 1280, margin: '0 auto', padding: isMobile ? '24px 16px 60px' : '40px 32px 100px' }}>
        {/* Search summary */}
        {!isSearching && (results.length > 0 || query) && (
          <div style={{ display: 'flex', alignItems: isMobile ? 'flex-start' : 'center', flexDirection: isMobile ? 'column' : 'row', gap: isMobile ? 12 : 24, marginBottom: 40, flexWrap: 'wrap' }}>
            <div>
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 14, color: '#4a5568', margin: 0 }}>
                Results for{' '}
                <span style={{ color: '#e2e8f4', fontWeight: 600, fontStyle: 'italic' }}>"{query}"</span>
              </p>
            </div>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              {[
                { label: 'Total Matches', value: results.length, color: '#f5a000' },
                { label: 'Displayed', value: Math.min(visibleCount, results.length), color: '#38bdf8' },
                { label: 'Search Time', value: `${searchTime.toFixed(0)}ms`, color: '#22d3a8' },
              ].map((stat) => (
                <div
                  key={stat.label}
                  style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '7px 14px', borderRadius: 8, backgroundColor: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}
                >
                  <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 13, fontWeight: 700, color: stat.color }}>{stat.value}</span>
                  <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: '#4a5568' }}>{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Loading */}
        {isSearching && (
          <div style={{ textAlign: 'center', padding: '80px 0' }}>
            <div style={{ width: 40, height: 40, border: '3px solid rgba(245,160,0,0.2)', borderTopColor: '#f5a000', borderRadius: '50%', animation: 'spin 0.8s linear infinite', margin: '0 auto 20px' }} />
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 14, color: '#4a5568' }}>Running TF-IDF query…</p>
          </div>
        )}

        {/* Empty state */}
        {!isSearching && results.length === 0 && query && (
          <div style={{ textAlign: 'center', padding: '80px 32px', maxWidth: 420, margin: '0 auto' }}>
            <div style={{ width: 80, height: 80, borderRadius: 20, backgroundColor: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 28px' }}>
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#2d3a4d" strokeWidth="1.5">
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.35-4.35" />
                <path d="M8 11h6M11 8v6" strokeLinecap="round" />
              </svg>
            </div>
            <h3 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 22, fontWeight: 700, color: '#4a5568', margin: '0 0 12px' }}>No Results Found</h3>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 14, color: '#2d3a4d', lineHeight: 1.7, margin: '0 0 28px' }}>
              The TF-IDF engine found no documents matching <span style={{ color: '#64748b', fontStyle: 'italic' }}>"{query}"</span>. Try different keywords or a broader phrase.
            </p>
            <button
              onClick={() => onNavigate({ name: 'home' })}
              style={{ padding: '10px 24px', borderRadius: 9, border: '1px solid rgba(245,160,0,0.3)', backgroundColor: 'rgba(245,160,0,0.08)', color: '#f5a000', fontFamily: 'Inter, sans-serif', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}
            >
              Back to Search
            </button>
          </div>
        )}

        {/* Cards grid */}
        {!isSearching && results.length > 0 && (
          <>
            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(auto-fill, minmax(260px, 1fr))', gap: isMobile ? 14 : 24 }}>
              {visibleResults.map((movie, i) => (
                <MovieCard
                key={movie.id}
                movie={movie}
                index={i}
                isBestMatch={i === 0}
                onViewDetails={() => onViewDetails(movie)}
              />
              ))}
            </div>

            {hasMore ? (
              <div style={{ textAlign: 'center', marginTop: 48 }}>
                <button
                  onClick={() => setVisibleCount((c) => c + 6)}
                  style={{ padding: '12px 36px', borderRadius: 10, border: '1px solid rgba(255,255,255,0.12)', backgroundColor: 'rgba(255,255,255,0.04)', color: '#8892a4', fontFamily: 'Inter, sans-serif', fontSize: 14, fontWeight: 600, cursor: 'pointer', transition: 'all 0.2s' }}
                  onMouseEnter={(e) => { const el = e.currentTarget as HTMLElement; el.style.borderColor = 'rgba(245,160,0,0.3)'; el.style.color = '#f5a000'; el.style.backgroundColor = 'rgba(245,160,0,0.06)' }}
                  onMouseLeave={(e) => { const el = e.currentTarget as HTMLElement; el.style.borderColor = 'rgba(255,255,255,0.12)'; el.style.color = '#8892a4'; el.style.backgroundColor = 'rgba(255,255,255,0.04)' }}
                >
                  Load More Results ({results.length - visibleCount} remaining)
                </button>
              </div>
            ) : (
              <div style={{ textAlign: 'center', marginTop: 48 }}>
                <p style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 11, color: '#2d3a4d', letterSpacing: '0.08em' }}>— END OF RESULTS —</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
