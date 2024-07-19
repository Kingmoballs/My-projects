import React from 'react'
import he from 'he'
export default function QuizPage() {

    const [questions, setQuestions] = React.useState([])
    const [answers, setAnswers] = React.useState({})
    const [loading, setLoading] = React.useState(true)
    const [score, setScore] = React.useState(null)
    const [showAnswers, setShowAnswers] = React.useState(false)
    const maxRetries = 3
    React.useEffect(() => {
        fetchQuestions(0)
    }, [])

    const fetchQuestions = (retryCount) => {
        setLoading(true)
        fetch("https://opentdb.com/api.php?amount=5&category=21&difficulty=medium&type=multiple")
            .then(res => res.json())
            .then(data => {
                setQuestions(data.results)
                setLoading(false)
                setAnswers({})
                setScore(null)
                setShowAnswers(false)
            })
            .catch(error => {
                console.error('Error fetching questions:', error);
                if (retryCount < maxRetries) {
                    const delay = Math.pow(2, retryCount) * 1000; 
                    setTimeout(() => fetchQuestions(retryCount + 1), delay);
                } else {
                    setLoading(false);
                    alert('Failed to fetch questions. Please try again later.');
                }
            });
    }

    const handleAnswer = (questionIndex, answer) => {
        setAnswers(prevAnswers => ({
            ...prevAnswers,
            [questionIndex]: answer
        }))
       
    }

    const handleScore = () => {
        if (showAnswers) {
            fetchQuestions(0)
        } else {
            let newScore = 0;
            questions.forEach((question, index) => {
                if (answers[index] === question.correct_answer) {
                    newScore++
                }
            setScore(newScore)
            setShowAnswers(true)
            })
        }
        
    }
    

    if (loading) return <div>loading...</div>

    return (
        <div className="quiz-page">
           {questions.length > 0 && questions.map((question, questionIndex) => (
                <div key={questionIndex} className="quiz">
                    <h2 className="quiz-question">{he.decode(question.question)}</h2>
                    {[...question.incorrect_answers, question.correct_answer].sort().map((answer, answerIndex) => (
                        <button 
                            className="quiz-answer"
                            key={answerIndex}
                            onClick={() => handleAnswer(questionIndex, answer)}
                            style={{
                                backgroundColor: answers[questionIndex] === answer
                                    ? (showAnswers && answer === question.correct_answer ? 'lightgreen' : '#D6DBF5')
                                    : (showAnswers && answer === question.correct_answer ? 'lightgreen' : 'white')
                            }}
                        >
                            {he.decode(answer)}

                        </button>
                    ))}
                    <hr></hr>
                </div>
            
            ))}
            <div className="Check-final-score">
                {score !== null && <div className="score-message">Your score is {score}/{questions.length}</div> }
                <button 
                    className="check-answer-btn"
                    onClick={handleScore}
                >
                    {showAnswers === true ? "Try again" : "Check answers" }
                </button>
            </div>
           
        </div>
    )
}