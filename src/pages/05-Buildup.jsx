import { useState } from "react";
import "../App.css";

function Buildup() {
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
    8: false,
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
    8: "",
  });

  // 문제 1: Arrow Function
  const [arrowResult, setArrowResult] = useState("");

  // 문제 2: Destructuring
  const [destructResult, setDestructResult] = useState("");

  // 문제 3: Spread Operator
  const [spreadResult, setSpreadResult] = useState("");

  // 문제 4: Array Methods
  const [arrayResult, setArrayResult] = useState("");

  // 문제 5: Rest Parameters
  const [restResult, setRestResult] = useState("");

  // 문제 6: Template Literals
  const [templateResult, setTemplateResult] = useState("");

  // 문제 7: Ternary Operator
  const [ternaryResult, setTernaryResult] = useState("");

  // 문제 8: Higher-Order Functions
  const [hofResult, setHofResult] = useState("");

  // 정답 패턴 정의
  const correctAnswers = {
    1: [
      "(x, y) => x + y",
      "(x,y) => x + y",
      "(a, b) => a + b",
      "(a,b) => a + b",
      "const add = (x, y) => x + y",
      "const add=(x,y)=>x+y",
    ],
    2: [
      "const { name, age } = person",
      "const {name, age} = person",
      "const { name,age } = person",
    ],
    3: [
      "[...arr1, ...arr2]",
      "[ ...arr1, ...arr2 ]",
      "[...arr1,...arr2]",
      "{ ...obj1, ...obj2 }",
      "{...obj1, ...obj2}",
      "{ ...obj1,...obj2 }",
    ],
    4: [
      ".map(",
      ".filter(",
      ".reduce(",
      ".forEach(",
      "map(",
      "filter(",
      "reduce(",
      "forEach(",
    ],
    5: [
      "(...args)",
      "(...numbers)",
      "(...items)",
      "(...rest)",
      "...args",
      "...numbers",
      "...items",
      "...rest",
    ],
    6: [
      "`",
      "${",
      "template",
      "백틱",
      "`Hello, ${name}`",
      "`${",
    ],
    7: [
      "? ",
      " : ",
      "?",
      "조건 ? 참 : 거짓",
      "condition ? true : false",
    ],
    8: [
      ".map(",
      ".filter(",
      "map(",
      "filter(",
      "함수를 인자로",
      "함수를 반환",
      "function",
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
      userAnswer.toLowerCase().includes(answer.toLowerCase().replace(/\s+/g, " "))
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
      if (arrowResult) score += 12;
      if (destructResult) score += 12;
      if (spreadResult) score += 12;
      if (arrayResult) score += 13;
      if (restResult) score += 13;
      if (templateResult) score += 13;
      if (ternaryResult) score += 12;
      if (hofResult) score += 13;
    } else {
      if (isCorrect[1]) score += 12;
      if (isCorrect[2]) score += 12;
      if (isCorrect[3]) score += 12;
      if (isCorrect[4]) score += 13;
      if (isCorrect[5]) score += 13;
      if (isCorrect[6]) score += 13;
      if (isCorrect[7]) score += 12;
      if (isCorrect[8]) score += 13;
    }
    return score;
  };

  // 데모 함수들
  const runArrowFunction = () => {
    try {
      // 화살표 함수 파싱: (x, y) => x + y
      const arrowMatch = userCode[1].match(/\(([^)]*)\)\s*=>\s*(.+)/);
      if (arrowMatch) {
        const params = arrowMatch[1].split(',').map(p => p.trim());
        const body = arrowMatch[2].trim();
        const add = new Function(...params, `return ${body}`);
        const result = add(5, 3);
        setArrowResult(`결과: ${result}`);
      } else {
        setArrowResult("오류: 화살표 함수 형식이 올바르지 않습니다");
      }
    } catch (error) {
      setArrowResult("오류: 코드를 확인하세요");
    }
  };

  const runDestructuring = () => {
    try {
      const person = { name: "홍길동", age: 25, city: "서울" };
      // 구조 분해 할당 파싱: const { name, age } = person
      const destructMatch = userCode[2].match(/\{\s*([^}]+)\s*\}/);
      if (destructMatch) {
        const props = destructMatch[1].split(',').map(p => p.trim());
        const values = props.map(prop => person[prop]);
        setDestructResult(`이름: ${values[0]}, 나이: ${values[1]}`);
      } else {
        setDestructResult("오류: 구조 분해 할당 형식이 올바르지 않습니다");
      }
    } catch (error) {
      setDestructResult("오류: 코드를 확인하세요");
    }
  };

  const runSpread = () => {
    try {
      const arr1 = [1, 2, 3];
      const arr2 = [4, 5, 6];
      // 전개 연산자 파싱: [...arr1, ...arr2]
      if (userCode[3].includes('...arr1') && userCode[3].includes('...arr2')) {
        const result = [...arr1, ...arr2];
        setSpreadResult(`결과: [${result.join(", ")}]`);
      } else {
        setSpreadResult("오류: 전개 연산자 형식이 올바르지 않습니다");
      }
    } catch (error) {
      setSpreadResult("오류: 코드를 확인하세요");
    }
  };

  const runArrayMethod = () => {
    try {
      const numbers = [1, 2, 3, 4, 5];
      // 배열 메서드 파싱: .map(n => n * 2)
      const mapMatch = userCode[4].match(/\.map\s*\(\s*(\w+)\s*=>\s*(.+)\s*\)/);
      if (mapMatch) {
        const param = mapMatch[1];
        const body = mapMatch[2].trim();
        const mapFn = new Function(param, `return ${body}`);
        const result = numbers.map(mapFn);
        setArrayResult(`결과: [${result.join(", ")}]`);
      } else {
        setArrayResult("오류: map 메서드 형식이 올바르지 않습니다");
      }
    } catch (error) {
      setArrayResult("오류: 코드를 확인하세요");
    }
  };

  const runRestParams = () => {
    try {
      // 나머지 매개변수 파싱: ...args, ...numbers, etc.
      const restMatch = userCode[5].match(/\.\.\.(\w+)/);
      if (restMatch) {
        const paramName = restMatch[1];
        const sumAll = new Function(`return function(...${paramName}) { return ${paramName}.reduce((a, b) => a + b, 0); }`)();
        const result = sumAll(1, 2, 3, 4, 5);
        setRestResult(`결과: ${result}`);
      } else {
        setRestResult("오류: 나머지 매개변수 형식이 올바르지 않습니다");
      }
    } catch (error) {
      setRestResult("오류: 코드를 확인하세요");
    }
  };

  const runTemplate = () => {
    try {
      const name = "홍길동";
      const age = 25;
      // 템플릿 리터럴 파싱: `안녕하세요, ${name}입니다. ${age}살입니다.`
      if (userCode[6].includes('`') || userCode[6].includes('${')) {
        const templateFn = new Function('name', 'age', `return ${userCode[6]}`);
        const result = templateFn(name, age);
        setTemplateResult(`결과: ${result}`);
      } else {
        setTemplateResult("오류: 템플릿 리터럴 형식이 올바르지 않습니다");
      }
    } catch (error) {
      setTemplateResult("오류: 코드를 확인하세요");
    }
  };

  const runTernary = () => {
    try {
      const age = 20;
      // 삼항 연산자 파싱: age > 19 ? '성인' : '미성년자'
      if (userCode[7].includes('?') && userCode[7].includes(':')) {
        const ternaryFn = new Function('age', `return ${userCode[7]}`);
        const result = ternaryFn(age);
        setTernaryResult(`결과: ${result}`);
      } else {
        setTernaryResult("오류: 삼항 연산자 형식이 올바르지 않습니다");
      }
    } catch (error) {
      setTernaryResult("오류: 코드를 확인하세요");
    }
  };

  const runHigherOrder = () => {
    try {
      const numbers = [1, 2, 3, 4, 5];
      // 고차 함수 파싱: .filter(n => n % 2 === 0)
      const filterMatch = userCode[8].match(/\.filter\s*\(\s*(\w+)\s*=>\s*(.+)\s*\)/);
      if (filterMatch) {
        const param = filterMatch[1];
        const body = filterMatch[2].trim();
        const filterFn = new Function(param, `return ${body}`);
        const result = numbers.filter(filterFn);
        setHofResult(`결과: [${result.join(", ")}]`);
      } else {
        setHofResult("오류: filter 메서드 형식이 올바르지 않습니다");
      }
    } catch (error) {
      setHofResult("오류: 코드를 확인하세요");
    }
  };

  return (
    <div className="app">
      <h1>JavaScript 빌드업 테스트</h1>

      <div className="test-info example-section">
        <h2>📝 테스트 안내</h2>
        <p>React 개발에 필요한 JavaScript ES6+ 문법을 학습하고 테스트합니다.</p>
        <p>각 문제의 요구사항을 읽고 코드를 작성한 후 확인 버튼을 클릭하세요.</p>
        <p>정답이 맞으면 해당 기능을 테스트할 수 있습니다!</p>

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
            정답 개수: {Object.values(isCorrect).filter((v) => v).length} / 8
          </p>
        </div>
      </div>

      {/* 문제 1: Arrow Function */}
      <section className="example-section problem-section">
        <div className="problem-header">
          <h2>문제 1. 화살표 함수 (Arrow Function) (12점)</h2>
          <div className="header-right">
            <span className="difficulty easy">난이도: ⭐</span>
            {isCorrect[1] && <span className="badge-correct">✓ 정답</span>}
          </div>
        </div>
        <div className="problem-description">
          <h3>📌 요구사항:</h3>
          <ul>
            <li>두 개의 숫자를 받아서 더한 값을 반환하는 화살표 함수를 작성하세요</li>
            <li>function 키워드를 사용하지 않고 {'=>'} 를 사용해야 합니다</li>
          </ul>
        </div>

        {mode === "practice" && (
          <div className="code-editor-section">
            <h4>💻 코드 작성 영역:</h4>
            <p className="code-hint">화살표 함수를 작성하세요:</p>
            <div className="code-template">
              <pre>{`// 일반 함수
function add(x, y) {
  return x + y;
}

// 화살표 함수로 변환하기
const add = // 여기에 작성하세요`}</pre>
            </div>
            <textarea
              className="code-input"
              placeholder="예: (x, y) => x + y"
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

        <div className="problem-workspace">
          <div className="result-area">
            {mode === "view" && (
              <>
                <pre className="code-display">{`const add = (x, y) => x + y;
const result = add(5, 3); // 8`}</pre>
                <button onClick={() => setArrowResult("결과: 8")}>
                  실행하기
                </button>
              </>
            )}
            {mode === "practice" && isCorrect[1] && (
              <>
                <button onClick={runArrowFunction}>내 코드 실행</button>
              </>
            )}
            {(mode === "view" || isCorrect[1]) && (
              <p className="result-text">{arrowResult}</p>
            )}
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
            <strong>💡 힌트:</strong> (매개변수) {'=>'} 반환값 형태로 작성합니다.
            중괄호와 return을 생략할 수 있습니다.
          </div>
        )}

        {showAnswer[1] && (
          <div className="answer-box">
            <strong>✅ 정답:</strong>
            <pre>{`const add = (x, y) => x + y;

// 또는
const add = (x, y) => {
  return x + y;
};`}</pre>
          </div>
        )}
      </section>

      {/* 문제 2: Destructuring */}
      <section className="example-section problem-section">
        <div className="problem-header">
          <h2>문제 2. 구조 분해 할당 (Destructuring) (12점)</h2>
          <div className="header-right">
            <span className="difficulty easy">난이도: ⭐</span>
            {isCorrect[2] && <span className="badge-correct">✓ 정답</span>}
          </div>
        </div>
        <div className="problem-description">
          <h3>📌 요구사항:</h3>
          <ul>
            <li>person 객체에서 name과 age를 추출하는 구조 분해 할당을 작성하세요</li>
            <li>중괄호 {'{ }'} 를 사용해야 합니다</li>
          </ul>
        </div>

        {mode === "practice" && (
          <div className="code-editor-section">
            <h4>💻 코드 작성 영역:</h4>
            <p className="code-hint">구조 분해 할당을 사용하세요:</p>
            <div className="code-template">
              <pre>{`const person = { name: '홍길동', age: 25, city: '서울' };

// 일반적인 방법
const name = person.name;
const age = person.age;

// 구조 분해 할당으로 변환하기
// 여기에 작성하세요`}</pre>
            </div>
            <textarea
              className="code-input"
              placeholder="예: const { name, age } = person"
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
            {mode === "view" && (
              <>
                <pre className="code-display">{`const person = { name: '홍길동', age: 25 };
const { name, age } = person;
console.log(name, age); // 홍길동 25`}</pre>
                <button
                  onClick={() =>
                    setDestructResult("이름: 홍길동, 나이: 25")
                  }
                >
                  실행하기
                </button>
              </>
            )}
            {mode === "practice" && isCorrect[2] && (
              <>
                <button onClick={runDestructuring}>내 코드 실행</button>
              </>
            )}
            {(mode === "view" || isCorrect[2]) && (
              <p className="result-text">{destructResult}</p>
            )}
            {mode === "practice" && !isCorrect[2] && (
              <p className="locked-message">
                🔒 코드를 확인하여 기능을 활성화하세요
              </p>
            )}
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
            <strong>💡 힌트:</strong> const {'{ 속성명1, 속성명2 }'} = 객체명 형태로
            작성합니다.
          </div>
        )}

        {showAnswer[2] && (
          <div className="answer-box">
            <strong>✅ 정답:</strong>
            <pre>{`const person = { name: '홍길동', age: 25, city: '서울' };
const { name, age } = person;

// 배열 구조 분해도 가능
const arr = [1, 2, 3];
const [first, second] = arr; // 1, 2`}</pre>
          </div>
        )}
      </section>

      {/* 문제 3: Spread Operator */}
      <section className="example-section problem-section">
        <div className="problem-header">
          <h2>문제 3. 전개 연산자 (Spread Operator) (12점)</h2>
          <div className="header-right">
            <span className="difficulty medium">난이도: ⭐⭐</span>
            {isCorrect[3] && <span className="badge-correct">✓ 정답</span>}
          </div>
        </div>
        <div className="problem-description">
          <h3>📌 요구사항:</h3>
          <ul>
            <li>두 개의 배열 arr1, arr2를 합친 새로운 배열을 만드세요</li>
            <li>... (점 세 개) 연산자를 사용해야 합니다</li>
          </ul>
        </div>

        {mode === "practice" && (
          <div className="code-editor-section">
            <h4>💻 코드 작성 영역:</h4>
            <p className="code-hint">전개 연산자를 사용하세요:</p>
            <div className="code-template">
              <pre>{`const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];

// concat 사용
const result = arr1.concat(arr2);

// 전개 연산자로 변환하기
const result = // 여기에 작성하세요`}</pre>
            </div>
            <textarea
              className="code-input"
              placeholder="예: [...arr1, ...arr2]"
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
            {mode === "view" && (
              <>
                <pre className="code-display">{`const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];
const result = [...arr1, ...arr2];
// [1, 2, 3, 4, 5, 6]`}</pre>
                <button
                  onClick={() =>
                    setSpreadResult("결과: [1, 2, 3, 4, 5, 6]")
                  }
                >
                  실행하기
                </button>
              </>
            )}
            {mode === "practice" && isCorrect[3] && (
              <>
                <button onClick={runSpread}>내 코드 실행</button>
              </>
            )}
            {(mode === "view" || isCorrect[3]) && (
              <p className="result-text">{spreadResult}</p>
            )}
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
            <strong>💡 힌트:</strong> [...배열1, ...배열2] 형태로 작성합니다.
            객체도 동일하게 사용 가능합니다.
          </div>
        )}

        {showAnswer[3] && (
          <div className="answer-box">
            <strong>✅ 정답:</strong>
            <pre>{`// 배열 전개
const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];
const result = [...arr1, ...arr2]; // [1, 2, 3, 4, 5, 6]

// 객체 전개
const obj1 = { a: 1, b: 2 };
const obj2 = { c: 3, d: 4 };
const result = { ...obj1, ...obj2 }; // { a: 1, b: 2, c: 3, d: 4 }`}</pre>
          </div>
        )}
      </section>

      {/* 문제 4: Array Methods */}
      <section className="example-section problem-section">
        <div className="problem-header">
          <h2>문제 4. 배열 메서드 (Array Methods) (13점)</h2>
          <div className="header-right">
            <span className="difficulty medium">난이도: ⭐⭐</span>
            {isCorrect[4] && <span className="badge-correct">✓ 정답</span>}
          </div>
        </div>
        <div className="problem-description">
          <h3>📌 요구사항:</h3>
          <ul>
            <li>numbers 배열의 각 요소를 2배로 만든 새 배열을 만드세요</li>
            <li>.map() 메서드를 사용해야 합니다</li>
          </ul>
        </div>

        {mode === "practice" && (
          <div className="code-editor-section">
            <h4>💻 코드 작성 영역:</h4>
            <p className="code-hint">map 메서드를 사용하세요:</p>
            <div className="code-template">
              <pre>{`const numbers = [1, 2, 3, 4, 5];

// for 문 사용
const doubled = [];
for (let i = 0; i < numbers.length; i++) {
  doubled.push(numbers[i] * 2);
}

// map으로 변환하기
const doubled = numbers // 여기에 작성하세요`}</pre>
            </div>
            <textarea
              className="code-input"
              placeholder="예: .map(n => n * 2)"
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
            {mode === "view" && (
              <>
                <pre className="code-display">{`const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map(n => n * 2);
// [2, 4, 6, 8, 10]`}</pre>
                <button
                  onClick={() =>
                    setArrayResult("결과: [2, 4, 6, 8, 10]")
                  }
                >
                  실행하기
                </button>
              </>
            )}
            {mode === "practice" && isCorrect[4] && (
              <>
                <button onClick={runArrayMethod}>내 코드 실행</button>
              </>
            )}
            {(mode === "view" || isCorrect[4]) && (
              <p className="result-text">{arrayResult}</p>
            )}
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
            <strong>💡 힌트:</strong> .map(요소 {'=>'} 변환된값) 형태로 작성합니다.
            원본 배열은 변경되지 않고 새 배열을 반환합니다.
          </div>
        )}

        {showAnswer[4] && (
          <div className="answer-box">
            <strong>✅ 정답:</strong>
            <pre>{`const numbers = [1, 2, 3, 4, 5];

// map: 각 요소를 변환
const doubled = numbers.map(n => n * 2); // [2, 4, 6, 8, 10]

// filter: 조건에 맞는 요소만
const evens = numbers.filter(n => n % 2 === 0); // [2, 4]

// reduce: 하나의 값으로 축약
const sum = numbers.reduce((acc, n) => acc + n, 0); // 15`}</pre>
          </div>
        )}
      </section>

      {/* 문제 5: Rest Parameters */}
      <section className="example-section problem-section">
        <div className="problem-header">
          <h2>문제 5. 나머지 매개변수 (Rest Parameters) (13점)</h2>
          <div className="header-right">
            <span className="difficulty medium">난이도: ⭐⭐</span>
            {isCorrect[5] && <span className="badge-correct">✓ 정답</span>}
          </div>
        </div>
        <div className="problem-description">
          <h3>📌 요구사항:</h3>
          <ul>
            <li>여러 개의 숫자를 받아서 모두 더하는 함수를 작성하세요</li>
            <li>...args 형태의 나머지 매개변수를 사용해야 합니다</li>
          </ul>
        </div>

        {mode === "practice" && (
          <div className="code-editor-section">
            <h4>💻 코드 작성 영역:</h4>
            <p className="code-hint">나머지 매개변수를 사용하세요:</p>
            <div className="code-template">
              <pre>{`// 매개변수 개수가 정해진 함수
function sum3(a, b, c) {
  return a + b + c;
}

// 나머지 매개변수로 변환하기
const sumAll = ( /* 여기에 작성 */ ) => {
  return args.reduce((a, b) => a + b, 0);
};`}</pre>
            </div>
            <textarea
              className="code-input"
              placeholder="예: ...args"
              value={userCode[5]}
              onChange={(e) => updateUserCode(5, e.target.value)}
              rows={2}
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
            {mode === "view" && (
              <>
                <pre className="code-display">{`const sumAll = (...args) => {
  return args.reduce((a, b) => a + b, 0);
};

sumAll(1, 2, 3, 4, 5); // 15`}</pre>
                <button onClick={() => setRestResult("결과: 15")}>
                  실행하기
                </button>
              </>
            )}
            {mode === "practice" && isCorrect[5] && (
              <>
                <button onClick={runRestParams}>내 코드 실행</button>
              </>
            )}
            {(mode === "view" || isCorrect[5]) && (
              <p className="result-text">{restResult}</p>
            )}
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
            <strong>💡 힌트:</strong> ...변수명 형태로 매개변수를 선언하면 모든 인자를
            배열로 받습니다.
          </div>
        )}

        {showAnswer[5] && (
          <div className="answer-box">
            <strong>✅ 정답:</strong>
            <pre>{`// 나머지 매개변수
const sumAll = (...args) => {
  return args.reduce((a, b) => a + b, 0);
};

sumAll(1, 2, 3, 4, 5); // 15
sumAll(10, 20); // 30

// 일부 매개변수와 함께 사용
const introduce = (name, age, ...hobbies) => {
  console.log(\`이름: \${name}, 나이: \${age}\`);
  console.log(\`취미: \${hobbies.join(', ')}\`);
};`}</pre>
          </div>
        )}
      </section>

      {/* 문제 6: Template Literals */}
      <section className="example-section problem-section">
        <div className="problem-header">
          <h2>문제 6. 템플릿 리터럴 (Template Literals) (13점)</h2>
          <div className="header-right">
            <span className="difficulty easy">난이도: ⭐</span>
            {isCorrect[6] && <span className="badge-correct">✓ 정답</span>}
          </div>
        </div>
        <div className="problem-description">
          <h3>📌 요구사항:</h3>
          <ul>
            <li>name과 age 변수를 사용하여 문자열을 만드세요</li>
            <li>백틱(`)과 ${'{}'} 를 사용해야 합니다</li>
          </ul>
        </div>

        {mode === "practice" && (
          <div className="code-editor-section">
            <h4>💻 코드 작성 영역:</h4>
            <p className="code-hint">템플릿 리터럴을 사용하세요:</p>
            <div className="code-template">
              <pre>{`const name = '홍길동';
const age = 25;

// 문자열 연결
const message = '안녕하세요, ' + name + '입니다. ' + age + '살입니다.';

// 템플릿 리터럴로 변환하기
const message = // 여기에 작성하세요`}</pre>
            </div>
            <textarea
              className="code-input"
              placeholder={`예: \`안녕하세요, \${name}입니다. \${age}살입니다.\``}
              value={userCode[6]}
              onChange={(e) => updateUserCode(6, e.target.value)}
              rows={2}
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
            {mode === "view" && (
              <>
                <pre className="code-display">{`const name = '홍길동';
const age = 25;
const message = \`안녕하세요, \${name}입니다. \${age}살입니다.\`;`}</pre>
                <button
                  onClick={() =>
                    setTemplateResult("결과: 안녕하세요, 홍길동입니다. 25살입니다.")
                  }
                >
                  실행하기
                </button>
              </>
            )}
            {mode === "practice" && isCorrect[6] && (
              <>
                <button onClick={runTemplate}>내 코드 실행</button>
              </>
            )}
            {(mode === "view" || isCorrect[6]) && (
              <p className="result-text">{templateResult}</p>
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
            <strong>💡 힌트:</strong> 백틱(`)으로 감싸고 변수는 ${'{변수명}'} 형태로
            삽입합니다.
          </div>
        )}

        {showAnswer[6] && (
          <div className="answer-box">
            <strong>✅ 정답:</strong>
            <pre>{`const name = '홍길동';
const age = 25;

// 템플릿 리터럴
const message = \`안녕하세요, \${name}입니다. \${age}살입니다.\`;

// 여러 줄 문자열도 가능
const multiline = \`
  첫 번째 줄
  두 번째 줄
  세 번째 줄
\`;

// 표현식도 가능
const result = \`10 + 20 = \${10 + 20}\`; // "10 + 20 = 30"`}</pre>
          </div>
        )}
      </section>

      {/* 문제 7: Ternary Operator */}
      <section className="example-section problem-section">
        <div className="problem-header">
          <h2>문제 7. 삼항 연산자 (Ternary Operator) (12점)</h2>
          <div className="header-right">
            <span className="difficulty easy">난이도: ⭐</span>
            {isCorrect[7] && <span className="badge-correct">✓ 정답</span>}
          </div>
        </div>
        <div className="problem-description">
          <h3>📌 요구사항:</h3>
          <ul>
            <li>age 변수가 19보다 크면 "성인", 아니면 "미성년자"를 반환하세요</li>
            <li>? 와 : 를 사용하는 삼항 연산자를 사용해야 합니다</li>
          </ul>
        </div>

        {mode === "practice" && (
          <div className="code-editor-section">
            <h4>💻 코드 작성 영역:</h4>
            <p className="code-hint">삼항 연산자를 사용하세요:</p>
            <div className="code-template">
              <pre>{`const age = 20;

// if-else 문
let result;
if (age > 19) {
  result = '성인';
} else {
  result = '미성년자';
}

// 삼항 연산자로 변환하기
const result = // 여기에 작성하세요`}</pre>
            </div>
            <textarea
              className="code-input"
              placeholder="예: age > 19 ? '성인' : '미성년자'"
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

        <div className="problem-workspace">
          <div className="result-area">
            {mode === "view" && (
              <>
                <pre className="code-display">{`const age = 20;
const result = age > 19 ? '성인' : '미성년자';
// "성인"`}</pre>
                <button onClick={() => setTernaryResult("결과: 성인")}>
                  실행하기
                </button>
              </>
            )}
            {mode === "practice" && isCorrect[7] && (
              <>
                <button onClick={runTernary}>내 코드 실행</button>
              </>
            )}
            {(mode === "view" || isCorrect[7]) && (
              <p className="result-text">{ternaryResult}</p>
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
            <strong>💡 힌트:</strong> 조건 ? 참일때값 : 거짓일때값 형태로 작성합니다.
          </div>
        )}

        {showAnswer[7] && (
          <div className="answer-box">
            <strong>✅ 정답:</strong>
            <pre>{`const age = 20;
const result = age > 19 ? '성인' : '미성년자';

// 중첩 사용도 가능
const score = 85;
const grade = score >= 90 ? 'A' :
              score >= 80 ? 'B' :
              score >= 70 ? 'C' : 'F';

// JSX에서 많이 사용
return (
  <div>
    {isLoggedIn ? <UserProfile /> : <LoginButton />}
  </div>
);`}</pre>
          </div>
        )}
      </section>

      {/* 문제 8: Higher-Order Functions */}
      <section className="example-section problem-section">
        <div className="problem-header">
          <h2>문제 8. 고차 함수 (Higher-Order Functions) (13점)</h2>
          <div className="header-right">
            <span className="difficulty hard">난이도: ⭐⭐⭐</span>
            {isCorrect[8] && <span className="badge-correct">✓ 정답</span>}
          </div>
        </div>
        <div className="problem-description">
          <h3>📌 요구사항:</h3>
          <ul>
            <li>numbers 배열에서 짝수만 필터링하세요</li>
            <li>.filter() 메서드를 사용해야 합니다</li>
            <li>filter는 함수를 인자로 받는 고차 함수입니다</li>
          </ul>
        </div>

        {mode === "practice" && (
          <div className="code-editor-section">
            <h4>💻 코드 작성 영역:</h4>
            <p className="code-hint">filter 고차 함수를 사용하세요:</p>
            <div className="code-template">
              <pre>{`const numbers = [1, 2, 3, 4, 5];

// for 문 사용
const evens = [];
for (let i = 0; i < numbers.length; i++) {
  if (numbers[i] % 2 === 0) {
    evens.push(numbers[i]);
  }
}

// filter로 변환하기
const evens = numbers // 여기에 작성하세요`}</pre>
            </div>
            <textarea
              className="code-input"
              placeholder="예: .filter(n => n % 2 === 0)"
              value={userCode[8]}
              onChange={(e) => updateUserCode(8, e.target.value)}
              rows={2}
            />
            <div className="code-controls">
              <button onClick={() => checkAnswer(8)} className="check-btn">
                코드 확인
              </button>
              {feedback[8] === "correct" && (
                <span className="feedback correct">✓ 정답입니다!</span>
              )}
              {feedback[8] === "incorrect" && (
                <span className="feedback incorrect">✗ 다시 시도해보세요.</span>
              )}
            </div>
          </div>
        )}

        <div className="problem-workspace">
          <div className="result-area">
            {mode === "view" && (
              <>
                <pre className="code-display">{`const numbers = [1, 2, 3, 4, 5];
const evens = numbers.filter(n => n % 2 === 0);
// [2, 4]`}</pre>
                <button onClick={() => setHofResult("결과: [2, 4]")}>
                  실행하기
                </button>
              </>
            )}
            {mode === "practice" && isCorrect[8] && (
              <>
                <button onClick={runHigherOrder}>내 코드 실행</button>
              </>
            )}
            {(mode === "view" || isCorrect[8]) && (
              <p className="result-text">{hofResult}</p>
            )}
            {mode === "practice" && !isCorrect[8] && (
              <p className="locked-message">
                🔒 코드를 확인하여 기능을 활성화하세요
              </p>
            )}
          </div>
        </div>

        <div className="problem-controls">
          <button onClick={() => toggleHint(8)} className="hint-btn">
            {showHint[8] ? "힌트 숨기기" : "힌트 보기"}
          </button>
          <button onClick={() => toggleAnswer(8)} className="answer-btn">
            {showAnswer[8] ? "정답 숨기기" : "정답 보기"}
          </button>
        </div>

        {showHint[8] && (
          <div className="hint-box">
            <strong>💡 힌트:</strong> 고차 함수는 함수를 인자로 받거나 함수를
            반환하는 함수입니다. filter는 조건 함수를 받아서 참인 요소만 남깁니다.
          </div>
        )}

        {showAnswer[8] && (
          <div className="answer-box">
            <strong>✅ 정답:</strong>
            <pre>{`const numbers = [1, 2, 3, 4, 5];

// filter: 조건에 맞는 요소만
const evens = numbers.filter(n => n % 2 === 0); // [2, 4]

// map과 filter 조합
const doubled = numbers
  .filter(n => n > 2)
  .map(n => n * 2);
// [6, 8, 10]

// 함수를 반환하는 고차 함수
const multiplyBy = (factor) => {
  return (number) => number * factor;
};

const double = multiplyBy(2);
double(5); // 10`}</pre>
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
              🎉 완벽합니다! JavaScript 기초를 완전히 이해하셨습니다!
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
              {isCorrect[1] ? "✅" : "⬜"} 화살표 함수 (Arrow Function)
            </li>
            <li className={isCorrect[2] ? "completed" : ""}>
              {isCorrect[2] ? "✅" : "⬜"} 구조 분해 할당 (Destructuring)
            </li>
            <li className={isCorrect[3] ? "completed" : ""}>
              {isCorrect[3] ? "✅" : "⬜"} 전개 연산자 (Spread Operator)
            </li>
            <li className={isCorrect[4] ? "completed" : ""}>
              {isCorrect[4] ? "✅" : "⬜"} 배열 메서드 (Array Methods)
            </li>
            <li className={isCorrect[5] ? "completed" : ""}>
              {isCorrect[5] ? "✅" : "⬜"} 나머지 매개변수 (Rest Parameters)
            </li>
            <li className={isCorrect[6] ? "completed" : ""}>
              {isCorrect[6] ? "✅" : "⬜"} 템플릿 리터럴 (Template Literals)
            </li>
            <li className={isCorrect[7] ? "completed" : ""}>
              {isCorrect[7] ? "✅" : "⬜"} 삼항 연산자 (Ternary Operator)
            </li>
            <li className={isCorrect[8] ? "completed" : ""}>
              {isCorrect[8] ? "✅" : "⬜"} 고차 함수 (Higher-Order Functions)
            </li>
          </ul>
        </div>

        <div className="additional-resources">
          <h4>📖 추가 학습 자료:</h4>
          <ul>
            <li>
              <strong>ES6 Modules:</strong> import/export로 코드를 모듈화하여
              관리할 수 있습니다.
            </li>
            <li>
              <strong>Promise & async/await:</strong> 비동기 처리를 위한 필수
              문법입니다.
            </li>
            <li>
              <strong>Optional Chaining (?.):</strong> 안전하게 객체 속성에
              접근할 수 있습니다.
            </li>
            <li>
              <strong>Nullish Coalescing (??):</strong> null 또는 undefined일 때만
              기본값을 사용합니다.
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
}

export default Buildup;
