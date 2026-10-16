import { useEffect, useRef } from 'react'
import './Technology.css'

interface TechnologyProps {
  whatsappUrl: string | null
}

export default function Technology({ whatsappUrl }: TechnologyProps) {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) el.classList.add('is-visible') },
      { threshold: 0.1 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <section className="technology section section--dark" ref={ref} aria-labelledby="tech-heading">
      <div className="container technology__inner">
        {/* Imagem grande */}
        <div className="technology__image-col">
          <div className="technology__image-frame">
            <img
              src="/images/gabrielly-laser.png"
              alt="Gabrielly Sampaio utilizando equipamento de laser"
              className="technology__image"
              loading="lazy"
              onError={(e) => {
                ;(e.target as HTMLImageElement).style.display = 'none'
              }}
            />
            {/* Detalhe dourado */}
            <div className="technology__frame-accent" aria-hidden="true" />
          </div>
        </div>

        {/* Conteúdo */}
        <div className="technology__content">
          <span className="eyebrow technology__eyebrow">Tecnologia</span>
          <div className="gold-line" />

          <h2 id="tech-heading" className="technology__title">
            Tecnologia a serviço<br />
            <em>do seu cuidado.</em>
          </h2>

          <p className="technology__text">
            Conheça as tecnologias e os protocolos utilizados em nossos atendimentos. Cada equipamento é selecionado com critério para garantir segurança, conforto e resultados consistentes.
          </p>

          <div className="technology__features">
            {[
              'Equipamentos avançados para depilação a laser',
              'Tecnologias para protocolos corporais e faciais',
              'Criolipólise com controle de temperatura preciso',
              'Protocolos atualizados conforme boas práticas',
            ].map((feature, i) => (
              <div key={i} className="technology__feature-item">
                <div className="technology__feature-icon" aria-hidden="true">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M2 8L6 12L14 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <span>{feature}</span>
              </div>
            ))}
          </div>

          <p className="technology__disclaimer">
            Nomes de marcas, modelos e especificações técnicas serão divulgados após confirmação da clínica.
          </p>

          {whatsappUrl ? (
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline-gold"
            >
              Consultar tratamentos
            </a>
          ) : (
            <button className="btn-outline-gold" disabled aria-disabled="true">
              Consultar tratamentos
            </button>
          )}
        </div>
      </div>
    </section>
  )
}
