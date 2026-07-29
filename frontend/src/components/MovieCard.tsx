import { useState } from 'react'
import type { Movie } from '../types'
import { StarIcon } from './icons'
import { similarityColor } from '../data'

export function MovieCard({
  movie,
  index,
  isBestMatch,
  onViewDetails,
}: {
  movie: Movie
  index: number
  isBestMatch?: boolean
  onViewDetails: (id: number) => void
}) {
  const [hovered, setHovered] = useState(false)
  const scoreColor = similarityColor(movie.similarity)
  const scorePercent = Math.round(movie.similarity * 100)

  return (
    <article
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        backgroundColor: '#0f1623',
        border: `1px solid ${hovered ? 'rgba(245,160,0,0.25)' : 'rgba(255,255,255,0.06)'}`,
        borderRadius: 16,
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        transition: 'border-color 0.25s, transform 0.25s, box-shadow 0.25s',
        transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
        boxShadow: hovered
          ? '0 20px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(245,160,0,0.08)'
          : '0 4px 20px rgba(0,0,0,0.3)',
        animationDelay: `${index * 0.07}s`,
      }}
    >
      {/* Poster */}
      <div style={{ position: 'relative', height: 280, flexShrink: 0 }}>
        <img
          src={movie.poster}
          alt={`${movie.title} movie poster`}
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', filter: hovered ? 'brightness(1.05)' : 'brightness(0.85)', transition: 'filter 0.25s' }}
          loading="lazy"
        />
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '60%', background: 'linear-gradient(to top, #0f1623 0%, rgba(15,22,35,0.4) 60%, transparent 100%)' }} />

        {/* Best Match / Year badge */}
        {isBestMatch ? (
          <div style={{ position: 'absolute', top: 12, left: 12, padding: '4px 10px', borderRadius: 100, background: 'linear-gradient(135deg, #f5a000, #e05c00)', display: 'flex', alignItems: 'center', gap: 5 }}>
            <svg width="10" height="10" viewBox="0 0 24 24" fill="white">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
            <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 10, fontWeight: 700, color: '#fff', letterSpacing: '0.04em' }}>Best Match</span>
          </div>
        ) : (
          <div style={{ position: 'absolute', top: 12, left: 12, padding: '4px 10px', borderRadius: 100, backgroundColor: 'rgba(8,12,20,0.85)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.1)' }}>
            <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 11, fontWeight: 500, color: '#8892a4' }}>{movie.year}</span>
          </div>
        )}

        {/* Similarity badge */}
        <div style={{ position: 'absolute', top: 12, right: 12, padding: '4px 10px', borderRadius: 100, backgroundColor: 'rgba(8,12,20,0.85)', backdropFilter: 'blur(8px)', border: `1px solid ${scoreColor}40`, display: 'flex', alignItems: 'center', gap: 5 }}>
          <div style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: scoreColor, boxShadow: `0 0 6px ${scoreColor}` }} />
          <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 11, fontWeight: 600, color: scoreColor }}>{scorePercent}%</span>
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: 12, flex: 1 }}>
        <h3 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 17, fontWeight: 700, color: '#e2e8f4', margin: 0, lineHeight: 1.2, letterSpacing: '-0.02em' }}>
          {movie.title}
        </h3>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
          {movie.genre.map((g) => (
            <span key={g} style={{ padding: '3px 10px', borderRadius: 100, backgroundColor: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)', fontFamily: 'Inter, sans-serif', fontSize: 11, fontWeight: 500, color: '#8892a4' }}>
              {g}
            </span>
          ))}
        </div>

        {/* Similarity bar */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10, color: '#334155', letterSpacing: '0.06em' }}>COSINE SIMILARITY</span>
            <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 11, color: scoreColor, fontWeight: 600 }}>{movie.similarity.toFixed(3)}</span>
          </div>
          <div style={{ height: 3, borderRadius: 100, backgroundColor: 'rgba(255,255,255,0.06)', overflow: 'hidden' }}>
            <div style={{ height: '100%', width: `${scorePercent}%`, borderRadius: 100, backgroundColor: scoreColor, boxShadow: `0 0 8px ${scoreColor}60` }} />
          </div>
        </div>

        {/* Rating */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <div style={{ display: 'flex', gap: 2 }}>
            {Array.from({ length: 5 }).map((_, i) => (
              <StarIcon key={i} filled={i < Math.round(movie.rating / 2)} />
            ))}
          </div>
          <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 11, color: '#f5a000', fontWeight: 600 }}>{movie.rating.toFixed(1)}</span>
          <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, color: '#334155' }}>/ 10</span>
        </div>

        <button
          onClick={() => onViewDetails(movie.id)}
          style={{
            marginTop: 'auto',
            padding: '10px 0',
            borderRadius: 9,
            border: '1px solid rgba(245,160,0,0.25)',
            backgroundColor: hovered ? 'rgba(245,160,0,0.12)' : 'rgba(245,160,0,0.05)',
            color: '#f5a000',
            fontFamily: 'Inter, sans-serif',
            fontSize: 13,
            fontWeight: 600,
            cursor: 'pointer',
            transition: 'all 0.2s',
          }}
          onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.backgroundColor = 'rgba(245,160,0,0.18)')}
          onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.backgroundColor = hovered ? 'rgba(245,160,0,0.12)' : 'rgba(245,160,0,0.05)')}
        >
          View Details →
        </button>
      </div>
    </article>
  )
}
