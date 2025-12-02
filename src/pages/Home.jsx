import { Link } from "react-router-dom";
import "../App.css";

function Home() {
  return (
    <div className="app">
      <h1>React Hooks 연습 프로젝트</h1>

      <div className="home-container">
        <section className="example-section">
          <h2>프로젝트 소개</h2>
          <p>이 프로젝트는 React Hooks를 연습하기 위한 예제 모음입니다.</p>
          <p>각 페이지에서 다양한 Hook의 사용법을 학습할 수 있습니다.</p>
        </section>

        <section className="example-section">
          <h2>학습 목록</h2>
          <div className="lesson-list">
            <Link to="/01-usestate" className="lesson-card">
              <h3>01. useState</h3>
              <p>컴포넌트의 상태를 관리하는 가장 기본적인 Hook</p>
              <ul>
                <li>숫자, 문자열, Boolean State</li>
                <li>배열과 객체 State 관리</li>
                <li>실전 예제: Counter, Todo List, Form</li>
              </ul>
            </Link>

            <Link tp="/02-useeffect" className="lesson-card">
              <h3>02. useEffect</h3>
              <p>Side Effect를 처리하는 Hook</p>
              <ul>
                <li>컴포넌트 생명주기</li>
                <li>데이터 fetching</li>
                <li>구독과 정리</li>
              </ul>
            </Link>

            <div className="lesson-card disabled">
              <h3>03. useContext (준비중)</h3>
              <p>전역 상태를 관리하는 Hook</p>
              <ul>
                <li>Context API</li>
                <li>Props Drilling 해결</li>
                <li>테마, 인증 상태 관리</li>
              </ul>
            </div>

            <div className="lesson-card disabled">
              <h3>04. useRef (준비중)</h3>
              <p>DOM 요소나 값을 참조하는 Hook</p>
              <ul>
                <li>DOM 직접 접근</li>
                <li>이전 값 저장</li>
                <li>Focus 관리</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="example-section">
          <h2>시작하기</h2>
          <p>
            왼쪽 메뉴나 위의 학습 목록에서 원하는 Hook을 선택하여 시작하세요!
          </p>
        </section>
      </div>
    </div>
  );
}

export default Home;
