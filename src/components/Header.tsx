import { useState, useEffect } from 'react'
import './Header.css'

interface HeaderProps {
  scrolled: boolean
  whatsappUrl: string | null
  onOpenContact: () => void
}

export default function Header({ scrolled, whatsappUrl, onOpenContact }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  const handleLinkClick = () => {
    setMenuOpen(false)
  }

  const handleCtaClick = (e: React.MouseEvent) => {
    if (!whatsappUrl) {
      e.preventDefault()
      onOpenContact()
    }
    setMenuOpen(false)
  }

  return (
    <header className={`header ${scrolled ? 'header--scrolled' : ''}`}>
      <div className="container header__container">
        {/* Brand Logo Typographique */}
        <a href="#inicio" className="header__brand" aria-label="Dra. Larissa Lazzo — Início">
          <span className="header__monogram">LL</span>
          <div className="header__brand-text">
            <span className="header__brand-name">Dra. Larissa Lazzo</span>
            <span className="header__brand-sub">Harmonização Facial · Anápolis</span>
          </div>
        </a>

        {/* Desktop Navigation */}
        <nav className="header__nav" aria-label="Navegação principal">
          <ul className="header__menu">
            <li><a href="#inicio" className="header__link">Início</a></li>
            <li><a href="#filosofia" className="header__link">Filosofia</a></li>
            <li><a href="#tratamentos" className="header__link">Tratamentos</a></li>
            <li><a href="#galeria" className="header__link">Galeria Visual</a></li>
            <li><a href="#abordagem" className="header__link">Abordagem</a></li>
            <li><a href="#duvidas" className="header__link">Dúvidas</a></li>
          </ul>
        </nav>

        {/* Header CTA Button */}
        <div className="header__actions">
          {whatsappUrl ? (
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary header__btn-cta"
            >
              Agendar Avaliação
            </a>
          ) : (
            <button
              onClick={handleCtaClick}
              className="btn-primary header__btn-cta"
            >
              Agendar Avaliação
            </button>
          )}

          {/* Mobile Hamburger Toggle */}
          <button
            className={`header__toggle ${menuOpen ? 'header__toggle--active' : ''}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
            aria-expanded={menuOpen}
          >
            <span className="header__toggle-bar"></span>
            <span className="header__toggle-bar"></span>
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <div className={`header__mobile-drawer ${menuOpen ? 'header__mobile-drawer--open' : ''}`} aria-hidden={!menuOpen}>
        <div className="header__mobile-content">
          <div className="header__mobile-head">
            <span className="header__mobile-monogram">LL</span>
            <span className="eyebrow-tag">Dra. Larissa Lazzo</span>
          </div>

          <ul className="header__mobile-menu">
            <li><a href="#inicio" onClick={handleLinkClick}>Início</a></li>
            <li><a href="#filosofia" onClick={handleLinkClick}>Filosofia</a></li>
            <li><a href="#tratamentos" onClick={handleLinkClick}>Tratamentos</a></li>
            <li><a href="#galeria" onClick={handleLinkClick}>Galeria Visual</a></li>
            <li><a href="#abordagem" onClick={handleLinkClick}>Abordagem</a></li>
            <li><a href="#duvidas" onClick={handleLinkClick}>Dúvidas Frequentes</a></li>
          </ul>

          <div className="header__mobile-footer">
            <p className="header__mobile-info">
              Biomédica · CRBM 12459<br />
              Anápolis, Goiás
            </p>

            {whatsappUrl ? (
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary header__mobile-btn"
                onClick={handleLinkClick}
              >
                Agendar Avaliação
              </a>
            ) : (
              <button
                className="btn-primary header__mobile-btn"
                onClick={handleCtaClick}
              >
                Agendar Avaliação
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
