import type { Movie } from '../types'
import { similarityColor } from '../data'
import { StarIcon, ArrowLeftIcon } from './icons'
//import { MovieCard } from './MovieCard'
import { useResponsive } from '../hooks'

export function MovieDetailsPage({
  movie,
  fromQuery = '',
  onBack,
  //onViewDetails,
}: {
  movie: Movie
  fromQuery?: string
  onBack: () => void
  onViewDetails: (movie: Movie) => void
}) {
  const { isMobile, isTablet } = useResponsive()
  
  const scoreColor = similarityColor(movie.similarity)
  const scorePercent = Math.round(movie.similarity * 100)
  //const relatedMovies: Movie[] = []

  const metaFields = [
    { label: 'Director', value: movie.director },
    { label: 'Writer', value: movie.writer },
    { label: 'Cast', value: movie.cast.join(', ') },
    { label: 'Runtime', value: movie.runtime },
    { label: 'Country', value: movie.country },
    { label: 'Language', value: movie.language },
  ]

  const isNarrow = isMobile || isTablet

  return (
    <div style={{ paddingTop: 64 }}>
      {/* Back bar */}
      <div style={{ backgroundColor: '#0a0e18', borderBottom: '1px solid rgba(255,255,255,0.06)', padding: isMobile ? '14px 16px' : '16px 32px' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <button
            onClick={onBack}
            style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'none', border: 'none', cursor: 'pointer', color: '#64748b', fontFamily: 'Inter, sans-serif', fontSize: 14, fontWeight: 500, padding: 0, transition: 'color 0.2s' }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = '#e2e8f4')}
            onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = '#64748b')}
          >
            <ArrowLeftIcon />
            Back to Results
            {fromQuery && !isMobile && (
              <span style={{ color: '#2d3a4d', fontSize: 13 }}>
                for <span style={{ fontStyle: 'italic' }}>"{fromQuery}"</span>
              </span>
            )}
          </button>
        </div>
      </div>

      <div style={{ maxWidth: 1280, margin: '0 auto', padding: isMobile ? '28px 16px 60px' : '56px 32px 100px' }}>
        {/* Hero layout — 2-col on desktop, stacked on mobile/tablet */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: isNarrow ? '1fr' : '300px 1fr',
            gap: isNarrow ? 28 : 56,
            marginBottom: isNarrow ? 32 : 56,
          }}
        >
          {/* Poster */}
          <div style={{ flexShrink: 0, maxWidth: isNarrow ? 220 : 'none', margin: isNarrow ? '0 auto' : 0, width: isNarrow ? '100%' : 'auto' }}>
            <div
              style={{
                borderRadius: 16,
                overflow: 'hidden',
                border: '1px solid rgba(255,255,255,0.08)',
                boxShadow: '0 32px 80px rgba(0,0,0,0.6)',
                aspectRatio: '2/3',
                backgroundColor: '#0f1623',
              }}
            >
              <img src={movie.poster} alt={movie.title} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
            </div>
          </div>

          {/* Details */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            {/* Title & year */}
            <div>
              <h1 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 'clamp(24px, 4vw, 48px)', fontWeight: 800, color: '#e2e8f4', margin: '0 0 8px', letterSpacing: '-0.03em', lineHeight: 1.1 }}>
                {movie.title}
              </h1>
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 15, color: '#4a5568', margin: 0 }}>
                {movie.year} · {movie.director} · {movie.runtime}
              </p>
            </div>

            {/* Genres */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {movie.genre.map((g) => (
                <span key={g} style={{ padding: '5px 14px', borderRadius: 100, backgroundColor: 'rgba(245,160,0,0.1)', border: '1px solid rgba(245,160,0,0.22)', fontFamily: 'Inter, sans-serif', fontSize: 13, fontWeight: 500, color: '#f5a000' }}>
                  {g}
                </span>
              ))}
            </div>

            {/* Rating + Similarity */}
            <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
              <div style={{ padding: '16px 24px', borderRadius: 12, backgroundColor: '#0f1623', border: '1px solid rgba(255,255,255,0.07)', display: 'flex', flexDirection: 'column', gap: 4, minWidth: 120 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  {Array.from({ length: 5 }).map((_, i) => <StarIcon key={i} filled={i < Math.round(movie.rating / 2)} />)}
                </div>
                <div style={{ fontFamily: 'Outfit, sans-serif', fontSize: 24, fontWeight: 800, color: '#f5a000', letterSpacing: '-0.02em' }}>{movie.rating}</div>
                <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10, color: '#334155', letterSpacing: '0.08em' }}>IMDb RATING</div>
              </div>
              <div style={{ padding: '16px 24px', borderRadius: 12, backgroundColor: '#0f1623', border: `1px solid ${scoreColor}25`, display: 'flex', flexDirection: 'column', gap: 4, minWidth: 150 }}>
                <div style={{ height: 3, borderRadius: 100, backgroundColor: 'rgba(255,255,255,0.06)', overflow: 'hidden', marginBottom: 4 }}>
                  <div style={{ height: '100%', width: `${scorePercent}%`, borderRadius: 100, backgroundColor: scoreColor, boxShadow: `0 0 8px ${scoreColor}60` }} />
                </div>
                <div style={{ fontFamily: 'Outfit, sans-serif', fontSize: 24, fontWeight: 800, color: scoreColor, letterSpacing: '-0.02em' }}>{scorePercent}%</div>
                <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10, color: '#334155', letterSpacing: '0.08em' }}>COSINE SIMILARITY</div>
              </div>
            </div>

            {/* Synopsis */}
            <div>
              <h3 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 15, fontWeight: 700, color: '#e2e8f4', margin: '0 0 10px', letterSpacing: '-0.01em' }}>Synopsis</h3>
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 15, lineHeight: 1.8, color: '#64748b', margin: 0 }}>{movie.plot}</p>
            </div>

            {/* Metadata grid */}
            <div
              style={{
                padding: isMobile ? '16px' : '24px',
                borderRadius: 12,
                backgroundColor: '#0f1623',
                border: '1px solid rgba(255,255,255,0.06)',
                display: 'grid',
                gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
                gap: isMobile ? '12px' : '16px 32px',
              }}
            >
              {metaFields.map((field) => (
                <div key={field.label}>
                  <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10, color: '#334155', letterSpacing: '0.08em', marginBottom: 4 }}>{field.label.toUpperCase()}</div>
                  <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, fontWeight: 500, color: '#8892a4', lineHeight: 1.5 }}>{field.value}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
          
        {/* Matched Keywords 
        {fromQuery && (
          <div
            style={{
              padding: isMobile ? '20px 16px' : '28px 32px',
              borderRadius: 16,
              backgroundColor: 'rgba(245,160,0,0.04)',
              border: '1px solid rgba(245,160,0,0.15)',
              marginBottom: isMobile ? 36 : 56,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
              <div style={{ width: 32, height: 32, borderRadius: 8, backgroundColor: 'rgba(245,160,0,0.12)', border: '1px solid rgba(245,160,0,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#f5a000" strokeWidth="2">
                  <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
                </svg>
              </div>
              <div>
                <h3 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 16, fontWeight: 700, color: '#e2e8f4', margin: 0, letterSpacing: '-0.01em' }}>Why This Matched Your Query</h3>
                <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: '#4a5568', margin: 0 }}>
                  Key terms from <span style={{ color: '#8892a4', fontStyle: 'italic' }}>"{fromQuery}"</span> matched these TF-IDF weighted tokens
                </p>
              </div>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {movie.matchedKeywords.map((kw) => (
                <span key={kw} style={{ padding: '6px 14px', borderRadius: 8, backgroundColor: 'rgba(245,160,0,0.1)', border: '1px solid rgba(245,160,0,0.25)', fontFamily: 'JetBrains Mono, monospace', fontSize: 12, fontWeight: 600, color: '#f5a000', letterSpacing: '0.04em' }}>
                  {kw}
                </span>
              ))}
            </div>
          </div>
        )}
        */}
        
        {/* Related Movies 
        <div>
          <div style={{ marginBottom: 28 }}>
            <h2 style={{ fontFamily: 'Outfit, sans-serif', fontSize: isMobile ? 22 : 26, fontWeight: 800, color: '#e2e8f4', margin: '0 0 6px', letterSpacing: '-0.03em' }}>Related Movies</h2>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 14, color: '#4a5568', margin: 0 }}>Similar films ranked by cosine similarity in the embedding space</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(auto-fill, minmax(220px, 1fr))', gap: isMobile ? 14 : 20 }}>
             {relatedMovies.length === 0 ? (
               <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 14, color: '#4a5568' }}>
                Related recommendations will be available in the next backend version.
              </p> 
            ) : (
              relatedMovies.map((m, i) => (
                <MovieCard key={m.id} movie={m} index={i}  onViewDetails={() => onViewDetails(m)}/> 
              )) 
            )}
          </div>
        </div>
        */}
      </div>
    </div>
  )
}
