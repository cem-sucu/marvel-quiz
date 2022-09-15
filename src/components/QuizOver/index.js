import React, { useEffect, useState, Fragment } from "react";
import { GiTrophyCup } from "react-icons/gi";
import { GiSadCrab } from "react-icons/gi";

const QuizOver = React.forwardRef((props, ref) => {
    const {
        levelsName,
        score,
        maxQuestions,
        quizLevel,
        percent,
        loadLevelQuestions,
    } = props;
    const [asked, setAsked] = useState([]);

    useEffect(() => {
        setAsked(ref.current);
    }, [ref]);

    const averageGrade = maxQuestions / 2;

    if (score < averageGrade) {
        setTimeout(() => {
            loadLevelQuestions(quizLevel);
        }, 3000);
    }

    const decision =
        score >= averageGrade ? (
            <Fragment>
                <div className="stepsBtnContainer">
                    {quizLevel < levelsName.length ? (
                        <Fragment>
                            <p className="successMsg">
                                <GiTrophyCup size="50px" />
                                Bravo passez au niveau suivant
                            </p>
                            <button
                                className="btnResult success"
                                onClick={() => loadLevelQuestions(quizLevel)}
                            >
                                Niveau suivant
                            </button>
                        </Fragment>
                    ) : (
                        <Fragment>
                            <p className="successMsg">
                                <GiTrophyCup size="50px" /> Bravo vous êtes un
                                expert de l'univers de Marvel
                            </p>
                            <button
                                className="btnResult gameOver"
                                onClick={() => loadLevelQuestions(0)}
                            >
                                Accueil
                            </button>
                        </Fragment>
                    )}
                </div>
                <div className="percentage">
                    <div className="progressPercent">Réussite: {percent} %</div>
                    <div className="progressPercent">
                        Note: {score}/{maxQuestions}
                    </div>
                </div>
            </Fragment>
        ) : (
            <Fragment>
                <div className="stepsBtnContainer">
                    <p
                        className="failureMsg"
                        style={{ textAlign: "center", color: "red" }}
                    >
                        <GiSadCrab /> Vous avez échoué !
                    </p>
                </div>
                <div className="percentage">
                    <div className="progressPercent">Réussite: {percent} %</div>
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
                    <div className="loader"></div>
                    <p style={{ textAlign: "center", color: "red" }}>
                        Ce n'est pas grave, vous allez pouvoir recommencer,
                        veuillez patientez !
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
