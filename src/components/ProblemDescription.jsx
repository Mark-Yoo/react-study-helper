function ProblemDescription({ requirements }) {
  return (
    <div className="problem-description">
      <h3>📌 요구사항:</h3>
      <ul>
        {requirements.map((requirement, index) => (
          <li key={index}>{requirement}</li>
        ))}
      </ul>
    </div>
  )
}

export default ProblemDescription
