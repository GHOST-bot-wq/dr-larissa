# GS Estética Avançada — Site Premium

Site completo para a **GS Estética Avançada**, desenvolvido com **React + Vite + TypeScript**.

---

## Como executar localmente

### Pré-requisitos
- **Node.js** v18 ou superior → [nodejs.org](https://nodejs.org)
- **npm** (incluído com o Node.js)

### Passos

```bash
# 1. Abra o terminal na pasta do projeto
cd "c:\Users\Win11\Downloads\clinica 4"

# 2. Instale as dependências (apenas na primeira vez)
npm install

# 3. Inicie o servidor de desenvolvimento
npm run dev
```

O site abrirá automaticamente em `http://localhost:3000`

---

## Estrutura de arquivos

```
clinica 4/
├── public/
│   ├── favicon.svg
│   └── images/
│       ├── LEIA-ME.md          ← instruções de imagens
│       ├── gabrielly-sampaio.png
│       ├── gabrielly-laser.png
│       ├── resultado-corporal-1.png
│       ├── resultado-antes-depois.png
│       └── resultado-corporal-2.png
├── src/
│   ├── config/
│   │   └── business.ts         ← ⭐ ARQUIVO DE CONFIGURAÇÃO CENTRAL
│   ├── components/
│   │   ├── Header.tsx / .css
│   │   ├── Hero.tsx / .css
│   │   ├── About.tsx / .css
│   │   ├── Treatments.tsx / .css
│   │   ├── Technology.tsx / .css
│   │   ├── Gallery.tsx / .css
│   │   ├── Results.tsx / .css
│   │   ├── HowItWorks.tsx / .css
│   │   ├── FAQ.tsx / .css
│   │   ├── Contact.tsx / .css
│   │   ├── FinalCTA.tsx / .css
│   │   ├── Footer.tsx / .css
│   │   ├── Lightbox.tsx
│   │   └── WhatsAppFloat.tsx
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── index.html
├── package.json
├── vite.config.ts
└── tsconfig.json
```

---

## ⭐ Como atualizar os dados da clínica

Edite o arquivo `src/config/business.ts`:

```typescript
// Trocar PENDING pelo número real (apenas dígitos, ex: '5511999999999')
whatsapp: '55XXXXXXXXXXX',

// Trocar PENDING pelo endereço real
address: 'Rua Exemplo, 123 — Bairro',
city: 'Cidade',
state: 'UF',

// Link do Google Maps
addressMapUrl: 'https://maps.google.com/...',

// Horários (exemplo)
businessHours: [
  { days: 'Segunda a Sexta', hours: '09h – 19h' },
  { days: 'Sábado', hours: '09h – 14h' },
],
```

---

## O que ainda precisa ser fornecido

| Item | Status |
|---|---|
| Número de WhatsApp | ⏳ Pendente |
| Endereço completo | ⏳ Pendente |
| Horários de funcionamento | ⏳ Pendente |
| Fotografias originais em alta resolução | ⏳ Copiar para `/public/images/` |
| Informações profissionais (formação, especializações) | ⏳ Pendente |
| Depoimentos de clientes autorizados | ⏳ Pendente |
| CNPJ e dados legais | ⏳ Pendente (quando houver) |

---

## Build para produção

```bash
npm run build
```

Os arquivos serão gerados em `dist/`. Faça o upload desta pasta para o seu servidor ou hosting.

---

## Tecnologias utilizadas

- **React 18** + **TypeScript**
- **Vite 6** (bundler)
- **CSS puro** (sem frameworks pesados)
- **Google Fonts**: Cormorant Garamond + Manrope
- Zero dependências de UI desnecessárias
