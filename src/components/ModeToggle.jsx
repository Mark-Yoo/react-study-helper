function ModeToggle({ mode, setMode }) {
  return (
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
  )
}

export default ModeToggle
