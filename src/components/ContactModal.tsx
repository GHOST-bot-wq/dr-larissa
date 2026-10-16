import { useEffect } from 'react'
import businessConfig, { getWhatsAppUrl } from '../config/business'
import './ContactModal.css'

interface ContactModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const whatsappUrl = getWhatsAppUrl(businessConfig)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      window.addEventListener('keydown', handleKeyDown)
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div className="contact-modal__overlay" onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="modal-title">
      <div className="contact-modal__card" onClick={(e) => e.stopPropagation()}>
        <button className="contact-modal__close" onClick={onClose} aria-label="Fechar modal">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        <div className="contact-modal__header">
          <span className="contact-modal__monogram">LL</span>
          <span className="eyebrow-tag">AGENDAMENTO & CONSULTORIA</span>
          <h3 id="modal-title" className="contact-modal__title heading-serif">
            Seu atendimento com a <em>Dra. Larissa Lazzo</em>
          </h3>
          <p className="contact-modal__location">
            Biomédica · CRBM 12459 · Anápolis, Goiás
          </p>
        </div>

        <div className="contact-modal__body">
          <p className="contact-modal__text">
            O atendimento é realizado sob rigoroso planejamento individualizado, respeitando a anatomia e a harmonia única de cada paciente.
          </p>

          {whatsappUrl ? (
            <div className="contact-modal__action-block">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary contact-modal__btn-cta"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
                </svg>
                Conversar pelo WhatsApp
              </a>
              <span className="contact-modal__hint">Resposta direta da equipe de atendimento em Anápolis.</span>
            </div>
          ) : (
            <div className="contact-modal__pending-card">
              <div className="contact-modal__badge">Configuração Central</div>
              <h4>Canal de Atendimento em Atualização</h4>
              <p>
                O número oficial de WhatsApp pode ser configurado no arquivo <code>src/config/business.ts</code> inserindo o telefone com DDD de Anápolis (ex: 5562...).
              </p>
              <div className="contact-modal__meta-list">
                <div className="contact-modal__meta-item">
                  <strong>Profissional:</strong> Dra. Larissa Lazzo
                </div>
                <div className="contact-modal__meta-item">
                  <strong>Especialidade:</strong> Harmonização Facial
                </div>
                <div className="contact-modal__meta-item">
                  <strong>Registro:</strong> Biomédica · CRBM 12459
                </div>
                <div className="contact-modal__meta-item">
                  <strong>Cidade:</strong> Anápolis — Goiás
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="contact-modal__footer">
          <button className="btn-secondary contact-modal__btn-back" onClick={onClose}>
            Voltar ao site
          </button>
        </div>
      </div>
    </div>
  )
}
