import React from 'react'
import StartPage from './StartPage'
import './App.css'
import QuizPage from './QuizPage'

export default function App() {
  const [screen, setScreen] = React.useState('start')

  const startQuiz = () => {
    setScreen('quiz')
  }
  
  return (
    <div className="quiz-app">
      {screen === 'start' && <StartPage startQuiz={startQuiz} />}
      {screen === 'quiz' && <QuizPage  />}
    </div>
  )
}
