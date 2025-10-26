import sharp from 'sharp'
import { dirname, resolve } from 'path'
import { fileURLToPath } from 'url'
import { existsSync, mkdirSync } from 'fs'

const __dirname = dirname(fileURLToPath(import.meta.url))
const publicDir = resolve(__dirname, '../public')
const src = resolve(publicDir, 'logo.png')

if (!existsSync(src)) {
  console.error('Logo not found at', src)
  process.exit(1)
}

if (!existsSync(publicDir)) mkdirSync(publicDir, { recursive: true })

async function makePng(out, size, { padding = 0, bg = '#F2EFD8' } = {}) {
  const sz = Math.round(size)
  const pad = Math.round(padding)
  const canvas = sharp({
    create: {
      width: sz,
      height: sz,
      channels: 4,
      background: bg
    }
  })

  const logo = await sharp(src)
    .resize(sz - pad * 2, sz - pad * 2, { fit: 'contain' })
    .png()
    .toBuffer()

  await canvas
    .composite([{ input: logo, top: pad, left: pad }])
    .png()
    .toFile(resolve(publicDir, out))
  console.log('generated', out)
}

async function run() {
  // Favicons
  await makePng('favicon-16x16.png', 16)
  await makePng('favicon-32x32.png', 32)
  await makePng('android-chrome-192x192.png', 192)
  await makePng('android-chrome-512x512.png', 512)
  await makePng('apple-touch-icon.png', 180)
  // Maskable with padding 10%
  await makePng('android-chrome-maskable-192x192.png', 192, { padding: Math.round(192 * 0.10), bg: '#F2EFD8' })
  await makePng('android-chrome-maskable-512x512.png', 512, { padding: Math.round(512 * 0.10), bg: '#F2EFD8' })
  // ICO - from 32x32 PNG (simple)
  // Many tools create multi-size .ico; for MVP we use 32x32 png renamed via sharp
  await sharp(resolve(publicDir, 'favicon-32x32.png')).toFile(resolve(publicDir, 'favicon.png'))
}

run().catch(err => { console.error(err); process.exit(1) })
