import fs from 'fs'
import path from 'path'


export class ExpressProject {
  /**
   * The name of the project.
   *
   * @type {string}
   */
  #projectName

  /**
   * The base path for the project.
   *
   * @type {string}
   */
  #basePath

  /**
   * Initializes a new instance of the ExpressProject class.
   *
   * @param {string} projectName - The name of the project.
   */
  constructor (projectName) {
    this.#projectName = projectName
    this.#basePath = path.join(process.cwd(), 'dist')
  }

  /**
   * Initializes the Express.js project.
   */
  initializeProject () {
    this.#createDirectoryStructure()
    this.#createServerJsFile()
    console.log(`Project '${this.#projectName}' has been initialized successfully.`)
  }

  /**
   * Creates the directory structure for the Express.js project.
   *
   * The structure will be: dist/<projectName>/src
   *
   * If the root directory and the 'src' subdirectory do not exist, they will be created.
   */
  #createDirectoryStructure () {
    const rootDirectory = path.join(this.#basePath, this.#projectName)
    const srcDirectory = path.join(rootDirectory, 'src')
    const controllersDirectory = path.join(srcDirectory, 'controllers')
    const modelsDirectory = path.join(srcDirectory, 'models')
    const routesDirectory = path.join(srcDirectory, 'routes')

    const directories = [
      rootDirectory,
      srcDirectory,
      controllersDirectory,
      modelsDirectory,
      routesDirectory
    ]

    directories.forEach(directory => {
      if (!fs.existsSync(directory)) {
        fs.mkdirSync(directory, { recursive: true })
      }
    })
  }

  /**
   * Creates the 'server.js' file for the Express project. Which contains basic setup for an Express server.
   */
  #createServerJsFile () {
    const serverJsPath = path.join(this.#basePath, this.#projectName, 'src', 'server.js')
    const serverJsContent = `import express from 'express'

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
      fs.writeFileSync(serverJsPath, serverJsContent)

      console.log('server.js file created.')
  }
}