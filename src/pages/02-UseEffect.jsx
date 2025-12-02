import { useState, useEffect } from 'react'
import '../App.css'

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

      <div className="test-info example-section">
        <h2>📝 테스트 안내</h2>
        <p>각 문제의 요구사항을 읽고 useEffect를 사용하여 기능을 구현하세요.</p>
        <p>
          코드를 작성한 후 "코드 확인" 버튼을 클릭하여 정답을 확인하세요.
        </p>
        <p>
          정답이 맞으면 해당 기능이 활성화되고 점수가 부여됩니다!
        </p>

        <div className="mode-toggle">
          <button
            className={mode === 'practice' ? 'active' : ''}
            onClick={() => setMode('practice')}
          >
            연습 모드
          </button>
          <button
            className={mode === 'view' ? 'active' : ''}
            onClick={() => setMode('view')}
          >
            정답 보기 모드
          </button>
        </div>

        <div className="score-display">
          <h3>현재 점수: {calculateScore()}점 / 100점</h3>
          <p className="correct-count">
            정답 개수: {Object.values(isCorrect).filter(v => v).length} / 7
          </p>
        </div>
      </div>

      {/* 문제 1: 기본 useEffect (15점) */}
      <section className="example-section problem-section">
        <div className="problem-header">
          <h2>문제 1. 기본 useEffect - 마운트 시 실행 (15점)</h2>
          <div className="header-right">
            <span className="difficulty easy">난이도: ⭐</span>
            {isCorrect[1] && <span className="badge-correct">✓ 정답</span>}
          </div>
        </div>
        <div className="problem-description">
          <h3>📌 요구사항:</h3>
          <ul>
            <li>컴포넌트가 마운트될 때 메시지를 업데이트해야 합니다</li>
            <li>useEffect를 사용하여 구현해야 합니다</li>
          </ul>
        </div>

        {mode === 'practice' && (
          <div className="code-editor-section">
            <h4>💻 코드 작성 영역:</h4>
            <p className="code-hint">useEffect를 사용하여 마운트 시 실행되는 코드를 작성하세요:</p>
            <div className="code-template">
              <pre>{`const [message1, setMessage1] = useState('아직 로드되지 않음')

// 여기에 useEffect를 작성하세요
useEffect(() => {
  // 여기에 코드를 작성하세요

}, [/* 의존성 배열 */])`}</pre>
            </div>
            <textarea
              className="code-input"
              placeholder="useEffect를 사용하여 setMessage1을 호출하세요&#10;예: useEffect(() => { setMessage1('컴포넌트가 마운트되었습니다!') }, [])"
              value={userCode[1]}
              onChange={(e) => updateUserCode(1, e.target.value)}
              rows={4}
            />
            <div className="code-controls">
              <button onClick={() => checkAnswer(1)} className="check-btn">
                코드 확인
              </button>
              {feedback[1] === 'correct' && (
                <span className="feedback correct">✓ 정답입니다! 기능이 활성화되었습니다.</span>
              )}
              {feedback[1] === 'incorrect' && (
                <span className="feedback incorrect">✗ 다시 시도해보세요. 힌트를 참고하세요.</span>
              )}
            </div>
          </div>
        )}

        <div className="problem-workspace">
          <div className="result-area">
            <h3>메시지: {message1}</h3>
            {mode === 'practice' && !isCorrect[1] && (
              <p className="locked-message">🔒 코드를 확인하여 기능을 활성화하세요</p>
            )}
          </div>
        </div>

        <div className="problem-controls">
          <button onClick={() => toggleHint(1)} className="hint-btn">
            {showHint[1] ? '힌트 숨기기' : '힌트 보기'}
          </button>
          <button onClick={() => toggleAnswer(1)} className="answer-btn">
            {showAnswer[1] ? '정답 숨기기' : '정답 보기'}
          </button>
        </div>

        {showHint[1] && (
          <div className="hint-box">
            <strong>💡 힌트:</strong> useEffect의 첫 번째 인자는 실행할 함수이고, 두 번째 인자는 의존성 배열입니다.
          </div>
        )}

        {showAnswer[1] && (
          <div className="answer-box">
            <strong>✅ 정답:</strong>
            <pre>{`useEffect(() => {
  setMessage1('컴포넌트가 마운트되었습니다! 🎉')
}, [])`}</pre>
          </div>
        )}
      </section>

      {/* 문제 2: 의존성 배열 (10점) */}
      <section className="example-section problem-section">
        <div className="problem-header">
          <h2>문제 2. 의존성 배열 - 특정 값 변경 감지 (10점)</h2>
          <div className="header-right">
            <span className="difficulty easy">난이도: ⭐</span>
            {isCorrect[2] && <span className="badge-correct">✓ 정답</span>}
          </div>
        </div>
        <div className="problem-description">
          <h3>📌 요구사항:</h3>
          <ul>
            <li>count2가 변경될 때마다 메시지를 업데이트해야 합니다</li>
            <li>의존성 배열에 count2를 포함해야 합니다</li>
          </ul>
        </div>

        {mode === 'practice' && (
          <div className="code-editor-section">
            <h4>💻 코드 작성 영역:</h4>
            <p className="code-hint">count2가 변경될 때마다 실행되는 useEffect를 작성하세요:</p>
            <div className="code-template">
              <pre>{`const [count2, setCount2] = useState(0)
const [message2, setMessage2] = useState('카운트: 0')

useEffect(() => {
  // 여기에 코드를 작성하세요

}, [/* 의존성 배열 */])`}</pre>
            </div>
            <textarea
              className="code-input"
              placeholder="count2가 변경될 때마다 message2를 업데이트하세요&#10;예: useEffect(() => { setMessage2(\`카운트: \${count2}\`) }, [count2])"
              value={userCode[2]}
              onChange={(e) => updateUserCode(2, e.target.value)}
              rows={3}
            />
            <div className="code-controls">
              <button onClick={() => checkAnswer(2)} className="check-btn">
                코드 확인
              </button>
              {feedback[2] === 'correct' && (
                <span className="feedback correct">✓ 정답입니다!</span>
              )}
              {feedback[2] === 'incorrect' && (
                <span className="feedback incorrect">✗ 다시 시도해보세요.</span>
              )}
            </div>
          </div>
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

        <div className="problem-controls">
          <button onClick={() => toggleHint(2)} className="hint-btn">
            {showHint[2] ? '힌트 숨기기' : '힌트 보기'}
          </button>
          <button onClick={() => toggleAnswer(2)} className="answer-btn">
            {showAnswer[2] ? '정답 숨기기' : '정답 보기'}
          </button>
        </div>

        {showHint[2] && (
          <div className="hint-box">
            <strong>💡 힌트:</strong> 의존성 배열에 감시할 변수를 넣으면, 그 변수가 변경될 때마다 effect가 실행됩니다.
          </div>
        )}

        {showAnswer[2] && (
          <div className="answer-box">
            <strong>✅ 정답:</strong>
            <pre>{`useEffect(() => {
  setMessage2(\`카운트가 변경되었습니다: \${count2}\`)
}, [count2])`}</pre>
          </div>
        )}
      </section>

      {/* 문제 3: cleanup 함수 (10점) */}
      <section className="example-section problem-section">
        <div className="problem-header">
          <h2>문제 3. cleanup 함수 - 타이머 정리 (10점)</h2>
          <div className="header-right">
            <span className="difficulty medium">난이도: ⭐⭐</span>
            {isCorrect[3] && <span className="badge-correct">✓ 정답</span>}
          </div>
        </div>
        <div className="problem-description">
          <h3>📌 요구사항:</h3>
          <ul>
            <li>타이머가 실행 중일 때 1초마다 초를 증가시켜야 합니다</li>
            <li>cleanup 함수를 사용하여 타이머를 정리해야 합니다</li>
          </ul>
        </div>

        {mode === 'practice' && (
          <div className="code-editor-section">
            <h4>💻 코드 작성 영역:</h4>
            <p className="code-hint">setInterval과 cleanup 함수를 사용하세요:</p>
            <div className="code-template">
              <pre>{`useEffect(() => {
  if (isRunning3) {
    const timer = setInterval(() => {
      setSeconds3(prev => prev + 1)
    }, 1000)

    // cleanup 함수를 작성하세요
    return () => {
      // 여기에 코드를 작성하세요

    }
  }
}, [isRunning3])`}</pre>
            </div>
            <textarea
              className="code-input"
              placeholder="cleanup 함수에서 clearInterval을 호출하세요&#10;예: return () => clearInterval(timer)"
              value={userCode[3]}
              onChange={(e) => updateUserCode(3, e.target.value)}
              rows={3}
            />
            <div className="code-controls">
              <button onClick={() => checkAnswer(3)} className="check-btn">
                코드 확인
              </button>
              {feedback[3] === 'correct' && (
                <span className="feedback correct">✓ 정답입니다!</span>
              )}
              {feedback[3] === 'incorrect' && (
                <span className="feedback incorrect">✗ 다시 시도해보세요.</span>
              )}
            </div>
          </div>
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

        <div className="problem-controls">
          <button onClick={() => toggleHint(3)} className="hint-btn">
            {showHint[3] ? '힌트 숨기기' : '힌트 보기'}
          </button>
          <button onClick={() => toggleAnswer(3)} className="answer-btn">
            {showAnswer[3] ? '정답 숨기기' : '정답 보기'}
          </button>
        </div>

        {showHint[3] && (
          <div className="hint-box">
            <strong>💡 힌트:</strong> useEffect에서 return하는 함수는 cleanup 함수로, 컴포넌트가 언마운트되거나 effect가 다시 실행되기 전에 호출됩니다.
          </div>
        )}

        {showAnswer[3] && (
          <div className="answer-box">
            <strong>✅ 정답:</strong>
            <pre>{`useEffect(() => {
  if (isRunning3) {
    const timer = setInterval(() => {
      setSeconds3(prev => prev + 1)
    }, 1000)

    return () => clearInterval(timer)
  }
}, [isRunning3])`}</pre>
          </div>
        )}
      </section>

      {/* 문제 4: 빈 의존성 배열 (10점) */}
      <section className="example-section problem-section">
        <div className="problem-header">
          <h2>문제 4. 빈 의존성 배열 - 마운트 시 한 번만 (10점)</h2>
          <div className="header-right">
            <span className="difficulty medium">난이도: ⭐⭐</span>
            {isCorrect[4] && <span className="badge-correct">✓ 정답</span>}
          </div>
        </div>
        <div className="problem-description">
          <h3>📌 요구사항:</h3>
          <ul>
            <li>컴포넌트 마운트 시 데이터를 한 번만 로드해야 합니다</li>
            <li>빈 의존성 배열 []을 사용해야 합니다</li>
          </ul>
        </div>

        {mode === 'practice' && (
          <div className="code-editor-section">
            <h4>💻 코드 작성 영역:</h4>
            <p className="code-hint">빈 의존성 배열을 사용하여 한 번만 실행되게 하세요:</p>
            <div className="code-template">
              <pre>{`const [data4, setData4] = useState(null)
const [loading4, setLoading4] = useState(true)

useEffect(() => {
  // 데이터 로드 시뮬레이션
  setTimeout(() => {
    setData4({ id: 1, title: '데이터 로드 완료!' })
    setLoading4(false)
  }, 1000)
}, [/* 의존성 배열 */])`}</pre>
            </div>
            <textarea
              className="code-input"
              placeholder="빈 의존성 배열 []을 사용하세요&#10;예: }, [])"
              value={userCode[4]}
              onChange={(e) => updateUserCode(4, e.target.value)}
              rows={2}
            />
            <div className="code-controls">
              <button onClick={() => checkAnswer(4)} className="check-btn">
                코드 확인
              </button>
              {feedback[4] === 'correct' && (
                <span className="feedback correct">✓ 정답입니다!</span>
              )}
              {feedback[4] === 'incorrect' && (
                <span className="feedback incorrect">✗ 다시 시도해보세요.</span>
              )}
            </div>
          </div>
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

        <div className="problem-controls">
          <button onClick={() => toggleHint(4)} className="hint-btn">
            {showHint[4] ? '힌트 숨기기' : '힌트 보기'}
          </button>
          <button onClick={() => toggleAnswer(4)} className="answer-btn">
            {showAnswer[4] ? '정답 숨기기' : '정답 보기'}
          </button>
        </div>

        {showHint[4] && (
          <div className="hint-box">
            <strong>💡 힌트:</strong> 빈 의존성 배열 []을 사용하면 effect가 마운트 시에만 한 번 실행됩니다.
          </div>
        )}

        {showAnswer[4] && (
          <div className="answer-box">
            <strong>✅ 정답:</strong>
            <pre>{`useEffect(() => {
  setTimeout(() => {
    setData4({ id: 1, title: '데이터 로드 완료!' })
    setLoading4(false)
  }, 1000)
}, [])`}</pre>
          </div>
        )}
      </section>

      {/* 문제 5: 여러 의존성 (20점) */}
      <section className="example-section problem-section">
        <div className="problem-header">
          <h2>문제 5. 여러 의존성 - 여러 값 감시 (20점)</h2>
          <div className="header-right">
            <span className="difficulty hard">난이도: ⭐⭐⭐</span>
            {isCorrect[5] && <span className="badge-correct">✓ 정답</span>}
          </div>
        </div>
        <div className="problem-description">
          <h3>📌 요구사항:</h3>
          <ul>
            <li>width5 또는 height5가 변경될 때마다 넓이를 계산해야 합니다</li>
            <li>의존성 배열에 두 값을 모두 포함해야 합니다</li>
          </ul>
        </div>

        {mode === 'practice' && (
          <div className="code-editor-section">
            <h4>💻 코드 작성 영역:</h4>
            <p className="code-hint">여러 의존성을 배열에 넣으세요:</p>
            <div className="code-template">
              <pre>{`const [width5, setWidth5] = useState(100)
const [height5, setHeight5] = useState(100)
const [area5, setArea5] = useState(0)

useEffect(() => {
  setArea5(width5 * height5)
}, [/* 의존성 배열 */])`}</pre>
            </div>
            <textarea
              className="code-input"
              placeholder="width5와 height5를 의존성 배열에 넣으세요&#10;예: }, [width5, height5])"
              value={userCode[5]}
              onChange={(e) => updateUserCode(5, e.target.value)}
              rows={2}
            />
            <div className="code-controls">
              <button onClick={() => checkAnswer(5)} className="check-btn">
                코드 확인
              </button>
              {feedback[5] === 'correct' && (
                <span className="feedback correct">✓ 정답입니다!</span>
              )}
              {feedback[5] === 'incorrect' && (
                <span className="feedback incorrect">✗ 다시 시도해보세요.</span>
              )}
            </div>
          </div>
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

        <div className="problem-controls">
          <button onClick={() => toggleHint(5)} className="hint-btn">
            {showHint[5] ? '힌트 숨기기' : '힌트 보기'}
          </button>
          <button onClick={() => toggleAnswer(5)} className="answer-btn">
            {showAnswer[5] ? '정답 숨기기' : '정답 보기'}
          </button>
        </div>

        {showHint[5] && (
          <div className="hint-box">
            <strong>💡 힌트:</strong> 의존성 배열에는 여러 값을 쉼표로 구분하여 넣을 수 있습니다. [value1, value2, ...]
          </div>
        )}

        {showAnswer[5] && (
          <div className="answer-box">
            <strong>✅ 정답:</strong>
            <pre>{`useEffect(() => {
  setArea5(width5 * height5)
}, [width5, height5])`}</pre>
          </div>
        )}
      </section>

      {/* 문제 6: 조건부 effect (15점) */}
      <section className="example-section problem-section">
        <div className="problem-header">
          <h2>문제 6. 조건부 effect - 조건에 따라 실행 (15점)</h2>
          <div className="header-right">
            <span className="difficulty hard">난이도: ⭐⭐⭐</span>
            {isCorrect[6] && <span className="badge-correct">✓ 정답</span>}
          </div>
        </div>
        <div className="problem-description">
          <h3>📌 요구사항:</h3>
          <ul>
            <li>검색어가 2글자 이상일 때만 검색을 실행해야 합니다</li>
            <li>useEffect 내부에서 조건을 체크해야 합니다</li>
          </ul>
        </div>

        {mode === 'practice' && (
          <div className="code-editor-section">
            <h4>💻 코드 작성 영역:</h4>
            <p className="code-hint">조건문을 사용하여 검색어 길이를 체크하세요:</p>
            <div className="code-template">
              <pre>{`useEffect(() => {
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
}, [search6])`}</pre>
            </div>
            <textarea
              className="code-input"
              placeholder="search6.length를 체크하세요&#10;예: if (search6.length >= 2)"
              value={userCode[6]}
              onChange={(e) => updateUserCode(6, e.target.value)}
              rows={2}
            />
            <div className="code-controls">
              <button onClick={() => checkAnswer(6)} className="check-btn">
                코드 확인
              </button>
              {feedback[6] === 'correct' && (
                <span className="feedback correct">✓ 정답입니다!</span>
              )}
              {feedback[6] === 'incorrect' && (
                <span className="feedback incorrect">✗ 다시 시도해보세요.</span>
              )}
            </div>
          </div>
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

        <div className="problem-controls">
          <button onClick={() => toggleHint(6)} className="hint-btn">
            {showHint[6] ? '힌트 숨기기' : '힌트 보기'}
          </button>
          <button onClick={() => toggleAnswer(6)} className="answer-btn">
            {showAnswer[6] ? '정답 숨기기' : '정답 보기'}
          </button>
        </div>

        {showHint[6] && (
          <div className="hint-box">
            <strong>💡 힌트:</strong> useEffect 내부에서 조건문을 사용하여 특정 조건에서만 로직을 실행할 수 있습니다.
          </div>
        )}

        {showAnswer[6] && (
          <div className="answer-box">
            <strong>✅ 정답:</strong>
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
          </div>
        )}
      </section>

      {/* 문제 7: 인터벌 관리 (20점) */}
      <section className="example-section problem-section">
        <div className="problem-header">
          <h2>문제 7. 인터벌 관리 - 타이머 구현 (20점)</h2>
          <div className="header-right">
            <span className="difficulty hard">난이도: ⭐⭐⭐</span>
            {isCorrect[7] && <span className="badge-correct">✓ 정답</span>}
          </div>
        </div>
        <div className="problem-description">
          <h3>📌 요구사항:</h3>
          <ul>
            <li>타이머가 활성화되면 1초마다 숫자가 증가해야 합니다</li>
            <li>setInterval을 사용하고 cleanup 함수로 정리해야 합니다</li>
            <li>isActive7이 변경될 때마다 effect가 실행되어야 합니다</li>
          </ul>
        </div>

        {mode === 'practice' && (
          <div className="code-editor-section">
            <h4>💻 코드 작성 영역:</h4>
            <p className="code-hint">setInterval과 cleanup을 모두 구현하세요:</p>
            <div className="code-template">
              <pre>{`useEffect(() => {
  if (isActive7) {
    const interval = setInterval(() => {
      setTimer7(prev => prev + 1)
    }, 1000)

    return () => {
      // cleanup 코드 작성

    }
  }
}, [isActive7])`}</pre>
            </div>
            <textarea
              className="code-input"
              placeholder="setInterval을 사용하고 cleanup에서 clearInterval을 호출하세요"
              value={userCode[7]}
              onChange={(e) => updateUserCode(7, e.target.value)}
              rows={4}
            />
            <div className="code-controls">
              <button onClick={() => checkAnswer(7)} className="check-btn">
                코드 확인
              </button>
              {feedback[7] === 'correct' && (
                <span className="feedback correct">✓ 정답입니다!</span>
              )}
              {feedback[7] === 'incorrect' && (
                <span className="feedback incorrect">✗ 다시 시도해보세요.</span>
              )}
            </div>
          </div>
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

        <div className="problem-controls">
          <button onClick={() => toggleHint(7)} className="hint-btn">
            {showHint[7] ? '힌트 숨기기' : '힌트 보기'}
          </button>
          <button onClick={() => toggleAnswer(7)} className="answer-btn">
            {showAnswer[7] ? '정답 숨기기' : '정답 보기'}
          </button>
        </div>

        {showHint[7] && (
          <div className="hint-box">
            <strong>💡 힌트:</strong> setInterval로 타이머를 만들고, cleanup 함수에서 clearInterval로 정리해야 메모리 누수를 방지할 수 있습니다.
          </div>
        )}

        {showAnswer[7] && (
          <div className="answer-box">
            <strong>✅ 정답:</strong>
            <pre>{`useEffect(() => {
  if (isActive7) {
    const interval = setInterval(() => {
      setTimer7(prev => prev + 1)
    }, 1000)

    return () => clearInterval(interval)
  }
}, [isActive7])`}</pre>
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
              🎉 완벽합니다! useEffect를 완전히 이해하셨습니다!
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
            <li className={isCorrect[1] ? 'completed' : ''}>
              {isCorrect[1] ? '✅' : '⬜'} 기본 useEffect 사용법
            </li>
            <li className={isCorrect[2] ? 'completed' : ''}>
              {isCorrect[2] ? '✅' : '⬜'} 의존성 배열 사용
            </li>
            <li className={isCorrect[3] ? 'completed' : ''}>
              {isCorrect[3] ? '✅' : '⬜'} cleanup 함수
            </li>
            <li className={isCorrect[4] ? 'completed' : ''}>
              {isCorrect[4] ? '✅' : '⬜'} 빈 의존성 배열 []
            </li>
            <li className={isCorrect[5] ? 'completed' : ''}>
              {isCorrect[5] ? '✅' : '⬜'} 여러 의존성 관리
            </li>
            <li className={isCorrect[6] ? 'completed' : ''}>
              {isCorrect[6] ? '✅' : '⬜'} 조건부 effect 실행
            </li>
            <li className={isCorrect[7] ? 'completed' : ''}>
              {isCorrect[7] ? '✅' : '⬜'} 인터벌 관리와 cleanup
            </li>
          </ul>
        </div>
      </section>
    </div>
  )
}

export default UseEffect
