import { useEffect, useRef } from 'react'
import businessConfig from '../config/business'
import './About.css'

interface AboutProps {
  onImageClick?: (src: string, alt: string) => void
  onOpenContact: () => void
  whatsappUrl: string | null
}

export default function About({ onImageClick, onOpenContact, whatsappUrl }: AboutProps) {
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
    <section id="filosofia" className="about" ref={sectionRef} aria-label="Filosofia e Posicionamento">
      <div className="container">
        <div className="about__grid">
          {/* Coluna Visual — Fotografia Real de Análise de Perfil */}
          <div className="about__media reveal-fade-up delay-1">
            <div
              className="about__image-container"
              onClick={() =>
                onImageClick &&
                onImageClick(
                  '/images/analise-perfil-facial.png',
                  'Estudo de perfil e proporção facial — Dra. Larissa Lazzo'
                )
              }
              role={onImageClick ? 'button' : undefined}
              tabIndex={onImageClick ? 0 : undefined}
              title="Clique para ampliar a fotografia"
            >
              <img
                src="/images/analise-perfil-facial.png"
                alt="Fotografia de perfil evidenciando linhas faciais, contorno e ângulos naturais"
                className="about__img"
                loading="lazy"
                decoding="async"
                style={{ objectPosition: 'center 35%' }}
                onError={(e) => {
                  const target = e.currentTarget
                  if (!target.src.includes('media_1792175742708_1445afa8.png')) {
                    target.src = '/media_1792175742708_1445afa8.png'
                  }
                }}
              />
              <div className="about__image-badge">
                <span className="about__badge-tag">ANÁLISE ESTRUTURAL</span>
                <span className="about__badge-sub">Contornos e terços anatômicos</span>
              </div>
            </div>

            <div className="about__quote-pill">
              <span className="about__quote-text">
                “Cada traço carrega uma história única; a harmonização deve valorizá-la, nunca apagá-la.”
              </span>
            </div>
          </div>

          {/* Coluna Textual Editorial */}
          <div className="about__content">
            <div className="reveal-fade-up delay-1">
              <span className="eyebrow-tag">FILOSOFIA & POSICIONAMENTO</span>
            </div>

            <h2 className="section-title reveal-fade-up delay-2">
              A beleza está nos <em>detalhes.</em>
            </h2>

            <div className="about__divider reveal-fade-up delay-2" />

            <div className="about__body-text reveal-fade-up delay-3">
              <p>
                A harmonização facial contemporânea não busca padronizar rostos ou criar volumes desnecessários. Pelo contrário: trata-se de um olhar sensível e técnico sobre as proporções individuais, onde pequenas intervenções estratégicas produzem uma sensação autêntica de descanso, jovialidade e refinamento.
              </p>
              <p>
                Em meu consultório em <strong>{businessConfig.city}, {businessConfig.state}</strong>, cada planejamento parte de uma escuta atenta dos seus desejos, associada a uma análise minuciosa da anatomia, das proporções áureas e do comportamento dos tecidos em repouso e em movimento.
              </p>
              <p>
                Acreditamos na elegância da moderação: a melhor intervenção estética é aquela percebida pela harmonia que transmite, mantendo a sua essência como protagonista.
              </p>
            </div>

            {/* Pilares da Abordagem */}
            <div className="about__pillars reveal-fade-up delay-4">
              <div className="about__pillar">
                <span className="about__pillar-num">I</span>
                <div>
                  <h3 className="about__pillar-title">Individualidade Absoluta</h3>
                  <p className="about__pillar-desc">Nenhum protocolo é replicado. O plano de aplicação é desenhado exclusivamente para a sua estrutura óssea e muscular.</p>
                </div>
              </div>

              <div className="about__pillar">
                <span className="about__pillar-num">II</span>
                <div>
                  <h3 className="about__pillar-title">Equilíbrio & Proporção</h3>
                  <p className="about__pillar-desc">Busca pela harmonia entre os terços superior, médio e inferior da face, respeitando sua mímica e expressividade natural.</p>
                </div>
              </div>

              <div className="about__pillar">
                <span className="about__pillar-num">III</span>
                <div>
                  <h3 className="about__pillar-title">Rigor Biomédico</h3>
                  <p className="about__pillar-desc">Conhecimento anatômico avançado, técnica apurada e produtos de primeira linha para total segurança e precisão.</p>
                </div>
              </div>
            </div>

            <div className="about__cta-row reveal-fade-up delay-5">
              {whatsappUrl ? (
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary"
                >
                  Agendar avaliação
                </a>
              ) : (
                <button onClick={onOpenContact} className="btn-primary">
                  Agendar avaliação
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
