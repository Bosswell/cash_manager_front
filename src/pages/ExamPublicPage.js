import React, { useState } from "react";
import '../scss/exam.scss';
import '../scss/form.scss';
import Exam from "../exams/front/Exam";
import Loader from "../components/Loader";
import Alert from "../components/Alert";
import InputGroup from "../components/InputGroup";
import { Button } from "react-bootstrap";
import { startExam } from "../services/exam.service";
import { normalizeResponseErrors } from "../helpers/normalizers";
import { getUserId } from "../helpers/userHelper";
import {inputNormalizer, INT_TYPE} from "../helpers/inputNormalizer";


function ExamPublicPage() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [snippets, setSnippets] = useState([]);
    const [historyId, setHistoryId] = useState(0);
    const [examMode, setExamMode] = useState('standard');
    const [inputData, setInputData] = useState({
        code: '',
        examId: 0,
        username: '',
        userNumber: null,
        userGroup: ''
    });
    const [exam, setExam] = useState({
        isStarted: false,
        isFinished: false,
        data: {
            name: '',
            timeout: 0,
            questions: {},
            hasVisibleResult: true
        },
        totalPoints: null,
        correctPoints: null,
        incorrectPoints: null,
        percentage: null,
    });

    function handleInputChange({ target }) {
        setInputData(prevState => {
            return Object.assign({}, prevState, inputNormalizer(target));
        })
    }

    function handleFormClick() {
        setLoading(true);
        startExam({ ...inputData, userId: getUserId()}).then((response) => {
            if (response.hasError) {
                setError(normalizeResponseErrors(response));
                return;
            }
            setError(null);

            const { exam, historyId, mode } = response.data;
            if (!exam.questions) {
                exam.questions = [];
            }

            exam.questions = exam.questions.sort(() => Math.random() - 0.5)

            setHistoryId(historyId);
            setExamMode(mode);
            setExam(prevState => ({
                ...prevState,
                isStarted: true,
                data: exam,
            }));
            setSnippets(exam.questions.map((question) => {
                return {
                    questionId: question.id,
                    checkedOptions: []
                }
            }))
        }).finally(() => {
            setLoading(false);
        })
    }


    return (
        <div className={'exam-container'}>
            {loading && <Loader loading={loading}/>}

            <div className={'exam--errors'}>
                {error && <Alert messages={error} type={'danger'} headMsg={'An error has occurred'}/>}
            </div>

            {!exam.isStarted && <>
                <h1 className={'text-center'}>Find your exam</h1>
                <form className={'form'}>
                    <InputGroup value={inputData.code} onChange={handleInputChange} name={'code'} label={'Exam code'}/>
                    <InputGroup value={inputData.examId} data-scalar={INT_TYPE} onChange={handleInputChange} type={'number'} name={'examId'} label={'Exam id'}/>
                    <InputGroup value={inputData.username} onChange={handleInputChange} name={'username'} label={'First and last name'}/>
                    <InputGroup value={inputData.userNumber} data-scalar={INT_TYPE} type={'number'} onChange={handleInputChange} name={'userNumber'} label={'Your number'}/>
                    <InputGroup value={inputData.userGroup} onChange={handleInputChange} name={'userGroup'} label={'Your group number'}/>

                    <Button variant={'outline-dark'} onClick={handleFormClick}>Start exam</Button>
                </form>
            </>}

            {exam.isStarted && <Exam
                setLoading={setLoading}
                setError={setError}
                exam={exam}
                setExam={setExam}
                snippets={snippets}
                setSnippets={setSnippets}
                historyId={historyId}
                examMode={examMode}
            />}
        </div>
    )
}

export default ExamPublicPage;