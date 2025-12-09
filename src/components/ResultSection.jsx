function ResultSection({ score, checklistItems }) {
  const getScoreMessage = () => {
    if (score === 100) {
      return <p className="congrats">🎉 완벽합니다! 완전히 이해하셨습니다!</p>
    }
    if (score >= 70) {
      return <p className="good">👍 잘하셨습니다! 조금만 더 연습하면 완벽해요!</p>
    }
    if (score >= 40) {
      return <p className="okay">💪 괜찮습니다! 힌트를 참고하여 더 연습해보세요!</p>
    }
    return <p className="need-practice">📚 정답을 확인하고 다시 한번 연습해보세요!</p>
  }

  return (
    <section className="example-section result-section">
      <h2>🎯 테스트 결과</h2>
      <div className="final-score">
        <h3>최종 점수: {score}점 / 100점</h3>
        {getScoreMessage()}
      </div>

      <div className="review-list">
        <h4>학습 체크리스트:</h4>
        <ul>
          {checklistItems.map((item, index) => (
            <li key={index} className={item.isCorrect ? 'completed' : ''}>
              {item.isCorrect ? '✅' : '⬜'} {item.label}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export default ResultSection
