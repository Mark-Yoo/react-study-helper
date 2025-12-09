import { Routes, Route, Link, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import UseState from "./pages/01-UseState";
import UseEffect from "./pages/02-UseEffect";
import Buildup from "./pages/05-Buildup";
import UseReducer from "./pages/04-UseReducer";
import "./App.css";

function App() {
  const location = useLocation();

  return (
    <div className="app-container">
      <nav className="sidebar">
        <div className="sidebar-header">
          <h2>React Hooks</h2>
          <p>연습 프로젝트</p>
        </div>

        <ul className="nav-list">
          <li>
            <Link to="/" className={location.pathname === "/" ? "active" : ""}>
              🏠 홈
            </Link>
          </li>
          <li>
            <Link
              to="/01-usestate"
              className={location.pathname === "/01-usestate" ? "active" : ""}
            >
              01. useState
            </Link>
          </li>
          {/* <li>
            <Link
              to="/02-useeffect"
              className={location.pathname === "/02-useeffect" ? "active" : ""}
            >
              02. useEffect
            </Link>
          </li> */}
          <li className="disabled">
            <span>02. useEffect (준비중)</span>
          </li>
          <li className="disabled">
            <span>03. useContext (준비중)</span>
          </li>
          <li>
            <Link
              to="/04-usereducer"
              className={location.pathname === "/04-usereducer" ? "active" : ""}
            >
              04. useReducer
            </Link>
          </li>
          <li>
            <Link
              to="/05-buildup"
              className={location.pathname === "/05-buildup" ? "active" : ""}
            >
              05. JavaScript 빌드업
            </Link>
          </li>
        </ul>
      </nav>

      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/01-usestate" element={<UseState />} />
          <Route path="/02-useeffect" element={<UseEffect />} />
          <Route path="/05-buildup" element={<Buildup />} />
          <Route path="/04-usereducer" element={<UseReducer />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
