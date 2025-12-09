import { useReducer, useState } from "react";
import "../App.css";
import TestInfo from "../components/TestInfo";
import ProblemHeader from "../components/ProblemHeader";
import ProblemDescription from "../components/ProblemDescription";
import CodeEditor from "../components/CodeEditor";
import ProblemControls from "../components/ProblemControls";
import HintBox from "../components/HintBox";
import AnswerBox from "../components/AnswerBox";
import ResultSection from "../components/ResultSection";

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

  // 체크리스트 아이템 생성
  const checklistItems = [
    { label: "기본 reducer와 dispatch 사용법", isCorrect: isCorrect[1] },
    { label: "payload를 통한 데이터 전달", isCorrect: isCorrect[2] },
    { label: "간단한 액션 타입 사용", isCorrect: isCorrect[3] },
    { label: "동적 payload 값 전달", isCorrect: isCorrect[4] },
    { label: "배열 상태 관리 (추가/삭제)", isCorrect: isCorrect[5] },
    { label: "복잡한 객체 상태 관리", isCorrect: isCorrect[6] },
    { label: "비동기 상태 관리 패턴", isCorrect: isCorrect[7] },
  ];

  return (
    <div className="app">
      <h1>useReducer 테스트</h1>

      <TestInfo
        title="useReducer"
        mode={mode}
        setMode={setMode}
        score={calculateScore()}
        correctCount={Object.values(isCorrect).filter((v) => v).length}
        totalProblems={7}
      />

      {/* 문제 1: 기본 카운터 (15점) */}
      <section className="example-section problem-section">
        <ProblemHeader
          title="문제 1. 기본 카운터 (15점)"
          difficulty="easy"
          isCorrect={isCorrect[1]}
        />
        <ProblemDescription
          requirements={[
            "reducer 함수와 dispatch를 사용하여 카운터를 증가/감소시켜야 합니다",
            "INCREMENT와 DECREMENT 액션 타입을 사용해야 합니다",
          ]}
        />

        {mode === "practice" && (
          <CodeEditor
            codeTemplate={`const counterReducer = (state, action) => {
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

}}`}
            hint="dispatch를 사용하여 액션을 전달하세요:"
            placeholder="dispatch 함수를 사용하여 INCREMENT 또는 DECREMENT 액션을 전달하세요&#10;예: dispatch({ type: 'INCREMENT' })"
            userCode={userCode[1]}
            onChange={(e) => updateUserCode(1, e.target.value)}
            onCheck={() => checkAnswer(1)}
            feedback={feedback[1]}
            rows={2}
          />
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

        <ProblemControls
          showHint={showHint[1]}
          showAnswer={showAnswer[1]}
          onToggleHint={() => toggleHint(1)}
          onToggleAnswer={() => toggleAnswer(1)}
        />

        {showHint[1] && (
          <HintBox>
            dispatch 함수에 액션 객체를 전달하세요. 액션 객체는 type 속성을
            가져야 합니다.
          </HintBox>
        )}

        {showAnswer[1] && (
          <AnswerBox>
            <pre>{`// 증가 버튼:
onClick={() => dispatch({ type: 'INCREMENT' })}

// 감소 버튼:
onClick(() => dispatch({ type: 'DECREMENT' })}`}</pre>
          </AnswerBox>
        )}
      </section>

      {/* 문제 2: 입력 필드 (10점) */}
      <section className="example-section problem-section">
        <ProblemHeader
          title="문제 2. 입력 필드 관리 (10점)"
          difficulty="easy"
          isCorrect={isCorrect[2]}
        />
        <ProblemDescription
          requirements={[
            "dispatch를 사용하여 입력값을 업데이트해야 합니다",
            "SET_VALUE 액션 타입과 payload를 사용해야 합니다",
          ]}
        />

        {mode === "practice" && (
          <CodeEditor
            codeTemplate={`const inputReducer = (state, action) => {
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

}}`}
            hint="payload를 사용하여 데이터를 전달하세요:"
            placeholder="payload를 사용하여 값을 전달하세요&#10;예: dispatch({ type: 'SET_VALUE', payload: e.target.value })"
            userCode={userCode[2]}
            onChange={(e) => updateUserCode(2, e.target.value)}
            onCheck={() => checkAnswer(2)}
            feedback={feedback[2]}
            rows={2}
          />
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

        <ProblemControls
          showHint={showHint[2]}
          showAnswer={showAnswer[2]}
          onToggleHint={() => toggleHint(2)}
          onToggleAnswer={() => toggleAnswer(2)}
        />

        {showHint[2] && (
          <HintBox>
            액션 객체에 payload 속성을 추가하여 데이터를 전달할 수 있습니다.
          </HintBox>
        )}

        {showAnswer[2] && (
          <AnswerBox>
            <pre>{`onChange={(e) => dispatch({
  type: 'SET_VALUE',
  payload: e.target.value
})}`}</pre>
          </AnswerBox>
        )}
      </section>

      {/* 문제 3: 체크박스 토글 (10점) */}
      <section className="example-section problem-section">
        <ProblemHeader
          title="문제 3. 체크박스 토글 (10점)"
          difficulty="easy"
          isCorrect={isCorrect[3]}
        />
        <ProblemDescription
          requirements={[
            "TOGGLE 액션을 dispatch하여 체크 상태를 토글해야 합니다",
            "payload가 필요 없는 간단한 액션입니다",
          ]}
        />

        {mode === "practice" && (
          <CodeEditor
            codeTemplate={`const toggleReducer = (state, action) => {
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

}}`}
            hint="TOGGLE 액션을 dispatch하세요:"
            placeholder="TOGGLE 액션을 dispatch하세요&#10;예: dispatch({ type: 'TOGGLE' })"
            userCode={userCode[3]}
            onChange={(e) => updateUserCode(3, e.target.value)}
            onCheck={() => checkAnswer(3)}
            feedback={feedback[3]}
            rows={2}
          />
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

        <ProblemControls
          showHint={showHint[3]}
          showAnswer={showAnswer[3]}
          onToggleHint={() => toggleHint(3)}
          onToggleAnswer={() => toggleAnswer(3)}
        />

        {showHint[3] && (
          <HintBox>
            payload가 필요 없는 액션은 type만 전달하면 됩니다.
          </HintBox>
        )}

        {showAnswer[3] && (
          <AnswerBox>
            <pre>{`onChange={() => dispatch({ type: 'TOGGLE' })}`}</pre>
          </AnswerBox>
        )}
      </section>

      {/* 문제 4: 색상 선택 (10점) */}
      <section className="example-section problem-section">
        <ProblemHeader
          title="문제 4. 색상 선택기 (10점)"
          difficulty="medium"
          isCorrect={isCorrect[4]}
        />
        <ProblemDescription
          requirements={[
            "SET_COLOR 액션과 payload를 사용하여 색상을 변경해야 합니다",
            "각 버튼은 다른 색상 값을 payload로 전달해야 합니다",
          ]}
        />

        {mode === "practice" && (
          <CodeEditor
            codeTemplate={`const colorReducer = (state, action) => {
  switch (action.type) {
    case 'SET_COLOR':
      return action.payload
    default:
      return state
  }
}

const [selectedColor, dispatch] = useReducer(colorReducer, 'blue')

// 버튼 onClick:
onClick(() => {
  // 여기에 코드를 작성하세요 (예: 빨강 버튼)

}}`}
            hint="색상 값을 payload로 전달하세요:"
            placeholder="색상을 payload로 전달하세요&#10;예: dispatch({ type: 'SET_COLOR', payload: 'red' })"
            userCode={userCode[4]}
            onChange={(e) => updateUserCode(4, e.target.value)}
            onCheck={() => checkAnswer(4)}
            feedback={feedback[4]}
            rows={2}
          />
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

        <ProblemControls
          showHint={showHint[4]}
          showAnswer={showAnswer[4]}
          onToggleHint={() => toggleHint(4)}
          onToggleAnswer={() => toggleAnswer(4)}
        />

        {showHint[4] && (
          <HintBox>
            같은 액션 타입(SET_COLOR)을 사용하되, payload로 다른 색상 문자열을
            전달하세요.
          </HintBox>
        )}

        {showAnswer[4] && (
          <AnswerBox>
            <pre>{`// 빨강 버튼:
onClick={() => dispatch({ type: 'SET_COLOR', payload: 'red' })}

// 초록 버튼:
onClick(() => dispatch({ type: 'SET_COLOR', payload: 'green' })}

// 파랑 버튼:
onClick(() => dispatch({ type: 'SET_COLOR', payload: 'blue' })}`}</pre>
          </AnswerBox>
        )}
      </section>

      {/* 문제 5: 리스트 관리 (20점) */}
      <section className="example-section problem-section">
        <ProblemHeader
          title="문제 5. 할일 리스트 (20점)"
          difficulty="hard"
          isCorrect={isCorrect[5]}
        />
        <ProblemDescription
          requirements={[
            "ADD_ITEM 액션으로 항목을 추가해야 합니다",
            "REMOVE_ITEM 액션으로 항목을 삭제해야 합니다",
            "payload를 통해 데이터를 전달해야 합니다",
          ]}
        />

        {mode === "practice" && (
          <CodeEditor
            codeTemplate={`const listReducer = (state, action) => {
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
onClick(() => {
  // 여기에 코드를 작성하세요

}}

// 삭제 버튼:
onClick(() => {
  // 여기에 코드를 작성하세요

}}`}
            hint="ADD_ITEM과 REMOVE_ITEM 액션을 사용하세요:"
            placeholder="ADD_ITEM과 REMOVE_ITEM 액션을 dispatch하세요&#10;추가: dispatch({ type: 'ADD_ITEM', payload: newItem })&#10;삭제: dispatch({ type: 'REMOVE_ITEM', payload: item.id })"
            userCode={userCode[5]}
            onChange={(e) => updateUserCode(5, e.target.value)}
            onCheck={() => checkAnswer(5)}
            feedback={feedback[5]}
            rows={4}
          />
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

        <ProblemControls
          showHint={showHint[5]}
          showAnswer={showAnswer[5]}
          onToggleHint={() => toggleHint(5)}
          onToggleAnswer={() => toggleAnswer(5)}
        />

        {showHint[5] && (
          <HintBox>
            <ul>
              <li>
                ADD_ITEM: payload로 새 항목의 텍스트를 전달 (reducer에서 id
                자동 생성)
              </li>
              <li>REMOVE_ITEM: payload로 삭제할 항목의 id를 전달</li>
            </ul>
          </HintBox>
        )}

        {showAnswer[5] && (
          <AnswerBox>
            <pre>{`// 추가:
dispatch({ type: 'ADD_ITEM', payload: newItem })

// 삭제:
dispatch({ type: 'REMOVE_ITEM', payload: item.id })`}</pre>
          </AnswerBox>
        )}
      </section>

      {/* 문제 6: 사용자 정보 폼 (15점) */}
      <section className="example-section problem-section">
        <ProblemHeader
          title="문제 6. 사용자 정보 폼 (15점)"
          difficulty="hard"
          isCorrect={isCorrect[6]}
        />
        <ProblemDescription
          requirements={[
            "UPDATE_FIELD 액션으로 객체의 특정 필드만 업데이트해야 합니다",
            "field와 value를 payload로 전달해야 합니다",
            "나머지 필드는 유지되어야 합니다",
          ]}
        />

        {mode === "practice" && (
          <CodeEditor
            codeTemplate={`const userReducer = (state, action) => {
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

}}`}
            hint="field와 value를 따로 전달하여 특정 필드만 업데이트하세요:"
            placeholder="field와 value를 전달하세요&#10;예: dispatch({ type: 'UPDATE_FIELD', field: 'name', value: e.target.value })"
            userCode={userCode[6]}
            onChange={(e) => updateUserCode(6, e.target.value)}
            onCheck={() => checkAnswer(6)}
            feedback={feedback[6]}
            rows={3}
          />
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

        <ProblemControls
          showHint={showHint[6]}
          showAnswer={showAnswer[6]}
          onToggleHint={() => toggleHint(6)}
          onToggleAnswer={() => toggleAnswer(6)}
        />

        {showHint[6] && (
          <HintBox>
            액션 객체에 field와 value를 모두 포함시키세요. reducer는 계산된
            속성명(computed property name)을 사용합니다.
          </HintBox>
        )}

        {showAnswer[6] && (
          <AnswerBox>
            <pre>{`// 이름 변경:
dispatch({ type: 'UPDATE_FIELD', field: 'name', value: e.target.value })

// 나이 변경:
dispatch({ type: 'UPDATE_FIELD', field: 'age', value: e.target.value })

// 이메일 변경:
dispatch({ type: 'UPDATE_FIELD', field: 'email', value: e.target.value })`}</pre>
          </AnswerBox>
        )}
      </section>

      {/* 문제 7: 비동기 상태 관리 (20점) */}
      <section className="example-section problem-section">
        <ProblemHeader
          title="문제 7. 비동기 상태 관리 (20점)"
          difficulty="hard"
          isCorrect={isCorrect[7]}
        />
        <ProblemDescription
          requirements={[
            "FETCH_START, FETCH_SUCCESS, FETCH_ERROR 액션을 사용하여 비동기 상태를 관리해야 합니다",
            "loading, data, error 상태를 적절히 업데이트해야 합니다",
            "이는 실제 API 호출에서 자주 사용되는 패턴입니다",
          ]}
        />

        {mode === "practice" && (
          <CodeEditor
            codeTemplate={`const asyncReducer = (state, action) => {
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
// 여기에 FETCH_ERROR 액션을 dispatch하세요`}
            hint="세 가지 액션 타입을 이해하고 사용하세요:"
            placeholder="세 가지 액션을 모두 작성하세요&#10;시작: dispatch({ type: 'FETCH_START' })&#10;성공: dispatch({ type: 'FETCH_SUCCESS', payload: data })&#10;실패: dispatch({ type: 'FETCH_ERROR', payload: error })"
            userCode={userCode[7]}
            onChange={(e) => updateUserCode(7, e.target.value)}
            onCheck={() => checkAnswer(7)}
            feedback={feedback[7]}
            rows={5}
          />
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

        <ProblemControls
          showHint={showHint[7]}
          showAnswer={showAnswer[7]}
          onToggleHint={() => toggleHint(7)}
          onToggleAnswer={() => toggleAnswer(7)}
        />

        {showHint[7] && (
          <HintBox>
            <ul>
              <li>FETCH_START: 로딩 시작, loading을 true로</li>
              <li>FETCH_SUCCESS: 성공 시, data에 결과 저장, loading false</li>
              <li>FETCH_ERROR: 실패 시, error에 에러 저장, loading false</li>
            </ul>
          </HintBox>
        )}

        {showAnswer[7] && (
          <AnswerBox>
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
          </AnswerBox>
        )}
      </section>

      {/* 결과 요약 */}
      <ResultSection score={calculateScore()} checklistItems={checklistItems} />

      <section className="example-section result-section">
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
