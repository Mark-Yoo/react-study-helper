function ProblemControls({ showHint, showAnswer, onToggleHint, onToggleAnswer }) {
  return (
    <div className="problem-controls">
      <button onClick={onToggleHint} className="hint-btn">
        {showHint ? '힌트 숨기기' : '힌트 보기'}
      </button>
      <button onClick={onToggleAnswer} className="answer-btn">
        {showAnswer ? '정답 숨기기' : '정답 보기'}
      </button>
    </div>
  )
}

export default ProblemControls
