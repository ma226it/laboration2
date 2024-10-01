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

    if (!fs.existsSync(rootDirectory)) {
      fs.mkdirSync(rootDirectory, { recursive: true })
    }

    if (!fs.existsSync(srcDirectory)) {
      fs.mkdirSync(srcDirectory, { recursive: true })
    }

    if (!fs.existsSync(controllersDirectory)) {
      fs.mkdirSync(controllersDirectory, { recursive: true })
    }

    if (!fs.existsSync(modelsDirectory)) {
      fs.mkdirSync(modelsDirectory, { recursive: true })
    }

    if (!fs.existsSync(routesDirectory)) {
      fs.mkdirSync(routesDirectory, { recursive: true })
    }
  }
}