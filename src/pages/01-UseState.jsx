import { useState } from "react";
import "../App.css";

function UseState() {
  // 모드 관리: 'view' (정답 보기) 또는 'practice' (연습 모드)
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

  // 문제 1: 카운터 (기본) - 정답일 때만 동작
  const [count, setCount] = useState(0);

  // 문제 2: 입력 필드 - 정답일 때만 동작
  const [inputValue, setInputValue] = useState("");

  // 문제 3: 체크박스 토글 - 정답일 때만 동작
  const [isChecked, setIsChecked] = useState(false);

  // 문제 4: 색상 선택 - 정답일 때만 동작
  const [selectedColor, setSelectedColor] = useState("blue");

  // 문제 5: 리스트 관리 - 정답일 때만 동작
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState("");

  // 문제 6: 객체 상태 관리 - 정답일 때만 동작
  const [user, setUser] = useState({ name: "", age: "" });

  // 문제 7: 복합 카운터 - 정답일 때만 동작
  const [complexCount, setComplexCount] = useState(0);

  // 정답 패턴 정의
  const correctAnswers = {
    1: [
      "setCount(count + 1)",
      "setCount(count+1)",
      "setCount((count) => count + 1)",
      "setCount(c => c + 1)",
    ],
    2: ["setInputValue(e.target.value)", "setInputValue(e.target.value)"],
    3: [
      "setIsChecked(!isChecked)",
      "setIsChecked((prev) => !prev)",
      "setIsChecked(prev => !prev)",
    ],
    4: [
      "setSelectedColor('red')",
      'setSelectedColor("red")',
      "setSelectedColor('green')",
      'setSelectedColor("green")',
      "setSelectedColor('blue')",
      'setSelectedColor("blue")',
    ],
    5: [
      "setItems([...items, { id: Date.now(), text: newItem }])",
      "setItems(items.filter(item => item.id !== id))",
      "setItems(items.filter(i => i.id !== item.id))",
    ],
    6: [
      "setUser({ ...user, name: e.target.value })",
      "setUser({ ...user, age: e.target.value })",
      "setUser({...user, name: e.target.value})",
      "setUser({...user, age: e.target.value})",
    ],
    7: [
      "setComplexCount(prev => prev + 5)",
      "setComplexCount(prev => prev + 10)",
      "setComplexCount(prev => prev - 5)",
      "setComplexCount((prev) => prev + 5)",
      "setComplexCount((prev) => prev + 10)",
      "setComplexCount((prev) => prev - 5)",
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
    // 코드 변경 시 피드백 초기화
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

    // 3초 후 피드백 메시지 숨기기
    setTimeout(() => {
      setFeedback((prev) => ({ ...prev, [problemNum]: null }));
    }, 3000);
  };

  // 점수 계산 - 정답일 때만 점수 부여
  const calculateScore = () => {
    let score = 0;
    if (mode === "view") {
      // 정답 보기 모드에서는 실제 동작 여부로 점수 계산
      if (count !== 0) score += 15;
      if (inputValue.length > 0) score += 10;
      if (isChecked) score += 10;
      if (selectedColor !== "blue") score += 10;
      if (items.length > 0) score += 20;
      if (user.name || user.age) score += 15;
      if (complexCount !== 0) score += 20;
    } else {
      // 연습 모드에서는 정답 확인 여부로 점수 계산
      if (isCorrect[1]) score += 15;
      if (isCorrect[2]) score += 10;
      if (isCorrect[3]) score += 10;
      if (isCorrect[4]) score += 10;
      if (isCorrect[5]) score += 20;
      if (isCorrect[6]) score += 15;
      if (isCorrect[7]) score += 20;
    }
    return score;
  };

  return (
    <div className="app">
      <h1>useState 테스트</h1>

      <div className="test-info example-section">
        <h2>📝 테스트 안내</h2>
        <p>각 문제의 요구사항을 읽고 useState를 사용하여 기능을 구현하세요.</p>
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

      {/* 문제 1: 카운터 (15점) */}
      <section className="example-section problem-section">
        <div className="problem-header">
          <h2>문제 1. 기본 카운터 (15점)</h2>
          <div className="header-right">
            <span className="difficulty easy">난이도: ⭐</span>
            {isCorrect[1] && <span className="badge-correct">✓ 정답</span>}
          </div>
        </div>
        <div className="problem-description">
          <h3>📌 요구사항:</h3>
          <ul>
            <li>버튼을 클릭하면 숫자가 1씩 증가해야 합니다</li>
            <li>현재 카운트 값을 화면에 표시해야 합니다</li>
          </ul>
        </div>

        {mode === "practice" && (
          <div className="code-editor-section">
            <h4>💻 코드 작성 영역:</h4>
            <p className="code-hint">아래 코드의 빈 칸을 채워보세요:</p>
            <div className="code-template">
              <pre>{`const [count, setCount] = useState(0)

// 버튼 클릭 시 실행될 함수:
const handleClick = () => {
  // 여기에 코드를 작성하세요

}`}</pre>
            </div>
            <textarea
              className="code-input"
              placeholder="setCount 함수를 사용하여 count를 1씩 증가시키는 코드를 작성하세요&#10;예: setCount(count + 1)"
              value={userCode[1]}
              onChange={(e) => updateUserCode(1, e.target.value)}
              rows={3}
            />
            <div className="code-controls">
              <button onClick={() => checkAnswer(1)} className="check-btn">
                코드 확인
              </button>
              {feedback[1] === "correct" && (
                <span className="feedback correct">
                  ✓ 정답입니다! 기능이 활성화되었습니다.
                </span>
              )}
              {feedback[1] === "incorrect" && (
                <span className="feedback incorrect">
                  ✗ 다시 시도해보세요. 힌트를 참고하세요.
                </span>
              )}
            </div>
          </div>
        )}

        <div className="problem-workspace">
          <div className="result-area">
            <h3>카운트: {count}</h3>
            <button
              onClick={() =>
                (mode === "view" || isCorrect[1]) && setCount(count + 1)
              }
              disabled={mode === "practice" && !isCorrect[1]}
              className={mode === "practice" && !isCorrect[1] ? "disabled" : ""}
            >
              증가
            </button>
            {mode === "practice" && !isCorrect[1] && (
              <p className="locked-message">
                🔒 코드를 확인하여 기능을 활성화하세요
              </p>
            )}
          </div>
        </div>

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
            <strong>💡 힌트:</strong> setCount 함수를 사용하여 현재 count에 1을
            더한 값으로 업데이트하세요.
          </div>
        )}

        {showAnswer[1] && (
          <div className="answer-box">
            <strong>✅ 정답:</strong>
            <pre>{`const [count, setCount] = useState(0)

// 버튼 클릭 시:
onClick={() => setCount(count + 1)}`}</pre>
          </div>
        )}
      </section>

      {/* 문제 2: 입력 필드 (10점) */}
      <section className="example-section problem-section">
        <div className="problem-header">
          <h2>문제 2. 입력 필드 관리 (10점)</h2>
          <div className="header-right">
            <span className="difficulty easy">난이도: ⭐</span>
            {isCorrect[2] && <span className="badge-correct">✓ 정답</span>}
          </div>
        </div>
        <div className="problem-description">
          <h3>📌 요구사항:</h3>
          <ul>
            <li>
              입력 필드에 타이핑한 내용이 실시간으로 아래에 표시되어야 합니다
            </li>
            <li>입력값은 inputValue state로 관리해야 합니다</li>
          </ul>
        </div>

        {mode === "practice" && (
          <div className="code-editor-section">
            <h4>💻 코드 작성 영역:</h4>
            <p className="code-hint">input의 onChange 핸들러를 작성하세요:</p>
            <div className="code-template">
              <pre>{`const [inputValue, setInputValue] = useState('')

<input
  type="text"
  value={inputValue}
  onChange={(e) => {
    // 여기에 코드를 작성하세요

  }}
/>`}</pre>
            </div>
            <textarea
              className="code-input"
              placeholder="e.target.value를 사용하여 inputValue를 업데이트하는 코드를 작성하세요&#10;예: setInputValue(e.target.value)"
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

        <div className="problem-workspace">
          <div className="result-area">
            <input
              type="text"
              placeholder={
                mode === "practice" && !isCorrect[2]
                  ? "🔒 코드를 확인하여 활성화"
                  : "여기에 입력하세요"
              }
              value={inputValue}
              onChange={(e) =>
                (mode === "view" || isCorrect[2]) &&
                setInputValue(e.target.value)
              }
              disabled={mode === "practice" && !isCorrect[2]}
            />
            <p>입력한 내용: {inputValue}</p>
          </div>
        </div>

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
            <strong>💡 힌트:</strong> onChange 이벤트에서 e.target.value를
            사용하여 입력값을 가져오세요.
          </div>
        )}

        {showAnswer[2] && (
          <div className="answer-box">
            <strong>✅ 정답:</strong>
            <pre>{`const [inputValue, setInputValue] = useState('')

// input의 onChange:
onChange={(e) => setInputValue(e.target.value)}`}</pre>
          </div>
        )}
      </section>

      {/* 문제 3: 체크박스 토글 (10점) */}
      <section className="example-section problem-section">
        <div className="problem-header">
          <h2>문제 3. 체크박스 토글 (10점)</h2>
          <div className="header-right">
            <span className="difficulty easy">난이도: ⭐</span>
            {isCorrect[3] && <span className="badge-correct">✓ 정답</span>}
          </div>
        </div>
        <div className="problem-description">
          <h3>📌 요구사항:</h3>
          <ul>
            <li>체크박스를 클릭하면 체크 상태가 토글되어야 합니다</li>
            <li>체크 여부에 따라 다른 메시지를 표시해야 합니다</li>
          </ul>
        </div>

        {mode === "practice" && (
          <div className="code-editor-section">
            <h4>💻 코드 작성 영역:</h4>
            <p className="code-hint">
              체크박스의 onChange 핸들러를 작성하세요:
            </p>
            <div className="code-template">
              <pre>{`const [isChecked, setIsChecked] = useState(false)

<input
  type="checkbox"
  checked={isChecked}
  onChange={() => {
    // 여기에 코드를 작성하세요

  }}
/>`}</pre>
            </div>
            <textarea
              className="code-input"
              placeholder="! 연산자를 사용하여 isChecked를 토글하는 코드를 작성하세요&#10;예: setIsChecked(!isChecked)"
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
            <label>
              <input
                type="checkbox"
                checked={isChecked}
                onChange={() =>
                  (mode === "view" || isCorrect[3]) && setIsChecked(!isChecked)
                }
                disabled={mode === "practice" && !isCorrect[3]}
              />
              동의합니다
            </label>
            <p>{isChecked ? "✅ 체크됨" : "❌ 체크 안됨"}</p>
            {mode === "practice" && !isCorrect[3] && (
              <p className="locked-message">
                🔒 코드를 확인하여 기능을 활성화하세요
              </p>
            )}
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
            <strong>💡 힌트:</strong> Boolean state는 !를 사용하여 반대값으로
            토글할 수 있습니다.
          </div>
        )}

        {showAnswer[3] && (
          <div className="answer-box">
            <strong>✅ 정답:</strong>
            <pre>{`const [isChecked, setIsChecked] = useState(false)

// 체크박스 onChange:
onChange={() => setIsChecked(!isChecked)}`}</pre>
          </div>
        )}
      </section>

      {/* 문제 4: 색상 선택 (10점) */}
      <section className="example-section problem-section">
        <div className="problem-header">
          <h2>문제 4. 색상 선택기 (10점)</h2>
          <div className="header-right">
            <span className="difficulty medium">난이도: ⭐⭐</span>
            {isCorrect[4] && <span className="badge-correct">✓ 정답</span>}
          </div>
        </div>
        <div className="problem-description">
          <h3>📌 요구사항:</h3>
          <ul>
            <li>버튼을 클릭하면 해당 색상이 선택되어야 합니다</li>
            <li>선택된 색상으로 박스의 배경색이 변경되어야 합니다</li>
          </ul>
        </div>

        {mode === "practice" && (
          <div className="code-editor-section">
            <h4>💻 코드 작성 영역:</h4>
            <p className="code-hint">각 버튼의 onClick 핸들러를 작성하세요:</p>
            <div className="code-template">
              <pre>{`const [selectedColor, setSelectedColor] = useState('blue')

<button onClick={() => { /* 빨강 버튼 */ }}>빨강</button>
<button onClick={() => { /* 초록 버튼 */ }}>초록</button>
<button onClick={() => { /* 파랑 버튼 */ }}>파랑</button>`}</pre>
            </div>
            <textarea
              className="code-input"
              placeholder="setSelectedColor를 사용하여 색상을 변경하는 코드를 작성하세요&#10;예: setSelectedColor('red')"
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

        <div className="problem-workspace">
          <div className="result-area">
            <div className="button-group">
              <button
                onClick={() =>
                  (mode === "view" || isCorrect[4]) && setSelectedColor("red")
                }
                disabled={mode === "practice" && !isCorrect[4]}
              >
                빨강
              </button>
              <button
                onClick={() =>
                  (mode === "view" || isCorrect[4]) && setSelectedColor("green")
                }
                disabled={mode === "practice" && !isCorrect[4]}
              >
                초록
              </button>
              <button
                onClick={() =>
                  (mode === "view" || isCorrect[4]) && setSelectedColor("blue")
                }
                disabled={mode === "practice" && !isCorrect[4]}
              >
                파랑
              </button>
            </div>
            <div
              className="color-box"
              style={{
                backgroundColor: selectedColor,
                width: "200px",
                height: "100px",
                borderRadius: "8px",
                marginTop: "1rem",
              }}
            ></div>
            <p>선택된 색상: {selectedColor}</p>
            {mode === "practice" && !isCorrect[4] && (
              <p className="locked-message">
                🔒 코드를 확인하여 기능을 활성화하세요
              </p>
            )}
          </div>
        </div>

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
            <strong>💡 힌트:</strong> 각 버튼의 onClick에서 setSelectedColor에
            색상 문자열을 전달하세요.
          </div>
        )}

        {showAnswer[4] && (
          <div className="answer-box">
            <strong>✅ 정답:</strong>
            <pre>{`const [selectedColor, setSelectedColor] = useState('blue')

// 버튼 onClick:
onClick={() => setSelectedColor('red')}
onClick={() => setSelectedColor('green')}
onClick={() => setSelectedColor('blue')}`}</pre>
          </div>
        )}
      </section>

      {/* 문제 5: 리스트 관리 (20점) */}
      <section className="example-section problem-section">
        <div className="problem-header">
          <h2>문제 5. 할일 리스트 (20점)</h2>
          <div className="header-right">
            <span className="difficulty hard">난이도: ⭐⭐⭐</span>
            {isCorrect[5] && <span className="badge-correct">✓ 정답</span>}
          </div>
        </div>
        <div className="problem-description">
          <h3>📌 요구사항:</h3>
          <ul>
            <li>
              입력 필드에 할일을 입력하고 추가 버튼을 클릭하면 리스트에
              추가되어야 합니다
            </li>
            <li>
              각 항목 옆의 삭제 버튼을 클릭하면 해당 항목이 제거되어야 합니다
            </li>
            <li>배열 state를 사용해야 합니다</li>
          </ul>
        </div>

        {mode === "practice" && (
          <div className="code-editor-section">
            <h4>💻 코드 작성 영역:</h4>
            <p className="code-hint">추가 및 삭제 함수를 작성하세요:</p>
            <div className="code-template">
              <pre>{`const [items, setItems] = useState([])
const [newItem, setNewItem] = useState('')

// 추가 함수
const addItem = () => {
  if (newItem.trim()) {
    // 여기에 코드를 작성하세요

  }
}

// 삭제 함수
const deleteItem = (id) => {
  // 여기에 코드를 작성하세요

}`}</pre>
            </div>
            <textarea
              className="code-input"
              placeholder="spread 연산자와 filter를 사용하세요&#10;추가: setItems([...items, { id: Date.now(), text: newItem }])&#10;삭제: setItems(items.filter(item => item.id !== id))"
              value={userCode[5]}
              onChange={(e) => updateUserCode(5, e.target.value)}
              rows={4}
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

        <div className="problem-workspace">
          <div className="result-area">
            <div className="todo-input">
              <input
                type="text"
                placeholder={
                  mode === "practice" && !isCorrect[5]
                    ? "🔒 코드를 확인하여 활성화"
                    : "할일 입력"
                }
                value={newItem}
                onChange={(e) =>
                  (mode === "view" || isCorrect[5]) &&
                  setNewItem(e.target.value)
                }
                onKeyPress={(e) => {
                  if (
                    (mode === "view" || isCorrect[5]) &&
                    e.key === "Enter" &&
                    newItem.trim()
                  ) {
                    setItems([...items, { id: Date.now(), text: newItem }]);
                    setNewItem("");
                  }
                }}
                disabled={mode === "practice" && !isCorrect[5]}
              />
              <button
                onClick={() => {
                  if ((mode === "view" || isCorrect[5]) && newItem.trim()) {
                    setItems([...items, { id: Date.now(), text: newItem }]);
                    setNewItem("");
                  }
                }}
                disabled={mode === "practice" && !isCorrect[5]}
              >
                추가
              </button>
            </div>
            <ul className="todo-list">
              {items.map((item) => (
                <li key={item.id}>
                  <span>{item.text}</span>
                  <button
                    onClick={() =>
                      (mode === "view" || isCorrect[5]) &&
                      setItems(items.filter((i) => i.id !== item.id))
                    }
                    disabled={mode === "practice" && !isCorrect[5]}
                  >
                    삭제
                  </button>
                </li>
              ))}
            </ul>
            <p>총 {items.length}개의 항목</p>
            {mode === "practice" && !isCorrect[5] && (
              <p className="locked-message">
                🔒 코드를 확인하여 기능을 활성화하세요
              </p>
            )}
          </div>
        </div>

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
            <strong>💡 힌트:</strong>
            <ul>
              <li>배열에 추가: spread 연산자 [...items, newItem] 사용</li>
              <li>배열에서 삭제: filter 메서드 사용</li>
            </ul>
          </div>
        )}

        {showAnswer[5] && (
          <div className="answer-box">
            <strong>✅ 정답:</strong>
            <pre>{`const [items, setItems] = useState([])
const [newItem, setNewItem] = useState('')

// 추가:
setItems([...items, { id: Date.now(), text: newItem }])
setNewItem('')

// 삭제:
setItems(items.filter(item => item.id !== id))`}</pre>
          </div>
        )}
      </section>

      {/* 문제 6: 객체 상태 관리 (15점) */}
      <section className="example-section problem-section">
        <div className="problem-header">
          <h2>문제 6. 사용자 정보 폼 (15점)</h2>
          <div className="header-right">
            <span className="difficulty hard">난이도: ⭐⭐⭐</span>
            {isCorrect[6] && <span className="badge-correct">✓ 정답</span>}
          </div>
        </div>
        <div className="problem-description">
          <h3>📌 요구사항:</h3>
          <ul>
            <li>이름과 나이를 입력받는 폼을 만들어야 합니다</li>
            <li>
              각 입력 필드가 변경될 때마다 user 객체의 해당 속성만
              업데이트되어야 합니다
            </li>
            <li>나머지 속성은 유지되어야 합니다 (불변성 유지)</li>
          </ul>
        </div>

        {mode === "practice" && (
          <div className="code-editor-section">
            <h4>💻 코드 작성 영역:</h4>
            <p className="code-hint">객체 spread 연산자를 사용하세요:</p>
            <div className="code-template">
              <pre>{`const [user, setUser] = useState({ name: '', age: '' })

// 이름 변경
<input
  value={user.name}
  onChange={(e) => {
    // 여기에 코드를 작성하세요

  }}
/>

// 나이 변경
<input
  value={user.age}
  onChange={(e) => {
    // 여기에 코드를 작성하세요

  }}
/>`}</pre>
            </div>
            <textarea
              className="code-input"
              placeholder="객체 spread 연산자를 사용하세요&#10;예: setUser({ ...user, name: e.target.value })"
              value={userCode[6]}
              onChange={(e) => updateUserCode(6, e.target.value)}
              rows={3}
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
            <div className="form-group">
              <label>이름:</label>
              <input
                type="text"
                value={user.name}
                onChange={(e) =>
                  (mode === "view" || isCorrect[6]) &&
                  setUser({ ...user, name: e.target.value })
                }
                disabled={mode === "practice" && !isCorrect[6]}
                placeholder={
                  mode === "practice" && !isCorrect[6]
                    ? "🔒 코드를 확인하여 활성화"
                    : ""
                }
              />
            </div>
            <div className="form-group">
              <label>나이:</label>
              <input
                type="number"
                value={user.age}
                onChange={(e) =>
                  (mode === "view" || isCorrect[6]) &&
                  setUser({ ...user, age: e.target.value })
                }
                disabled={mode === "practice" && !isCorrect[6]}
                placeholder={
                  mode === "practice" && !isCorrect[6]
                    ? "🔒 코드를 확인하여 활성화"
                    : ""
                }
              />
            </div>
            {(user.name || user.age) && (
              <div className="user-info">
                <h4>입력된 정보:</h4>
                <pre>{JSON.stringify(user, null, 2)}</pre>
              </div>
            )}
            {mode === "practice" && !isCorrect[6] && (
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
            <strong>💡 힌트:</strong> 객체 spread 연산자{" "}
            <code>{"{...user }"}</code>를 사용하여 기존 속성을 복사하고, 변경할
            속성만 덮어쓰세요.
          </div>
        )}

        {showAnswer[6] && (
          <div className="answer-box">
            <strong>✅ 정답:</strong>
            <pre>{`const [user, setUser] = useState({ name: '', age: '' })

// 이름 변경:
setUser({ ...user, name: e.target.value })

// 나이 변경:
setUser({ ...user, age: e.target.value })`}</pre>
          </div>
        )}
      </section>

      {/* 문제 7: 함수형 업데이트 (20점) */}
      <section className="example-section problem-section">
        <div className="problem-header">
          <h2>문제 7. 함수형 업데이트 (20점)</h2>
          <div className="header-right">
            <span className="difficulty hard">난이도: ⭐⭐⭐</span>
            {isCorrect[7] && <span className="badge-correct">✓ 정답</span>}
          </div>
        </div>
        <div className="problem-description">
          <h3>📌 요구사항:</h3>
          <ul>
            <li>+5 버튼을 3번 클릭하면 정확히 15가 증가해야 합니다</li>
            <li>연속으로 빠르게 클릭해도 모든 클릭이 반영되어야 합니다</li>
            <li>함수형 업데이트를 사용해야 합니다</li>
          </ul>
        </div>

        {mode === "practice" && (
          <div className="code-editor-section">
            <h4>💻 코드 작성 영역:</h4>
            <p className="code-hint">함수형 업데이트를 사용하세요:</p>
            <div className="code-template">
              <pre>{`const [complexCount, setComplexCount] = useState(0)

<button onClick={() => {
  // +5 버튼: 여기에 코드를 작성하세요

}}>+5</button>

<button onClick={() => {
  // +10 버튼: 여기에 코드를 작성하세요

}}>+10</button>

<button onClick={() => {
  // -5 버튼: 여기에 코드를 작성하세요

}}>-5</button>`}</pre>
            </div>
            <textarea
              className="code-input"
              placeholder="함수형 업데이트를 사용하세요&#10;예: setComplexCount(prev => prev + 5)"
              value={userCode[7]}
              onChange={(e) => updateUserCode(7, e.target.value)}
              rows={3}
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

        <div className="problem-workspace">
          <div className="result-area">
            <h3>카운트: {complexCount}</h3>
            <div className="button-group">
              <button
                onClick={() =>
                  (mode === "view" || isCorrect[7]) &&
                  setComplexCount((prev) => prev + 5)
                }
                disabled={mode === "practice" && !isCorrect[7]}
              >
                +5
              </button>
              <button
                onClick={() =>
                  (mode === "view" || isCorrect[7]) &&
                  setComplexCount((prev) => prev + 10)
                }
                disabled={mode === "practice" && !isCorrect[7]}
              >
                +10
              </button>
              <button
                onClick={() =>
                  (mode === "view" || isCorrect[7]) &&
                  setComplexCount((prev) => prev - 5)
                }
                disabled={mode === "practice" && !isCorrect[7]}
              >
                -5
              </button>
              <button
                onClick={() =>
                  (mode === "view" || isCorrect[7]) && setComplexCount(0)
                }
                disabled={mode === "practice" && !isCorrect[7]}
              >
                리셋
              </button>
            </div>
            {mode === "practice" && !isCorrect[7] && (
              <p className="locked-message">
                🔒 코드를 확인하여 기능을 활성화하세요
              </p>
            )}
          </div>
        </div>

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
            <strong>💡 힌트:</strong> setState에 함수를 전달하면, 이전 상태를
            인자로 받을 수 있습니다. 이를 함수형 업데이트라고 합니다.
          </div>
        )}

        {showAnswer[7] && (
          <div className="answer-box">
            <strong>✅ 정답:</strong>
            <pre>{`const [complexCount, setComplexCount] = useState(0)

// 함수형 업데이트 사용:
onClick={() => setComplexCount(prev => prev + 5)}
onClick={() => setComplexCount(prev => prev + 10)}
onClick={() => setComplexCount(prev => prev - 5)}

// 직접 값 설정도 가능:
onClick={() => setComplexCount(0)}`}</pre>
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
              🎉 완벽합니다! useState를 완전히 이해하셨습니다!
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
              {isCorrect[1] ? "✅" : "⬜"} 기본 useState 사용법
            </li>
            <li className={isCorrect[2] ? "completed" : ""}>
              {isCorrect[2] ? "✅" : "⬜"} 문자열 state 관리
            </li>
            <li className={isCorrect[3] ? "completed" : ""}>
              {isCorrect[3] ? "✅" : "⬜"} Boolean state 토글
            </li>
            <li className={isCorrect[4] ? "completed" : ""}>
              {isCorrect[4] ? "✅" : "⬜"} 여러 값 중 선택
            </li>
            <li className={isCorrect[5] ? "completed" : ""}>
              {isCorrect[5] ? "✅" : "⬜"} 배열 state 관리 (추가/삭제)
            </li>
            <li className={isCorrect[6] ? "completed" : ""}>
              {isCorrect[6] ? "✅" : "⬜"} 객체 state 불변성 유지
            </li>
            <li className={isCorrect[7] ? "completed" : ""}>
              {isCorrect[7] ? "✅" : "⬜"} 함수형 업데이트
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
}

export default UseState;
