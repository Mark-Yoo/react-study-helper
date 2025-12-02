import { Routes, Route, Link, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import UseState from './pages/01-UseState'
import './App.css'

function App() {
  const location = useLocation()

  return (
    <div className="app-container">
      <nav className="sidebar">
        <div className="sidebar-header">
          <h2>React Hooks</h2>
          <p>연습 프로젝트</p>
        </div>

        <ul className="nav-list">
          <li>
            <Link
              to="/"
              className={location.pathname === '/' ? 'active' : ''}
            >
              🏠 홈
            </Link>
          </li>
          <li>
            <Link
              to="/01-usestate"
              className={location.pathname === '/01-usestate' ? 'active' : ''}
            >
              01. useState
            </Link>
          </li>
          <li className="disabled">
            <span>02. useEffect (준비중)</span>
          </li>
          <li className="disabled">
            <span>03. useContext (준비중)</span>
          </li>
          <li className="disabled">
            <span>04. useRef (준비중)</span>
          </li>
        </ul>
      </nav>

      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/01-usestate" element={<UseState />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
