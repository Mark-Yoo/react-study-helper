function ScoreDisplay({ score, correctCount, totalProblems = 7 }) {
  return (
    <div className="score-display">
      <h3>현재 점수: {score}점 / 100점</h3>
      <p className="correct-count">
        정답 개수: {correctCount} / {totalProblems}
      </p>
    </div>
  )
}

export default ScoreDisplay
