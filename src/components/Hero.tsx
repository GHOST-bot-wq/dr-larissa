import { useEffect, useRef } from 'react'
import businessConfig from '../config/business'
import './Hero.css'

interface HeroProps {
  whatsappUrl: string | null
  onOpenContact: () => void
}

export default function Hero({ whatsappUrl, onOpenContact }: HeroProps) {
  const heroRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = heroRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('is-visible')
        }
      },
      { threshold: 0.08 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const handleCtaClick = (e: React.MouseEvent) => {
    if (!whatsappUrl) {
      e.preventDefault()
      onOpenContact()
    }
  }

  return (
    <section id="inicio" className="hero" ref={heroRef} aria-label="Apresentação Dra. Larissa Lazzo Harmonização Facial">
      {/* Luz ambiente editorial e textura de fundo sutil */}
      <div className="hero__ambient" aria-hidden="true" />

      <div className="container hero__grid">
        {/* Coluna Tipográfica Editorial */}
        <div className="hero__content">
          <div className="hero__badge reveal-fade-up delay-1">
            <span className="eyebrow-tag">
              {businessConfig.city}, {businessConfig.state} · {businessConfig.title}
            </span>
          </div>

          <h1 className="hero__title heading-serif reveal-fade-up delay-2">
            Realce sua beleza.<br />
            <em>Preserve sua essência.</em>
          </h1>

          <div className="hero__accent-line reveal-fade-up delay-3" />

          <p className="hero__lead reveal-fade-up delay-3">
            Harmonização facial com olhar individualizado, atenção aos detalhes e respeito à sua beleza natural.
          </p>

          <p className="hero__credentials reveal-fade-up delay-3">
            <strong>Dra. Larissa Lazzo</strong> · Biomédica · {businessConfig.councilRegistration}
          </p>

          <div className="hero__actions reveal-fade-up delay-4">
            {whatsappUrl ? (
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary hero__btn-cta"
              >
                Agendar avaliação
              </a>
            ) : (
              <button
                onClick={handleCtaClick}
                className="btn-primary hero__btn-cta"
              >
                Agendar avaliação
              </button>
            )}

            <a href="#abordagem" className="btn-secondary hero__btn-approach">
              Conheça minha abordagem
            </a>
          </div>

          {/* Selos Editoriais de Autenticidade & Localização */}
          <div className="hero__meta-strip reveal-fade-up delay-5">
            <div className="hero__meta-item">
              <span className="hero__meta-label">Localização</span>
              <span className="hero__meta-val">Anápolis — Goiás</span>
            </div>
            <div className="hero__meta-sep" />
            <div className="hero__meta-item">
              <span className="hero__meta-label">Abordagem</span>
              <span className="hero__meta-val">Planejamento Exclusivo</span>
            </div>
            <div className="hero__meta-sep" />
            <div className="hero__meta-item">
              <span className="hero__meta-label">Rigor</span>
              <span className="hero__meta-val">Naturalidade & Precisão</span>
            </div>
          </div>
        </div>

        {/* Coluna Visual — Fotografia Real da Dra. Larissa Lazzo */}
        <div className="hero__visual reveal-fade-up delay-2">
          <div className="hero__image-wrap">
            {/* Moldura estrutural editorial descentralizada */}
            <div className="hero__image-frame">
              <img
                src="/images/dra-larissa-lazzo.png"
                alt="Retrato oficial da Dra. Larissa Lazzo — Biomédica especialista em harmonização facial em Anápolis, Goiás"
                className="hero__img"
                loading="eager"
                decoding="sync"
                style={{ objectPosition: 'center 22%' }}
                onError={(e) => {
                  // Fallback se necessário
                  const target = e.currentTarget
                  if (!target.src.includes('media_1792175742702_1a3181ac.png')) {
                    target.src = '/media_1792175742702_1a3181ac.png'
                  }
                }}
              />
              <div className="hero__image-overlay" aria-hidden="true" />
            </div>

            {/* Linha arquitetural decorativa */}
            <div className="hero__decor-border" aria-hidden="true" />

            {/* Badge Editorial Flutuante */}
            <div className="hero__floating-seal" aria-hidden="true">
              <div className="hero__seal-monogram">LL</div>
              <div className="hero__seal-details">
                <span className="hero__seal-name">Dra. Larissa Lazzo</span>
                <span className="hero__seal-role">Harmonização Facial</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Indicador de Rolagem Minimalista */}
      <div className="hero__scroll-indicator" aria-hidden="true">
        <a href="#filosofia" className="hero__scroll-link" aria-label="Rolar para a seção de filosofia">
          <span className="hero__scroll-label">EXPLORAR</span>
          <div className="hero__scroll-track">
            <span className="hero__scroll-pin" />
          </div>
        </a>
      </div>
    </section>
  )
}
