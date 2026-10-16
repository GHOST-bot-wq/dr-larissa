import { useState, useEffect, useRef } from 'react'
import './FAQ.css'

interface FAQItem {
  question: string
  answer: string
}

const faqList: FAQItem[] = [
  {
    question: 'Como funciona a consulta de avaliação individualizada?',
    answer:
      'A consulta inicial é o momento mais importante do tratamento. Nela, a Dra. Larissa Lazzo realiza uma análise aprofundada da sua queixa principal, do seu histórico clínico e da geometria facial (proporção entre terços, dinâmica da mímica e qualidade da derme). Juntos, definimos quais intervenções trazem harmonia real, estabelecendo um plano de etapas seguro e transparente.',
  },
  {
    question: 'A harmonização facial deixa o rosto com aspecto artificial?',
    answer:
      'Não, desde que realizada com critério e moderação. O posicionamento da Dra. Larissa Lazzo é rigorosamente voltado para a naturalidade: preservar suas feições originais e refinar pontos estratégicos. O resultado ideal é aquele que desperta elogios sobre o seu frescor e descanso facial, sem que ninguém aponte intervenções exageradas.',
  },
  {
    question: 'Como saber exatamente quais procedimentos são indicados para mim?',
    answer:
      'Cada anatomia exige uma conduta própria. Em muitos casos, a queixa do paciente em uma área (por exemplo, sulco nasogeniano ou "bigode chinês") é solucionada sustentando o terço médio (malar), e não apenas preenchendo a linha. Essa compreensão tridimensional é realizada na avaliação individualizada antes de qualquer aplicação.',
  },
  {
    question: 'Existe tempo de recuperação (downtime) após as aplicações?',
    answer:
      'A grande maioria dos procedimentos de harmonização facial (como aplicação de toxina botulínica e preenchedores de ácido hialurônico) permite retorno quase imediato à rotina de trabalho. Podem ocorrer leve edema (inchaço) ou pequenos hematomas transitórios, para os quais são fornecidas orientações claras de cuidados e compressas nos primeiros dias.',
  },
  {
    question: 'Quanto tempo duram os resultados da harmonização?',
    answer:
      'A durabilidade varia conforme o procedimento e as características metabólicas individuais de cada paciente. A toxina botulínica tem duração média de 3 a 5 meses, enquanto os preenchedores de ácido hialurônico de alta qualidade duram em média de 9 a 18 meses, sendo absorvidos gradualmente e com total segurança pelo organismo.',
  },
  {
    question: 'Como realizo o agendamento em Anápolis, Goiás?',
    answer:
      'O agendamento é feito de forma personalizada e com horário reservado para garantir total atenção e pontualidade. Você pode solicitar seu horário diretamente pelos canais de contato disponíveis no site.',
  },
]

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)
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

  const toggleItem = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx)
  }

  return (
    <section id="duvidas" className="faq" ref={sectionRef} aria-label="Perguntas Frequentes">
      <div className="container">
        <div className="faq__grid">
          {/* Coluna de Apresentação */}
          <div className="faq__intro">
            <div className="reveal-fade-up delay-1">
              <span className="eyebrow-tag">ESCLARECIMENTO & TRANSPARÊNCIA</span>
            </div>
            <h2 className="section-title reveal-fade-up delay-2">
              Perguntas <em>frequentes.</em>
            </h2>
            <div className="faq__divider reveal-fade-up delay-2" />
            <p className="faq__intro-text reveal-fade-up delay-3">
              Informações claras sobre o processo de avaliação, indicação técnica e cuidados pós-procedimento. A segurança começa com a clareza em todas as etapas.
            </p>
          </div>

          {/* Coluna do Acordeão */}
          <div className="faq__accordion reveal-fade-up delay-2">
            {faqList.map((item, idx) => {
              const isOpen = openIndex === idx
              return (
                <div
                  key={idx}
                  className={`faq__item ${isOpen ? 'faq__item--open' : ''}`}
                >
                  <button
                    className="faq__trigger"
                    onClick={() => toggleItem(idx)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${idx}`}
                  >
                    <span className="faq__question heading-serif">{item.question}</span>
                    <span className="faq__icon" aria-hidden="true">
                      <span className="faq__icon-line"></span>
                      <span className="faq__icon-line"></span>
                    </span>
                  </button>

                  <div
                    id={`faq-answer-${idx}`}
                    className="faq__collapse"
                    style={{
                      maxHeight: isOpen ? '360px' : '0px',
                    }}
                    role="region"
                  >
                    <div className="faq__answer">
                      <p>{item.answer}</p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
