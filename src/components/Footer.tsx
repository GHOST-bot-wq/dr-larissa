import businessConfig from '../config/business'
import './Footer.css'

interface FooterProps {
  onOpenContact: () => void
  whatsappUrl: string | null
}

export default function Footer({ onOpenContact, whatsappUrl }: FooterProps) {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="footer" role="contentinfo">
      <div className="container">
        <div className="footer__grid">
          {/* Coluna de Identidade */}
          <div className="footer__brand-col">
            <div className="footer__brand-header">
              <span className="footer__monogram">LL</span>
              <div className="footer__brand-titles">
                <span className="footer__brand-name">{businessConfig.name}</span>
                <span className="footer__brand-role">{businessConfig.area}</span>
              </div>
            </div>

            <p className="footer__description">
              Harmonização facial com olhar individualizado, atenção aos detalhes e respeito absoluto à sua beleza natural.
            </p>

            <div className="footer__badges">
              <div className="footer__badge-item">
                <span className="footer__badge-label">Habilitação</span>
                <span className="footer__badge-val">Biomédica · {businessConfig.councilRegistration}</span>
              </div>
              <div className="footer__badge-item">
                <span className="footer__badge-label">Localização</span>
                <span className="footer__badge-val">{businessConfig.city} — {businessConfig.state}</span>
              </div>
            </div>
          </div>

          {/* Coluna de Navegação Rápida */}
          <div className="footer__nav-col">
            <h4 className="footer__col-title">Navegação</h4>
            <ul className="footer__links">
              <li><a href="#inicio">Início</a></li>
              <li><a href="#filosofia">Filosofia</a></li>
              <li><a href="#tratamentos">Tratamentos</a></li>
              <li><a href="#galeria">Galeria Visual</a></li>
              <li><a href="#abordagem">Abordagem em 4 Etapas</a></li>
              <li><a href="#duvidas">Dúvidas Frequentes</a></li>
            </ul>
          </div>

          {/* Coluna de Procedimentos Confirmados */}
          <div className="footer__nav-col">
            <h4 className="footer__col-title">Procedimentos</h4>
            <ul className="footer__links">
              <li><a href="#tratamentos">Toxina Botulínica</a></li>
              <li><a href="#tratamentos">Preenchimento Labial</a></li>
              <li><a href="#tratamentos">Harmonização Facial</a></li>
              <li><a href="#tratamentos">Rinomodelação Estrutural</a></li>
            </ul>
          </div>

          {/* Coluna de Contato / Atendimento */}
          <div className="footer__contact-col">
            <h4 className="footer__col-title">Atendimento</h4>
            <p className="footer__contact-text">
              Consultas e avaliações realizadas exclusivamente mediante agendamento prévio.
            </p>

            <div className="footer__contact-action">
              {whatsappUrl ? (
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary footer__btn"
                >
                  Agendar Avaliação
                </a>
              ) : (
                <button onClick={onOpenContact} className="btn-primary footer__btn">
                  Agendar Avaliação
                </button>
              )}
            </div>

            <span className="footer__city-pin">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
              {businessConfig.city}, Goiás — Brasil
            </span>
          </div>
        </div>

        {/* Linha de Copyright e Informações Legais */}
        <div className="footer__bottom">
          <p className="footer__legal">
            © {currentYear} {businessConfig.name} · {businessConfig.area} · Biomédica {businessConfig.councilRegistration}. Todos os direitos reservados.
          </p>
          <p className="footer__disclaimer">
            As imagens e conteúdos deste site têm caráter informativo sobre a conduta e técnica da profissional. Procedimentos estéticos exigem avaliação clínica presencial prévia e os resultados dependem de particularidades biológicas de cada organismo.
          </p>
        </div>
      </div>
    </footer>
  )
}
