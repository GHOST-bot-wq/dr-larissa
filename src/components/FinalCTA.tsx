import { useEffect, useRef } from 'react'
import './FinalCTA.css'

interface FinalCTAProps {
  whatsappUrl: string | null
}

export default function FinalCTA({ whatsappUrl }: FinalCTAProps) {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) el.classList.add('is-visible') },
      { threshold: 0.15 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <section className="final-cta" ref={ref} aria-label="Chamada para ação final">
      {/* Imagem de fundo */}
      <div className="final-cta__bg" aria-hidden="true">
        <img
          src="/images/gabrielly-sampaio.png"
          alt=""
          className="final-cta__bg-image"
          loading="lazy"
          onError={(e) => {
            ;(e.target as HTMLImageElement).style.display = 'none'
          }}
        />
        <div className="final-cta__bg-overlay" />
      </div>

      <div className="container final-cta__content">
        <span className="eyebrow final-cta__eyebrow">GS Estética Avançada</span>

        <h2 className="final-cta__title">
          Seu próximo momento<br />
          <em>de cuidado começa aqui.</em>
        </h2>

        <p className="final-cta__text">
          Entre em contato para conhecer os tratamentos disponíveis<br className="hide-mobile" />
          e consultar os horários de atendimento.
        </p>

        <div className="final-cta__actions">
          {whatsappUrl ? (
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary final-cta__btn-primary"
            >
              Falar com a clínica
            </a>
          ) : (
            <button className="btn-primary final-cta__btn-primary" disabled aria-disabled="true">
              Contato em breve
            </button>
          )}

          <a
            href="https://www.instagram.com/gs_esteticaavancadaa"
            target="_blank"
            rel="noopener noreferrer"
            className="final-cta__instagram"
          >
            @gs_esteticaavancadaa
          </a>
        </div>

        {/* Detalhe decorativo */}
        <div className="final-cta__deco" aria-hidden="true">
          <div className="final-cta__deco-line" />
          <span>✦</span>
          <div className="final-cta__deco-line" />
        </div>
      </div>
    </section>
  )
}
