# 공용 컴포넌트 가이드

01-UseState.jsx와 02-UseEffect.jsx에서 공통으로 사용되는 컴포넌트들을 분리했습니다.

## 📦 컴포넌트 목록

### 1. **ModeToggle**
모드 전환 버튼 (연습 모드 / 정답 보기 모드)

```jsx
import { ModeToggle } from '../components'

<ModeToggle mode={mode} setMode={setMode} />
```

**Props:**
- `mode`: 'practice' | 'view'
- `setMode`: (mode: string) => void

---

### 2. **ScoreDisplay**
현재 점수와 정답 개수 표시

```jsx
import { ScoreDisplay } from '../components'

<ScoreDisplay
  score={calculateScore()}
  correctCount={Object.values(isCorrect).filter(v => v).length}
  totalProblems={7}
/>
```

**Props:**
- `score`: number - 현재 점수
- `correctCount`: number - 맞은 문제 개수
- `totalProblems`: number (기본값: 7) - 전체 문제 수

---

### 3. **ProblemHeader**
문제 제목, 난이도, 정답 배지를 표시

```jsx
import { ProblemHeader } from '../components'

<ProblemHeader
  title="문제 1. 기본 카운터 (15점)"
  difficulty="easy"
  isCorrect={isCorrect[1]}
/>
```

**Props:**
- `title`: string - 문제 제목
- `difficulty`: 'easy' | 'medium' | 'hard' - 난이도
- `isCorrect`: boolean - 정답 여부

---

### 4. **ProblemDescription**
문제 요구사항 목록 표시

```jsx
import { ProblemDescription } from '../components'

<ProblemDescription
  requirements={[
    '버튼을 클릭하면 숫자가 1씩 증가해야 합니다',
    '현재 카운트 값을 화면에 표시해야 합니다'
  ]}
/>
```

**Props:**
- `requirements`: string[] - 요구사항 배열

---

### 5. **CodeEditor**
코드 작성 영역 (템플릿, 입력창, 확인 버튼, 피드백)

```jsx
import { CodeEditor } from '../components'

<CodeEditor
  codeTemplate={`const [count, setCount] = useState(0)
// 버튼 클릭 시 실행될 함수:
const handleClick = () => {
  // 여기에 코드를 작성하세요
}`}
  hint="아래 코드의 빈 칸을 채워보세요:"
  placeholder="setCount 함수를 사용하여 count를 1씩 증가시키는 코드를 작성하세요"
  userCode={userCode[1]}
  onChange={(e) => updateUserCode(1, e.target.value)}
  onCheck={() => checkAnswer(1)}
  feedback={feedback[1]}
  rows={3}
/>
```

**Props:**
- `codeTemplate`: string (optional) - 코드 템플릿
- `hint`: string (optional) - 힌트 메시지
- `placeholder`: string - textarea placeholder
- `userCode`: string - 사용자가 입력한 코드
- `onChange`: (e: ChangeEvent) => void - 코드 변경 핸들러
- `onCheck`: () => void - 확인 버튼 클릭 핸들러
- `feedback`: 'correct' | 'incorrect' | null - 피드백 상태
- `rows`: number (기본값: 3) - textarea 행 수

---

### 6. **ProblemControls**
힌트 보기 / 정답 보기 버튼

```jsx
import { ProblemControls } from '../components'

<ProblemControls
  showHint={showHint[1]}
  showAnswer={showAnswer[1]}
  onToggleHint={() => toggleHint(1)}
  onToggleAnswer={() => toggleAnswer(1)}
/>
```

**Props:**
- `showHint`: boolean - 힌트 표시 여부
- `showAnswer`: boolean - 정답 표시 여부
- `onToggleHint`: () => void - 힌트 토글 핸들러
- `onToggleAnswer`: () => void - 정답 토글 핸들러

---

### 7. **HintBox**
힌트 표시 박스

```jsx
import { HintBox } from '../components'

{showHint[1] && (
  <HintBox>
    setCount 함수를 사용하여 현재 count에 1을 더한 값으로 업데이트하세요.
  </HintBox>
)}
```

**Props:**
- `children`: ReactNode - 힌트 내용

---

### 8. **AnswerBox**
정답 표시 박스

```jsx
import { AnswerBox } from '../components'

{showAnswer[1] && (
  <AnswerBox>
    <pre>{`const [count, setCount] = useState(0)
// 버튼 클릭 시:
onClick={() => setCount(count + 1)}`}</pre>
  </AnswerBox>
)}
```

**Props:**
- `children`: ReactNode - 정답 내용

---

### 9. **ResultSection**
테스트 결과 요약 (최종 점수 + 체크리스트)

```jsx
import { ResultSection } from '../components'

<ResultSection
  score={calculateScore()}
  checklistItems={[
    { label: '기본 useState 사용법', isCorrect: isCorrect[1] },
    { label: '문자열 state 관리', isCorrect: isCorrect[2] },
    { label: 'Boolean state 토글', isCorrect: isCorrect[3] }
  ]}
/>
```

**Props:**
- `score`: number - 최종 점수
- `checklistItems`: Array<{ label: string, isCorrect: boolean }> - 체크리스트 항목

---

### 10. **TestInfo**
테스트 안내 전체 (안내 문구 + ModeToggle + ScoreDisplay)

```jsx
import { TestInfo } from '../components'

<TestInfo
  title="useState"
  mode={mode}
  setMode={setMode}
  score={calculateScore()}
  correctCount={Object.values(isCorrect).filter(v => v).length}
  totalProblems={7}
/>
```

**Props:**
- `title`: string - Hook 이름 (예: "useState", "useEffect")
- `mode`: 'practice' | 'view' - 현재 모드
- `setMode`: (mode: string) => void - 모드 변경 함수
- `score`: number - 현재 점수
- `correctCount`: number - 맞은 문제 개수
- `totalProblems`: number (기본값: 7) - 전체 문제 수

---

## 💡 사용 예시

```jsx
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

function UseState() {
  // ... state 선언들

  return (
    <div className="app">
      <h1>useState 테스트</h1>

      {/* 테스트 안내 */}
      <TestInfo
        title="useState"
        mode={mode}
        setMode={setMode}
        score={calculateScore()}
        correctCount={Object.values(isCorrect).filter(v => v).length}
      />

      {/* 문제 섹션 */}
      <section className="example-section problem-section">
        <ProblemHeader
          title="문제 1. 기본 카운터 (15점)"
          difficulty="easy"
          isCorrect={isCorrect[1]}
        />

        <ProblemDescription
          requirements={[
            '버튼을 클릭하면 숫자가 1씩 증가해야 합니다',
            '현재 카운트 값을 화면에 표시해야 합니다'
          ]}
        />

        {mode === 'practice' && (
          <CodeEditor
            codeTemplate={/* 코드 템플릿 */}
            hint="아래 코드의 빈 칸을 채워보세요:"
            placeholder="코드를 작성하세요"
            userCode={userCode[1]}
            onChange={(e) => updateUserCode(1, e.target.value)}
            onCheck={() => checkAnswer(1)}
            feedback={feedback[1]}
          />
        )}

        {/* 문제 작업 영역 */}
        <div className="problem-workspace">
          {/* 실제 기능 구현 */}
        </div>

        <ProblemControls
          showHint={showHint[1]}
          showAnswer={showAnswer[1]}
          onToggleHint={() => toggleHint(1)}
          onToggleAnswer={() => toggleAnswer(1)}
        />

        {showHint[1] && (
          <HintBox>
            힌트 내용
          </HintBox>
        )}

        {showAnswer[1] && (
          <AnswerBox>
            <pre>정답 코드</pre>
          </AnswerBox>
        )}
      </section>

      {/* 결과 요약 */}
      <ResultSection
        score={calculateScore()}
        checklistItems={[
          { label: '기본 useState 사용법', isCorrect: isCorrect[1] },
          // ... 더 많은 항목
        ]}
      />
    </div>
  )
}
```

## 🎨 스타일링

모든 컴포넌트는 기존의 `App.css`에 정의된 클래스명을 사용합니다:
- `.mode-toggle`
- `.score-display`
- `.problem-header`
- `.problem-description`
- `.code-editor-section`
- `.problem-controls`
- `.hint-box`
- `.answer-box`
- `.result-section`

추가 스타일링이 필요한 경우 `App.css`를 수정하세요.
