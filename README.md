# React 연습 프로젝트

JavaScript ES6+와 React Hooks를 학습하고 연습하기 위한 인터랙티브 학습 플랫폼입니다.

## 📋 프로젝트 소개

이 프로젝트는 JavaScript 기초 문법과 React의 주요 Hooks를 단계별로 학습할 수 있도록 설계된 연습 애플리케이션입니다. 각 주제에 대한 실습 문제를 풀어보면서 실제로 코드를 작성하고 즉시 피드백을 받을 수 있습니다.

### 주요 기능

- **인터랙티브 학습**: 직접 코드를 작성하고 실시간으로 결과를 확인
- **두 가지 학습 모드**:
  - **연습 모드**: 코드를 작성하고 정답을 확인하며 학습
  - **정답 보기 모드**: 완성된 예제를 보고 동작 확인
- **단계별 난이도**: 쉬운 문제부터 어려운 문제까지 체계적으로 구성
- **힌트 및 정답 제공**: 막힐 때 힌트를 보거나 정답을 확인 가능
- **실시간 점수 계산**: 학습 진행도를 점수로 확인

## 📚 학습 내용

### JavaScript 기초

### ✅ 05. JavaScript 빌드업 (완료)
React 개발에 필요한 JavaScript ES6+ 문법을 학습합니다.
- 화살표 함수 (Arrow Function)
- 구조 분해 할당 (Destructuring)
- 전개 연산자 (Spread Operator)
- 배열 메서드 (Array Methods - map, filter, reduce)
- 나머지 매개변수 (Rest Parameters)
- 템플릿 리터럴 (Template Literals)
- 삼항 연산자 (Ternary Operator)
- 고차 함수 (Higher-Order Functions)

### React Hooks

### ✅ 01. useState (완료)
컴포넌트의 상태 관리를 위한 기본 Hook을 학습합니다.
- 기본 카운터 (숫자 state)
- 입력 필드 관리 (문자열 state)
- 체크박스 토글 (Boolean state)
- 색상 선택기
- 할일 리스트 (배열 state)
- 사용자 정보 폼 (객체 state)
- 함수형 업데이트

### ✅ 02. useEffect (완료)
Side Effect 처리 및 컴포넌트 생명주기 관리를 학습합니다.
- 기본 useEffect (마운트 시 실행)
- 의존성 배열 (특정 값 변경 감지)
- cleanup 함수 (타이머 정리)
- 빈 의존성 배열 (마운트 시 한 번만)
- 여러 의존성 관리
- 조건부 effect 실행
- 인터벌 관리와 메모리 누수 방지

### 🚧 03. useContext (준비중)
전역 상태 관리 및 Props Drilling 해결

### 🚧 04. useRef (준비중)
DOM 참조 및 값 저장

## 🛠️ 기술 스택

- **React** 19.2.0
- **Vite** 7.2.4 - 빠른 개발 서버 및 빌드 도구
- **React Router** 7.9.6 - 페이지 라우팅
- **ESLint** - 코드 품질 관리

## 🚀 시작하기

### 설치

```bash
npm install
```

### 개발 서버 실행

```bash
npm run dev
```

브라우저에서 `http://localhost:5173` 접속

### 빌드

```bash
npm run build
```

### 프리뷰

```bash
npm run preview
```

## 📖 사용 방법

1. 왼쪽 사이드바에서 학습하고 싶은 Hook을 선택
2. 연습 모드에서 문제의 요구사항을 읽고 코드 작성
3. "코드 확인" 버튼을 클릭하여 정답 확인
4. 정답이 맞으면 해당 기능이 활성화되어 직접 테스트 가능
5. 막힐 때는 힌트를 보거나 정답을 확인

## 📁 프로젝트 구조

```
React-practice/
├── src/
│   ├── pages/
│   │   ├── Home.jsx           # 홈 페이지
│   │   ├── 01-UseState.jsx    # useState 학습 페이지
│   │   ├── 02-UseEffect.jsx   # useEffect 학습 페이지
│   │   └── 05-Buildup.jsx     # JavaScript ES6+ 학습 페이지
│   ├── App.jsx                 # 메인 앱 컴포넌트
│   ├── App.css                 # 스타일
│   └── main.jsx                # 앱 진입점
├── package.json
└── vite.config.js
```

## 🎯 학습 목표

- JavaScript ES6+ 최신 문법 완전 정복
- React 개발에 필수적인 JavaScript 패턴 이해
- React Hooks의 기본 개념과 사용법 이해
- 실전에서 자주 사용되는 패턴 학습
- 상태 관리의 불변성(Immutability) 이해
- 함수형 업데이트와 같은 고급 패턴 습득

## 📝 라이선스

개인 학습용 프로젝트입니다.
