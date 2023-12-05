import { FC, useEffect, useRef, useState } from "react";
import { addResult } from "../../store/questionsSlice";

import { difficultyObj, categoriesObj } from '../../data/settings';
import QuestionsSection from "../QuestionsSection/QuestionsSection";

import Skeleton from '@mui/material/Skeleton';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { ICategoriesObj, IChangeCurrentScreen, IDifficultyObj } from "../../interfaces/interfaces";


const QuestionsPanel: FC<IChangeCurrentScreen> = ({changeCurrentScreen}) => {
    const dispatch = useAppDispatch();

    let questions = useAppSelector(state => state.questions.uncompletedQuestions);

    const [currentQuestion, setCurrentQuestion] = useState<number>(0);
    
    const ref = useRef<HTMLButtonElement | null>(null);

    const [ isDisabled, setIsDisabled ] = useState<boolean>(true);

    const [ isCorrect, setIsCorrect ] = useState<boolean>(false);

    const [ timerId, setTimerId ] = useState<NodeJS.Timeout>();
    const [ timer, setTimer ] = useState<number | string>(10);
    useEffect(()=>{
        setTimer(10);
        let id = setInterval(()=>{
            setTimer(timer => {
                timer = +timer - 1;
                if(timer <= 9) timer = '0' + timer;
                return timer
            })
        }, 1000);
        setTimerId(id)
    }, [currentQuestion]);
    if(timer == 0) {
        clearInterval(timerId as NodeJS.Timeout);
        setTimeout(()=>{
            setTimer('XX')
            setIsCorrect(false);
            setIsDisabled(false);
            document.querySelectorAll('.class-for-interaction').forEach((e)=>e.classList.add('incorrectAnswer'));
        }, 1)
    }

    const refLine = useRef<HTMLSpanElement | null>(null);

    const matches = useMediaQuery('(max-width:600px)');

    return (
        <div className='p-3 wrapper'>
            {questions[currentQuestion] ?
            <>
                <div className="h-[10%] flex items-center justify-between relative max-[600px]:mb-2">
                    <span className="text-xl font-semibold opacity-70">
                        {categoriesObj[(questions[currentQuestion].category) as keyof ICategoriesObj]} - {difficultyObj[(questions[currentQuestion].difficulty) as keyof IDifficultyObj]}
                    </span>
                    <div className="text-xl font-bold flex items-center gap-3 bg-blue-300 px-3 py-2 rounded max-[600px]:p-1">
                        <span>Time Left</span>
                        <span className="w-12 px-2 text-center text-blue-200 bg-blue-600 rounded">{timer}</span>
                    </div>
                    <span ref={refLine} className="absolute bottom-0 left-0 h-[2px] bg-blue-500"></span>
                </div>
                <div className="h-[75%] flex flex-col justify-between gap-1">
                    <div className="max-h-[145px] flex-grow overflow-auto relative max-[600px]:max-h-min">
                        <p className="text-2xl font-bold pl-9" title={questions[currentQuestion].question.text}>
                            {questions[currentQuestion].question.text}
                            <span className="absolute top-0 left-0">
                                {currentQuestion+1}.
                            </span>
                        </p>
                    </div>
                    <div className="flex flex-col gap-4 justify-evenly" onClick={(e: React.MouseEvent<HTMLDivElement | HTMLButtonElement>)=>{
                        const target = e.target as HTMLDivElement | HTMLButtonElement;
                        if(target.tagName !== 'BUTTON' || !isDisabled) return null
                        clearInterval(timerId as NodeJS.Timeout);
                        if(target.textContent === questions[currentQuestion].correctAnswer){
                            target.classList.add('correctAnswer');
                            setIsCorrect(true);
                        }
                        else{
                            target.classList.add('incorrectAnswer');
                            (ref.current as HTMLSpanElement).classList.add('correctAnswer');
                            setIsCorrect(false);
                        }
                        setIsDisabled(false);
                    }}>
                        <QuestionsSection data={questions[currentQuestion]} refData={ref}/>
                    </div>
                </div>
                <div className="h-[15%] flex justify-between items-center">
                    <p className="text-xl text-center">
                        {currentQuestion+1} of {questions.length} Questions
                    </p>
                    <button disabled={isDisabled} className="btn" onClick={()=>{
                        clearInterval(timerId as NodeJS.Timeout);

                        (refLine.current as HTMLSpanElement).style.width = `${((currentQuestion+1)/questions.length)*100}%`;                            

                        dispatch(addResult({
                            category:`${questions[currentQuestion].category}`,
                            difficulty:`${questions[currentQuestion].difficulty}`,
                            isCorrect:isCorrect,
                        }))
                        setCurrentQuestion(currentQuestion+1);
                        if(currentQuestion === questions.length-1){
                            changeCurrentScreen('Result');
                        };
                        setTimeout(()=>{
                            setIsDisabled(true);
                            document.querySelectorAll('.class-for-interaction').forEach((e)=>e.classList.remove('incorrectAnswer', 'correctAnswer'));
                        }, 2)
                    }}>
                        {currentQuestion !== questions.length-1 ? 'NEXT' : 'COMPLETE'}
                    </button>
                </div>
            </>
            : (
                <>
                    <div className="h-[10%] flex items-center justify-between">
                        <Skeleton animation='wave' width="30%" height="100%"/>
                        <Skeleton animation='wave' width="30%" height="100%"/>
                    </div>
                    <div className="h-[75%] flex flex-col justify-between">
                        <div className="h-[145px] flex-grow">
                            <Skeleton animation='wave' width="100%" height="70%"/>
                        </div>
                        <div className="flex flex-col gap-4 justify-evenly">
                            <Skeleton animation='wave' width="100%" height={matches ? '5.5rem' : '3.5rem'}/>
                            <Skeleton animation='wave' width="100%" height={matches ? '5.5rem' : '3.5rem'}/>
                            <Skeleton animation='wave' width="100%" height={matches ? '5.5rem' : '3.5rem'}/>
                            <Skeleton animation='wave' width="100%" height={matches ? '5.5rem' : '3.5rem'}/>
                        </div>
                    </div>
                    <div className="h-[15%] flex justify-between items-center">
                        <Skeleton animation='wave' width="20%" height="80%"/>
                        <Skeleton animation='wave' width="33%" height="80%"/>
                    </div>
                </>
            )}
        </div>
    )
};

export default QuestionsPanel;