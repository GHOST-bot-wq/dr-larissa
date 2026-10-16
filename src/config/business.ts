/**
 * ============================================================
 * DRA. LARISSA LAZZO — HARMONIZAÇÃO FACIAL
 * Arquivo de Configuração Central e Institucional
 * Anápolis, Goiás · Biomédica · CRBM 12459
 * ============================================================
 * 
 * Regra de Ouro:
 * - Apenas dados confirmados pelo cliente são exibidos.
 * - WhatsApp centralizado: ao preencher o número com DDD (ex: '5562999999999'),
 *   todos os botões passam a direcionar imediatamente para a conversa oficial.
 * - Caso esteja 'PENDENTE' ou vazio, os botões abrem com elegância o modal
 *   institucional de contato sem jamais direcionar o usuário para links quebrados.
 */

export type PendingValue = 'PENDENTE';
export const PENDING: PendingValue = 'PENDENTE';

export interface BusinessConfig {
  name: string;
  professional: string;
  title: string;
  councilRegistration: string;
  area: string;
  city: string;
  state: string;
  locationLabel: string;
  whatsapp: string | PendingValue;
  whatsappMessage: string;
  instagram: string | PendingValue;
  instagramUrl: string | PendingValue;
  address: string | PendingValue;
  phone: string | PendingValue;
  hours: string | PendingValue;
  seo: {
    title: string;
    description: string;
    url: string;
  };
}

// ------------------------------------------------------------
// CONFIGURAÇÃO OFICIAL DA CLÍNICA
// ------------------------------------------------------------
// Substitua PENDING pelo número real com DDI (55) e DDD (ex: '5562999999999')
export const OFFICIAL_WHATSAPP: string | PendingValue = PENDING;

export const businessConfig: BusinessConfig = {
  name: 'Dra. Larissa Lazzo',
  professional: 'Larissa Lazzo',
  title: 'Biomédica Esteta',
  councilRegistration: 'CRBM 12459',
  area: 'Harmonização Facial',
  city: 'Anápolis',
  state: 'Goiás',
  locationLabel: 'Anápolis — Goiás',

  // Configuração central do WhatsApp
  whatsapp: OFFICIAL_WHATSAPP,
  whatsappMessage:
    'Olá, Dra. Larissa Lazzo! Gostaria de agendar uma avaliação e conhecer o planejamento personalizado para o meu rosto.',

  // Redes e contatos adicionais mantidos sob conformidade rigorosa
  instagram: PENDING,
  instagramUrl: PENDING,
  address: PENDING,
  phone: PENDING,
  hours: 'Atendimento exclusivo mediante agendamento prévio',

  seo: {
    title: 'Dra. Larissa Lazzo · Harmonização Facial em Anápolis — GO',
    description:
      'Harmonização facial com olhar individualizado, atenção aos detalhes e respeito à sua beleza natural. Dra. Larissa Lazzo, Biomédica (CRBM 12459).',
    url: 'https://dralarissalazzo.com.br',
  },
};

export default businessConfig;

export function isPending(value: unknown): value is PendingValue {
  return value === PENDING || value === '' || value === null || value === undefined;
}

export function getWhatsAppUrl(cfg: BusinessConfig = businessConfig): string | null {
  if (isPending(cfg.whatsapp) || !cfg.whatsapp) {
    return null;
  }
  const digits = cfg.whatsapp.replace(/\D/g, '');
  if (!digits || digits.length < 10) {
    return null;
  }
  const message = encodeURIComponent(cfg.whatsappMessage);
  return `https://wa.me/${digits}?text=${message}`;
}
