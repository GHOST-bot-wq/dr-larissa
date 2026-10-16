import { useEffect, useRef } from 'react'
import './Treatments.css'

interface TreatmentsProps {
  onImageClick?: (src: string, alt: string) => void
  onOpenContact: () => void
  whatsappUrl: string | null
}

interface TreatmentItem {
  id: string
  title: string
  subtitle: string
  description: string
  details: string[]
  featuredImage?: {
    src: string
    alt: string
    caption: string
  }
}

export default function Treatments({ onImageClick, onOpenContact, whatsappUrl }: TreatmentsProps) {
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

  const treatments: TreatmentItem[] = [
    {
      id: 'preenchimento-labial',
      title: 'Preenchimento & Contorno Labial',
      subtitle: 'Definição, hidratação profunda e proporção harmônica',
      description:
        'Escultura labial milimétrica utilizando ácido hialurônico de alta pureza. O foco é valorizar o arco do cupido, restabelecer a hidratação e garantir projeção suave sem sobrecarregar a estrutura facial.',
      details: [
        'Respeito à proporção entre lábio superior e inferior',
        'Contorno nítido e reposição delicada de volume',
        'Acabamento suave com preservação do movimento',
      ],
      featuredImage: {
        src: '/images/detalhe-labial.jpg',
        alt: 'Detalhe em close-up de preenchimento labial — Dra. Larissa Lazzo',
        caption: 'Refinamento labial: definição, textura e naturalidade',
      },
    },
    {
      id: 'toxina-botulinica',
      title: 'Toxina Botulínica',
      subtitle: 'Prevenção e suavização de linhas de expressão',
      description:
        'Modulação precisa da atividade muscular facial (testa, glabela e pés de galinha) com o objetivo de suavizar rugas dinâmicas, mantendo o olhar descansado e a expressividade autêntica.',
      details: [
        'Preservação da mímica facial sem efeito paralisado',
        'Prevenção de rugas estáticas profundas',
        'Aplicação calculada ponto a ponto para simetria',
      ],
    },
    {
      id: 'harmonizacao-facial',
      title: 'Harmonização Facial Integrada',
      subtitle: 'Planejamento tridimensional da arquitetura do rosto',
      description:
        'Abordagem global que analisa a transição entre maçãs do rosto (malar), mandíbula, queixo e contornos faciais. Restaura vetores de sustentação perdidos ao longo do tempo.',
      details: [
        'Análise fotográfica e morfológica prévia minuciosa',
        'Definição elegante da linha mandibular e mento',
        'Equilíbrio entre luz e sombra na face',
      ],
    },
    {
      id: 'rinomodelacao',
      title: 'Rinomodelação Estrutural',
      subtitle: 'Alinhamento do perfil e elevação sutil da ponta nasal',
      description:
        'Procedimento não cirúrgico com ácido hialurônico para corrigir pequenas assimetrias, disfarçar a giba óssea e proporcionar um ângulo nasal harmonioso em relação ao perfil do paciente.',
      details: [
        'Ajuste sutil do dorso nasal com rápida recuperação',
        'Melhora imediata do perfil fotográfico',
        'Técnica minimamente invasiva sem tempo cirúrgico',
      ],
    },
  ]

  const handleCta = (e: React.MouseEvent) => {
    if (!whatsappUrl) {
      e.preventDefault()
      onOpenContact()
    }
  }

  return (
    <section id="tratamentos" className="treatments" ref={sectionRef} aria-label="Tratamentos Oferecidos">
      <div className="container">
        {/* Cabeçalho da Seção */}
        <div className="treatments__header">
          <div className="reveal-fade-up delay-1">
            <span className="eyebrow-tag">PROCEDIMENTOS CONFIRMADOS</span>
          </div>
          <h2 className="section-title reveal-fade-up delay-2">
            Cuidados especializados com <em>rigor técnico.</em>
          </h2>
          <p className="section-subtitle reveal-fade-up delay-3">
            Cada procedimento é precedido por uma avaliação clínica individualizada em Anápolis, assegurando indicação precisa, produtos certificados e total segurança.
          </p>
        </div>

        {/* Grade Editorial de Tratamentos */}
        <div className="treatments__grid">
          {treatments.map((treatment, idx) => {
            const hasImage = Boolean(treatment.featuredImage)
            return (
              <div
                key={treatment.id}
                className={`treatment-card ${hasImage ? 'treatment-card--featured' : ''} reveal-fade-up delay-${(idx % 4) + 1}`}
              >
                {hasImage && treatment.featuredImage && (
                  <div
                    className="treatment-card__image-box"
                    onClick={() =>
                      onImageClick &&
                      onImageClick(
                        treatment.featuredImage!.src,
                        treatment.featuredImage!.alt
                      )
                    }
                    role={onImageClick ? 'button' : undefined}
                    tabIndex={onImageClick ? 0 : undefined}
                    title="Clique para visualizar em alta resolução"
                  >
                    <img
                      src={treatment.featuredImage.src}
                      alt={treatment.featuredImage.alt}
                      className="treatment-card__img"
                      loading="lazy"
                      onError={(e) => {
                        const target = e.currentTarget
                        if (!target.src.includes('media_1792175742711_a6f921a0.jpg')) {
                          target.src = '/media_1792175742711_a6f921a0.jpg'
                        }
                      }}
                    />
                    <div className="treatment-card__img-overlay">
                      <span className="treatment-card__img-caption">
                        {treatment.featuredImage.caption}
                      </span>
                    </div>
                  </div>
                )}

                <div className="treatment-card__body">
                  <div className="treatment-card__meta">
                    <span className="treatment-card__index">0{idx + 1}</span>
                    <span className="treatment-card__subtitle">{treatment.subtitle}</span>
                  </div>

                  <h3 className="treatment-card__title heading-serif">{treatment.title}</h3>

                  <p className="treatment-card__desc">{treatment.description}</p>

                  <ul className="treatment-card__checklist">
                    {treatment.details.map((item, dIdx) => (
                      <li key={dIdx}>
                        <span className="treatment-card__check-dot" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="treatment-card__action">
                    {whatsappUrl ? (
                      <a
                        href={whatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="treatment-card__link"
                      >
                        Consultar indicação para meu rosto
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                          <line x1="5" y1="12" x2="19" y2="12"></line>
                          <polyline points="12 5 19 12 12 19"></polyline>
                        </svg>
                      </a>
                    ) : (
                      <button onClick={handleCta} className="treatment-card__link">
                        Consultar indicação para meu rosto
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                          <line x1="5" y1="12" x2="19" y2="12"></line>
                          <polyline points="12 5 19 12 12 19"></polyline>
                        </svg>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
