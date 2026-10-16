import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const possibleSources = [
  'C:/Users/Win11/.gemini/antigravity/brain/ee1d426d-d1be-4cbf-9a6e-9e2c1d3900db/.user_uploaded',
  'C:/Users/Win11/.gemini/antigravity/brain/b7166e09-9954-4e32-9235-10ee1b85428e/.user_uploaded',
  'C:/Users/Win11/.gemini/antigravity/brain/910965cd-2784-4abe-b097-25238441b475/.user_uploaded',
]

const targetDirs = [
  path.resolve(__dirname, 'public/images'),
  path.resolve(__dirname, 'images'),
  path.resolve(__dirname, 'src/assets/images'),
]

const mappings = [
  {
    dest: 'dra-larissa-lazzo.png',
    srcs: ['media_1792175742702_1a3181ac.png', 'dra-larissa-lazzo.png', 'larissa-lazzo.png'],
    label: 'Foto Principal · Dra. Larissa Lazzo',
  },
  {
    dest: 'detalhe-labial.jpg',
    srcs: ['media_1792175742711_a6f921a0.jpg', 'detalhe-labial.jpg', 'labios.jpg'],
    label: 'Preenchimento / Contorno Labial',
  },
  {
    dest: 'perfil-rinomodelacao.png',
    srcs: ['media_1792175742702_af7a6e46.png', 'perfil-rinomodelacao.png', 'rinomodelacao.png'],
    label: 'Harmonia do Perfil Nasal / Rinomodelação',
  },
  {
    dest: 'analise-perfil-facial.png',
    srcs: ['media_1792175742708_1445afa8.png', 'analise-perfil-facial.png', 'perfil-facial.png'],
    label: 'Análise de Terços Faciais e Mandíbula',
  },
]

for (const targetDir of targetDirs) {
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true })
  }
}

let copiedCount = 0
for (const item of mappings) {
  let found = false
  for (const srcDir of possibleSources) {
    for (const srcName of item.srcs) {
      const srcPath = path.join(srcDir, srcName)
      if (fs.existsSync(srcPath)) {
        for (const targetDir of targetDirs) {
          const destPath = path.join(targetDir, item.dest)
          fs.copyFileSync(srcPath, destPath)
          console.log(`[copy-images] Copiado com sucesso (${item.label}): ${srcName} -> ${destPath}`)
        }
        found = true
        copiedCount++
        break
      }
    }
    if (found) break
  }
  if (!found) {
    console.warn(`[copy-images] Aviso: Não foi possível localizar arquivo de origem para ${item.dest}`)
  }
}

console.log(`[copy-images] Concluído. ${copiedCount} de ${mappings.length} imagens oficiais copiadas com sucesso.`)
