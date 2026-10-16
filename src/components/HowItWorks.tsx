import { useEffect, useRef } from 'react'
import './HowItWorks.css'

interface HowItWorksProps {
  whatsappUrl: string | null
}

const steps = [
  {
    number: '01',
    title: 'Entre em contato',
    description: 'Envie uma mensagem pelo WhatsApp ou pelo Instagram para dar o primeiro passo. Nossa equipe está pronta para receber você.',
  },
  {
    number: '02',
    title: 'Esclareça suas dúvidas',
    description: 'Converse com a equipe, tire dúvidas sobre os tratamentos disponíveis e encontre o protocolo mais adequado para você.',
  },
  {
    number: '03',
    title: 'Agende seu atendimento',
    description: 'Verifique a disponibilidade de horários e confirme o seu agendamento. Tudo de forma simples e prática.',
  },
]

export default function HowItWorks({ whatsappUrl }: HowItWorksProps) {
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
    <section className="how section" ref={ref} aria-labelledby="how-heading">
      <div className="container">
        <div className="how__header">
          <span className="eyebrow">Como funciona</span>
          <div className="gold-line" />
          <h2 id="how-heading" className="how__title">
            Simples, acolhedor<br />
            <em>e pensado para você.</em>
          </h2>
        </div>

        <div className="how__steps">
          {steps.map((step, i) => (
            <div
              key={step.number}
              className="how-step"
              style={{ '--delay': `${i * 0.15}s` } as React.CSSProperties}
              aria-label={`Passo ${step.number}: ${step.title}`}
            >
              {/* Linha conectora */}
              {i < steps.length - 1 && (
                <div className="how-step__connector" aria-hidden="true" />
              )}

              <div className="how-step__number" aria-hidden="true">{step.number}</div>
              <div className="how-step__content">
                <h3 className="how-step__title">{step.title}</h3>
                <p className="how-step__desc">{step.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="how__cta">
          {whatsappUrl ? (
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              Iniciar contato
            </a>
          ) : (
            <button className="btn-primary" disabled aria-disabled="true">
              Contato em breve
            </button>
          )}
          <a
            href="https://www.instagram.com/gs_esteticaavancadaa"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary"
          >
            Ver Instagram
          </a>
        </div>
      </div>
    </section>
  )
}
