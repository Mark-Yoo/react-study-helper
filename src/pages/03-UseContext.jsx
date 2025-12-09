import { useState, createContext, useContext } from "react";
import "../App.css";

// 문제 1: 기본 Context 생성
const MessageContext = createContext();

// 문제 2: 여러 값을 가진 Context
const UserContext = createContext();

// 문제 4: 중첩된 Context - 테마 Context
const ThemeContext = createContext();

// 문제 4: 중첩된 Context - 언어 Context
const LanguageContext = createContext();

// 문제 5: 카운터 Context (동적 업데이트)
const CounterContext = createContext();

// 문제 7: 전역 테마 Context
const GlobalThemeContext = createContext();

function UseContextPage() {
  // 모드 관리
  const [mode, setMode] = useState("practice");

  // 힌트/정답 토글
  const [showHint, setShowHint] = useState({});
  const [showAnswer, setShowAnswer] = useState({});

  // 각 문제의 정답 여부
  const [isCorrect, setIsCorrect] = useState({
    1: false,
    2: false,
    3: false,
    4: false,
    5: false,
    6: false,
    7: false,
  });

  // 정답 확인 피드백
  const [feedback, setFeedback] = useState({});

  // 연습 모드용 사용자 코드
  const [userCode, setUserCode] = useState({
    1: "",
    2: "",
    3: "",
    4: "",
    5: "",
    6: "",
    7: "",
  });

  // 문제 1: 기본 Context 값
  const message1 = "안녕하세요! Context API입니다.";

  // 문제 2: 사용자 정보
  const user2 = { name: "홍길동", age: 25, email: "hong@example.com" };

  // 문제 3: 버튼 클릭 함수가 포함된 Context
  const [clickCount3, setClickCount3] = useState(0);
  const handleClick3 = () => setClickCount3((prev) => prev + 1);

  // 문제 4: 중첩 Context 값
  const theme4 = "dark";
  const language4 = "한국어";

  // 문제 5: 동적 카운터
  const [counter5, setCounter5] = useState(0);
  const increment5 = () => setCounter5((prev) => prev + 1);
  const decrement5 = () => setCounter5((prev) => prev - 1);
  const reset5 = () => setCounter5(0);

  // 문제 7: 전역 테마 상태
  const [globalTheme7, setGlobalTheme7] = useState("light");
  const toggleTheme7 = () =>
    setGlobalTheme7((prev) => (prev === "light" ? "dark" : "light"));

  // 정답 패턴 정의
  const correctAnswers = {
    1: [
      "useContext(MessageContext)",
      "useContext( MessageContext )",
      "const message = useContext(MessageContext)",
    ],
    2: [
      "useContext(UserContext)",
      "const user = useContext(UserContext)",
      "const { name, age, email } = useContext(UserContext)",
      "user.name",
      "user.age",
    ],
    3: [
      "useContext",
      "handleClick()",
      "onClick={handleClick}",
      "const { handleClick } = useContext",
    ],
    4: [
      "useContext(ThemeContext)",
      "useContext(LanguageContext)",
      "const theme = useContext(ThemeContext)",
      "const language = useContext(LanguageContext)",
    ],
    5: [
      "useContext(CounterContext)",
      "increment()",
      "decrement()",
      "const { counter, increment, decrement } = useContext(CounterContext)",
    ],
    6: [
      "const useCustomContext = () => {",
      "useContext(",
      "throw new Error",
      "if (!context)",
    ],
    7: [
      "useContext(GlobalThemeContext)",
      "toggleTheme()",
      "theme === 'light'",
      "theme === 'dark'",
    ],
  };

  // 힌트/정답 토글
  const toggleHint = (problemNum) => {
    setShowHint((prev) => ({ ...prev, [problemNum]: !prev[problemNum] }));
  };

  const toggleAnswer = (problemNum) => {
    setShowAnswer((prev) => ({ ...prev, [problemNum]: !prev[problemNum] }));
  };

  // 코드 업데이트
  const updateUserCode = (problemNum, code) => {
    setUserCode((prev) => ({ ...prev, [problemNum]: code }));
    setFeedback((prev) => ({ ...prev, [problemNum]: null }));
  };

  // 정답 확인
  const checkAnswer = (problemNum) => {
    const userAnswer = userCode[problemNum].trim().replace(/\s+/g, " ");
    const possibleAnswers = correctAnswers[problemNum];

    const isAnswerCorrect = possibleAnswers.some((answer) =>
      userAnswer.includes(answer.replace(/\s+/g, " "))
    );

    setIsCorrect((prev) => ({ ...prev, [problemNum]: isAnswerCorrect }));
    setFeedback((prev) => ({
      ...prev,
      [problemNum]: isAnswerCorrect ? "correct" : "incorrect",
    }));

    setTimeout(() => {
      setFeedback((prev) => ({ ...prev, [problemNum]: null }));
    }, 3000);
  };

  // 점수 계산
  const calculateScore = () => {
    let score = 0;
    if (isCorrect[1]) score += 15;
    if (isCorrect[2]) score += 10;
    if (isCorrect[3]) score += 10;
    if (isCorrect[4]) score += 10;
    if (isCorrect[5]) score += 20;
    if (isCorrect[6]) score += 15;
    if (isCorrect[7]) score += 20;
    return score;
  };

  return (
    <div className="app">
      <h1>useContext 테스트</h1>

      <div className="test-info example-section">
        <h2>📝 테스트 안내</h2>
        <p>
          각 문제의 요구사항을 읽고 useContext를 사용하여 기능을 구현하세요.
        </p>
        <p>코드를 작성한 후 "코드 확인" 버튼을 클릭하여 정답을 확인하세요.</p>
        <p>정답이 맞으면 해당 기능이 활성화되고 점수가 부여됩니다!</p>

        <div className="mode-toggle">
          <button
            className={mode === "practice" ? "active" : ""}
            onClick={() => setMode("practice")}
          >
            연습 모드
          </button>
          <button
            className={mode === "view" ? "active" : ""}
            onClick={() => setMode("view")}
          >
            정답 보기 모드
          </button>
        </div>

        <div className="score-display">
          <h3>현재 점수: {calculateScore()}점 / 100점</h3>
          <p className="correct-count">
            정답 개수: {Object.values(isCorrect).filter((v) => v).length} / 7
          </p>
        </div>
      </div>

      {/* 문제 1: 기본 Context 사용 (15점) */}
      <section className="example-section problem-section">
        <div className="problem-header">
          <h2>문제 1. 기본 Context 사용 (15점)</h2>
          <div className="header-right">
            <span className="difficulty easy">난이도: ⭐</span>
            {isCorrect[1] && <span className="badge-correct">✓ 정답</span>}
          </div>
        </div>
        <div className="problem-description">
          <h3>📌 요구사항:</h3>
          <ul>
            <li>MessageContext에서 값을 읽어와 화면에 표시해야 합니다</li>
            <li>useContext 훅을 사용해야 합니다</li>
          </ul>
        </div>

        {mode === "practice" && (
          <div className="code-editor-section">
            <h4>💻 코드 작성 영역:</h4>
            <p className="code-hint">
              useContext를 사용하여 Context 값을 읽어오세요:
            </p>
            <div className="code-template">
              <pre>{`// Context가 이미 생성되어 있습니다
const MessageContext = createContext()

// DisplayMessage 컴포넌트 내부
function DisplayMessage() {
  // 여기에 코드를 작성하세요
  const message = /* useContext를 사용하여 값 읽기 */

  return <p>{message}</p>
}`}</pre>
            </div>
            <textarea
              className="code-input"
              placeholder="useContext를 사용하여 MessageContext에서 값을 읽어오세요&#10;예: const message = useContext(MessageContext)"
              value={userCode[1]}
              onChange={(e) => updateUserCode(1, e.target.value)}
              rows={2}
            />
            <div className="code-controls">
              <button onClick={() => checkAnswer(1)} className="check-btn">
                코드 확인
              </button>
              {feedback[1] === "correct" && (
                <span className="feedback correct">✓ 정답입니다!</span>
              )}
              {feedback[1] === "incorrect" && (
                <span className="feedback incorrect">✗ 다시 시도해보세요.</span>
              )}
            </div>
          </div>
        )}

        <MessageContext.Provider value={message1}>
          <div className="problem-workspace">
            <div className="result-area">
              <Problem1Display isCorrect={mode === "view" || isCorrect[1]} />
            </div>
          </div>
        </MessageContext.Provider>

        <div className="problem-controls">
          <button onClick={() => toggleHint(1)} className="hint-btn">
            {showHint[1] ? "힌트 숨기기" : "힌트 보기"}
          </button>
          <button onClick={() => toggleAnswer(1)} className="answer-btn">
            {showAnswer[1] ? "정답 숨기기" : "정답 보기"}
          </button>
        </div>

        {showHint[1] && (
          <div className="hint-box">
            <strong>💡 힌트:</strong> useContext(ContextName)을 사용하여
            Context의 현재 값을 읽을 수 있습니다.
          </div>
        )}

        {showAnswer[1] && (
          <div className="answer-box">
            <strong>✅ 정답:</strong>
            <pre>{`const message = useContext(MessageContext)
return <p>{message}</p>`}</pre>
          </div>
        )}
      </section>

      {/* 문제 2: 여러 값을 가진 Context (10점) */}
      <section className="example-section problem-section">
        <div className="problem-header">
          <h2>문제 2. 여러 값을 가진 Context (10점)</h2>
          <div className="header-right">
            <span className="difficulty easy">난이도: ⭐</span>
            {isCorrect[2] && <span className="badge-correct">✓ 정답</span>}
          </div>
        </div>
        <div className="problem-description">
          <h3>📌 요구사항:</h3>
          <ul>
            <li>UserContext에서 사용자 정보 객체를 읽어와야 합니다</li>
            <li>name, age, email을 각각 화면에 표시해야 합니다</li>
          </ul>
        </div>

        {mode === "practice" && (
          <div className="code-editor-section">
            <h4>💻 코드 작성 영역:</h4>
            <p className="code-hint">객체 구조 분해를 사용할 수 있습니다:</p>
            <div className="code-template">
              <pre>{`function UserProfile() {
  // 여기에 코드를 작성하세요
  const user = /* useContext 사용 */

  return (
    <div>
      <p>이름: {user.name}</p>
      <p>나이: {user.age}</p>
      <p>이메일: {user.email}</p>
    </div>
  )
}`}</pre>
            </div>
            <textarea
              className="code-input"
              placeholder="const user = useContext(UserContext)&#10;또는 const { name, age, email } = useContext(UserContext)"
              value={userCode[2]}
              onChange={(e) => updateUserCode(2, e.target.value)}
              rows={2}
            />
            <div className="code-controls">
              <button onClick={() => checkAnswer(2)} className="check-btn">
                코드 확인
              </button>
              {feedback[2] === "correct" && (
                <span className="feedback correct">✓ 정답입니다!</span>
              )}
              {feedback[2] === "incorrect" && (
                <span className="feedback incorrect">✗ 다시 시도해보세요.</span>
              )}
            </div>
          </div>
        )}

        <UserContext.Provider value={user2}>
          <div className="problem-workspace">
            <div className="result-area">
              <Problem2Display isCorrect={mode === "view" || isCorrect[2]} />
            </div>
          </div>
        </UserContext.Provider>

        <div className="problem-controls">
          <button onClick={() => toggleHint(2)} className="hint-btn">
            {showHint[2] ? "힌트 숨기기" : "힌트 보기"}
          </button>
          <button onClick={() => toggleAnswer(2)} className="answer-btn">
            {showAnswer[2] ? "정답 숨기기" : "정답 보기"}
          </button>
        </div>

        {showHint[2] && (
          <div className="hint-box">
            <strong>💡 힌트:</strong> Context에서 객체를 전달할 때는 구조 분해를
            사용하면 편리합니다.
          </div>
        )}

        {showAnswer[2] && (
          <div className="answer-box">
            <strong>✅ 정답:</strong>
            <pre>{`const user = useContext(UserContext)
// 또는
const { name, age, email } = useContext(UserContext)`}</pre>
          </div>
        )}
      </section>

      {/* 문제 3: Context로 함수 전달 (10점) */}
      <section className="example-section problem-section">
        <div className="problem-header">
          <h2>문제 3. Context로 함수 전달 (10점)</h2>
          <div className="header-right">
            <span className="difficulty medium">난이도: ⭐⭐</span>
            {isCorrect[3] && <span className="badge-correct">✓ 정답</span>}
          </div>
        </div>
        <div className="problem-description">
          <h3>📌 요구사항:</h3>
          <ul>
            <li>Context에서 함수를 전달받아 버튼 클릭 시 실행해야 합니다</li>
            <li>클릭 횟수가 증가하는 것을 확인해야 합니다</li>
          </ul>
        </div>

        {mode === "practice" && (
          <div className="code-editor-section">
            <h4>💻 코드 작성 영역:</h4>
            <p className="code-hint">Context에서 함수를 받아와 사용하세요:</p>
            <div className="code-template">
              <pre>{`const ActionContext = createContext()

function ClickButton() {
  // 여기에 코드를 작성하세요
  const handleClick = /* useContext로 함수 가져오기 */

  return <button onClick={handleClick}>클릭!</button>
}`}</pre>
            </div>
            <textarea
              className="code-input"
              placeholder="const handleClick = useContext(ActionContext)&#10;또는 const { handleClick } = useContext(ActionContext)"
              value={userCode[3]}
              onChange={(e) => updateUserCode(3, e.target.value)}
              rows={2}
            />
            <div className="code-controls">
              <button onClick={() => checkAnswer(3)} className="check-btn">
                코드 확인
              </button>
              {feedback[3] === "correct" && (
                <span className="feedback correct">✓ 정답입니다!</span>
              )}
              {feedback[3] === "incorrect" && (
                <span className="feedback incorrect">✗ 다시 시도해보세요.</span>
              )}
            </div>
          </div>
        )}

        <div className="problem-workspace">
          <div className="result-area">
            <h3>클릭 횟수: {clickCount3}</h3>
            <Problem3Button
              handleClick={handleClick3}
              isCorrect={mode === "view" || isCorrect[3]}
            />
          </div>
        </div>

        <div className="problem-controls">
          <button onClick={() => toggleHint(3)} className="hint-btn">
            {showHint[3] ? "힌트 숨기기" : "힌트 보기"}
          </button>
          <button onClick={() => toggleAnswer(3)} className="answer-btn">
            {showAnswer[3] ? "정답 숨기기" : "정답 보기"}
          </button>
        </div>

        {showHint[3] && (
          <div className="hint-box">
            <strong>💡 힌트:</strong> Context는 값뿐만 아니라 함수도 전달할 수
            있습니다.
          </div>
        )}

        {showAnswer[3] && (
          <div className="answer-box">
            <strong>✅ 정답:</strong>
            <pre>{`const handleClick = useContext(ActionContext)
<button onClick={handleClick}>클릭!</button>`}</pre>
          </div>
        )}
      </section>

      {/* 문제 4: 중첩된 Context (10점) */}
      <section className="example-section problem-section">
        <div className="problem-header">
          <h2>문제 4. 중첩된 Context (10점)</h2>
          <div className="header-right">
            <span className="difficulty medium">난이도: ⭐⭐</span>
            {isCorrect[4] && <span className="badge-correct">✓ 정답</span>}
          </div>
        </div>
        <div className="problem-description">
          <h3>📌 요구사항:</h3>
          <ul>
            <li>
              ThemeContext와 LanguageContext 두 개의 Context를 사용해야 합니다
            </li>
            <li>각각의 값을 읽어와 화면에 표시해야 합니다</li>
          </ul>
        </div>

        {mode === "practice" && (
          <div className="code-editor-section">
            <h4>💻 코드 작성 영역:</h4>
            <p className="code-hint">
              여러 개의 useContext를 사용할 수 있습니다:
            </p>
            <div className="code-template">
              <pre>{`function Settings() {
  // 여기에 코드를 작성하세요
  const theme = /* ThemeContext에서 값 읽기 */
  const language = /* LanguageContext에서 값 읽기 */

  return (
    <div>
      <p>테마: {theme}</p>
      <p>언어: {language}</p>
    </div>
  )
}`}</pre>
            </div>
            <textarea
              className="code-input"
              placeholder="const theme = useContext(ThemeContext)&#10;const language = useContext(LanguageContext)"
              value={userCode[4]}
              onChange={(e) => updateUserCode(4, e.target.value)}
              rows={3}
            />
            <div className="code-controls">
              <button onClick={() => checkAnswer(4)} className="check-btn">
                코드 확인
              </button>
              {feedback[4] === "correct" && (
                <span className="feedback correct">✓ 정답입니다!</span>
              )}
              {feedback[4] === "incorrect" && (
                <span className="feedback incorrect">✗ 다시 시도해보세요.</span>
              )}
            </div>
          </div>
        )}

        <ThemeContext.Provider value={theme4}>
          <LanguageContext.Provider value={language4}>
            <div className="problem-workspace">
              <div className="result-area">
                <Problem4Display isCorrect={mode === "view" || isCorrect[4]} />
              </div>
            </div>
          </LanguageContext.Provider>
        </ThemeContext.Provider>

        <div className="problem-controls">
          <button onClick={() => toggleHint(4)} className="hint-btn">
            {showHint[4] ? "힌트 숨기기" : "힌트 보기"}
          </button>
          <button onClick={() => toggleAnswer(4)} className="answer-btn">
            {showAnswer[4] ? "정답 숨기기" : "정답 보기"}
          </button>
        </div>

        {showHint[4] && (
          <div className="hint-box">
            <strong>💡 힌트:</strong> 하나의 컴포넌트에서 여러 개의 useContext를
            사용할 수 있습니다.
          </div>
        )}

        {showAnswer[4] && (
          <div className="answer-box">
            <strong>✅ 정답:</strong>
            <pre>{`const theme = useContext(ThemeContext)
const language = useContext(LanguageContext)`}</pre>
          </div>
        )}
      </section>

      {/* 문제 5: Context 값 업데이트 (20점) */}
      <section className="example-section problem-section">
        <div className="problem-header">
          <h2>문제 5. Context 값 업데이트 (20점)</h2>
          <div className="header-right">
            <span className="difficulty hard">난이도: ⭐⭐⭐</span>
            {isCorrect[5] && <span className="badge-correct">✓ 정답</span>}
          </div>
        </div>
        <div className="problem-description">
          <h3>📌 요구사항:</h3>
          <ul>
            <li>CounterContext에서 counter 값과 함수들을 받아와야 합니다</li>
            <li>증가, 감소, 리셋 버튼이 정상 작동해야 합니다</li>
          </ul>
        </div>

        {mode === "practice" && (
          <div className="code-editor-section">
            <h4>💻 코드 작성 영역:</h4>
            <p className="code-hint">
              Context에서 객체를 구조 분해하여 사용하세요:
            </p>
            <div className="code-template">
              <pre>{`function Counter() {
  // 여기에 코드를 작성하세요
  const { counter, increment, decrement, reset } =
    /* useContext 사용 */

  return (
    <div>
      <h3>카운터: {counter}</h3>
      <button onClick={increment}>+1</button>
      <button onClick={decrement}>-1</button>
      <button onClick={reset}>리셋</button>
    </div>
  )
}`}</pre>
            </div>
            <textarea
              className="code-input"
              placeholder="const { counter, increment, decrement, reset } = useContext(CounterContext)"
              value={userCode[5]}
              onChange={(e) => updateUserCode(5, e.target.value)}
              rows={3}
            />
            <div className="code-controls">
              <button onClick={() => checkAnswer(5)} className="check-btn">
                코드 확인
              </button>
              {feedback[5] === "correct" && (
                <span className="feedback correct">✓ 정답입니다!</span>
              )}
              {feedback[5] === "incorrect" && (
                <span className="feedback incorrect">✗ 다시 시도해보세요.</span>
              )}
            </div>
          </div>
        )}

        <CounterContext.Provider
          value={{
            counter: counter5,
            increment: increment5,
            decrement: decrement5,
            reset: reset5,
          }}
        >
          <div className="problem-workspace">
            <div className="result-area">
              <Problem5Counter isCorrect={mode === "view" || isCorrect[5]} />
            </div>
          </div>
        </CounterContext.Provider>

        <div className="problem-controls">
          <button onClick={() => toggleHint(5)} className="hint-btn">
            {showHint[5] ? "힌트 숨기기" : "힌트 보기"}
          </button>
          <button onClick={() => toggleAnswer(5)} className="answer-btn">
            {showAnswer[5] ? "정답 숨기기" : "정답 보기"}
          </button>
        </div>

        {showHint[5] && (
          <div className="hint-box">
            <strong>💡 힌트:</strong> useState와 Context를 함께 사용하면 전역
            상태 관리를 할 수 있습니다.
          </div>
        )}

        {showAnswer[5] && (
          <div className="answer-box">
            <strong>✅ 정답:</strong>
            <pre>{`const { counter, increment, decrement, reset } =
  useContext(CounterContext)`}</pre>
          </div>
        )}
      </section>

      {/* 문제 6: 커스텀 Context Hook (15점) */}
      <section className="example-section problem-section">
        <div className="problem-header">
          <h2>문제 6. 커스텀 Context Hook (15점)</h2>
          <div className="header-right">
            <span className="difficulty hard">난이도: ⭐⭐⭐</span>
            {isCorrect[6] && <span className="badge-correct">✓ 정답</span>}
          </div>
        </div>
        <div className="problem-description">
          <h3>📌 요구사항:</h3>
          <ul>
            <li>useContext를 감싸는 커스텀 훅을 만들어야 합니다</li>
            <li>Context가 Provider 밖에서 사용되면 에러를 발생시켜야 합니다</li>
          </ul>
        </div>

        {mode === "practice" && (
          <div className="code-editor-section">
            <h4>💻 코드 작성 영역:</h4>
            <p className="code-hint">커스텀 훅과 에러 처리를 작성하세요:</p>
            <div className="code-template">
              <pre>{`const MyContext = createContext()

const useMyContext = () => {
  // 여기에 코드를 작성하세요
  const context = useContext(MyContext)

  if (!context) {
    throw new Error('useMyContext는 Provider 내부에서 사용해야 합니다')
  }

  return context
}

// 사용
function Component() {
  const value = useMyContext()
  return <div>{value}</div>
}`}</pre>
            </div>
            <textarea
              className="code-input"
              placeholder="const context = useContext(MyContext)&#10;if (!context) throw new Error('...')"
              value={userCode[6]}
              onChange={(e) => updateUserCode(6, e.target.value)}
              rows={4}
            />
            <div className="code-controls">
              <button onClick={() => checkAnswer(6)} className="check-btn">
                코드 확인
              </button>
              {feedback[6] === "correct" && (
                <span className="feedback correct">✓ 정답입니다!</span>
              )}
              {feedback[6] === "incorrect" && (
                <span className="feedback incorrect">✗ 다시 시도해보세요.</span>
              )}
            </div>
          </div>
        )}

        <div className="problem-workspace">
          <div className="result-area">
            {mode === "view" || isCorrect[6] ? (
              <div>
                <h3>✅ 커스텀 훅 패턴 이해 완료!</h3>
                <p>이 패턴은 Context를 더 안전하게 사용할 수 있게 해줍니다.</p>
                <pre className="code-example">{`// 좋은 예시
const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}`}</pre>
              </div>
            ) : (
              <p className="locked-message">
                🔒 코드를 확인하여 기능을 활성화하세요
              </p>
            )}
          </div>
        </div>

        <div className="problem-controls">
          <button onClick={() => toggleHint(6)} className="hint-btn">
            {showHint[6] ? "힌트 숨기기" : "힌트 보기"}
          </button>
          <button onClick={() => toggleAnswer(6)} className="answer-btn">
            {showAnswer[6] ? "정답 숨기기" : "정답 보기"}
          </button>
        </div>

        {showHint[6] && (
          <div className="hint-box">
            <strong>💡 힌트:</strong> 커스텀 훅에서 useContext를 사용하고,
            context가 null/undefined인지 확인하세요.
          </div>
        )}

        {showAnswer[6] && (
          <div className="answer-box">
            <strong>✅ 정답:</strong>
            <pre>{`const useMyContext = () => {
  const context = useContext(MyContext)

  if (!context) {
    throw new Error('useMyContext는 Provider 내부에서 사용해야 합니다')
  }

  return context
}`}</pre>
          </div>
        )}
      </section>

      {/* 문제 7: 전역 테마 토글 (20점) */}
      <section className="example-section problem-section">
        <div className="problem-header">
          <h2>문제 7. 전역 테마 토글 구현 (20점)</h2>
          <div className="header-right">
            <span className="difficulty hard">난이도: ⭐⭐⭐</span>
            {isCorrect[7] && <span className="badge-correct">✓ 정답</span>}
          </div>
        </div>
        <div className="problem-description">
          <h3>📌 요구사항:</h3>
          <ul>
            <li>
              GlobalThemeContext에서 theme과 toggleTheme을 받아와야 합니다
            </li>
            <li>현재 테마에 따라 배경색이 변경되어야 합니다</li>
            <li>토글 버튼으로 테마를 전환할 수 있어야 합니다</li>
          </ul>
        </div>

        {mode === "practice" && (
          <div className="code-editor-section">
            <h4>💻 코드 작성 영역:</h4>
            <p className="code-hint">
              테마 상태와 토글 함수를 Context에서 가져오세요:
            </p>
            <div className="code-template">
              <pre>{`function ThemedBox() {
  // 여기에 코드를 작성하세요
  const { theme, toggleTheme } = /* useContext 사용 */

  return (
    <div style={{
      backgroundColor: theme === 'light' ? '#fff' : '#333',
      color: theme === 'light' ? '#000' : '#fff'
    }}>
      <p>현재 테마: {theme}</p>
      <button onClick={toggleTheme}>테마 토글</button>
    </div>
  )
}`}</pre>
            </div>
            <textarea
              className="code-input"
              placeholder="const { theme, toggleTheme } = useContext(GlobalThemeContext)"
              value={userCode[7]}
              onChange={(e) => updateUserCode(7, e.target.value)}
              rows={2}
            />
            <div className="code-controls">
              <button onClick={() => checkAnswer(7)} className="check-btn">
                코드 확인
              </button>
              {feedback[7] === "correct" && (
                <span className="feedback correct">✓ 정답입니다!</span>
              )}
              {feedback[7] === "incorrect" && (
                <span className="feedback incorrect">✗ 다시 시도해보세요.</span>
              )}
            </div>
          </div>
        )}

        <GlobalThemeContext.Provider
          value={{ theme: globalTheme7, toggleTheme: toggleTheme7 }}
        >
          <div className="problem-workspace">
            <div className="result-area">
              <Problem7Theme isCorrect={mode === "view" || isCorrect[7]} />
            </div>
          </div>
        </GlobalThemeContext.Provider>

        <div className="problem-controls">
          <button onClick={() => toggleHint(7)} className="hint-btn">
            {showHint[7] ? "힌트 숨기기" : "힌트 보기"}
          </button>
          <button onClick={() => toggleAnswer(7)} className="answer-btn">
            {showAnswer[7] ? "정답 숨기기" : "정답 보기"}
          </button>
        </div>

        {showHint[7] && (
          <div className="hint-box">
            <strong>💡 힌트:</strong> Context를 사용하면 테마처럼 앱 전체에서
            사용되는 상태를 효율적으로 관리할 수 있습니다.
          </div>
        )}

        {showAnswer[7] && (
          <div className="answer-box">
            <strong>✅ 정답:</strong>
            <pre>{`const { theme, toggleTheme } = useContext(GlobalThemeContext)

<div style={{
  backgroundColor: theme === 'light' ? '#fff' : '#333',
  color: theme === 'light' ? '#000' : '#fff'
}}>
  <button onClick={toggleTheme}>테마 토글</button>
</div>`}</pre>
          </div>
        )}
      </section>

      {/* 결과 요약 */}
      <section className="example-section result-section">
        <h2>🎯 테스트 결과</h2>
        <div className="final-score">
          <h3>최종 점수: {calculateScore()}점 / 100점</h3>
          {calculateScore() === 100 && (
            <p className="congrats">
              🎉 완벽합니다! useContext를 완전히 이해하셨습니다!
            </p>
          )}
          {calculateScore() >= 70 && calculateScore() < 100 && (
            <p className="good">
              👍 잘하셨습니다! 조금만 더 연습하면 완벽해요!
            </p>
          )}
          {calculateScore() >= 40 && calculateScore() < 70 && (
            <p className="okay">
              💪 괜찮습니다! 힌트를 참고하여 더 연습해보세요!
            </p>
          )}
          {calculateScore() < 40 && (
            <p className="need-practice">
              📚 정답을 확인하고 다시 한번 연습해보세요!
            </p>
          )}
        </div>

        <div className="review-list">
          <h4>학습 체크리스트:</h4>
          <ul>
            <li className={isCorrect[1] ? "completed" : ""}>
              {isCorrect[1] ? "✅" : "⬜"} 기본 useContext 사용법
            </li>
            <li className={isCorrect[2] ? "completed" : ""}>
              {isCorrect[2] ? "✅" : "⬜"} 여러 값을 가진 Context
            </li>
            <li className={isCorrect[3] ? "completed" : ""}>
              {isCorrect[3] ? "✅" : "⬜"} Context로 함수 전달
            </li>
            <li className={isCorrect[4] ? "completed" : ""}>
              {isCorrect[4] ? "✅" : "⬜"} 중첩된 Context 사용
            </li>
            <li className={isCorrect[5] ? "completed" : ""}>
              {isCorrect[5] ? "✅" : "⬜"} Context 값 업데이트
            </li>
            <li className={isCorrect[6] ? "completed" : ""}>
              {isCorrect[6] ? "✅" : "⬜"} 커스텀 Context Hook
            </li>
            <li className={isCorrect[7] ? "completed" : ""}>
              {isCorrect[7] ? "✅" : "⬜"} 전역 테마 관리
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
}

// 문제 1 컴포넌트
function Problem1Display({ isCorrect }) {
  const message = useContext(MessageContext);

  return isCorrect ? (
    <div>
      <h3>메시지: {message}</h3>
      <p className="success-message">
        ✅ Context에서 값을 성공적으로 읽어왔습니다!
      </p>
    </div>
  ) : (
    <p className="locked-message">🔒 코드를 확인하여 기능을 활성화하세요</p>
  );
}

// 문제 2 컴포넌트
function Problem2Display({ isCorrect }) {
  const user = useContext(UserContext);

  return isCorrect ? (
    <div>
      <h3>사용자 정보</h3>
      <p>이름: {user.name}</p>
      <p>나이: {user.age}세</p>
      <p>이메일: {user.email}</p>
    </div>
  ) : (
    <p className="locked-message">🔒 코드를 확인하여 기능을 활성화하세요</p>
  );
}

// 문제 3 컴포넌트
const ActionContext = createContext();

function Problem3Button({ handleClick, isCorrect }) {
  return (
    <ActionContext.Provider value={handleClick}>
      {isCorrect ? (
        <Problem3ButtonInner />
      ) : (
        <p className="locked-message">🔒 코드를 확인하여 기능을 활성화하세요</p>
      )}
    </ActionContext.Provider>
  );
}

function Problem3ButtonInner() {
  const handleClick = useContext(ActionContext);

  return (
    <button onClick={handleClick} className="action-button">
      클릭!
    </button>
  );
}

// 문제 4 컴포넌트
function Problem4Display({ isCorrect }) {
  const theme = useContext(ThemeContext);
  const language = useContext(LanguageContext);

  return isCorrect ? (
    <div>
      <h3>설정 정보</h3>
      <p>테마: {theme}</p>
      <p>언어: {language}</p>
    </div>
  ) : (
    <p className="locked-message">🔒 코드를 확인하여 기능을 활성화하세요</p>
  );
}

// 문제 5 컴포넌트
function Problem5Counter({ isCorrect }) {
  const { counter, increment, decrement, reset } = useContext(CounterContext);

  if (!isCorrect) {
    return (
      <p className="locked-message">🔒 코드를 확인하여 기능을 활성화하세요</p>
    );
  }

  return (
    <div>
      <h3>카운터: {counter}</h3>
      <div className="button-group">
        <button onClick={increment}>+1</button>
        <button onClick={decrement}>-1</button>
        <button onClick={reset}>리셋</button>
      </div>
    </div>
  );
}

// 문제 7 컴포넌트
function Problem7Theme({ isCorrect }) {
  const { theme, toggleTheme } = useContext(GlobalThemeContext);

  if (!isCorrect) {
    return (
      <p className="locked-message">🔒 코드를 확인하여 기능을 활성화하세요</p>
    );
  }

  return (
    <div
      style={{
        backgroundColor: theme === "light" ? "#fff" : "#333",
        color: theme === "light" ? "#000" : "#fff",
        padding: "2rem",
        borderRadius: "8px",
        border: "2px solid #ccc",
      }}
    >
      <h3>현재 테마: {theme}</h3>
      <p>{theme === "light" ? "☀️ 라이트 모드" : "🌙 다크 모드"}</p>
      <button onClick={toggleTheme} className="theme-toggle-btn">
        테마 전환
      </button>
    </div>
  );
}

export default UseContextPage;
