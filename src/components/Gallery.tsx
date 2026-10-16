import { useEffect, useRef } from 'react'
import './Gallery.css'

export interface GalleryItem {
  id: string
  src: string
  fallbackSrc: string
  alt: string
  category: string
  caption: string
  details: string
  aspectRatio: 'tall' | 'wide' | 'square'
  objectPosition: string
}

interface GalleryProps {
  onImageClick: (images: { src: string; alt: string; caption?: string }[], index: number) => void
}

export const galleryImages: GalleryItem[] = [
  {
    id: 'dra-larissa',
    src: '/images/dra-larissa-lazzo.png',
    fallbackSrc: '/media_1792175742702_1a3181ac.png',
    alt: 'Retrato oficial da Dra. Larissa Lazzo — Biomédica Esteta CRBM 12459',
    category: 'DIREÇÃO CLÍNICA',
    caption: 'Dra. Larissa Lazzo',
    details: 'Biomédica Esteta · CRBM 12459 · Atendimento exclusivo em Anápolis, GO',
    aspectRatio: 'tall',
    objectPosition: 'center 20%',
  },
  {
    id: 'detalhe-labial',
    src: '/images/detalhe-labial.jpg',
    fallbackSrc: '/media_1792175742711_a6f921a0.jpg',
    alt: 'Macro fotografia em close-up de lábios com contorno e hidratação refinados — Dra. Larissa Lazzo',
    category: 'CLOSE-UP ANATÔMICO',
    caption: 'Refinamento Labial',
    details: 'Precisão milimétrica de contorno, desenho do arco do cupido e textura natural',
    aspectRatio: 'square',
    objectPosition: 'center center',
  },
  {
    id: 'perfil-rinomodelacao',
    src: '/images/perfil-rinomodelacao.png',
    fallbackSrc: '/media_1792175742702_af7a6e46.png',
    alt: 'Fotografia de perfil demonstrando alinhamento nasal e harmonia de dorso — Dra. Larissa Lazzo',
    category: 'HARMONIA DE PERFIL',
    caption: 'Alinhamento Nasal',
    details: 'Estudo das proporções do dorso nasal e projeção da ponta em harmonia com o perfil',
    aspectRatio: 'tall',
    objectPosition: 'center 40%',
  },
  {
    id: 'analise-perfil-facial',
    src: '/images/analise-perfil-facial.png',
    fallbackSrc: '/media_1792175742708_1445afa8.png',
    alt: 'Estudo em ângulo 3/4 de contornos faciais, mandíbula e sustentação tecidual',
    category: 'ARQUITETURA FACIAL',
    caption: 'Contorno & Vetores Faciais',
    details: 'Análise morfológica dos terços faciais, ângulo mandibular e transição suave de planos',
    aspectRatio: 'wide',
    objectPosition: 'center 30%',
  },
]

export default function Gallery({ onImageClick }: GalleryProps) {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.querySelectorAll('.reveal-fade-up').forEach((child) => {
            child.classList.add('is-visible')
          })
        }
      },
      { threshold: 0.08 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const handleOpenLightbox = (index: number) => {
    const imagesForLightbox = galleryImages.map((item) => ({
      src: item.src,
      alt: item.alt,
      caption: `${item.caption} — ${item.details}`,
    }))
    onImageClick(imagesForLightbox, index)
  }

  return (
    <section id="galeria" className="gallery" ref={sectionRef} aria-label="Galeria Visual Editorial">
      <div className="container">
        {/* Cabeçalho da Galeria */}
        <div className="gallery__header">
          <div className="reveal-fade-up delay-1">
            <span className="eyebrow-tag">COMPOSIÇÃO EDITORIAL</span>
          </div>
          <div className="gallery__title-row">
            <h2 className="section-title reveal-fade-up delay-2">
              Galeria Visual: <em>harmonia em perspectiva.</em>
            </h2>
            <p className="gallery__note reveal-fade-up delay-3">
              Registros e análises morfológicas em fotografia de alta fidelidade. As imagens valorizam detalhes anatômicos, estudos de perfil e a visão autoral da Dra. Larissa Lazzo.
            </p>
          </div>
        </div>

        {/* Layout Editorial Assimétrico com as 4 Imagens Obrigatórias */}
        <div className="gallery__editorial-layout">
          {/* Item 1: Dra. Larissa Lazzo (Retrato Principal / Âncora da Galeria) */}
          <div
            className="gallery__item gallery__item--anchor reveal-fade-up delay-1"
            onClick={() => handleOpenLightbox(0)}
            role="button"
            tabIndex={0}
            aria-label="Abrir fotografia da Dra. Larissa Lazzo em tela cheia"
          >
            <div className="gallery__item-frame">
              <img
                src={galleryImages[0].src}
                alt={galleryImages[0].alt}
                className="gallery__item-img"
                loading="lazy"
                style={{ objectPosition: galleryImages[0].objectPosition }}
                onError={(e) => {
                  const target = e.currentTarget
                  if (!target.src.includes('media_1792175742702_1a3181ac.png')) {
                    target.src = galleryImages[0].fallbackSrc
                  }
                }}
              />
              <div className="gallery__item-overlay">
                <span className="gallery__item-category">{galleryImages[0].category}</span>
                <h3 className="gallery__item-title heading-serif">{galleryImages[0].caption}</h3>
                <p className="gallery__item-details">{galleryImages[0].details}</p>
                <span className="gallery__item-zoom-pill">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="11" cy="11" r="8"></circle>
                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                    <line x1="11" y1="8" x2="11" y2="14"></line>
                    <line x1="8" y1="11" x2="14" y2="11"></line>
                  </svg>
                  Visualizar em alta resolução
                </span>
              </div>
            </div>
          </div>

          {/* Coluna Editorial Direita (Agrupando os 3 estudos anatômicos) */}
          <div className="gallery__editorial-col">
            {/* Item 2: Close-up Labial */}
            <div
              className="gallery__item gallery__item--lips reveal-fade-up delay-2"
              onClick={() => handleOpenLightbox(1)}
              role="button"
              tabIndex={0}
              aria-label="Abrir macro fotografia labial em tela cheia"
            >
              <div className="gallery__item-frame">
                <img
                  src={galleryImages[1].src}
                  alt={galleryImages[1].alt}
                  className="gallery__item-img"
                  loading="lazy"
                  style={{ objectPosition: galleryImages[1].objectPosition }}
                  onError={(e) => {
                    const target = e.currentTarget
                    if (!target.src.includes('media_1792175742711_a6f921a0.jpg')) {
                      target.src = galleryImages[1].fallbackSrc
                    }
                  }}
                />
                <div className="gallery__item-overlay">
                  <span className="gallery__item-category">{galleryImages[1].category}</span>
                  <h3 className="gallery__item-title heading-serif">{galleryImages[1].caption}</h3>
                  <p className="gallery__item-details">{galleryImages[1].details}</p>
                  <span className="gallery__item-zoom-pill">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="11" cy="11" r="8"></circle>
                      <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                      <line x1="11" y1="8" x2="11" y2="14"></line>
                      <line x1="8" y1="11" x2="14" y2="11"></line>
                    </svg>
                    Visualizar em alta resolução
                  </span>
                </div>
              </div>
            </div>

            {/* Linha com os dois Perfis (Nasal & Facial) */}
            <div className="gallery__editorial-subgrid">
              {/* Item 3: Rinomodelação de Perfil */}
              <div
                className="gallery__item gallery__item--nose reveal-fade-up delay-3"
                onClick={() => handleOpenLightbox(2)}
                role="button"
                tabIndex={0}
                aria-label="Abrir alinhamento nasal em tela cheia"
              >
                <div className="gallery__item-frame">
                  <img
                    src={galleryImages[2].src}
                    alt={galleryImages[2].alt}
                    className="gallery__item-img"
                    loading="lazy"
                    style={{ objectPosition: galleryImages[2].objectPosition }}
                    onError={(e) => {
                      const target = e.currentTarget
                      if (!target.src.includes('media_1792175742702_af7a6e46.png')) {
                        target.src = galleryImages[2].fallbackSrc
                      }
                    }}
                  />
                  <div className="gallery__item-overlay">
                    <span className="gallery__item-category">{galleryImages[2].category}</span>
                    <h3 className="gallery__item-title heading-serif">{galleryImages[2].caption}</h3>
                    <p className="gallery__item-details">{galleryImages[2].details}</p>
                    <span className="gallery__item-zoom-pill">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="11" cy="11" r="8"></circle>
                        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                      </svg>
                      Ampliar
                    </span>
                  </div>
                </div>
              </div>

              {/* Item 4: Análise de Terços e Mandíbula */}
              <div
                className="gallery__item gallery__item--profile reveal-fade-up delay-4"
                onClick={() => handleOpenLightbox(3)}
                role="button"
                tabIndex={0}
                aria-label="Abrir análise facial em tela cheia"
              >
                <div className="gallery__item-frame">
                  <img
                    src={galleryImages[3].src}
                    alt={galleryImages[3].alt}
                    className="gallery__item-img"
                    loading="lazy"
                    style={{ objectPosition: galleryImages[3].objectPosition }}
                    onError={(e) => {
                      const target = e.currentTarget
                      if (!target.src.includes('media_1792175742708_1445afa8.png')) {
                        target.src = galleryImages[3].fallbackSrc
                      }
                    }}
                  />
                  <div className="gallery__item-overlay">
                    <span className="gallery__item-category">{galleryImages[3].category}</span>
                    <h3 className="gallery__item-title heading-serif">{galleryImages[3].caption}</h3>
                    <p className="gallery__item-details">{galleryImages[3].details}</p>
                    <span className="gallery__item-zoom-pill">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="11" cy="11" r="8"></circle>
                        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                      </svg>
                      Ampliar
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Rodapé Informativo da Galeria */}
        <div className="gallery__footer reveal-fade-up delay-4">
          <div className="gallery__footer-meta">
            <span className="gallery__footer-dot" />
            <span>Fotografias reais de atendimento clínico sob consentimento. Sem distorções ou filtros cosméticos pesados.</span>
          </div>
          <div className="gallery__footer-action">
            <span className="gallery__hint-click">Toque em qualquer imagem para inspecionar detalhes</span>
          </div>
        </div>
      </div>
    </section>
  )
}
