import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// En desarrollo, sirve las funciones de /api con el mismo contrato que Vercel
// (req.body parseado, res.status().json()), sin necesitar `vercel dev`.
function devApi(env) {
  return {
    name: 'dev-api',
    configureServer(server) {
      Object.assign(process.env, env)
      server.middlewares.use(async (req, res, next) => {
        const url = new URL(req.url, 'http://localhost')
        const m = url.pathname.match(/^\/api\/([\w-]+)$/)
        if (!m) return next()

        const chunks = []
        for await (const c of req) chunks.push(c)
        const raw = Buffer.concat(chunks).toString()
        try {
          req.body = raw && req.headers['content-type']?.includes('json') ? JSON.parse(raw) : raw
        } catch {
          req.body = undefined
        }
        req.query = Object.fromEntries(url.searchParams)

        res.status = (code) => ((res.statusCode = code), res)
        res.json = (obj) => {
          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify(obj))
        }

        try {
          const mod = await server.ssrLoadModule(`/api/${m[1]}.js`)
          await mod.default(req, res)
        } catch (err) {
          console.error(err)
          if (!res.headersSent) res.status(500).json({ error: 'Error interno' })
        }
      })
    },
  }
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  return { plugins: [react(), devApi(env)] }
})
