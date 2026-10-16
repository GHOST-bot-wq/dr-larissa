import { useEffect, useRef } from 'react'
import './Approach.css'

interface Step {
  number: string
  title: string
  subtitle: string
  description: string
  highlight: string
}

const steps: Step[] = [
  {
    number: '01',
    title: 'Escuta e Compreensão dos Objetivos',
    subtitle: 'Alinhamento de expectativas e sensibilidade estética',
    description:
      'Uma conversa aberta e sem pressa para entender suas queixas, desejos e estilo de vida. O foco é identificar o que realmente incomoda e quais características você deseja realçar com naturalidade.',
    highlight: 'Acolhimento empático e diagnóstico das reais motivações do paciente.',
  },
  {
    number: '02',
    title: 'Avaliação Individualizada',
    subtitle: 'Mapeamento anatômico, proporções e dinâmica muscular',
    description:
      'Análise fotográfica e clínica dos terços faciais, simetrias, dinâmica da mímica muscular, densidade de tecidos e vetores de sustentação. Cada rosto é único e pede uma leitura geométrica personalizada.',
    highlight: 'Rigor biomédico com foco na proporção áurea e saúde da derme.',
  },
  {
    number: '03',
    title: 'Planejamento e Discussão das Possibilidades',
    subtitle: 'Transparência, escolhas conscientes e indicação precisa',
    description:
      'Apresentação clara das melhores opções técnicas, volumes adequados e produtos indicados. Discutimos juntos as etapas do tratamento, priorizando segurança, sofisticação e moderação.',
    highlight: 'Decisões compartilhadas sem imposição de procedimentos desnecessários.',
  },
  {
    number: '04',
    title: 'Orientações e Acompanhamento',
    subtitle: 'Cuidado pós-procedimento e suporte contínuo',
    description:
      'Recomendações detalhadas para o período de cicatrização e recuperação, além de consultas de retorno para avaliação da acomodação dos produtos e durabilidade dos resultados.',
    highlight: 'Acompanhamento próximo para garantir sua tranquilidade do início ao fim.',
  },
]

export default function Approach() {
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

  return (
    <section id="abordagem" className="approach" ref={sectionRef} aria-label="Abordagem Profissional em 4 Etapas">
      <div className="container">
        {/* Cabeçalho */}
        <div className="approach__header">
          <div className="reveal-fade-up delay-1">
            <span className="eyebrow-tag">METODOLOGIA CLÍNICA</span>
          </div>
          <h2 className="section-title reveal-fade-up delay-2">
            Uma jornada de cuidado <em>em quatro tempos.</em>
          </h2>
          <p className="section-subtitle reveal-fade-up delay-3">
            O atendimento da Dra. Larissa Lazzo é estruturado para garantir previsibilidade, clareza e absoluto respeito ao seu tempo e bem-estar.
          </p>
        </div>

        {/* Grade de 4 Etapas com Numeração Discreta e Espaço em Branco Generoso */}
        <div className="approach__steps-grid">
          {steps.map((step, idx) => (
            <div key={step.number} className={`approach__card reveal-fade-up delay-${idx + 1}`}>
              <div className="approach__card-top">
                <span className="approach__number">{step.number}</span>
                <span className="approach__step-pill">Etapa 0{idx + 1}</span>
              </div>

              <div className="approach__card-content">
                <span className="approach__subtitle">{step.subtitle}</span>
                <h3 className="approach__title heading-serif">{step.title}</h3>
                <p className="approach__desc">{step.description}</p>
                <div className="approach__highlight-box">
                  <span className="approach__highlight-icon">✦</span>
                  <span className="approach__highlight-text">{step.highlight}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
