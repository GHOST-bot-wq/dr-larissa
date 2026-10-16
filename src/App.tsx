import { useState, useEffect } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import About from './components/About'
import Treatments from './components/Treatments'
import Gallery, { galleryImages } from './components/Gallery'
import Approach from './components/Approach'
import FAQ from './components/FAQ'
import BookingCTA from './components/BookingCTA'
import Footer from './components/Footer'
import Lightbox, { LightboxImage } from './components/Lightbox'
import ContactModal from './components/ContactModal'
import WhatsAppFloat from './components/WhatsAppFloat'
import businessConfig, { getWhatsAppUrl } from './config/business'

export default function App() {
  const [scrolled, setScrolled] = useState(false)
  const [contactModalOpen, setContactModalOpen] = useState(false)
  const [lightboxData, setLightboxData] = useState<{
    images: LightboxImage[]
    index: number
  } | null>(null)

  const whatsappUrl = getWhatsAppUrl(businessConfig)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleOpenContact = () => {
    setContactModalOpen(true)
  }

  const handleCloseContact = () => {
    setContactModalOpen(false)
  }

  const handleOpenLightbox = (
    images: LightboxImage[],
    index: number
  ) => {
    setLightboxData({ images, index })
    document.body.style.overflow = 'hidden'
  }

  const handleSingleImageClick = (src: string, alt: string) => {
    const images: LightboxImage[] = galleryImages.map((item) => ({
      src: item.src,
      alt: item.alt,
      caption: `${item.caption} — ${item.details}`,
    }))
    const matchedIdx = images.findIndex((img) => img.src === src)
    handleOpenLightbox(images, matchedIdx >= 0 ? matchedIdx : 0)
  }

  const handleCloseLightbox = () => {
    setLightboxData(null)
    document.body.style.overflow = ''
  }

  return (
    <>
      {/* 0. Cabeçalho Fixo com Monograma LL e Navegação Editorial */}
      <Header
        scrolled={scrolled}
        whatsappUrl={whatsappUrl}
        onOpenContact={handleOpenContact}
      />

      <main id="main-content">
        {/* 1. Hero: Impacto Imediato com Retrato Real da Dra. Larissa Lazzo e Tipografia Serifada */}
        <Hero
          whatsappUrl={whatsappUrl}
          onOpenContact={handleOpenContact}
        />

        {/* 2. Seção A: Filosofia e Posicionamento — "A beleza está nos detalhes." */}
        <About
          onImageClick={handleSingleImageClick}
          onOpenContact={handleOpenContact}
          whatsappUrl={whatsappUrl}
        />

        {/* 3. Seção B: Tratamentos Confirmados com Fotografia em Destaque dos Lábios */}
        <Treatments
          onImageClick={handleSingleImageClick}
          onOpenContact={handleOpenContact}
          whatsappUrl={whatsappUrl}
        />

        {/* 4. Seção C: Galeria Visual Editorial (MANDATÓRIA — 4 Imagens Reais) */}
        <Gallery onImageClick={handleOpenLightbox} />

        {/* 5. Seção D: Abordagem Profissional em 4 Etapas com Numeração Discreta */}
        <Approach />

        {/* 6. Seção E: Perguntas Frequentes (FAQ) com Acordeão Acessível */}
        <FAQ />

        {/* 7. Seção F: CTA Final Marcante com Fundo Contrastante */}
        <BookingCTA
          whatsappUrl={whatsappUrl}
          onOpenContact={handleOpenContact}
        />
      </main>

      {/* 8. Rodapé Institucional com Informações Oficiais Confirmadas */}
      <Footer
        onOpenContact={handleOpenContact}
        whatsappUrl={whatsappUrl}
      />

      {/* 9. Lightbox para Visualização em Alta Resolução */}
      {lightboxData && (
        <Lightbox
          images={lightboxData.images}
          initialIndex={lightboxData.index}
          onClose={handleCloseLightbox}
        />
      )}

      {/* 10. Modal Institucional de Contato / Agendamento */}
      <ContactModal
        isOpen={contactModalOpen}
        onClose={handleCloseContact}
      />

      {/* 11. Botão Flutuante do WhatsApp */}
      <WhatsAppFloat
        whatsappUrl={whatsappUrl}
        onOpenContact={handleOpenContact}
      />
    </>
  )
}
