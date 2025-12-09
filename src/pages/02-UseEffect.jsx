import { useState, useEffect } from 'react'
import '../App.css'
import {
  TestInfo,
  ProblemHeader,
  ProblemDescription,
  CodeEditor,
  ProblemControls,
  HintBox,
  AnswerBox,
  ResultSection
} from '../components'

function UseEffect() {
  // 모드 관리: 'view' (정답 보기) 또는 'practice' (연습 모드)
  const [mode, setMode] = useState('practice')

  // 힌트/정답 토글
  const [showHint, setShowHint] = useState({})
  const [showAnswer, setShowAnswer] = useState({})

  // 각 문제의 정답 여부
  const [isCorrect, setIsCorrect] = useState({
    1: false,
    2: false,
    3: false,
    4: false,
    5: false,
    6: false,
    7: false
  })

  // 정답 확인 피드백
  const [feedback, setFeedback] = useState({})

  // 연습 모드용 사용자 코드
  const [userCode, setUserCode] = useState({
    1: '',
    2: '',
    3: '',
    4: '',
    5: '',
    6: '',
    7: ''
  })

  // 문제 1: 기본 useEffect - 마운트 시 실행
  // message1은 파생 상태이므로 계산된 값으로 처리
  const message1 = (mode === 'view' || isCorrect[1])
    ? '컴포넌트가 마운트되었습니다! 🎉'
    : '아직 로드되지 않음'

  // 문제 2: 의존성 배열 - 특정 값 변경 시 실행
  const [count2, setCount2] = useState(0)
  // message2도 파생 상태이므로 계산된 값으로 처리
  const message2 = (mode === 'view' || isCorrect[2])
    ? `카운트가 변경되었습니다: ${count2}`
    : `카운트: ${count2}`

  // 문제 3: cleanup 함수 - 타이머 정리
  const [seconds3, setSeconds3] = useState(0)
  const [isRunning3, setIsRunning3] = useState(false)

  // 문제 4: 빈 의존성 배열 - 마운트 시 한 번만
  const [data4, setData4] = useState(null)
  const [loading4, setLoading4] = useState(true)

  // 문제 5: 여러 의존성 - 여러 값 감시
  const [width5, setWidth5] = useState(100)
  const [height5, setHeight5] = useState(100)
  // area5는 파생 상태이므로 계산된 값으로 처리
  const area5 = (mode === 'view' || isCorrect[5]) ? width5 * height5 : 0

  // 문제 6: 조건부 effect
  const [search6, setSearch6] = useState('')
  const [results6, setResults6] = useState([])
  const [searchCount6, setSearchCount6] = useState(0)

  // 문제 7: 인터벌 관리
  const [timer7, setTimer7] = useState(0)
  const [isActive7, setIsActive7] = useState(false)

  // 문제 3: cleanup 함수가 필요한 타이머 (useEffect 유지)

  useEffect(() => {
    if ((mode === 'view' || isCorrect[3]) && isRunning3) {
      const timer = setInterval(() => {
        setSeconds3(prev => prev + 1)
      }, 1000)
      return () => clearInterval(timer)
    }
  }, [isRunning3, mode, isCorrect[3]])

  // 문제 4: 빈 의존성 배열 - 마운트 시 한 번만 (useEffect 유지)
  useEffect(() => {
    if (mode === 'view' || isCorrect[4]) {
      // 이미 로드했다면 다시 로드하지 않음
      if (data4 === null && !loading4) {
        // 모든 setState를 비동기 콜백 안에서 호출
        const timer = setTimeout(() => {
          setLoading4(true)
          setTimeout(() => {
            setData4({ id: 1, title: '데이터 로드 완료!' })
            setLoading4(false)
          }, 1000)
        }, 0)
        return () => clearTimeout(timer)
      }
    }
  }, [mode, isCorrect[4], data4, loading4])

  // 문제 6: 조건부 effect - 검색 실행 (useEffect 유지)
  useEffect(() => {
    // 모든 setState를 비동기 콜백 안에서 호출
    const timer = setTimeout(() => {
      if ((mode === 'view' || isCorrect[6]) && search6.length >= 2) {
        // 검색 시뮬레이션
        const mockResults = [
          `${search6}에 대한 결과 1`,
          `${search6}에 대한 결과 2`,
          `${search6}에 대한 결과 3`
        ]
        setResults6(mockResults)
        setSearchCount6(prev => prev + 1)
      } else {
        setResults6([])
      }
    }, 0)

    return () => clearTimeout(timer)
  }, [search6, mode, isCorrect[6]])

  // 문제 7: 인터벌 관리 - 타이머 (useEffect 유지)
  useEffect(() => {
    if ((mode === 'view' || isCorrect[7]) && isActive7) {
      const interval = setInterval(() => {
        setTimer7(prev => prev + 1)
      }, 1000)
      return () => clearInterval(interval)
    }
  }, [isActive7, mode, isCorrect[7]])

  // 정답 패턴 정의
  const correctAnswers = {
    1: [
      'useEffect(() => {',
      'setMessage1(',
      'useEffect(()=>{',
      'useEffect( () => {'
    ],
    2: [
      '[count2]',
      '[ count2 ]',
      '[count2,',
      '}, [count2]'
    ],
    3: [
      'return () => clearInterval',
      'return ()=> clearInterval',
      'return () => { clearInterval',
      'clearInterval(timer)'
    ],
    4: [
      '[]',
      '[ ]',
      '}, [])',
      '], [])'
    ],
    5: [
      '[width5, height5]',
      '[width5,height5]',
      '[ width5, height5 ]',
      '[height5, width5]'
    ],
    6: [
      'search6.length',
      'if (search6.length',
      'if(search6.length',
      'search6.length >= 2'
    ],
    7: [
      'setInterval',
      'return () => clearInterval',
      'clearInterval(interval)',
      'return ()=> clearInterval'
    ]
  }

  // 힌트/정답 토글
  const toggleHint = (problemNum) => {
    setShowHint(prev => ({ ...prev, [problemNum]: !prev[problemNum] }))
  }

  const toggleAnswer = (problemNum) => {
    setShowAnswer(prev => ({ ...prev, [problemNum]: !prev[problemNum] }))
  }

  // 코드 업데이트
  const updateUserCode = (problemNum, code) => {
    setUserCode(prev => ({ ...prev, [problemNum]: code }))
    setFeedback(prev => ({ ...prev, [problemNum]: null }))
  }

  // 정답 확인
  const checkAnswer = (problemNum) => {
    const userAnswer = userCode[problemNum].trim().replace(/\s+/g, ' ')
    const possibleAnswers = correctAnswers[problemNum]

    const isAnswerCorrect = possibleAnswers.some(answer =>
      userAnswer.includes(answer.replace(/\s+/g, ' '))
    )

    setIsCorrect(prev => ({ ...prev, [problemNum]: isAnswerCorrect }))
    setFeedback(prev => ({
      ...prev,
      [problemNum]: isAnswerCorrect ? 'correct' : 'incorrect'
    }))

    // 3초 후 피드백 메시지 숨기기
    setTimeout(() => {
      setFeedback(prev => ({ ...prev, [problemNum]: null }))
    }, 3000)
  }

  // 점수 계산
  const calculateScore = () => {
    let score = 0
    if (isCorrect[1]) score += 15
    if (isCorrect[2]) score += 10
    if (isCorrect[3]) score += 10
    if (isCorrect[4]) score += 10
    if (isCorrect[5]) score += 20
    if (isCorrect[6]) score += 15
    if (isCorrect[7]) score += 20
    return score
  }

  return (
    <div className="app">
      <h1>useEffect 테스트</h1>

      <TestInfo
        title="useEffect"
        mode={mode}
        setMode={setMode}
        score={calculateScore()}
        correctCount={Object.values(isCorrect).filter(v => v).length}
      />

      {/* 문제 1: 기본 useEffect (15점) */}
      <section className="example-section problem-section">
        <ProblemHeader
          title="문제 1. 기본 useEffect - 마운트 시 실행 (15점)"
          difficulty="easy"
          isCorrect={isCorrect[1]}
        />
        <ProblemDescription
          requirements={[
            "컴포넌트가 마운트될 때 메시지를 업데이트해야 합니다",
            "useEffect를 사용하여 구현해야 합니다"
          ]}
        />

        {mode === 'practice' && (
          <CodeEditor
            codeTemplate={`const [message1, setMessage1] = useState('아직 로드되지 않음')

// 여기에 useEffect를 작성하세요
useEffect(() => {
  // 여기에 코드를 작성하세요

}, [/* 의존성 배열 */])`}
            hint="useEffect를 사용하여 마운트 시 실행되는 코드를 작성하세요:"
            placeholder="useEffect를 사용하여 setMessage1을 호출하세요&#10;예: useEffect(() => { setMessage1('컴포넌트가 마운트되었습니다!') }, [])"
            userCode={userCode[1]}
            onChange={(e) => updateUserCode(1, e.target.value)}
            onCheck={() => checkAnswer(1)}
            feedback={feedback[1]}
            rows={4}
          />
        )}

        <div className="problem-workspace">
          <div className="result-area">
            <h3>메시지: {message1}</h3>
            {mode === 'practice' && !isCorrect[1] && (
              <p className="locked-message">🔒 코드를 확인하여 기능을 활성화하세요</p>
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
            useEffect의 첫 번째 인자는 실행할 함수이고, 두 번째 인자는 의존성 배열입니다.
          </HintBox>
        )}

        {showAnswer[1] && (
          <AnswerBox>
            <pre>{`useEffect(() => {
  setMessage1('컴포넌트가 마운트되었습니다! 🎉')
}, [])`}</pre>
          </AnswerBox>
        )}
      </section>

      {/* 문제 2: 의존성 배열 (10점) */}
      <section className="example-section problem-section">
        <ProblemHeader
          title="문제 2. 의존성 배열 - 특정 값 변경 감지 (10점)"
          difficulty="easy"
          isCorrect={isCorrect[2]}
        />
        <ProblemDescription
          requirements={[
            "count2가 변경될 때마다 메시지를 업데이트해야 합니다",
            "의존성 배열에 count2를 포함해야 합니다"
          ]}
        />

        {mode === 'practice' && (
          <CodeEditor
            codeTemplate={`const [count2, setCount2] = useState(0)
const [message2, setMessage2] = useState('카운트: 0')

useEffect(() => {
  // 여기에 코드를 작성하세요

}, [/* 의존성 배열 */])`}
            hint="count2가 변경될 때마다 실행되는 useEffect를 작성하세요:"
            placeholder="count2가 변경될 때마다 message2를 업데이트하세요&#10;예: useEffect(() => { setMessage2(\`카운트: \${count2}\`) }, [count2])"
            userCode={userCode[2]}
            onChange={(e) => updateUserCode(2, e.target.value)}
            onCheck={() => checkAnswer(2)}
            feedback={feedback[2]}
            rows={3}
          />
        )}

        <div className="problem-workspace">
          <div className="result-area">
            <h3>{message2}</h3>
            <button
              onClick={() => setCount2(count2 + 1)}
              disabled={mode === 'practice' && !isCorrect[2]}
            >
              카운트 증가
            </button>
            <button
              onClick={() => setCount2(0)}
              disabled={mode === 'practice' && !isCorrect[2]}
            >
              리셋
            </button>
            {mode === 'practice' && !isCorrect[2] && (
              <p className="locked-message">🔒 코드를 확인하여 기능을 활성화하세요</p>
            )}
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
            의존성 배열에 감시할 변수를 넣으면, 그 변수가 변경될 때마다 effect가 실행됩니다.
          </HintBox>
        )}

        {showAnswer[2] && (
          <AnswerBox>
            <pre>{`useEffect(() => {
  setMessage2(\`카운트가 변경되었습니다: \${count2}\`)
}, [count2])`}</pre>
          </AnswerBox>
        )}
      </section>

      {/* 문제 3: cleanup 함수 (10점) */}
      <section className="example-section problem-section">
        <ProblemHeader
          title="문제 3. cleanup 함수 - 타이머 정리 (10점)"
          difficulty="medium"
          isCorrect={isCorrect[3]}
        />
        <ProblemDescription
          requirements={[
            "타이머가 실행 중일 때 1초마다 초를 증가시켜야 합니다",
            "cleanup 함수를 사용하여 타이머를 정리해야 합니다"
          ]}
        />

        {mode === 'practice' && (
          <CodeEditor
            codeTemplate={`useEffect(() => {
  if (isRunning3) {
    const timer = setInterval(() => {
      setSeconds3(prev => prev + 1)
    }, 1000)

    // cleanup 함수를 작성하세요
    return () => {
      // 여기에 코드를 작성하세요

    }
  }
}, [isRunning3])`}
            hint="setInterval과 cleanup 함수를 사용하세요:"
            placeholder="cleanup 함수에서 clearInterval을 호출하세요&#10;예: return () => clearInterval(timer)"
            userCode={userCode[3]}
            onChange={(e) => updateUserCode(3, e.target.value)}
            onCheck={() => checkAnswer(3)}
            feedback={feedback[3]}
            rows={3}
          />
        )}

        <div className="problem-workspace">
          <div className="result-area">
            <h3>경과 시간: {seconds3}초</h3>
            <button
              onClick={() => setIsRunning3(!isRunning3)}
              disabled={mode === 'practice' && !isCorrect[3]}
            >
              {isRunning3 ? '정지' : '시작'}
            </button>
            <button
              onClick={() => {
                setSeconds3(0)
                setIsRunning3(false)
              }}
              disabled={mode === 'practice' && !isCorrect[3]}
            >
              리셋
            </button>
            {mode === 'practice' && !isCorrect[3] && (
              <p className="locked-message">🔒 코드를 확인하여 기능을 활성화하세요</p>
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
            useEffect에서 return하는 함수는 cleanup 함수로, 컴포넌트가 언마운트되거나 effect가 다시 실행되기 전에 호출됩니다.
          </HintBox>
        )}

        {showAnswer[3] && (
          <AnswerBox>
            <pre>{`useEffect(() => {
  if (isRunning3) {
    const timer = setInterval(() => {
      setSeconds3(prev => prev + 1)
    }, 1000)

    return () => clearInterval(timer)
  }
}, [isRunning3])`}</pre>
          </AnswerBox>
        )}
      </section>

      {/* 문제 4: 빈 의존성 배열 (10점) */}
      <section className="example-section problem-section">
        <ProblemHeader
          title="문제 4. 빈 의존성 배열 - 마운트 시 한 번만 (10점)"
          difficulty="medium"
          isCorrect={isCorrect[4]}
        />
        <ProblemDescription
          requirements={[
            "컴포넌트 마운트 시 데이터를 한 번만 로드해야 합니다",
            "빈 의존성 배열 []을 사용해야 합니다"
          ]}
        />

        {mode === 'practice' && (
          <CodeEditor
            codeTemplate={`const [data4, setData4] = useState(null)
const [loading4, setLoading4] = useState(true)

useEffect(() => {
  // 데이터 로드 시뮬레이션
  setTimeout(() => {
    setData4({ id: 1, title: '데이터 로드 완료!' })
    setLoading4(false)
  }, 1000)
}, [/* 의존성 배열 */])`}
            hint="빈 의존성 배열을 사용하여 한 번만 실행되게 하세요:"
            placeholder="빈 의존성 배열 []을 사용하세요&#10;예: }, [])"
            userCode={userCode[4]}
            onChange={(e) => updateUserCode(4, e.target.value)}
            onCheck={() => checkAnswer(4)}
            feedback={feedback[4]}
            rows={2}
          />
        )}

        <div className="problem-workspace">
          <div className="result-area">
            {loading4 ? (
              <p>로딩 중...</p>
            ) : (
              <div>
                <h3>로드된 데이터:</h3>
                <pre>{JSON.stringify(data4, null, 2)}</pre>
              </div>
            )}
            {mode === 'practice' && !isCorrect[4] && (
              <p className="locked-message">🔒 코드를 확인하여 기능을 활성화하세요</p>
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
            빈 의존성 배열 []을 사용하면 effect가 마운트 시에만 한 번 실행됩니다.
          </HintBox>
        )}

        {showAnswer[4] && (
          <AnswerBox>
            <pre>{`useEffect(() => {
  setTimeout(() => {
    setData4({ id: 1, title: '데이터 로드 완료!' })
    setLoading4(false)
  }, 1000)
}, [])`}</pre>
          </AnswerBox>
        )}
      </section>

      {/* 문제 5: 여러 의존성 (20점) */}
      <section className="example-section problem-section">
        <ProblemHeader
          title="문제 5. 여러 의존성 - 여러 값 감시 (20점)"
          difficulty="hard"
          isCorrect={isCorrect[5]}
        />
        <ProblemDescription
          requirements={[
            "width5 또는 height5가 변경될 때마다 넓이를 계산해야 합니다",
            "의존성 배열에 두 값을 모두 포함해야 합니다"
          ]}
        />

        {mode === 'practice' && (
          <CodeEditor
            codeTemplate={`const [width5, setWidth5] = useState(100)
const [height5, setHeight5] = useState(100)
const [area5, setArea5] = useState(0)

useEffect(() => {
  setArea5(width5 * height5)
}, [/* 의존성 배열 */])`}
            hint="여러 의존성을 배열에 넣으세요:"
            placeholder="width5와 height5를 의존성 배열에 넣으세요&#10;예: }, [width5, height5])"
            userCode={userCode[5]}
            onChange={(e) => updateUserCode(5, e.target.value)}
            onCheck={() => checkAnswer(5)}
            feedback={feedback[5]}
            rows={2}
          />
        )}

        <div className="problem-workspace">
          <div className="result-area">
            <div className="form-group">
              <label>가로: {width5}px</label>
              <input
                type="range"
                min="50"
                max="300"
                value={width5}
                onChange={(e) => setWidth5(Number(e.target.value))}
                disabled={mode === 'practice' && !isCorrect[5]}
              />
            </div>
            <div className="form-group">
              <label>세로: {height5}px</label>
              <input
                type="range"
                min="50"
                max="300"
                value={height5}
                onChange={(e) => setHeight5(Number(e.target.value))}
                disabled={mode === 'practice' && !isCorrect[5]}
              />
            </div>
            <div
              className="color-box"
              style={{
                width: `${width5}px`,
                height: `${height5}px`,
                backgroundColor: '#4CAF50',
                borderRadius: '8px',
                marginTop: '1rem'
              }}
            ></div>
            <h3>넓이: {area5}px²</h3>
            {mode === 'practice' && !isCorrect[5] && (
              <p className="locked-message">🔒 코드를 확인하여 기능을 활성화하세요</p>
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
            의존성 배열에는 여러 값을 쉼표로 구분하여 넣을 수 있습니다. [value1, value2, ...]
          </HintBox>
        )}

        {showAnswer[5] && (
          <AnswerBox>
            <pre>{`useEffect(() => {
  setArea5(width5 * height5)
}, [width5, height5])`}</pre>
          </AnswerBox>
        )}
      </section>

      {/* 문제 6: 조건부 effect (15점) */}
      <section className="example-section problem-section">
        <ProblemHeader
          title="문제 6. 조건부 effect - 조건에 따라 실행 (15점)"
          difficulty="hard"
          isCorrect={isCorrect[6]}
        />
        <ProblemDescription
          requirements={[
            "검색어가 2글자 이상일 때만 검색을 실행해야 합니다",
            "useEffect 내부에서 조건을 체크해야 합니다"
          ]}
        />

        {mode === 'practice' && (
          <CodeEditor
            codeTemplate={`useEffect(() => {
  if (/* 조건 */) {
    const mockResults = [
      \`\${search6}에 대한 결과 1\`,
      \`\${search6}에 대한 결과 2\`
    ]
    setResults6(mockResults)
    setSearchCount6(prev => prev + 1)
  } else {
    setResults6([])
  }
}, [search6])`}
            hint="조건문을 사용하여 검색어 길이를 체크하세요:"
            placeholder="search6.length를 체크하세요&#10;예: if (search6.length >= 2)"
            userCode={userCode[6]}
            onChange={(e) => updateUserCode(6, e.target.value)}
            onCheck={() => checkAnswer(6)}
            feedback={feedback[6]}
            rows={2}
          />
        )}

        <div className="problem-workspace">
          <div className="result-area">
            <input
              type="text"
              placeholder="검색어 입력 (2글자 이상)"
              value={search6}
              onChange={(e) => setSearch6(e.target.value)}
              disabled={mode === 'practice' && !isCorrect[6]}
            />
            <p>검색 실행 횟수: {searchCount6}</p>
            {results6.length > 0 && (
              <ul className="todo-list">
                {results6.map((result, index) => (
                  <li key={index}>{result}</li>
                ))}
              </ul>
            )}
            {mode === 'practice' && !isCorrect[6] && (
              <p className="locked-message">🔒 코드를 확인하여 기능을 활성화하세요</p>
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
            useEffect 내부에서 조건문을 사용하여 특정 조건에서만 로직을 실행할 수 있습니다.
          </HintBox>
        )}

        {showAnswer[6] && (
          <AnswerBox>
            <pre>{`useEffect(() => {
  if (search6.length >= 2) {
    const mockResults = [
      \`\${search6}에 대한 결과 1\`,
      \`\${search6}에 대한 결과 2\`
    ]
    setResults6(mockResults)
    setSearchCount6(prev => prev + 1)
  } else {
    setResults6([])
  }
}, [search6])`}</pre>
          </AnswerBox>
        )}
      </section>

      {/* 문제 7: 인터벌 관리 (20점) */}
      <section className="example-section problem-section">
        <ProblemHeader
          title="문제 7. 인터벌 관리 - 타이머 구현 (20점)"
          difficulty="hard"
          isCorrect={isCorrect[7]}
        />
        <ProblemDescription
          requirements={[
            "타이머가 활성화되면 1초마다 숫자가 증가해야 합니다",
            "setInterval을 사용하고 cleanup 함수로 정리해야 합니다",
            "isActive7이 변경될 때마다 effect가 실행되어야 합니다"
          ]}
        />

        {mode === 'practice' && (
          <CodeEditor
            codeTemplate={`useEffect(() => {
  if (isActive7) {
    const interval = setInterval(() => {
      setTimer7(prev => prev + 1)
    }, 1000)

    return () => {
      // cleanup 코드 작성

    }
  }
}, [isActive7])`}
            hint="setInterval과 cleanup을 모두 구현하세요:"
            placeholder="setInterval을 사용하고 cleanup에서 clearInterval을 호출하세요"
            userCode={userCode[7]}
            onChange={(e) => updateUserCode(7, e.target.value)}
            onCheck={() => checkAnswer(7)}
            feedback={feedback[7]}
            rows={4}
          />
        )}

        <div className="problem-workspace">
          <div className="result-area">
            <h3>타이머: {timer7}초</h3>
            <div className="button-group">
              <button
                onClick={() => setIsActive7(!isActive7)}
                disabled={mode === 'practice' && !isCorrect[7]}
              >
                {isActive7 ? '일시정지' : '시작'}
              </button>
              <button
                onClick={() => {
                  setTimer7(0)
                  setIsActive7(false)
                }}
                disabled={mode === 'practice' && !isCorrect[7]}
              >
                리셋
              </button>
            </div>
            {mode === 'practice' && !isCorrect[7] && (
              <p className="locked-message">🔒 코드를 확인하여 기능을 활성화하세요</p>
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
            setInterval로 타이머를 만들고, cleanup 함수에서 clearInterval로 정리해야 메모리 누수를 방지할 수 있습니다.
          </HintBox>
        )}

        {showAnswer[7] && (
          <AnswerBox>
            <pre>{`useEffect(() => {
  if (isActive7) {
    const interval = setInterval(() => {
      setTimer7(prev => prev + 1)
    }, 1000)

    return () => clearInterval(interval)
  }
}, [isActive7])`}</pre>
          </AnswerBox>
        )}
      </section>

      {/* 결과 요약 */}
      <ResultSection
        score={calculateScore()}
        checklistItems={[
          { label: "기본 useEffect 사용법", isCorrect: isCorrect[1] },
          { label: "의존성 배열 사용", isCorrect: isCorrect[2] },
          { label: "cleanup 함수", isCorrect: isCorrect[3] },
          { label: "빈 의존성 배열 []", isCorrect: isCorrect[4] },
          { label: "여러 의존성 관리", isCorrect: isCorrect[5] },
          { label: "조건부 effect 실행", isCorrect: isCorrect[6] },
          { label: "인터벌 관리와 cleanup", isCorrect: isCorrect[7] }
        ]}
      />
    </div>
  )
}

export default UseEffect
