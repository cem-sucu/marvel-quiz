import React, { useEffect, useState, Fragment } from "react";

const QuizOver = React.forwardRef((props, ref) => {
    const { levelsName, score, maxQuestions, quizLevel, percent } = props;
    const [asked, setAsked] = useState([]);

    useEffect(() => {
        setAsked(ref.current);
    }, [ref]);

    const averageGrade = maxQuestions / 2;
    const decision =
        score >= averageGrade ? (
            <Fragment>
                <div className="stepsBtnContainer">
                    {quizLevel < levelsName.length ? (
                        <Fragment>
                            <p className="successMsg">
                                Bravo passez au niveau suivant
                            </p>
                            <button className="btnResult success">
                                Niveau suivant
                            </button>
                        </Fragment>
                    ) : (
                        <Fragment>
                            <p className="successMsg">
                                Bravo vous êtes un expert de l'univers de Marvel
                            </p>
                            <button className="btnResult gameOver">
                                Niveau suivant
                            </button>
                        </Fragment>
                    )}
                </div>
                <div className="percentage">
                    <div className="progressPercent">Réussite: {percent}</div>
                    <div className="progressPercent">
                        Note: {score}/{maxQuestions}
                    </div>
                </div>
            </Fragment>
        ) : (
            <Fragment>
                <div className="stepsBtnContainer">
                    <p
                        className="successMsg"
                        style={{ textAlign: "center", color: "red" }}
                    >
                        Vous avez échoué !
                    </p>
                </div>
                <div className="percentage">
                    <div className="progressPercent">Réussite: {percent}</div>
                    <div className="progressPercent">
                        Note: {score}/{maxQuestions}
                    </div>
                </div>
            </Fragment>
        );

    const questionAnswer =
        score >= averageGrade ? (
            asked.map((question) => {
                return (
                    <tr key={question.id}>
                        <td>{question.question}</td>
                        <td>{question.answer}</td>
                        <td>
                            <button className="btnInfo">Informations</button>
                        </td>
                    </tr>
                );
            })
        ) : (
            <tr>
                <td colSpan="3">
                    <p style={{ textAlign: "center", color: "red" }}>
                        Pas de réponse
                    </p>
                </td>
            </tr>
        );

    return (
        <>
            {decision}
            <hr />
            <p>Les réponses auw questions posées :</p>

            <div className="answerContainer">
                <table className="answers">
                    <thead>
                        <tr>
                            <th>Question</th>
                            <th>Réponse</th>
                            <th>Infos</th>
                        </tr>
                    </thead>
                    <tbody>{questionAnswer}</tbody>
                </table>
            </div>
        </>
    );
});

export default React.memo(QuizOver);
