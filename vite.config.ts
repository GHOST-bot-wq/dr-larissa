import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Diretórios onde as 4 imagens originais residem no sistema
const brainDirs = [
  path.normalize('C:/Users/Win11/.gemini/antigravity/brain/ee1d426d-d1be-4cbf-9a6e-9e2c1d3900db/.user_uploaded'),
  path.normalize('C:/Users/Win11/.gemini/antigravity/brain/b7166e09-9954-4e32-9235-10ee1b85428e/.user_uploaded'),
  path.normalize('C:/Users/Win11/.gemini/antigravity/brain/910965cd-2784-4abe-b097-25238441b475/.user_uploaded'),
]

const targetDirs = [
  path.resolve(__dirname, 'public/images'),
  path.resolve(__dirname, 'public'),
  path.resolve(__dirname, 'images'),
  path.resolve(__dirname, 'src/assets/images'),
]

const imageMappings = [
  {
    dest: 'dra-larissa-lazzo.png',
    srcs: ['media_1792175742702_1a3181ac.png', 'dra-larissa-lazzo.png'],
    mime: 'image/png',
  },
  {
    dest: 'detalhe-labial.jpg',
    srcs: ['media_1792175742711_a6f921a0.jpg', 'detalhe-labial.jpg'],
    mime: 'image/jpeg',
  },
  {
    dest: 'perfil-rinomodelacao.png',
    srcs: ['media_1792175742702_af7a6e46.png', 'perfil-rinomodelacao.png'],
    mime: 'image/png',
  },
  {
    dest: 'analise-perfil-facial.png',
    srcs: ['media_1792175742708_1445afa8.png', 'analise-perfil-facial.png'],
    mime: 'image/png',
  },
]

function ensureImagesCopied() {
  for (const targetDir of targetDirs) {
    try {
      if (!fs.existsSync(targetDir)) {
        fs.mkdirSync(targetDir, { recursive: true })
      }
    } catch {
      // silencioso
    }
  }

  for (const item of imageMappings) {
    let found = false
    for (const dir of brainDirs) {
      for (const srcName of item.srcs) {
        const srcPath = path.join(dir, srcName)
        if (fs.existsSync(srcPath)) {
          for (const targetDir of targetDirs) {
            try {
              const destPath = path.join(targetDir, item.dest)
              fs.copyFileSync(srcPath, destPath)
              // Também copia com o nome original (media_...) no public/ para garantir qualquer acesso
              const directMediaDest = path.join(targetDir, srcName)
              if (!fs.existsSync(directMediaDest)) {
                fs.copyFileSync(srcPath, directMediaDest)
              }
            } catch {
              // silencioso
            }
          }
          found = true
          break
        }
      }
      if (found) break
    }
  }
}

// Executa cópia no momento do carregamento da configuração
ensureImagesCopied()

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'serve-user-uploaded-images',
      buildStart() {
        ensureImagesCopied()
      },
      configureServer(server) {
        ensureImagesCopied()

        server.middlewares.use((req, res, next) => {
          if (!req.url) return next()
          const cleanUrl = req.url.split('?')[0]

          // Se for requisição de imagem, garante sincronização
          if (cleanUrl.includes('/images/') || cleanUrl.includes('media_')) {
            ensureImagesCopied()
          }

          const matched = imageMappings.find(
            (item) =>
              cleanUrl === `/images/${item.dest}` ||
              cleanUrl === `/${item.dest}` ||
              cleanUrl.endsWith(`/${item.dest}`) ||
              item.srcs.some((s) => cleanUrl.endsWith(`/${s}`))
          )

          if (matched) {
            // 1. Checa em public/images
            const publicPath = path.resolve(__dirname, 'public/images', matched.dest)
            if (fs.existsSync(publicPath)) {
              res.setHeader('Content-Type', matched.mime)
              res.setHeader('Cache-Control', 'public, max-age=31536000')
              return fs.createReadStream(publicPath).pipe(res)
            }

            // 2. Fallback direto no brain directory (.user_uploaded)
            for (const dir of brainDirs) {
              for (const srcName of matched.srcs) {
                const srcPath = path.join(dir, srcName)
                if (fs.existsSync(srcPath)) {
                  res.setHeader('Content-Type', matched.mime)
                  res.setHeader('Cache-Control', 'public, max-age=31536000')
                  return fs.createReadStream(srcPath).pipe(res)
                }
              }
            }
          }
          next()
        })
      },
      configurePreviewServer(server) {
        server.middlewares.use((req, res, next) => {
          if (!req.url) return next()
          const cleanUrl = req.url.split('?')[0]
          const matched = imageMappings.find((item) => cleanUrl.endsWith(`/${item.dest}`))
          if (matched) {
            const publicPath = path.resolve(__dirname, 'public/images', matched.dest)
            if (fs.existsSync(publicPath)) {
              res.setHeader('Content-Type', matched.mime)
              res.setHeader('Cache-Control', 'public, max-age=31536000')
              return fs.createReadStream(publicPath).pipe(res)
            }
          }
          next()
        })
      },
    },
  ],
  server: {
    port: 3000,
    open: true,
    fs: {
      strict: false,
      allow: [
        path.resolve(__dirname),
        'C:/Users/Win11',
      ],
    },
  },
})
