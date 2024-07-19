
export default function StartPage(props) {
    return (
        <div className="start-page">
            <h1 className="start-header">Quizzical</h1>
            <span className="start-info">Some description if needed</span>
            <button className="start-btn" onClick={props.startQuiz}>Start Quiz</button>
            <div className="start-color-yellow"></div>
            <div className="start-color-blue"></div>
        </div>
    )
}