import { useState } from 'react'
import { useResponsive } from '../hooks'

const STEPS = [
  { step: '01', title: 'Movie Indexing', desc: 'Each movie plot, genre, and metadata field is tokenized using NLTK, stemmed, and indexed into a sparse TF-IDF matrix stored in SQLite.', color: '#a78bfa' },
  { step: '02', title: 'TF-IDF Vectorization', desc: 'Your search query is transformed into a TF-IDF vector in the same high-dimensional space as the document corpus using Scikit-learn.', color: '#38bdf8' },
  { step: '03', title: 'Cosine Similarity', desc: 'The angle between your query vector and each document vector is computed — smaller angles yield higher relevance scores.', color: '#22d3a8' },
  { step: '04', title: 'Top Matching Movies', desc: 'Results are sorted by descending cosine similarity score and returned with metadata for the top-k matching documents.', color: '#f5a000' },
]

function HowItWorksCard({ step, title, desc, color }: { step: string; title: string; desc: string; color: string }) {
  const [hovered, setHovered] = useState(false)
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ padding: '36px 32px', backgroundColor: hovered ? '#0f1623' : '#0b0f1a', transition: 'background-color 0.25s', display: 'flex', flexDirection: 'column', gap: 16 }}
    >
      <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 11, fontWeight: 700, color, letterSpacing: '0.08em', opacity: 0.8 }}>{step}</div>
      <div>
        <h3 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 18, fontWeight: 700, color: hovered ? color : '#e2e8f4', margin: '0 0 10px', letterSpacing: '-0.02em', transition: 'color 0.25s' }}>{title}</h3>
        <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 13.5, lineHeight: 1.7, color: '#4a5568', margin: 0 }}>{desc}</p>
      </div>
      <div style={{ width: 32, height: 2, borderRadius: 1, backgroundColor: color, opacity: hovered ? 1 : 0.3, transition: 'opacity 0.25s' }} />
    </div>
  )
}

export function HowItWorksSection() {
  const { isMobile } = useResponsive()

  return (
    <section id="how-it-works" style={{ padding: isMobile ? '60px 16px' : '80px 32px', maxWidth: 1280, margin: '0 auto', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
      <div style={{ textAlign: 'center', marginBottom: 52 }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '4px 12px', borderRadius: 100, backgroundColor: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', marginBottom: 16 }}>
          <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10, color: '#64748b', letterSpacing: '0.1em' }}>ALGORITHM</span>
        </div>
        <h2 style={{ fontFamily: 'Outfit, sans-serif', fontSize: isMobile ? 28 : 36, fontWeight: 800, color: '#e2e8f4', margin: '0 0 12px', letterSpacing: '-0.03em' }}>
          How It Works
        </h2>
        <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 15, color: '#4a5568', maxWidth: 480, margin: '0 auto', lineHeight: 1.65 }}>
          See how your search query is transformed into meaningful movie recommendations using classical IR techniques.
        </p>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: 1,
          backgroundColor: 'rgba(255,255,255,0.05)',
          borderRadius: 16,
          overflow: 'hidden',
          border: '1px solid rgba(255,255,255,0.05)',
        }}
      >
        {STEPS.map((s) => <HowItWorksCard key={s.step} {...s} />)}
      </div>
    </section>
  )
}
