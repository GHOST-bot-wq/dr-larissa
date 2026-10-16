import { useEffect, useRef } from 'react'
import businessConfig from '../config/business'
import './BookingCTA.css'

interface BookingCTAProps {
  whatsappUrl: string | null
  onOpenContact: () => void
}

export default function BookingCTA({ whatsappUrl, onOpenContact }: BookingCTAProps) {
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
      { threshold: 0.1 }
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
    <section id="agendamento" className="booking-cta" ref={sectionRef} aria-label="Agendamento e Contato">
      <div className="booking-cta__ambient-glow" aria-hidden="true" />

      <div className="container">
        <div className="booking-cta__inner">
          <div className="reveal-fade-up delay-1">
            <span className="booking-cta__monogram">LL</span>
            <span className="booking-cta__eyebrow">AVALIAÇÃO EM ANÁPOLIS — GO</span>
          </div>

          <h2 className="booking-cta__title heading-serif reveal-fade-up delay-2">
            Seu próximo passo começa<br />
            com uma <em>boa conversa.</em>
          </h2>

          <p className="booking-cta__text reveal-fade-up delay-3">
            Conheça as possibilidades de cuidado pensadas para você.
          </p>

          <div className="booking-cta__action reveal-fade-up delay-4">
            {whatsappUrl ? (
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary booking-cta__btn"
              >
                Falar com a clínica
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
                </svg>
              </a>
            ) : (
              <button
                onClick={handleCtaClick}
                className="btn-primary booking-cta__btn"
              >
                Falar com a clínica
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
                </svg>
              </button>
            )}
          </div>

          <div className="booking-cta__meta reveal-fade-up delay-5">
            <span>Dra. Larissa Lazzo</span>
            <span className="booking-cta__meta-bullet">·</span>
            <span>Biomédica — {businessConfig.councilRegistration}</span>
            <span className="booking-cta__meta-bullet">·</span>
            <span>{businessConfig.city}, {businessConfig.state}</span>
          </div>
        </div>
      </div>
    </section>
  )
}
