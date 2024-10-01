import fs from 'fs'
import path from 'path'

/**
 * Represents a NodeProject class. This class is responsible for initializing a new Node.js project.
 */
export class NodeProject {
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
   * Initializes a new instance of the NodeProject class.
   *
   * @param {string} projectName - The name of the project.
   */
  constructor (projectName) {
    this.#projectName = projectName
    this.#basePath = path.join(process.cwd(), 'dist')
  }

  /**
   * Initializes the Node.js project.
   */
  initializeProject () {
    this.#createDirectoryStructure()
    console.log(`Project '${this.#projectName}' has been initialized successfully.`)
  }

  /**
   * Creates the directory structure for the Node.js project.
   *
   * The structure will be: dist/<projectName>/src
   *
   * If the root directory and the 'src' subdirectory do not exist, they will be created.
   */
  #createDirectoryStructure () {
    const rootDirectory = path.join(this.#basePath, this.#projectName)
    const srcDirectory = path.join(rootDirectory, 'src')

    if (!fs.existsSync(rootDirectory)) {
      fs.mkdirSync(rootDirectory, { recursive: true })
    }

    if (!fs.existsSync(srcDirectory)) {
      fs.mkdirSync(srcDirectory, { recursive: true })
    }

    console.log('Directory structure created.')
  }
}
