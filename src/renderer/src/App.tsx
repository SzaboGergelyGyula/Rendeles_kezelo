import Versions from './components/Versions'
import icons from './assets/icons.svg'
import { useEffect, useState } from 'react'

function App(): JSX.Element {
  const [username, setUsername] = useState(null)

  useEffect(() => {
    getUsername()
  }, [username])

  const getUsername = async () => {
    const result = await window.api.getProfileInfo()
    setUsername(result)
  }

  console.log(username)

  return (
    <div className="container">
      <Versions></Versions>

      <svg className="hero-logo" viewBox="0 0 900 300">
        <use xlinkHref={`${icons}#electron`} />
      </svg>
      <h2 className="hero-text">
        You{"'"}ve successfully created an Electron project with React and TypeScript
      </h2>
      <p className="hero-tagline">
        Please try pressing <code>F12</code> to open the devTool
      </p>

      <div>Szerverről szerzett adat: {username}</div>

      <div className="features">
        <div className="feature-item">
          <article>
            <h2 className="title">Configuring</h2>
            <p className="detail">
              Config with <span>electron.vite.config.ts</span> and refer to the{' '}
              <a target="_blank" href="https://electron-vite.org/config" rel="noopener noreferrer">
                config guide
              </a>
              .
            </p>
          </article>
        </div>
        <div className="feature-item">
          <article>
            <h2 className="title">HMR</h2>
            <p className="detail">
              Edit <span>src/renderer</span> files to test HMR. See{' '}
              <a
                target="_blank"
                href="https://electron-vite.org/guide/hmr.html"
                rel="noopener noreferrer"
              >
                docs
              </a>
              .
            </p>
          </article>
        </div>
        <div className="feature-item">
          <article>
            <h2 className="title">Hot Reloading</h2>
            <p className="detail">
              Run{' '}
              <span>
                {"'"}electron-vite dev --watch{"'"}
              </span>{' '}
              to enable. See{' '}
              <a
                target="_blank"
                href="https://electron-vite.org/guide/hot-reloading.html"
                rel="noopener noreferrer"
              >
                docs
              </a>
              .
            </p>
          </article>
        </div>
        <div className="feature-item">
          <article>
            <h2 className="title">Debugging</h2>
            <p className="detail">
              Check out <span>.vscode/launch.json</span>. See{' '}
              <a
                target="_blank"
                href="https://electron-vite.org/guide/debugging.html"
                rel="noopener noreferrer"
              >
                docs
              </a>
              .
            </p>
          </article>
        </div>
        <div className="feature-item">
          <article>
            <h2 className="title">Source Code Protection</h2>
            <p className="detail">
              Supported via built-in plugin <span>bytecodePlugin</span>. See{' '}
              <a
                target="_blank"
                href="https://electron-vite.org/guide/source-code-protection.html"
                rel="noopener noreferrer"
              >
                docs
              </a>
              .
            </p>
          </article>
        </div>
        <div className="feature-item">
          <article>
            <h2 className="title">Packaging</h2>
            <p className="detail">
              Use{' '}
              <a target="_blank" href="https://www.electron.build" rel="noopener noreferrer">
                electron-builder
              </a>{' '}
              and pre-configured to pack your app.
            </p>
          </article>
        </div>
      </div>
    </div>
  )
}

export default App
