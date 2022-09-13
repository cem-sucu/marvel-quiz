import React, { Component, Fragment } from "react";
import Levels from "../Levels";
import { QuizMarvel } from "../quizMarvel";
import ProgressBar from "../ProgressBar";
import "react-toastify/dist/ReactToastify.min.css";
import { toast } from "react-toastify";
import QuizOver from "../QuizOver";

toast.configure();

class Quiz extends Component {
    constructor(props) {
        super(props);

        this.initialState = {
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

        this.state = this.initialState;
        this.storedDataRef = React.createRef();
    }

    loadQuestions = (level) => {
        const fetchedArrayQuiz = QuizMarvel[0].quizz[level];

        if (fetchedArrayQuiz.length >= this.state.maxQuestions) {
            this.storedDataRef.current = fetchedArrayQuiz;
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

    showToastMsg = (pseudo) => {
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

    nextQuestion = (pseudo) => {
        if (this.state.idQuestion === this.state.maxQuestions - 1) {
            this.gameOver(pseudo);
        } else {
            this.setState((prevState) => ({
                idQuestion: prevState.idQuestion + 1,
            }));
        }
        const goodAnswer =
            this.storedDataRef.current[this.state.idQuestion].answer;
        if (this.state.userAnswer === goodAnswer) {
            this.setState((prevState) => ({
                score: prevState.score + 1,
            }));
            toast.success(`Bravo ${this.props.userData.pseudo}`, {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                bodyClassName: "toastify-color",
            });
            console.log(`salutt ${this.props.userData.pseudo}`);
        } else {
            toast.error(
                `AAAh Mauvaise réponse ${this.props.userData.pseudo} !`,
                {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    bodyClassName: "toastify-color",
                }
            );
        }
    };

    componentDidUpdate(prevProps, prevState) {
        if (
            this.state.storedQuestions !== prevState.storedQuestions &&
            this.state.storedQuestions.length
        ) {
            this.setState({
                question:
                    this.state.storedQuestions[this.state.idQuestion].question,
                options:
                    this.state.storedQuestions[this.state.idQuestion].options,
            });
        }
        if (
            this.state.idQuestion !== prevState.idQuestion &&
            this.state.storedQuestions.length
        ) {
            this.setState({
                question:
                    this.state.storedQuestions[this.state.idQuestion].question,
                options:
                    this.state.storedQuestions[this.state.idQuestion].options,
                userAnswer: null,
                btnDisabled: true,
            });
        }

        if (this.props.userData.pseudo !== prevProps.userData.pseudo) {
            this.showToastMsg(this.props.userData.pseudo);
        }
    }

    submitAnswer = (selectedAnswer) => {
        this.setState({
            userAnswer: selectedAnswer,
            btnDisabled: false,
        });
    };

    getPercentage = (maxQuest, ourScore) => (ourScore / maxQuest) * 100;

    gameOver = () => {
        const gradepercent = this.getPercentage(
            this.state.maxQuestions,
            this.state.score
        );

        if (gradepercent >= 50) {
            this.setState({
                quizLevel: this.state.quizLevel + 1,
                percent: gradepercent,
                quizEnd: true,
            });
        } else {
            this.setState({
                percent: gradepercent,
                quizEnd: true,
            });
        }
    };

    loadLevelQuestions = (param) => {
        this.setState({ ...this.initialState, quizlevel: param });
        this.loadQuestions(this.state.levelsName[param]);
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
            <QuizOver
                ref={this.storedDataRef}
                levelsName={this.state.levelsName}
                score={this.state.score}
                maxQuestions={this.state.maxQuestions}
                quizLevel={this.state.quizLevel}
                percent={this.state.percent}
                loadLevelQuestions={this.loadLevelQuestions}
            />
        ) : (
            <Fragment>
                <Levels />
                <ProgressBar
                    idQuestion={this.state.idQuestion}
                    maxQuestions={this.state.maxQuestions}
                />
                <h2>{this.state.question}</h2>
                {displayOptions}
                <button
                    disabled={this.state.btnDisabled}
                    className="btnSubmit"
                    onClick={this.nextQuestion}
                >
                    {this.state.idQuestion < this.state.maxQuestions - 1
                        ? "suivant"
                        : "Terminer"}
                </button>
            </Fragment>
        );
    }
}

export default Quiz;
