import fs from 'fs'
import path from 'path'
import { generateServerJsContent } from './generateServerJsContent.js'


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
    this.#createPackageJsonFile()
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
   * Creates the 'server.js' file for the Express project. With generated express setup.
   */
  #createServerJsFile () {
    const serverJsPath = path.join(this.#basePath, this.#projectName, 'src', 'server.js')
    const serverJsContent = generateServerJsContent()

    fs.writeFileSync(serverJsPath, serverJsContent)
    console.log('server.js file created.')
  }

  /**
   * Creates the package.json file in the root directory of the project.
   */
  #createPackageJsonFile () {
    const packageJsonFilePath = path.join(this.#basePath, this.#projectName, 'package.json')

    const packageJsonFileContent = {
      name: this.#projectName,
      version: "1.0.0",
      main: "src/server.js",
      type: "module",
      scripts: {
        start: "node src/server.js",
        dev: "nodemon src/server.js"
      },
      dependencies: {
        express: "^4.21.0"
      },
      devDependencies: {
        nodemon: "^3.1.7"
      }
    }

    fs.writeFileSync(packageJsonFilePath, JSON.stringify(packageJsonFileContent, null, 2))
    console.log('Created package.json file.')
  }
}