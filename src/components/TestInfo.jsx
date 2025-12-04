import ModeToggle from './ModeToggle'
import ScoreDisplay from './ScoreDisplay'

function TestInfo({ title, mode, setMode, score, correctCount, totalProblems = 7 }) {
  return (
    <div className="test-info example-section">
      <h2>📝 테스트 안내</h2>
      <p>각 문제의 요구사항을 읽고 {title}를 사용하여 기능을 구현하세요.</p>
      <p>코드를 작성한 후 "코드 확인" 버튼을 클릭하여 정답을 확인하세요.</p>
      <p>정답이 맞으면 해당 기능이 활성화되고 점수가 부여됩니다!</p>

      <ModeToggle mode={mode} setMode={setMode} />
      <ScoreDisplay
        score={score}
        correctCount={correctCount}
        totalProblems={totalProblems}
      />
    </div>
  )
}

export default TestInfo
