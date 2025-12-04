function CodeEditor({
  codeTemplate,
  hint,
  placeholder,
  userCode,
  onChange,
  onCheck,
  feedback,
  rows = 3
}) {
  return (
    <div className="code-editor-section">
      <h4>💻 코드 작성 영역:</h4>
      {hint && <p className="code-hint">{hint}</p>}
      {codeTemplate && (
        <div className="code-template">
          <pre>{codeTemplate}</pre>
        </div>
      )}
      <textarea
        className="code-input"
        placeholder={placeholder}
        value={userCode}
        onChange={onChange}
        rows={rows}
      />
      <div className="code-controls">
        <button onClick={onCheck} className="check-btn">
          코드 확인
        </button>
        {feedback === 'correct' && (
          <span className="feedback correct">
            ✓ 정답입니다! 기능이 활성화되었습니다.
          </span>
        )}
        {feedback === 'incorrect' && (
          <span className="feedback incorrect">
            ✗ 다시 시도해보세요. 힌트를 참고하세요.
          </span>
        )}
      </div>
    </div>
  )
}

export default CodeEditor
