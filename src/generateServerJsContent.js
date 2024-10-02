/**
 * Generates the content of the server.js file. Which contains basic setup for an Express server.
 *
 * @returns {string} - The content of the server.js file.
 */
export function generateServerJsContent() {
  return `import express from 'express'

const setupExpressServer = () => {
  const app = express()

  const port = process.env.PORT || 3000

  app.get('/', (req, res) => {
    res.send('Hello, world!')
  })

  app.listen(port, () => {
    console.log('Press Ctrl-C to terminate...')
  })
}

try {
  setupExpressServer()
} catch (error) {
  console.error(error)
  process.exitCode = 1
}
`
}
