import React, { Component, Fragment } from "react";
import Levels from "../Levels";
import { QuizMarvel } from "../quizMarvel";
import ProgressBar from "../ProgessBar";
import "react-toastify/dist/ReactToastify.min.css";
import { toast } from "react-toastify";
import QuizOver from "../QuizOver";

toast.configure();

class Quiz extends Component {
    state = {
        levelsName: ["debutant", "confirme", "expert"],
        quizLevel: 0,
        maxQuestions: 10,
        storedQuestions: [],
        question: null,
        options: [],
        idQuestion: 0,
        btnDisabled: true,
        userAnswer: null,
        score: 0,
        showWelcomeMsg: false,
        quizEnd: false,
    };

    storeDataRef = React.createRef();

    loadQuestions = (level) => {
        const fetchedArrayQuiz = QuizMarvel[0].quizz[level];

        if (fetchedArrayQuiz.length >= this.state.maxQuestions) {
            this.storeDataRef.current = fetchedArrayQuiz;
            const newArray = fetchedArrayQuiz.map(
                ({ answer, ...keepRest }) => keepRest
            );
            this.setState({
                storedQuestions: newArray,
            });
        } else {
            console.log("pas assez de question !");
        }
    };

    showWelcomeMsg = (pseudo) => {
        if (!this.state.showWelcomeMsg) {
            this.setState({
                showWelcomeMsg: true,
            });
            toast(`Bienvenu ${pseudo}, et bonne chance !`, {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                bodyClassName: "toastify-connexion-color",
            });
        }
    };

    componentDidMount() {
        this.loadQuestions(this.state.levelsName[this.state.quizLevel]);
    }

    nextQuestions = () => {
        if (this.state.idQuestion === this.state.maxQuestions - 1) {
            this.gameOver();
        } else {
            this.setState((prevState) => ({
                idQuestion: prevState.idQuestion + 1,
            }));
        }
        const goodAnswer =
            this.storeDataRef.current[this.state.idQuestion].answer;
        if (this.state.userAnswer === goodAnswer) {
            this.setState((prevState) => ({
                score: prevState.score + 1,
            }));
            toast.success("Bravo, bonne réponse !", {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                bodyClassName: "toastify-color",
            });
        } else {
            toast.error("Mauvaise réponse !", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                bodyClassName: "toastify-color",
            });
        }
    };

    componentDidUpdate(prevProps, prevState) {
        if (this.state.storedQuestions !== prevState.storedQuestions) {
            this.setState({
                question:
                    this.state.storedQuestions[this.state.idQuestion].question,
                options:
                    this.state.storedQuestions[this.state.idQuestion].options,
            });
        }
        if (this.state.idQuestion !== prevState.idQuestion) {
            this.setState({
                question:
                    this.state.storedQuestions[this.state.idQuestion].question,
                options:
                    this.state.storedQuestions[this.state.idQuestion].options,
                userAnswer: null,
                btnDisabled: true,
            });
        }

        if (this.props.userData.pseudo) {
            this.showWelcomeMsg(this.props.userData.pseudo);
        }
    }

    submitAnswer = (selectedAnswer) => {
        this.setState({
            userAnswer: selectedAnswer,
            btnDisabled: false,
        });
    };

    gameOver = () => {
        this.setState({
            quizEnd: true,
        });
    };

    render() {
        // const { pseudo } = this.props.userData;

        const displayOptions = this.state.options.map((option, index) => {
            return (
                <p
                    key={index}
                    onClick={() => this.submitAnswer(option)}
                    className={`answerOptions ${
                        this.state.userAnswer === option ? "selected" : null
                    }`}
                >
                    {option}
                </p>
            );
        });

        return this.state.quizEnd ? (
            <QuizOver />
        ) : (
            <Fragment>
                <Levels />d
                <ProgressBar />
                <h2>{this.state.question}</h2>
                {displayOptions}
                <button
                    disabled={this.state.btnDisabled}
                    className="btnSubmit"
                    onClick={this.nextQuestions}
                >
                    Suivant
                </button>
            </Fragment>
        );
    }
}

export default Quiz;
