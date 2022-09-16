import React, { useEffect, useState, Fragment } from "react";
import { GiTrophyCup } from "react-icons/gi";
import { GiSadCrab } from "react-icons/gi";
import Loader from "../Loader/Loader";
import Modal from "../Modal";
import axios from "axios";

const QuizOver = React.forwardRef((props, ref) => {
    const {
        levelNames,
        score,
        maxQuestions,
        quizLevel,
        percent,
        loadLevelQuestions,
    } = props;

    const API_PUBLIC_KEY = process.env.REACT_APP_MARVEL_API_KEY;
    const hash = "4f80b3231c2871b9e4be125b99ab7231";

    const [asked, setAsked] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [characterInfos, setCharacterInfos] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setAsked(ref.current);
    }, [ref]);

    const showModal = (id) => {
        setOpenModal(true);

        axios
            .get(
                `https://gateway.marvel.com/v1/public/characters/${id}?ts=1&apikey=${API_PUBLIC_KEY}&hash=${hash}`
            )
            .then((response) => {
                setCharacterInfos(response.data);
                setLoading(false);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const hideModal = () => {
        setOpenModal(false);
        setLoading(true);
    };

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
                    {quizLevel < levelNames.length ? (
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
                            <button
                                className="btnInfo"
                                onClick={() => showModal(question.heroId)}
                            >
                                Informations
                            </button>
                        </td>
                    </tr>
                );
            })
        ) : (
            <tr>
                <td colSpan="3">
                    <Loader
                        loadingMsg={
                            "Ce n'est pas grave, vous allez pouvoir recommencer, veuillez patientez !"
                        }
                        styling={{ textAlign: "center", color: "red" }}
                    />
                </td>
            </tr>
        );

    const resultInModal = !loading ? (
        <>
            <div className="modalHeader">
                <h2>{characterInfos.data.results[0].name}</h2>
            </div>
            <div className="modalBody">
                <h3>Titre 2</h3>
            </div>
            <div className="modalFooter">
                <button className="modalBtn">Fermer</button>
            </div>
        </>
    ) : (
        <>
            <div className="modalHeader">
                <h2>Réponse de Marvel ...</h2>
            </div>
            <div className="modalBody">
                <Loader />
            </div>
        </>
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

            <Modal showModal={openModal} hideModal={hideModal}>
                {resultInModal}
            </Modal>
        </>
    );
});

export default React.memo(QuizOver);
