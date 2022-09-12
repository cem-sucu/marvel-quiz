import React, { Component } from "react";
import Levels from "../Levels";
import { QuizMarvel } from "../quizMarvel";
import ProgressBar from "../ProgessBar";
import { getSuggestedQuery } from "@testing-library/react";

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

    componentDidMount() {
        this.loadQuestions(this.state.levelsName[this.state.quizLevel]);
    }

    nextQuestions = () => {
        if (this.state.idQuestion === this.state.maxQuestions - 1) {
            //End
        } else {
            this.setState((prevState) => ({
                idQuestion: prevState.idQuestion + 1,
            }));
        }
        const goodAnswer =
            this.storeDataRef.current[this.state.idQuestion].answer;
        if (this.state.userAnswer === goodAnswer) {
            this.setState((prevState) => ({
                idQuestion: prevState.idQuestion + 1,
            }));
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
    }

    submitAnswer = (selectedAnswer) => {
        this.setState({
            userAnswer: selectedAnswer,
            btnDisabled: false,
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

        return (
            <div>
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
            </div>
        );
    }
}

export default Quiz;
