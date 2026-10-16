import { useState, useEffect } from 'react'
import './Lightbox.css'

export interface LightboxImage {
  src: string
  alt: string
  caption?: string
}

interface LightboxProps {
  images: LightboxImage[]
  initialIndex: number
  onClose: () => void
}

export default function Lightbox({ images, initialIndex, onClose }: LightboxProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex)
  const [isZoomed, setIsZoomed] = useState(false)

  useEffect(() => {
    setCurrentIndex(initialIndex)
  }, [initialIndex])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') handleNext()
      if (e.key === 'ArrowLeft') handlePrev()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [currentIndex, images.length])

  const handleNext = () => {
    setIsZoomed(false)
    setCurrentIndex((prev) => (prev + 1) % images.length)
  }

  const handlePrev = () => {
    setIsZoomed(false)
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  const currentImg = images[currentIndex]
  if (!currentImg) return null

  return (
    <div
      className="lightbox"
      role="dialog"
      aria-modal="true"
      aria-label="Visualizador de fotografias em alta resolução"
      onClick={onClose}
    >
      <div className="lightbox__top-bar" onClick={(e) => e.stopPropagation()}>
        <div className="lightbox__counter">
          <span>{String(currentIndex + 1).padStart(2, '0')}</span>
          <span className="lightbox__counter-sep">/</span>
          <span>{String(images.length).padStart(2, '0')}</span>
        </div>

        <div className="lightbox__top-actions">
          <button
            className="lightbox__btn-tool"
            onClick={() => setIsZoomed(!isZoomed)}
            aria-label={isZoomed ? 'Reduzir zoom' : 'Aumentar zoom'}
            title={isZoomed ? 'Reduzir' : 'Ampliar 150%'}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              {isZoomed ? (
                <line x1="8" y1="11" x2="14" y2="11"></line>
              ) : (
                <>
                  <line x1="11" y1="8" x2="11" y2="14"></line>
                  <line x1="8" y1="11" x2="14" y2="11"></line>
                </>
              )}
            </svg>
          </button>

          <button
            className="lightbox__btn-close"
            onClick={onClose}
            aria-label="Fechar visualizador"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
      </div>

      <div className="lightbox__body" onClick={(e) => e.stopPropagation()}>
        {images.length > 1 && (
          <button
            className="lightbox__nav-btn lightbox__nav-btn--prev"
            onClick={handlePrev}
            aria-label="Fotografia anterior"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
          </button>
        )}

        <div className={`lightbox__image-stage ${isZoomed ? 'lightbox__image-stage--zoomed' : ''}`}>
          <img
            src={currentImg.src}
            alt={currentImg.alt}
            className="lightbox__image"
            onClick={() => setIsZoomed(!isZoomed)}
          />
        </div>

        {images.length > 1 && (
          <button
            className="lightbox__nav-btn lightbox__nav-btn--next"
            onClick={handleNext}
            aria-label="Próxima fotografia"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </button>
        )}
      </div>

      {currentImg.caption && (
        <div className="lightbox__bottom-bar" onClick={(e) => e.stopPropagation()}>
          <p className="lightbox__caption">{currentImg.caption}</p>
        </div>
      )}
    </div>
  )
}
