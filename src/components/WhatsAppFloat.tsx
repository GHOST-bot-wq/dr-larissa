import './WhatsAppFloat.css'

interface WhatsAppFloatProps {
  whatsappUrl: string | null
  onOpenContact: () => void
}

export default function WhatsAppFloat({ whatsappUrl, onOpenContact }: WhatsAppFloatProps) {
  if (whatsappUrl) {
    return (
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="whatsapp-float"
        aria-label="Falar com a clínica pelo WhatsApp"
      >
        <div className="whatsapp-float__icon">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
          </svg>
        </div>
        <span className="whatsapp-float__label">Agendar Avaliação</span>
      </a>
    )
  }

  return (
    <button
      onClick={onOpenContact}
      className="whatsapp-float"
      aria-label="Abrir informações de agendamento e contato"
    >
      <div className="whatsapp-float__icon">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
        </svg>
      </div>
      <span className="whatsapp-float__label">Agendar Avaliação</span>
    </button>
  )
}
