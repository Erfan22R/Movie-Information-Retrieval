import { useState, useEffect } from 'react'
import type { Page, Movie } from './types'
import { Navbar } from './components/Navbar'
import { HeroSection } from './components/Hero'
import { SearchResultsPage } from './components/SearchResults'
import { MovieDetailsPage } from './components/MovieDetails'
import { HowItWorksSection } from './components/HowItWorks'
import { StatsSection } from './components/Stats'
import { Footer } from './components/Footer'

function HomePage({ onSearch }: { onSearch: (query: string) => void }) {
  return (
    <>
      <HeroSection onSearch={onSearch} />
      <HowItWorksSection />
      <StatsSection />
      <Footer />
    </>
  )
}

export default function App() {
  const [page, setPage] = useState<Page>({ name: 'home' })
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null)
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [page.name])

  const handleSearch = (query: string) => {
    setPage({ name: 'results', query })
  }

  const handleViewDetails = (movie: Movie) => {
    const fromQuery =
      page.name === 'results'
        ? page.query
        : page.name === 'details'
          ? page.fromQuery
          : ''
  
    setSelectedMovie(movie)
    setPage({ name: 'details', movieId: movie.id, fromQuery })
  }

  const handleBack = () => {
    if (page.name === 'details' && page.fromQuery) {
      setPage({ name: 'results', query: page.fromQuery })
    } else {
      setPage({ name: 'home' })
    }
  }

  return (
    <div style={{ backgroundColor: '#080c14', minHeight: '100vh', position: 'relative' }}>
      {/* Grid texture */}
      <div
        style={{
          position: 'fixed',
          inset: 0,
          backgroundImage: `linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)`,
          backgroundSize: '80px 80px',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      <div style={{ position: 'relative', zIndex: 1 }}>
        <Navbar onNavigate={setPage} currentPage={page} />

        {page.name === 'home' && <HomePage onSearch={handleSearch} />}

        {page.name === 'results' && (
          <SearchResultsPage
            initialQuery={page.query}
            onViewDetails={handleViewDetails}
            onNavigate={setPage}
          />
        )}

        {page.name === 'details' && selectedMovie && (
          <MovieDetailsPage
            movie={selectedMovie}
            fromQuery={page.name === 'details' ? page.fromQuery : ''}
            onBack={handleBack}
            onViewDetails={handleViewDetails}
          />
        )}

        {page.name !== 'home' && <Footer />}
      </div>
    </div>
  )
}
