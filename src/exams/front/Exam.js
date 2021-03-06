import React, { useEffect } from "react";
import Question from "./Question";
import Option from "./Option";
import '../../scss/exam.scss';
import { validateExam } from "../../services/exam.service";
import { Button } from "react-bootstrap";
import Countdown from 'react-countdown';
import { normalizeResponseErrors } from "../../helpers/normalizers";


function Exam({ setLoading, setError, snippets, setSnippets, exam, setExam, historyId, examMode }) {
    const renderer = ({ minutes, seconds, completed }) => {
        if (completed) {
            handleFinish();
        } else {
            return <span>{minutes}:{seconds}{seconds < 10 ? '0' : ''}</span>;
        }
    };

    useEffect(() => {
        window.onbeforeunload = function() {
            return "Are you sure you want to leave?";
        }
    }, [])

    const questions = exam.data.questions ? exam.data.questions.map((question, index) => {
        return (
            <Question query={question.query} index={index + 1}>
                {question.options.length !== 0 &&
                question.options.map((option, indexOpt) => {
                    return <Option
                        index={indexOpt}
                        correctOptions={question.correctOptions ?? {}}
                        checkedOptions={question.checkedOptions ?? {}}
                        {...option}
                        handleOnClick={() => handleOptionClick(option, question, index)}
                    />;
                })
                }
            </Question>
        )
    }) : '';

    function handleFinish() {
        window.scroll(0,0);

        if (exam.isFinished) {
            return;
        }

        setLoading(true);

        validateExam({ historyId: historyId, examId: exam.data.id, snippets: snippets }).then((response) => {
            if (response.hasError) {
                setError(normalizeResponseErrors(response));
                return;
            }

            const { correctOptions, totalPoints, correctPoints, incorrectPoints, percentage } = response.data;

            setExam(prevState => {
                return {
                    ...prevState,
                    totalPoints: totalPoints,
                    correctPoints: correctPoints,
                    incorrectPoints: incorrectPoints,
                    percentage: percentage,
                    isFinished: true,
                    data: {
                        ...prevState.data,
                        questions: prevState.data.questions.map((question, index) => {
                            return {
                                ...question,
                                correctOptions: correctOptions[question.id],
                                checkedOptions: snippets[index].checkedOptions
                            }
                        })
                    }
                }
            })
        }).finally(() => {
            setLoading(false);
        })
    }

    function handleOptionClick(option, question, index) {
        setSnippets((prevState) => {
            const { checkedOptions, questionId } = prevState[index];

            const checkedOption = checkedOptions.find((tmpOption) => {
                return tmpOption === option.id;
            });

            if (checkedOption) {
                const i = checkedOptions.indexOf(checkedOption);
                checkedOptions.splice(i, 1);
            } else {
                checkedOptions.push(option.id);
            }

            prevState[index] = {
                questionId: questionId,
                checkedOptions: checkedOptions,
            }

            return prevState;
        })
    }

    function renderSummaryBox() {
        return (
            <div className={'summary-box'}>
                <div><b>Your test is done!</b></div>
                { renderSummaryResult() }
            </div>
        )
    }

    function renderSummaryResult() {
        switch (examMode) {
            case 'subtraction':
                return (
                    <div>Result: {exam.correctPoints}(correct), {exam.totalPoints}(total points), {exam.incorrectPoints}(incorrect), it's a {exam.percentage}%</div>
                )
            case 'standard':
            default:
                return (
                    <div>Result: {exam.correctPoints}/{exam.totalPoints}, it's a {exam.percentage}%</div>
                )
        }
    }

    return (
        <div className={'exam' + (!exam.isFinished ? ' --active' : '')}>
            <h2>{ exam.data.name }</h2>
            {exam.isFinished && renderSummaryBox()}
            <div className={'exam--top' + (exam.isFinished ? ' --center' : '')}>
                {!exam.isFinished ?
                    <Button className={'rel-exam-button'} variant={'danger'} onClick={() => window.location.reload()}>Stop exam</Button>
                    :
                    <Button className={'rel-exam-button'} variant={'info'} onClick={() => window.location.reload()}>New exam</Button>
                }
                {exam.data.timeout !== 0 && exam.isFinished !== true &&
                    <Countdown
                        date={Date.now() + exam.data.timeout * 60000}
                        renderer={renderer}
                    />
                }
            </div>

            { exam.isFinished && !exam.data.hasVisibleResult ? '' : questions }
            { !exam.isFinished && <Button variant={'success'} className={'finish-button'} onClick={handleFinish}>Finish exam</Button>}
        </div>
    )
}

export default Exam;