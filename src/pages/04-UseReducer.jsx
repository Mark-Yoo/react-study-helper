import { useReducer, useState } from "react";
import "../App.css";

function UseReducer() {
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

  // 문제 1: 카운터 - 기본 reducer
  const counterReducer = (state, action) => {
    switch (action.type) {
      case "INCREMENT":
        return state + 1;
      case "DECREMENT":
        return state - 1;
      case "RESET":
        return 0;
      default:
        return state;
    }
  };
  const [count, dispatch1] = useReducer(counterReducer, 0);

  // 문제 2: 입력 필드
  const inputReducer = (state, action) => {
    switch (action.type) {
      case "SET_VALUE":
        return action.payload;
      case "CLEAR":
        return "";
      default:
        return state;
    }
  };
  const [inputValue, dispatch2] = useReducer(inputReducer, "");

  // 문제 3: 체크박스 토글
  const toggleReducer = (state, action) => {
    switch (action.type) {
      case "TOGGLE":
        return !state;
      default:
        return state;
    }
  };
  const [isChecked, dispatch3] = useReducer(toggleReducer, false);

  // 문제 4: 색상 선택
  const colorReducer = (state, action) => {
    switch (action.type) {
      case "SET_COLOR":
        return action.payload;
      default:
        return state;
    }
  };
  const [selectedColor, dispatch4] = useReducer(colorReducer, "blue");

  // 문제 5: 리스트 관리
  const listReducer = (state, action) => {
    switch (action.type) {
      case "ADD_ITEM":
        return [...state, { id: Date.now(), text: action.payload }];
      case "REMOVE_ITEM":
        return state.filter((item) => item.id !== action.payload);
      case "CLEAR_ALL":
        return [];
      default:
        return state;
    }
  };
  const [items, dispatch5] = useReducer(listReducer, []);
  const [newItem, setNewItem] = useState("");

  // 문제 6: 사용자 정보 폼 (복잡한 객체 상태)
  const userReducer = (state, action) => {
    switch (action.type) {
      case "UPDATE_FIELD":
        return { ...state, [action.field]: action.value };
      case "RESET_FORM":
        return { name: "", age: "", email: "" };
      default:
        return state;
    }
  };
  const [user, dispatch6] = useReducer(userReducer, {
    name: "",
    age: "",
    email: "",
  });

  // 문제 7: 비동기 상태 관리 (로딩, 데이터, 에러)
  const asyncReducer = (state, action) => {
    switch (action.type) {
      case "FETCH_START":
        return { ...state, loading: true, error: null };
      case "FETCH_SUCCESS":
        return { loading: false, data: action.payload, error: null };
      case "FETCH_ERROR":
        return { loading: false, data: null, error: action.payload };
      default:
        return state;
    }
  };
  const [asyncState, dispatch7] = useReducer(asyncReducer, {
    loading: false,
    data: null,
    error: null,
  });

  // 정답 패턴 정의
  const correctAnswers = {
    1: [
      "dispatch({ type: 'INCREMENT' })",
      'dispatch({type:"INCREMENT"})',
      "dispatch({ type: \"INCREMENT\" })",
      'dispatch({type:"DECREMENT"})',
      "dispatch({ type: 'DECREMENT' })",
      "dispatch({ type: \"DECREMENT\" })",
    ],
    2: [
      "dispatch({ type: 'SET_VALUE', payload: e.target.value })",
      'dispatch({ type: "SET_VALUE", payload: e.target.value })',
      "dispatch({type:'SET_VALUE',payload:e.target.value})",
      'dispatch({type:"SET_VALUE",payload:e.target.value})',
    ],
    3: [
      "dispatch({ type: 'TOGGLE' })",
      'dispatch({ type: "TOGGLE" })',
      "dispatch({type:'TOGGLE'})",
      'dispatch({type:"TOGGLE"})',
    ],
    4: [
      "dispatch({ type: 'SET_COLOR', payload: 'red' })",
      'dispatch({ type: "SET_COLOR", payload: "red" })',
      "dispatch({ type: 'SET_COLOR', payload: 'green' })",
      'dispatch({ type: "SET_COLOR", payload: "green" })',
      "dispatch({ type: 'SET_COLOR', payload: 'blue' })",
      'dispatch({ type: "SET_COLOR", payload: "blue" })',
    ],
    5: [
      "dispatch({ type: 'ADD_ITEM', payload: newItem })",
      'dispatch({ type: "ADD_ITEM", payload: newItem })',
      "dispatch({ type: 'REMOVE_ITEM', payload: item.id })",
      'dispatch({ type: "REMOVE_ITEM", payload: item.id })',
      "dispatch({ type: 'REMOVE_ITEM', payload: id })",
      'dispatch({ type: "REMOVE_ITEM", payload: id })',
    ],
    6: [
      "dispatch({ type: 'UPDATE_FIELD', field: 'name', value: e.target.value })",
      'dispatch({ type: "UPDATE_FIELD", field: "name", value: e.target.value })',
      "dispatch({ type: 'UPDATE_FIELD', field: 'age', value: e.target.value })",
      'dispatch({ type: "UPDATE_FIELD", field: "age", value: e.target.value })',
      "dispatch({ type: 'UPDATE_FIELD', field: 'email', value: e.target.value })",
      'dispatch({ type: "UPDATE_FIELD", field: "email", value: e.target.value })',
    ],
    7: [
      "dispatch({ type: 'FETCH_START' })",
      'dispatch({ type: "FETCH_START" })',
      "dispatch({ type: 'FETCH_SUCCESS', payload: data })",
      'dispatch({ type: "FETCH_SUCCESS", payload: data })',
      "dispatch({ type: 'FETCH_ERROR', payload: error })",
      'dispatch({ type: "FETCH_ERROR", payload: error })',
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
    const userAnswer = userCode[problemNum].trim().replace(/\s+/g, "");
    const possibleAnswers = correctAnswers[problemNum];

    const isAnswerCorrect = possibleAnswers.some((answer) =>
      userAnswer.includes(answer.replace(/\s+/g, ""))
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
    if (mode === "view") {
      if (count !== 0) score += 15;
      if (inputValue.length > 0) score += 10;
      if (isChecked) score += 10;
      if (selectedColor !== "blue") score += 10;
      if (items.length > 0) score += 20;
      if (user.name || user.age || user.email) score += 15;
      if (asyncState.data || asyncState.error) score += 20;
    } else {
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

  // 문제 7: 가짜 API 호출 시뮬레이션
  const simulateFetch = () => {
    dispatch7({ type: "FETCH_START" });
    setTimeout(() => {
      const success = Math.random() > 0.3;
      if (success) {
        dispatch7({
          type: "FETCH_SUCCESS",
          payload: { id: 1, message: "데이터를 성공적으로 불러왔습니다!" },
        });
      } else {
        dispatch7({
          type: "FETCH_ERROR",
          payload: "네트워크 오류가 발생했습니다.",
        });
      }
    }, 1500);
  };

  return (
    <div className="app">
      <h1>useReducer 테스트</h1>

      <div className="test-info example-section">
        <h2>📝 테스트 안내</h2>
        <p>각 문제의 요구사항을 읽고 useReducer를 사용하여 기능을 구현하세요.</p>
        <p>
          useReducer는 복잡한 상태 로직을 관리할 때 useState보다 더 적합합니다.
        </p>
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

      {/* 문제 1: 기본 카운터 (15점) */}
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
            <li>
              reducer 함수와 dispatch를 사용하여 카운터를 증가/감소시켜야 합니다
            </li>
            <li>INCREMENT와 DECREMENT 액션 타입을 사용해야 합니다</li>
          </ul>
        </div>

        {mode === "practice" && (
          <div className="code-editor-section">
            <h4>💻 코드 작성 영역:</h4>
            <p className="code-hint">dispatch를 사용하여 액션을 전달하세요:</p>
            <div className="code-template">
              <pre>{`const counterReducer = (state, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1
    case 'DECREMENT':
      return state - 1
    default:
      return state
  }
}

const [count, dispatch] = useReducer(counterReducer, 0)

// 버튼 클릭 시:
onClick={() => {
  // 여기에 코드를 작성하세요

}}`}</pre>
            </div>
            <textarea
              className="code-input"
              placeholder="dispatch 함수를 사용하여 INCREMENT 또는 DECREMENT 액션을 전달하세요&#10;예: dispatch({ type: 'INCREMENT' })"
              value={userCode[1]}
              onChange={(e) => updateUserCode(1, e.target.value)}
              rows={2}
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
            <div className="button-group">
              <button
                onClick={() =>
                  (mode === "view" || isCorrect[1]) &&
                  dispatch1({ type: "INCREMENT" })
                }
                disabled={mode === "practice" && !isCorrect[1]}
              >
                증가
              </button>
              <button
                onClick={() =>
                  (mode === "view" || isCorrect[1]) &&
                  dispatch1({ type: "DECREMENT" })
                }
                disabled={mode === "practice" && !isCorrect[1]}
              >
                감소
              </button>
              <button
                onClick={() =>
                  (mode === "view" || isCorrect[1]) &&
                  dispatch1({ type: "RESET" })
                }
                disabled={mode === "practice" && !isCorrect[1]}
              >
                리셋
              </button>
            </div>
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
            <strong>💡 힌트:</strong> dispatch 함수에 액션 객체를 전달하세요.
            액션 객체는 type 속성을 가져야 합니다.
          </div>
        )}

        {showAnswer[1] && (
          <div className="answer-box">
            <strong>✅ 정답:</strong>
            <pre>{`// 증가 버튼:
onClick={() => dispatch({ type: 'INCREMENT' })}

// 감소 버튼:
onClick={() => dispatch({ type: 'DECREMENT' })}`}</pre>
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
              dispatch를 사용하여 입력값을 업데이트해야 합니다
            </li>
            <li>SET_VALUE 액션 타입과 payload를 사용해야 합니다</li>
          </ul>
        </div>

        {mode === "practice" && (
          <div className="code-editor-section">
            <h4>💻 코드 작성 영역:</h4>
            <p className="code-hint">payload를 사용하여 데이터를 전달하세요:</p>
            <div className="code-template">
              <pre>{`const inputReducer = (state, action) => {
  switch (action.type) {
    case 'SET_VALUE':
      return action.payload
    default:
      return state
  }
}

const [inputValue, dispatch] = useReducer(inputReducer, '')

// input onChange:
onChange={(e) => {
  // 여기에 코드를 작성하세요

}}`}</pre>
            </div>
            <textarea
              className="code-input"
              placeholder="payload를 사용하여 값을 전달하세요&#10;예: dispatch({ type: 'SET_VALUE', payload: e.target.value })"
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
                dispatch2({ type: "SET_VALUE", payload: e.target.value })
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
            <strong>💡 힌트:</strong> 액션 객체에 payload 속성을 추가하여 데이터를
            전달할 수 있습니다.
          </div>
        )}

        {showAnswer[2] && (
          <div className="answer-box">
            <strong>✅ 정답:</strong>
            <pre>{`onChange={(e) => dispatch({
  type: 'SET_VALUE',
  payload: e.target.value
})}`}</pre>
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
            <li>TOGGLE 액션을 dispatch하여 체크 상태를 토글해야 합니다</li>
            <li>payload가 필요 없는 간단한 액션입니다</li>
          </ul>
        </div>

        {mode === "practice" && (
          <div className="code-editor-section">
            <h4>💻 코드 작성 영역:</h4>
            <p className="code-hint">TOGGLE 액션을 dispatch하세요:</p>
            <div className="code-template">
              <pre>{`const toggleReducer = (state, action) => {
  switch (action.type) {
    case 'TOGGLE':
      return !state
    default:
      return state
  }
}

const [isChecked, dispatch] = useReducer(toggleReducer, false)

// checkbox onChange:
onChange={() => {
  // 여기에 코드를 작성하세요

}}`}</pre>
            </div>
            <textarea
              className="code-input"
              placeholder="TOGGLE 액션을 dispatch하세요&#10;예: dispatch({ type: 'TOGGLE' })"
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
                  (mode === "view" || isCorrect[3]) &&
                  dispatch3({ type: "TOGGLE" })
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
            <strong>💡 힌트:</strong> payload가 필요 없는 액션은 type만 전달하면
            됩니다.
          </div>
        )}

        {showAnswer[3] && (
          <div className="answer-box">
            <strong>✅ 정답:</strong>
            <pre>{`onChange={() => dispatch({ type: 'TOGGLE' })}`}</pre>
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
            <li>SET_COLOR 액션과 payload를 사용하여 색상을 변경해야 합니다</li>
            <li>각 버튼은 다른 색상 값을 payload로 전달해야 합니다</li>
          </ul>
        </div>

        {mode === "practice" && (
          <div className="code-editor-section">
            <h4>💻 코드 작성 영역:</h4>
            <p className="code-hint">색상 값을 payload로 전달하세요:</p>
            <div className="code-template">
              <pre>{`const colorReducer = (state, action) => {
  switch (action.type) {
    case 'SET_COLOR':
      return action.payload
    default:
      return state
  }
}

const [selectedColor, dispatch] = useReducer(colorReducer, 'blue')

// 버튼 onClick:
onClick={() => {
  // 여기에 코드를 작성하세요 (예: 빨강 버튼)

}}`}</pre>
            </div>
            <textarea
              className="code-input"
              placeholder="색상을 payload로 전달하세요&#10;예: dispatch({ type: 'SET_COLOR', payload: 'red' })"
              value={userCode[4]}
              onChange={(e) => updateUserCode(4, e.target.value)}
              rows={2}
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
                  (mode === "view" || isCorrect[4]) &&
                  dispatch4({ type: "SET_COLOR", payload: "red" })
                }
                disabled={mode === "practice" && !isCorrect[4]}
              >
                빨강
              </button>
              <button
                onClick={() =>
                  (mode === "view" || isCorrect[4]) &&
                  dispatch4({ type: "SET_COLOR", payload: "green" })
                }
                disabled={mode === "practice" && !isCorrect[4]}
              >
                초록
              </button>
              <button
                onClick={() =>
                  (mode === "view" || isCorrect[4]) &&
                  dispatch4({ type: "SET_COLOR", payload: "blue" })
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
            <strong>💡 힌트:</strong> 같은 액션 타입(SET_COLOR)을 사용하되,
            payload로 다른 색상 문자열을 전달하세요.
          </div>
        )}

        {showAnswer[4] && (
          <div className="answer-box">
            <strong>✅ 정답:</strong>
            <pre>{`// 빨강 버튼:
onClick={() => dispatch({ type: 'SET_COLOR', payload: 'red' })}

// 초록 버튼:
onClick={() => dispatch({ type: 'SET_COLOR', payload: 'green' })}

// 파랑 버튼:
onClick={() => dispatch({ type: 'SET_COLOR', payload: 'blue' })}`}</pre>
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
            <li>ADD_ITEM 액션으로 항목을 추가해야 합니다</li>
            <li>REMOVE_ITEM 액션으로 항목을 삭제해야 합니다</li>
            <li>payload를 통해 데이터를 전달해야 합니다</li>
          </ul>
        </div>

        {mode === "practice" && (
          <div className="code-editor-section">
            <h4>💻 코드 작성 영역:</h4>
            <p className="code-hint">ADD_ITEM과 REMOVE_ITEM 액션을 사용하세요:</p>
            <div className="code-template">
              <pre>{`const listReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_ITEM':
      return [...state, { id: Date.now(), text: action.payload }]
    case 'REMOVE_ITEM':
      return state.filter(item => item.id !== action.payload)
    default:
      return state
  }
}

const [items, dispatch] = useReducer(listReducer, [])

// 추가 버튼:
onClick={() => {
  // 여기에 코드를 작성하세요

}}

// 삭제 버튼:
onClick={() => {
  // 여기에 코드를 작성하세요

}}`}</pre>
            </div>
            <textarea
              className="code-input"
              placeholder="ADD_ITEM과 REMOVE_ITEM 액션을 dispatch하세요&#10;추가: dispatch({ type: 'ADD_ITEM', payload: newItem })&#10;삭제: dispatch({ type: 'REMOVE_ITEM', payload: item.id })"
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
                  (mode === "view" || isCorrect[5]) && setNewItem(e.target.value)
                }
                onKeyPress={(e) => {
                  if (
                    (mode === "view" || isCorrect[5]) &&
                    e.key === "Enter" &&
                    newItem.trim()
                  ) {
                    dispatch5({ type: "ADD_ITEM", payload: newItem });
                    setNewItem("");
                  }
                }}
                disabled={mode === "practice" && !isCorrect[5]}
              />
              <button
                onClick={() => {
                  if ((mode === "view" || isCorrect[5]) && newItem.trim()) {
                    dispatch5({ type: "ADD_ITEM", payload: newItem });
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
                      dispatch5({ type: "REMOVE_ITEM", payload: item.id })
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
              <li>
                ADD_ITEM: payload로 새 항목의 텍스트를 전달 (reducer에서 id
                자동 생성)
              </li>
              <li>REMOVE_ITEM: payload로 삭제할 항목의 id를 전달</li>
            </ul>
          </div>
        )}

        {showAnswer[5] && (
          <div className="answer-box">
            <strong>✅ 정답:</strong>
            <pre>{`// 추가:
dispatch({ type: 'ADD_ITEM', payload: newItem })

// 삭제:
dispatch({ type: 'REMOVE_ITEM', payload: item.id })`}</pre>
          </div>
        )}
      </section>

      {/* 문제 6: 사용자 정보 폼 (15점) */}
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
            <li>UPDATE_FIELD 액션으로 객체의 특정 필드만 업데이트해야 합니다</li>
            <li>field와 value를 payload로 전달해야 합니다</li>
            <li>나머지 필드는 유지되어야 합니다</li>
          </ul>
        </div>

        {mode === "practice" && (
          <div className="code-editor-section">
            <h4>💻 코드 작성 영역:</h4>
            <p className="code-hint">
              field와 value를 따로 전달하여 특정 필드만 업데이트하세요:
            </p>
            <div className="code-template">
              <pre>{`const userReducer = (state, action) => {
  switch (action.type) {
    case 'UPDATE_FIELD':
      return { ...state, [action.field]: action.value }
    default:
      return state
  }
}

const [user, dispatch] = useReducer(userReducer,
  { name: '', age: '', email: '' })

// 이름 input onChange:
onChange={(e) => {
  // 여기에 코드를 작성하세요

}}`}</pre>
            </div>
            <textarea
              className="code-input"
              placeholder="field와 value를 전달하세요&#10;예: dispatch({ type: 'UPDATE_FIELD', field: 'name', value: e.target.value })"
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
                  dispatch6({
                    type: "UPDATE_FIELD",
                    field: "name",
                    value: e.target.value,
                  })
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
                  dispatch6({
                    type: "UPDATE_FIELD",
                    field: "age",
                    value: e.target.value,
                  })
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
              <label>이메일:</label>
              <input
                type="email"
                value={user.email}
                onChange={(e) =>
                  (mode === "view" || isCorrect[6]) &&
                  dispatch6({
                    type: "UPDATE_FIELD",
                    field: "email",
                    value: e.target.value,
                  })
                }
                disabled={mode === "practice" && !isCorrect[6]}
                placeholder={
                  mode === "practice" && !isCorrect[6]
                    ? "🔒 코드를 확인하여 활성화"
                    : ""
                }
              />
            </div>
            {(user.name || user.age || user.email) && (
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
            <strong>💡 힌트:</strong> 액션 객체에 field와 value를 모두
            포함시키세요. reducer는 계산된 속성명(computed property name)을
            사용합니다.
          </div>
        )}

        {showAnswer[6] && (
          <div className="answer-box">
            <strong>✅ 정답:</strong>
            <pre>{`// 이름 변경:
dispatch({ type: 'UPDATE_FIELD', field: 'name', value: e.target.value })

// 나이 변경:
dispatch({ type: 'UPDATE_FIELD', field: 'age', value: e.target.value })

// 이메일 변경:
dispatch({ type: 'UPDATE_FIELD', field: 'email', value: e.target.value })`}</pre>
          </div>
        )}
      </section>

      {/* 문제 7: 비동기 상태 관리 (20점) */}
      <section className="example-section problem-section">
        <div className="problem-header">
          <h2>문제 7. 비동기 상태 관리 (20점)</h2>
          <div className="header-right">
            <span className="difficulty hard">난이도: ⭐⭐⭐</span>
            {isCorrect[7] && <span className="badge-correct">✓ 정답</span>}
          </div>
        </div>
        <div className="problem-description">
          <h3>📌 요구사항:</h3>
          <ul>
            <li>
              FETCH_START, FETCH_SUCCESS, FETCH_ERROR 액션을 사용하여 비동기
              상태를 관리해야 합니다
            </li>
            <li>loading, data, error 상태를 적절히 업데이트해야 합니다</li>
            <li>이는 실제 API 호출에서 자주 사용되는 패턴입니다</li>
          </ul>
        </div>

        {mode === "practice" && (
          <div className="code-editor-section">
            <h4>💻 코드 작성 영역:</h4>
            <p className="code-hint">
              세 가지 액션 타입을 이해하고 사용하세요:
            </p>
            <div className="code-template">
              <pre>{`const asyncReducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_START':
      return { ...state, loading: true, error: null }
    case 'FETCH_SUCCESS':
      return { loading: false, data: action.payload, error: null }
    case 'FETCH_ERROR':
      return { loading: false, data: null, error: action.payload }
    default:
      return state
  }
}

const [asyncState, dispatch] = useReducer(asyncReducer,
  { loading: false, data: null, error: null })

// 함수 시작 시:
// 여기에 FETCH_START 액션을 dispatch하세요

// 성공 시:
// 여기에 FETCH_SUCCESS 액션을 dispatch하세요

// 실패 시:
// 여기에 FETCH_ERROR 액션을 dispatch하세요`}</pre>
            </div>
            <textarea
              className="code-input"
              placeholder="세 가지 액션을 모두 작성하세요&#10;시작: dispatch({ type: 'FETCH_START' })&#10;성공: dispatch({ type: 'FETCH_SUCCESS', payload: data })&#10;실패: dispatch({ type: 'FETCH_ERROR', payload: error })"
              value={userCode[7]}
              onChange={(e) => updateUserCode(7, e.target.value)}
              rows={5}
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
            <button
              onClick={() => (mode === "view" || isCorrect[7]) && simulateFetch()}
              disabled={
                (mode === "practice" && !isCorrect[7]) || asyncState.loading
              }
            >
              {asyncState.loading ? "로딩 중..." : "데이터 가져오기"}
            </button>

            {asyncState.loading && (
              <div className="loading-state">
                <p>⏳ 데이터를 불러오는 중입니다...</p>
              </div>
            )}

            {asyncState.data && (
              <div className="success-state">
                <p>✅ {asyncState.data.message}</p>
                <pre>{JSON.stringify(asyncState.data, null, 2)}</pre>
              </div>
            )}

            {asyncState.error && (
              <div className="error-state">
                <p>❌ {asyncState.error}</p>
              </div>
            )}

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
            <strong>💡 힌트:</strong>
            <ul>
              <li>FETCH_START: 로딩 시작, loading을 true로</li>
              <li>FETCH_SUCCESS: 성공 시, data에 결과 저장, loading false</li>
              <li>FETCH_ERROR: 실패 시, error에 에러 저장, loading false</li>
            </ul>
          </div>
        )}

        {showAnswer[7] && (
          <div className="answer-box">
            <strong>✅ 정답:</strong>
            <pre>{`// 비동기 작업 시작:
dispatch({ type: 'FETCH_START' })

// 성공 시:
dispatch({ type: 'FETCH_SUCCESS', payload: data })

// 실패 시:
dispatch({ type: 'FETCH_ERROR', payload: error })

// 전체 예시:
const fetchData = async () => {
  dispatch({ type: 'FETCH_START' })
  try {
    const response = await fetch('/api/data')
    const data = await response.json()
    dispatch({ type: 'FETCH_SUCCESS', payload: data })
  } catch (error) {
    dispatch({ type: 'FETCH_ERROR', payload: error.message })
  }
}`}</pre>
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
              🎉 완벽합니다! useReducer를 완전히 이해하셨습니다!
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
              {isCorrect[1] ? "✅" : "⬜"} 기본 reducer와 dispatch 사용법
            </li>
            <li className={isCorrect[2] ? "completed" : ""}>
              {isCorrect[2] ? "✅" : "⬜"} payload를 통한 데이터 전달
            </li>
            <li className={isCorrect[3] ? "completed" : ""}>
              {isCorrect[3] ? "✅" : "⬜"} 간단한 액션 타입 사용
            </li>
            <li className={isCorrect[4] ? "completed" : ""}>
              {isCorrect[4] ? "✅" : "⬜"} 동적 payload 값 전달
            </li>
            <li className={isCorrect[5] ? "completed" : ""}>
              {isCorrect[5] ? "✅" : "⬜"} 배열 상태 관리 (추가/삭제)
            </li>
            <li className={isCorrect[6] ? "completed" : ""}>
              {isCorrect[6] ? "✅" : "⬜"} 복잡한 객체 상태 관리
            </li>
            <li className={isCorrect[7] ? "completed" : ""}>
              {isCorrect[7] ? "✅" : "⬜"} 비동기 상태 관리 패턴
            </li>
          </ul>
        </div>

        <div className="learning-note">
          <h4>💡 useReducer를 사용하는 이유:</h4>
          <ul>
            <li>
              <strong>복잡한 상태 로직:</strong> 여러 하위 값을 포함하는 복잡한
              상태를 관리할 때
            </li>
            <li>
              <strong>다음 상태가 이전 상태에 의존:</strong> 상태 업데이트 로직이
              복잡할 때
            </li>
            <li>
              <strong>성능 최적화:</strong> 깊은 컴포넌트 트리에서 콜백을 전달할
              때
            </li>
            <li>
              <strong>테스트 용이성:</strong> reducer는 순수 함수이므로 테스트가
              쉬움
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
}

export default UseReducer;
