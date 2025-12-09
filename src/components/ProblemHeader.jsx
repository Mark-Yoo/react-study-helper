function ProblemHeader({ title, difficulty, isCorrect }) {
  const difficultyMap = {
    easy: { label: '⭐', className: 'easy' },
    medium: { label: '⭐⭐', className: 'medium' },
    hard: { label: '⭐⭐⭐', className: 'hard' }
  }

  const difficultyInfo = difficultyMap[difficulty] || difficultyMap.easy

  return (
    <div className="problem-header">
      <h2>{title}</h2>
      <div className="header-right">
        <span className={`difficulty ${difficultyInfo.className}`}>
          난이도: {difficultyInfo.label}
        </span>
        {isCorrect && <span className="badge-correct">✓ 정답</span>}
      </div>
    </div>
  )
}

export default ProblemHeader
