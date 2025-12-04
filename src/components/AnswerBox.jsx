function AnswerBox({ children }) {
  return (
    <div className="answer-box">
      <strong>✅ 정답:</strong>
      {children}
    </div>
  )
}

export default AnswerBox
